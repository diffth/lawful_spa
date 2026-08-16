import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/* ------------------------------------------------------------------
   공용 조판 요소.
   각 섹션이 여백·표제·버튼을 제각기 정의하지 않도록 여기서 한 번만 정한다.
   위계는 크기 · 굵기 · 자간으로만 만든다. 그림자와 라운드는 쓰지 않는다.
------------------------------------------------------------------- */

export const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={clsx('mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10', className)}>
    {children}
  </div>
);

type Tone = 'light' | 'ink';

/** 섹션 껍데기 — 배경 톤과 세로 여백을 한 곳에서 정한다 */
export const Section: React.FC<{
  id?: string;
  tone?: 'surface' | 'sunken' | 'ink';
  className?: string;
  children: React.ReactNode;
}> = ({ id, tone = 'surface', className, children }) => (
  <section
    id={id}
    className={clsx(
      'py-20 sm:py-28',
      tone === 'surface' && 'bg-surface',
      tone === 'sunken' && 'bg-sunken',
      tone === 'ink' && 'bg-ink text-on-ink',
      className,
    )}
  >
    {children}
  </section>
);

/** 표제 위 작은 라벨 */
export const Label: React.FC<{
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}> = ({ children, tone = 'light', className }) => (
  <span
    className={clsx(
      'block text-[11px] font-medium uppercase tracking-[0.18em]',
      tone === 'light' ? 'text-accent' : 'text-accent-ink',
      className,
    )}
  >
    {children}
  </span>
);

/** 섹션 표제 */
export const SectionHeader: React.FC<{
  label?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: Tone;
  className?: string;
  /** 표제 우측에 놓는 링크·필터 등 */
  aside?: React.ReactNode;
}> = ({ label, title, lead, tone = 'light', className, aside }) => (
  <div
    className={clsx(
      'flex flex-col gap-8 md:flex-row md:items-end md:justify-between',
      className,
    )}
  >
    <div className="max-w-2xl">
      {label && <Label tone={tone}>{label}</Label>}
      <h2
        className={clsx(
          'text-[26px] leading-[1.28] font-semibold sm:text-[34px] lg:text-[40px]',
          label && 'mt-4',
          tone === 'light' ? 'text-text' : 'text-on-ink',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={clsx(
            'mt-6 text-[15px] leading-[1.85] sm:text-[16px]',
            tone === 'light' ? 'text-text-soft' : 'text-on-ink-soft',
          )}
        >
          {lead}
        </p>
      )}
    </div>
    {aside && <div className="shrink-0">{aside}</div>}
  </div>
);

/* 버튼 -------------------------------------------------------------- */

type ButtonVariant = 'solid' | 'outline' | 'onInk' | 'outlineOnInk';

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  solid: 'bg-ink text-white hover:bg-ink-2',
  outline: 'border border-line-strong text-text hover:border-ink hover:bg-ink hover:text-white',
  onInk: 'bg-white text-ink hover:bg-sunken',
  outlineOnInk: 'border border-white/25 text-on-ink hover:border-white/70 hover:bg-white/10',
};

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }
> = ({ variant = 'solid', className, children, ...rest }) => (
  <button className={clsx(BUTTON_BASE, BUTTON_VARIANTS[variant], className)} {...rest}>
    {children}
  </button>
);

export const ButtonLink: React.FC<{
  to: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}> = ({ to, variant = 'solid', className, children }) => (
  <Link to={to} className={clsx(BUTTON_BASE, BUTTON_VARIANTS[variant], className)}>
    {children}
  </Link>
);

export const ButtonAnchor: React.FC<{
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}> = ({ href, variant = 'solid', className, children }) => (
  <a href={href} className={clsx(BUTTON_BASE, BUTTON_VARIANTS[variant], className)}>
    {children}
  </a>
);

/** 본문 안에서 다음 지면으로 넘기는 텍스트 링크 */
export const ArrowLink: React.FC<{
  to: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}> = ({ to, tone = 'light', className, children }) => (
  <Link
    to={to}
    className={clsx(
      'group inline-flex items-center gap-2 border-b pb-1 text-[14px] font-medium transition-colors',
      tone === 'light'
        ? 'border-line-strong text-text hover:border-accent hover:text-accent'
        : 'border-white/30 text-on-ink hover:border-accent-ink hover:text-accent-ink',
      className,
    )}
  >
    {children}
    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
  </Link>
);

/* 필터 칩 ----------------------------------------------------------- */

export const Chip: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={clsx(
      'border px-4 py-2 text-[13px] font-medium transition-colors duration-150',
      active
        ? 'border-accent bg-accent text-white'
        : 'border-line-strong text-text-soft hover:border-ink hover:text-text',
    )}
  >
    {children}
  </button>
);

/* 폼 --------------------------------------------------------------- */

export const fieldClass =
  'w-full border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-on-ink placeholder:text-white/35 transition-colors focus:border-accent-ink focus:outline-none';

export const labelClass =
  'mb-2 block text-[12px] font-medium tracking-[0.04em] text-on-ink-soft';
