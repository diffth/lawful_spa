import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CASES } from '../data/cases';
import { CASE_DISCLAIMER } from '../data/site';
import { DetailOverlay } from '../components/DetailOverlay';

const Block: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="mt-10">
    <h3 className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
      {title}
    </h3>
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="border-l border-line pl-4 text-[15px] leading-[1.8] text-text-soft"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const CaseDetail: React.FC = () => {
  const { id } = useParams();
  const item = CASES.find((c) => c.id === id);

  // 해설이 없는 사건은 상세 화면 자체가 없다
  if (!item?.detail) return <Navigate to="/cases" replace />;

  const { detail } = item;

  return (
    <DetailOverlay label="해결사례">
      <div className="tabular flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px] text-text-muted">
        <span>{item.yearMonth}</span>
        <span>·</span>
        <span>{item.agency}</span>
        <span>·</span>
        <span>{item.category}</span>
      </div>

      <p className="mt-6 text-[15px] leading-[1.5] text-text-soft">{item.charge}</p>
      <p className="mt-2 text-[32px] leading-[1.15] font-semibold tracking-[-0.035em] text-text sm:text-[40px]">
        {item.outcome}
      </p>

      <h2 className="mt-8 border-t border-line pt-8 text-[19px] leading-[1.5] font-semibold tracking-[-0.03em] text-text">
        {detail.title}
      </h2>
      <p className="mt-4 text-[15px] leading-[1.85] text-text-soft">{detail.summary}</p>

      <Block title="쟁점" items={detail.issues} />
      <Block title="대응" items={detail.strategy} />

      <div className="mt-10 border-t border-line pt-8">
        <h3 className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
          결과
        </h3>
        <p className="mt-4 text-[15px] leading-[1.85] text-text">{detail.closing}</p>
      </div>

      <p className="mt-12 border-t border-line pt-6 text-[12px] leading-[1.8] text-text-muted">
        {CASE_DISCLAIMER}
      </p>
    </DetailOverlay>
  );
};
