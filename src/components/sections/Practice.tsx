import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { PRACTICE_AREAS } from '../../data/practice';
import { Container, Section, SectionHeader } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

/**
 * 업무분야 — 아코디언.
 * 다섯 분야를 카드로 늘어놓으면 전부 같은 무게로 읽힌다.
 * 한 번에 하나만 열어 형사를 축으로 읽히게 한다.
 */
export const Practice: React.FC = () => {
  const [openId, setOpenId] = useState<string>(PRACTICE_AREAS[0].id);
  const ref = useReveal<HTMLDivElement>(0);

  return (
    <Section id="practice" tone="sunken">
      <Container>
        <SectionHeader
          label="Practice"
          title="가장 자신 있는 형사 분야에 집중합니다."
          lead="백 가지 일반 법률 사건보다, 부장검사로서 직접 다뤄본 확실한 영역에서 압도적인 차이를 만듭니다."
        />

        <div ref={ref} data-reveal className="mt-14 border-t border-line-strong">
          {PRACTICE_AREAS.map((area, index) => {
            const open = openId === area.id;
            return (
              <div key={area.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? '' : area.id)}
                    aria-expanded={open}
                    aria-controls={`practice-panel-${area.id}`}
                    className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8"
                  >
                    <span className="tabular w-7 shrink-0 text-[13px] text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={clsx(
                        'flex-1 text-[19px] font-semibold tracking-[-0.03em] transition-colors sm:text-[22px]',
                        open ? 'text-text' : 'text-text-soft group-hover:text-text',
                      )}
                    >
                      {area.title}
                    </span>
                    <span
                      className={clsx(
                        'shrink-0 text-[18px] leading-none text-text-muted transition-transform duration-200',
                        open && 'rotate-45',
                      )}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>

                {open && (
                  <div
                    id={`practice-panel-${area.id}`}
                    className="grid gap-8 pb-9 sm:grid-cols-[1fr_1fr] sm:gap-12 sm:pl-[3rem]"
                  >
                    <div>
                      <p className="max-w-md text-[15px] leading-[1.85] text-text-soft">
                        {area.summary}
                      </p>
                      {area.caseCategory && (
                        <Link
                          to={`/cases?category=${encodeURIComponent(area.caseCategory)}`}
                          className="mt-6 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-[13px] font-medium text-text transition-colors hover:border-accent hover:text-accent"
                        >
                          {area.caseCategory} 사례 보기 <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                    <ul className="space-y-2.5">
                      {area.items.map((item) => (
                        <li
                          key={item}
                          className="border-l border-line pl-4 text-[14px] leading-[1.7] text-text-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
