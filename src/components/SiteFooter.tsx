import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_SECTIONS, SITE, CASE_DISCLAIMER } from '../data/site';
import { PROFILE } from '../data/profile';
import { Container } from './primitives';

export const SiteFooter: React.FC = () => (
  <footer className="border-t border-white/10 bg-ink text-on-ink">
    <Container className="py-16 pb-28 sm:pb-16">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[19px] font-semibold tracking-[-0.03em]">
            {PROFILE.name} 변호사
          </p>
          <p className="mt-2 text-[14px] text-on-ink-soft">{PROFILE.firm}</p>
          <a
            href={SITE.telHref}
            className="tabular mt-7 block text-[28px] font-semibold tracking-[-0.03em] transition-colors hover:text-accent-ink"
          >
            {SITE.tel}
          </a>
          <p className="mt-2 text-[13px] text-on-ink-soft">
            {SITE.hours} · {SITE.hoursNote}
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[11px] font-medium tracking-[0.18em] text-accent-ink uppercase">
            Menu
          </p>
          <nav className="mt-5 flex flex-col gap-3">
            {NAV_SECTIONS.map((section) => (
              <Link
                key={section.id}
                to={`/#${section.id}`}
                className="text-[14px] text-on-ink-soft transition-colors hover:text-on-ink"
              >
                {section.label}
              </Link>
            ))}
            <Link
              to="/cases"
              className="text-[14px] text-on-ink-soft transition-colors hover:text-on-ink"
            >
              해결사례 전체
            </Link>
          </nav>
        </div>

        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium tracking-[0.18em] text-accent-ink uppercase">
            Office
          </p>
          <address className="mt-5 space-y-2 text-[14px] leading-[1.8] text-on-ink-soft not-italic">
            <p>{SITE.address}</p>
            <p>{SITE.landmark}</p>
            <p className="tabular">
              F. {SITE.fax} · E. {SITE.email}
            </p>
          </address>
        </div>
      </div>

      <div className="mt-14 border-t border-white/10 pt-8">
        <p className="max-w-4xl text-[12px] leading-[1.8] text-white/40">
          {CASE_DISCLAIMER}
        </p>
        <p className="tabular mt-4 text-[12px] text-white/40">
          {SITE.firm} · 사업자등록번호 {SITE.businessNumber} · © {new Date().getFullYear()}{' '}
          {PROFILE.name}
        </p>
      </div>
    </Container>
  </footer>
);
