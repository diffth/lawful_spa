import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * 원페이지를 유지하면서 상세에 고유 URL을 주는 오버레이.
 *
 * 목록에서 열면 배경 위치를 state 로 넘겨받아 뒤로가기로 닫히고,
 * 주소를 직접 입력해 들어오면 닫을 때 랜딩으로 보낸다.
 */
export const DetailOverlay: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const hasBackground = Boolean((location.state as { background?: unknown })?.background);

  useLockBodyScroll(true);

  const close = useCallback(() => {
    // 목록에서 열렸으면 뒤로가기가 곧 닫기다. 직접 진입은 랜딩으로 돌린다.
    if (hasBackground) navigate(-1);
    else navigate('/', { replace: true });
  }, [hasBackground, navigate]);

  // 열릴 때 포커스를 패널로 가져오고, 닫으면 원래 있던 곳으로 되돌린다
  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => returnFocusRef.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close]);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        aria-label="닫기"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/60 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className="relative flex h-full w-full max-w-[720px] flex-col bg-surface shadow-none outline-none"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-10">
          <span className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
            {label}
          </span>
          <button
            type="button"
            onClick={close}
            className="-mr-2 flex h-10 w-10 items-center justify-center text-[20px] leading-none text-text-muted transition-colors hover:text-text"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-10 sm:px-10 sm:py-14">
          {children}
        </div>
      </div>
    </div>
  );
};
