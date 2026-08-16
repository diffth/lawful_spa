import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../data/profile';
import { HERO_FACTS, SITE } from '../../data/site';
import { Container } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

/**
 * 표지 — 이 사이트에서 유일하게 크게 말하는 자리.
 * 다크 앵커로 눌러두고 아래 흰 지면과 대비를 만든다.
 */
export const Hero: React.FC = () => {
  const ref = useReveal<HTMLDivElement>(90);

  return (
    <section className="bg-ink text-on-ink">
      <Container className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div ref={ref} className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:self-center">
            <span
              data-reveal
              className="tabular block text-[11px] font-medium tracking-[0.28em] text-accent-ink"
            >
              {PROFILE.nameEn}
            </span>

            <h1
              data-reveal
              className="mt-7 text-[38px] leading-[1.14] font-semibold tracking-[-0.035em] whitespace-pre-line sm:text-[54px] lg:text-[62px]"
            >
              {PROFILE.positioning}
            </h1>

            <p
              data-reveal
              className="mt-8 max-w-xl text-[15px] leading-[1.85] text-on-ink-soft sm:text-[16px]"
            >
              {PROFILE.lead}
            </p>

            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-[14px] font-medium text-ink transition-colors hover:bg-sunken"
              >
                상담 신청
              </Link>
              <Link
                to="/#cases"
                className="inline-flex items-center justify-center border border-white/25 px-7 py-3.5 text-[14px] font-medium text-on-ink transition-colors hover:border-white/70 hover:bg-white/10"
              >
                해결사례 보기
              </Link>
              <a
                href={SITE.telHref}
                className="tabular ml-1 hidden border-b border-white/25 pb-1 text-[15px] transition-colors hover:border-accent-ink hover:text-accent-ink sm:inline-block"
              >
                {SITE.tel}
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-5">
            <div className="border border-white/10">
              <img
                src={PROFILE.portrait}
                alt={`${PROFILE.name} 변호사`}
                loading="eager"
                className="h-[380px] w-full object-cover object-center grayscale-[35%] sm:h-[480px] lg:h-[540px]"
              />
            </div>
            <div className="flex items-baseline justify-between border-t border-white/10 py-4">
              <span className="text-[16px] font-semibold">
                {PROFILE.name}
                <span className="ml-2 text-[13px] font-normal text-on-ink-soft">
                  {PROFILE.title}
                </span>
              </span>
              <span className="text-[12px] text-on-ink-soft">전 서울중앙지검 부장검사</span>
            </div>
          </div>
        </div>
      </Container>

      {/* 자격 스트립 — 히어로에 접합해 첫 화면 안에서 근거를 준다 */}
      <div className="border-t border-white/10">
        <Container>
          <dl className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_FACTS.map((fact) => (
              <div key={fact.label} className="bg-ink py-7 sm:px-6 sm:first:pl-0 lg:last:pr-0">
                <dt className="text-[11px] font-medium tracking-[0.18em] text-accent-ink uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-3 text-[14px] leading-[1.6] text-on-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
};
