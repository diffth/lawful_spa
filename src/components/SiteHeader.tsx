import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { NAV_SECTIONS, SITE } from '../data/site';
import { PROFILE } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { Container } from './primitives';

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

/**
 * 상단 고정 내비.
 * 랜딩에서는 어두운 히어로 위에 겹쳐 뜨고(overlay), 스크롤하면 흰 배경으로 바뀐다.
 * 히어로가 없는 하위 화면은 처음부터 흰 배경(solid)으로 띄운다.
 */
export const SiteHeader: React.FC<{ variant?: 'overlay' | 'solid' }> = ({
  variant = 'overlay',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);
  const { pathname, hash } = useLocation();

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // 어떤 경로로 이동하든 열려 있던 시트는 닫는다
  useEffect(() => setMenuOpen(false), [pathname, hash]);

  const onLanding = pathname === '/';
  const inverted = variant === 'overlay' && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          inverted ? 'bg-transparent' : 'border-b border-line bg-surface/95 backdrop-blur',
        )}
      >
        {/* 스크롤 진행 — 1px */}
        <div
          className="absolute inset-x-0 top-0 h-px origin-left bg-accent transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />

        <Container className="flex h-16 items-center justify-between sm:h-[72px]">
          <Link
            to="/"
            className={clsx(
              'flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.03em] transition-colors',
              inverted ? 'text-on-ink' : 'text-text',
            )}
          >
            {PROFILE.name}
            <span
              className={clsx(
                'text-[12px] font-normal tracking-normal',
                inverted ? 'text-on-ink-soft' : 'text-text-muted',
              )}
            >
              변호사
            </span>
          </Link>

          {/* 데스크톱 내비 */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_SECTIONS.map((section) => {
              const current = onLanding && activeId === section.id;
              return (
                <Link
                  key={section.id}
                  to={`/#${section.id}`}
                  className={clsx(
                    'text-[14px] transition-colors',
                    current && 'font-medium',
                    inverted
                      ? current
                        ? 'text-on-ink'
                        : 'text-on-ink-soft hover:text-on-ink'
                      : current
                        ? 'text-text'
                        : 'text-text-soft hover:text-text',
                  )}
                >
                  {section.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.telHref}
              className={clsx(
                'tabular hidden text-[14px] font-medium transition-colors sm:block',
                inverted ? 'text-on-ink hover:text-accent-ink' : 'text-text hover:text-accent',
              )}
            >
              {SITE.tel}
            </a>
            <Link
              to="/#contact"
              className={clsx(
                'hidden px-5 py-2.5 text-[13px] font-medium transition-colors sm:inline-flex',
                inverted
                  ? 'bg-white text-ink hover:bg-sunken'
                  : 'bg-ink text-white hover:bg-ink-2',
              )}
            >
              상담 신청
            </Link>

            {/* 모바일 토글 */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              className={clsx(
                '-mr-2 flex h-10 w-10 items-center justify-center lg:hidden',
                inverted ? 'text-on-ink' : 'text-text',
              )}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={clsx(
                    'absolute left-0 block h-px w-5 bg-current transition-transform duration-200',
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={clsx(
                    'absolute left-0 block h-px w-5 bg-current transition-transform duration-200',
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3',
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </header>

      {/*
        모바일 시트는 header 밖에 둔다.
        header 가 backdrop-blur 를 쓰는 순간 fixed 자손의 컨테이닝 블록이 header 로 바뀌어
        bottom-0 이 헤더 높이 기준으로 잡히고 시트가 1px 로 무너진다.
      */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-surface lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col">
              {NAV_SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  to={`/#${section.id}`}
                  className="border-b border-line py-5 text-[17px] font-medium text-text"
                >
                  {section.label}
                </Link>
              ))}
              <Link
                to="/cases"
                className="border-b border-line py-5 text-[17px] font-medium text-text"
              >
                해결사례 전체
              </Link>
            </nav>
            {/* 하단 고정 전화 바에 가리지 않도록 여백을 준다 */}
            <div className="mt-8 space-y-3 pb-28 sm:pb-10">
              <a
                href={SITE.telHref}
                className="flex w-full items-center justify-center bg-ink px-6 py-4 text-[15px] font-medium text-white"
              >
                {SITE.tel} 전화 상담
              </a>
              <Link
                to="/#contact"
                className="flex w-full items-center justify-center border border-line-strong px-6 py-4 text-[15px] font-medium text-text"
              >
                상담 신청서 작성
              </Link>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};
