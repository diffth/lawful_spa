import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, ShieldCheck, Scale, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b132b] text-slate-400 border-t border-slate-800">
      {/* Top consultation bar */}
      <div className="border-b border-slate-800/80 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  대표 직통 상담전화
                </p>
                <a
                  href="tel:02-583-6699"
                  className="text-2xl font-black text-white hover:text-amber-300 transition"
                >
                  02-583-6699
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  상담 가능 시간
                </p>
                <p className="text-sm font-medium text-slate-200">
                  평일 09:00 ~ 20:00 (야간/주말 긴급 당직)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  비밀 보장 1:1 상담
                </p>
                <p className="text-sm font-medium text-slate-200">
                  모든 상담 내용은 변호사법에 의해 철저히 보호
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Firm Overview */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold text-white tracking-tight">
                법무법인 행복한동행
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              갑작스러운 법률 분쟁 앞에서 의뢰인의 권익을 최우선으로 수호합니다.
              부장검사 및 사법연수원 교수 출신 변호사진의 축적된 승소 노하우로 최선의 결과를 만듭니다.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              주요 업무분야
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/practice-areas" className="hover:text-amber-300 transition flex items-center">
                  형사 사건 (수사 초기·구속대응)
                </Link>
              </li>
              <li>
                <Link to="/practice-areas" className="hover:text-amber-300 transition flex items-center">
                  성범죄·경제범죄 전담센터
                </Link>
              </li>
              <li>
                <Link to="/practice-areas" className="hover:text-amber-300 transition flex items-center">
                  중대재해·산업안전보건
                </Link>
              </li>
              <li>
                <Link to="/practice-areas" className="hover:text-amber-300 transition flex items-center">
                  민사·부동산·손해배상
                </Link>
              </li>
              <li>
                <Link to="/practice-areas" className="hover:text-amber-300 transition flex items-center">
                  행정처분 취소 및 집행정지
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              바로가기
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition">
                  법무법인 소개 & 인사말
                </Link>
              </li>
              <li>
                <Link to="/lawyers" className="hover:text-amber-300 transition">
                  오세영 대표변호사 프로필
                </Link>
              </li>
              <li>
                <Link to="/cases" className="hover:text-amber-300 transition">
                  주요 승소 및 불기소 사례
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-amber-300 transition">
                  언론보도 및 전문가 칼럼
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="hover:text-amber-300 transition">
                  온라인 무료상담 신청
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              오시는 길
            </h4>
            <div className="space-y-3 text-xs">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>서울 서초구 서초중앙로 125 (로이어즈타워) 602호 (교대역 8번 출구 바로 앞)</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ykm6363@naver.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>FAX : 02-583-3375</span>
              </p>
              <Link
                to="/about#directions"
                className="inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold pt-1"
              >
                <span>네이버/카카오 지도 길찾기</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Business info */}
        <div className="pt-8 border-t border-slate-800 text-[11px] leading-relaxed text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p>
              법무법인 행복한동행 | 대표변호사 : 노정환, 오세영 | 사업자등록번호 : 442-35-01262
            </p>
            <p className="mt-1">
              개인정보관리책임자 : 노정환 대표변호사 | 본 사이트의 모든 법률 콘텐츠는 무단 복제 및 전재를 금합니다.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <Link to="/about" className="hover:text-white transition">
              이용약관
            </Link>
            <span className="text-slate-700">|</span>
            <Link to="/about" className="hover:text-white font-medium text-slate-300 transition">
              개인정보처리방침
            </Link>
            <span className="text-slate-700">|</span>
            <Link to="/about" className="hover:text-white transition">
              이메일무단수집거부
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-slate-600">
          © {new Date().getFullYear()} 법무법인 행복한동행 (Law Firm Happy Companion). All rights reserved. Powered by React + Vite on Cloudflare Pages.
        </div>
      </div>
    </footer>
  );
};
