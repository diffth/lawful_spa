import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import type { Case, CaseCategory } from '../types';
import { CASE_CATEGORIES } from '../data/cases';
import { Chip } from './primitives';

/* ------------------------------------------------------------------
   해결사례 아카이브 표.
   연월 · 처분기관 · 죄명 · 처분결과 네 항목이 열로 고정된다.
   결과는 색이 아니라 굵기로만 세운다 — 초록색으로 칠하는 순간 광고가 된다.
------------------------------------------------------------------- */

/** 모바일 2행 / 데스크톱 4열. sm:contents 로 메타 묶음을 열로 풀어놓는다. */
const CaseRowBody: React.FC<{ item: Case; interactive: boolean }> = ({
  item,
  interactive,
}) => (
  <div
    className={clsx(
      'grid grid-cols-[1fr_auto_16px] items-baseline gap-x-4 gap-y-1 px-2 py-4 transition-colors',
      // 처분결과를 고정폭 열에 왼쪽 정렬해 세로선을 만든다 — 오른쪽 정렬은 시작점이 들쭉날쭉해 스캔이 어렵다
      'sm:grid-cols-[92px_52px_minmax(0,1fr)_190px_20px] sm:gap-x-6 sm:py-[18px]',
      interactive && 'group-hover:bg-sunken',
    )}
  >
    <div className="col-span-3 flex items-baseline gap-2 sm:contents">
      <span className="tabular text-[13px] text-text-muted sm:text-[14px]">
        {item.yearMonth}
      </span>
      <span className="text-[13px] text-text-muted">{item.agency}</span>
    </div>

    <p className="text-[14px] leading-[1.5] text-text sm:text-[15px]">{item.charge}</p>

    <p className="text-right text-[14px] font-semibold text-text sm:text-left sm:text-[15px]">
      {item.outcome}
    </p>

    <span
      className={clsx(
        'text-[13px] text-text-muted transition-transform',
        interactive ? 'group-hover:translate-x-0.5 group-hover:text-accent' : 'opacity-0',
      )}
      aria-hidden={!interactive}
    >
      {interactive ? '→' : ''}
    </span>
  </div>
);

const CaseRow: React.FC<{ item: Case }> = ({ item }) => {
  const location = useLocation();

  // 해설이 있는 사건만 상세로 연다. 나머지는 목록 항목으로만 존재한다.
  if (!item.detail) {
    return (
      <li className="border-t border-line">
        <CaseRowBody item={item} interactive={false} />
      </li>
    );
  }

  return (
    <li className="border-t border-line">
      <Link
        to={`/cases/${item.id}`}
        state={{ background: location }}
        className="group block"
        aria-label={`${item.yearMonth} ${item.charge} ${item.outcome} — 해설 보기`}
      >
        <CaseRowBody item={item} interactive />
      </Link>
    </li>
  );
};

/** 표 머리 — 데스크톱에서만 노출한다 */
const CaseTableHead: React.FC = () => (
  <div className="hidden grid-cols-[92px_52px_minmax(0,1fr)_190px_20px] gap-x-6 border-b border-line-strong px-2 pb-3 text-[11px] font-medium tracking-[0.18em] text-text-muted uppercase sm:grid">
    <span>연월</span>
    <span>기관</span>
    <span>죄명</span>
    <span>처분결과</span>
    <span />
  </div>
);

export const CaseTable: React.FC<{
  cases: Case[];
  /** 아카이브에서 연도 머리글을 넣는다 */
  groupByYear?: boolean;
}> = ({ cases, groupByYear = false }) => {
  if (cases.length === 0) {
    return (
      <p className="border-t border-line py-16 text-center text-[14px] text-text-muted">
        해당 분야의 사례가 아직 없습니다.
      </p>
    );
  }

  if (!groupByYear) {
    return (
      <div>
        <CaseTableHead />
        <ul className="border-b border-line">
          {cases.map((item) => (
            <CaseRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  }

  const years = [...new Set(cases.map((c) => c.yearMonth.slice(0, 4)))];

  return (
    <div>
      <CaseTableHead />
      {years.map((year) => {
        const rows = cases.filter((c) => c.yearMonth.startsWith(year));
        return (
          <div key={year}>
            <div className="flex items-baseline justify-between border-t border-line-strong bg-sunken px-2 py-3">
              <span className="tabular text-[15px] font-semibold text-text">{year}</span>
              <span className="tabular text-[12px] text-text-muted">{rows.length}건</span>
            </div>
            <ul className="border-b border-line">
              {rows.map((item) => (
                <CaseRow key={item.id} item={item} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

/** 분야 필터 칩 — 랜딩과 아카이브가 같은 것을 쓴다 */
export const CaseFilters: React.FC<{
  value: CaseCategory | '전체';
  onChange: (value: CaseCategory | '전체') => void;
  count: number;
}> = ({ value, onChange, count }) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex flex-wrap gap-2">
      <Chip active={value === '전체'} onClick={() => onChange('전체')}>
        전체
      </Chip>
      {CASE_CATEGORIES.map((category) => (
        <Chip
          key={category}
          active={value === category}
          onClick={() => onChange(category)}
        >
          {category}
        </Chip>
      ))}
    </div>
    <p className="tabular text-[13px] text-text-muted">총 {count}건</p>
  </div>
);
