import React, { useMemo, useState } from 'react';
import type { CaseCategory } from '../../types';
import { SORTED_CASES } from '../../data/cases';
import { CASE_DISCLAIMER } from '../../data/site';
import { ArrowLink, Container, Section, SectionHeader } from '../primitives';
import { CaseFilters, CaseTable } from '../CaseTable';
import { useReveal } from '../../hooks/useReveal';

const PREVIEW_COUNT = 12;

/**
 * 해결사례 — 스크롤 첫 화면 직후에 놓는다.
 * 형사사건 의뢰인이 가장 먼저 확인하려는 것은 "이 사람이 실제로 끝내봤는가"다.
 */
export const Cases: React.FC = () => {
  const [category, setCategory] = useState<CaseCategory | '전체'>('전체');
  const ref = useReveal<HTMLDivElement>(0);

  const filtered = useMemo(
    () =>
      category === '전체'
        ? SORTED_CASES
        : SORTED_CASES.filter((item) => item.category === category),
    [category],
  );

  return (
    <Section id="cases" tone="surface">
      <Container>
        <SectionHeader
          label="Results"
          title={
            <>
              종결된 사건의 기록.
              <br />
              연월과 처분기관까지 그대로 둡니다.
            </>
          }
          lead="결과만 나열된 목록은 확인할 방법이 없습니다. 어느 단계에서 어떻게 끝났는지를 함께 적습니다."
          aside={<ArrowLink to="/cases">전체 사례 보기</ArrowLink>}
        />

        <div ref={ref} data-reveal className="mt-14">
          <CaseFilters value={category} onChange={setCategory} count={filtered.length} />

          <div className="mt-8">
            <CaseTable cases={filtered.slice(0, PREVIEW_COUNT)} />
          </div>

          {filtered.length > PREVIEW_COUNT && (
            <div className="mt-8 flex justify-center">
              <ArrowLink to="/cases">
                나머지 {filtered.length - PREVIEW_COUNT}건 더 보기
              </ArrowLink>
            </div>
          )}

          <p className="mt-10 max-w-3xl text-[12px] leading-[1.8] text-text-muted">
            {CASE_DISCLAIMER}
          </p>
        </div>
      </Container>
    </Section>
  );
};
