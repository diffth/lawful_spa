import React from 'react';
import { PROCESS_STEPS } from '../../data/site';
import { Container, Section, SectionHeader } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

export const Process: React.FC = () => {
  const ref = useReveal<HTMLDivElement>(70);

  return (
    <Section id="process" tone="sunken">
      <Container>
        <SectionHeader
          label="Process"
          title="상담부터 종결까지"
          lead="어느 단계에서 무엇이 정해지는지 미리 아시는 편이 낫습니다. 비용도 착수 전에 서면으로 확정합니다."
        />

        <div ref={ref} className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} data-reveal className="bg-sunken p-8">
              <span className="tabular text-[12px] font-medium text-accent">{step.step}</span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.03em] text-text">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-text-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
