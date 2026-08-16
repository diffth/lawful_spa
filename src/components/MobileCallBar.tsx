import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

/**
 * 모바일 하단 고정 CTA.
 * 형사사건은 '지금 전화'가 1순위라 화면 어디에 있든 손가락이 닿는 곳에 둔다.
 * 데스크톱에서는 헤더의 전화번호와 상담 버튼이 같은 역할을 하므로 감춘다.
 */
export const MobileCallBar: React.FC = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 sm:hidden">
    <a
      href={SITE.telHref}
      className="tabular flex items-center justify-center bg-ink py-4 text-[15px] font-medium text-white"
    >
      전화 상담 {SITE.tel}
    </a>
    <Link
      to="/#contact"
      className="flex items-center justify-center bg-accent py-4 text-[15px] font-medium text-white"
    >
      상담 신청서
    </Link>
  </div>
);
