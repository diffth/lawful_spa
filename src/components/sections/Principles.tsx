import React from 'react';
import { PRINCIPLES } from '../../data/site';
import { Container, Section, SectionHeader } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

/**
 * "직접" 4원칙.
 * 형사사건 의뢰인이 가장 크게 데는 지점이
 * '상담한 변호사와 법정에 선 변호사가 다르다'는 것이라 이걸 정면에 둔다.
 */
export const Principles: React.FC = () => {
  const ref = useReveal<HTMLDivElement>(70);

  return (
    <Section id="principles" tone="surface">
      <Container>
        <SectionHeader
          label="Promise"
          title="네 가지를 직접 합니다"
          lead="상담 실장이 상담하고 사무장이 연락하는 구조를 두지 않습니다. 사건을 아는 사람이 처음부터 끝까지 같은 사람이어야 합니다."
        />

        <div ref={ref} className="mt-14 grid gap-px bg-line sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <div key={principle.verb} data-reveal className="bg-surface p-8 sm:p-10">
              <span className="tabular text-[12px] font-medium text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.03em] text-text">
                {principle.verb}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-text-soft">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
