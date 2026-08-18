import React from 'react';
import { CHECKLIST } from '../../data/site';
import { Container, Section, SectionHeader } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

/**
 * 변호사 선택 체크리스트.
 * 우리를 고르라고 말하는 대신 판단 기준을 드린다.
 * 다른 사무실에 그대로 물어보셔도 되는 질문들이다.
 */
export const Checklist: React.FC = () => {
  const ref = useReveal<HTMLDivElement>(60);

  return (
    <Section id="checklist" tone="surface">
      <Container>
        <SectionHeader
          label="Checklist"
          title={
            <>
              어디에 맡기시든,
              <br />
              이 다섯 가지는 확인하십시오.
            </>
          }
          lead="저희에게 물으라는 뜻이 아닙니다. 상담을 다니시는 모든 곳에 같은 질문을 하시면 됩니다."
        />

        <div ref={ref} className="mt-14 border-t border-line-strong">
          {CHECKLIST.map((item, index) => (
            <div
              key={item.q}
              data-reveal
              className="grid gap-3 border-b border-line py-8 sm:grid-cols-[2.5rem_1fr_1fr] sm:gap-8"
            >
              <span className="tabular text-[13px] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[16px] leading-[1.5] font-semibold text-text sm:text-[17px]">
                {item.q}
              </h3>
              <p className="text-[14px] leading-[1.8] text-text-soft">{item.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
