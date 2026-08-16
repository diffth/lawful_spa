import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Insight, InsightKind } from '../../types';
import { INSIGHT_KINDS, SORTED_INSIGHTS } from '../../data/insights';
import { Chip, Container, Section, SectionHeader } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

/** 매체명을 제목보다 먼저 읽히게 놓는다 — 출처가 곧 신뢰다 */
const Meta: React.FC<{ item: Insight }> = ({ item }) => (
  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
    <span className="text-[13px] font-medium text-text">{item.source}</span>
    <span className="text-[12px] text-text-muted">{item.kind}</span>
    <span className="tabular text-[12px] text-text-muted">{item.date}</span>
  </div>
);

const InsightRow: React.FC<{ item: Insight }> = ({ item }) => {
  const location = useLocation();

  const body = (
    <div className="grid gap-2 px-2 py-6 transition-colors group-hover:bg-sunken sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-8">
      <Meta item={item} />
      <div className="flex items-baseline justify-between gap-6">
        <p className="text-[15px] leading-[1.6] font-medium text-text sm:text-[16px]">
          {item.title}
        </p>
        <span className="shrink-0 text-[13px] text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent">
          →
        </span>
      </div>
    </div>
  );

  // 영상 등 외부 콘텐츠는 원문으로 보낸다
  if (!item.paragraphs?.length && item.link) {
    return (
      <li className="border-t border-line">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {body}
        </a>
      </li>
    );
  }

  return (
    <li className="border-t border-line">
      <Link
        to={`/insights/${item.id}`}
        state={{ background: location }}
        className="group block"
      >
        {body}
      </Link>
    </li>
  );
};

export const Insights: React.FC = () => {
  const [kind, setKind] = useState<InsightKind | '전체'>('전체');
  const ref = useReveal<HTMLDivElement>(0);
  const location = useLocation();

  const filtered = useMemo(
    () =>
      kind === '전체'
        ? SORTED_INSIGHTS
        : SORTED_INSIGHTS.filter((item) => item.kind === kind),
    [kind],
  );

  const featured = filtered.find((item) => item.featured);
  const rest = featured ? filtered.filter((item) => item.id !== featured.id) : filtered;

  return (
    <Section id="insights" tone="surface">
      <Container>
        <SectionHeader
          label="Insights"
          title="쓰고 말한 것들"
          lead="같은 질문을 반복해서 받습니다. 상담 자리에서만 답하기에는 아까운 이야기를 정리해 둡니다."
          aside={
            <div className="flex flex-wrap gap-2">
              <Chip active={kind === '전체'} onClick={() => setKind('전체')}>
                전체
              </Chip>
              {INSIGHT_KINDS.map((value) => (
                <Chip key={value} active={kind === value} onClick={() => setKind(value)}>
                  {value}
                </Chip>
              ))}
            </div>
          }
        />

        <div ref={ref} data-reveal className="mt-14">
          {featured && (
            <Link
              to={`/insights/${featured.id}`}
              state={{ background: location }}
              className="group block border-t border-line-strong py-9"
            >
              <Meta item={featured} />
              <p className="mt-4 max-w-3xl text-[22px] leading-[1.4] font-semibold tracking-[-0.03em] text-text sm:text-[28px]">
                {featured.title}
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-text-soft">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-[13px] font-medium text-text transition-colors group-hover:border-accent group-hover:text-accent">
                전문 읽기 <span aria-hidden="true">→</span>
              </span>
            </Link>
          )}

          {rest.length > 0 ? (
            <ul className="border-b border-line">
              {rest.map((item) => (
                <InsightRow key={item.id} item={item} />
              ))}
            </ul>
          ) : (
            !featured && (
              <p className="border-t border-line py-16 text-center text-[14px] text-text-muted">
                해당 유형의 글이 아직 없습니다.
              </p>
            )
          )}
        </div>
      </Container>
    </Section>
  );
};
