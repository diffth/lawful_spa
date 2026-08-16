import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { INSIGHTS } from '../data/insights';
import { PROFILE } from '../data/profile';
import { DetailOverlay } from '../components/DetailOverlay';

export const InsightDetail: React.FC = () => {
  const { id } = useParams();
  const item = INSIGHTS.find((i) => i.id === id);

  if (!item?.paragraphs?.length) return <Navigate to="/#insights" replace />;

  return (
    <DetailOverlay label={item.kind}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[14px] font-medium text-text">{item.source}</span>
        <span className="tabular text-[13px] text-text-muted">{item.date}</span>
      </div>

      <h2 className="mt-5 text-[26px] leading-[1.3] font-semibold tracking-[-0.035em] text-text sm:text-[32px]">
        {item.title}
      </h2>

      {/* 읽기 최적화 — 한 줄 62자 안쪽, 문단 간격을 넉넉히 */}
      <div className="mt-9 max-w-[62ch] space-y-6 border-t border-line pt-9">
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 16)} className="text-[16px] leading-[1.9] text-text-soft">
            {paragraph}
          </p>
        ))}
      </div>

      <p className="mt-12 border-t border-line pt-6 text-[13px] text-text-muted">
        {PROFILE.name} 변호사 · {PROFILE.firm}
      </p>

      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-[13px] font-medium text-text transition-colors hover:border-accent hover:text-accent"
        >
          원문 보기 <span aria-hidden="true">↗</span>
        </a>
      )}
    </DetailOverlay>
  );
};
