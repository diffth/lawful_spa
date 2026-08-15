import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Scale, MessageSquare, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '법무법인 소개', path: '/about' },
    { name: '변호사 소개', path: '/lawyers' },
    { name: '업무분야', path: '/practice-areas' },
    { name: '성공사례', path: '/cases' },
    { name: '언론보도·칼럼', path: '/media' },
    { name: '온라인 상담', path: '/consultation' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top utility bar */}
      <div className="bg-white border-b border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              24시 야간/주말 긴급 수사대응 센터 가동 중
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">서울 서초구 교대역 8번 출구 로이어즈타워 602호</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="tel:02-583-6699"
              className="flex items-center font-bold text-blue-900 hover:text-blue-700 transition text-sm"
            >
              <Phone className="w-4 h-4 mr-1.5 text-blue-600" />
              <span>대표전화 : 02-583-6699</span>
            </a>
            <Link to="/about#directions" className="hover:text-blue-900">
              오시는길
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-[#151e3f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <Scale className="w-6 h-6 text-slate-950 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-light tracking-widest text-amber-400 uppercase">
                  Law Firm Happy Companion
                </span>
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-200 transition">
                  법무법인 행복한동행
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-[15px] font-medium transition duration-150 ${
                      active
                        ? 'text-amber-400 bg-white/10 font-bold'
                        : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Call to Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={onOpenConsultModal}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 mr-1.5 text-slate-900" />
                <span>무료 법률상담 신청</span>
              </button>

              <a
                href="tel:02-583-6699"
                className="lg:hidden p-2 rounded-lg bg-blue-800 text-white hover:bg-blue-700"
                aria-label="전화 상담"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="메뉴 열기"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d142b] border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition ${
                    active
                      ? 'bg-amber-400/20 text-amber-300 font-bold'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
            <a
              href="tel:02-583-6699"
              className="flex items-center justify-center px-4 py-3 rounded-lg bg-blue-900/80 text-white text-sm font-semibold hover:bg-blue-800"
            >
              <Phone className="w-4 h-4 mr-2 text-amber-400" />
              02-583-6699
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultModal();
              }}
              className="flex items-center justify-center px-4 py-3 rounded-lg bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              상담 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
