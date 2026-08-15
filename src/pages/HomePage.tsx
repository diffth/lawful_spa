import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Award,
  BookOpen,
  Phone,
  ArrowRight,
  CheckCircle,
  FileText,
  Star,
  Users,
  ChevronRight,
  Gavel,
  Clock,
  Sparkles
} from 'lucide-react';
import { LAWYERS } from '../data/lawyers';
import { PRACTICE_AREAS } from '../data/practiceAreas';
import { SUCCESS_CASES } from '../data/cases';
import { NEWS_ARTICLES } from '../data/news';

interface HomePageProps {
  onOpenConsultModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultModal }) => {
  const ohSeYoung = LAWYERS.find((l) => l.id === 'oh-se-young') || LAWYERS[0];
  const [activeTab, setActiveTab] = useState('all');

  const filteredCases = activeTab === 'all'
    ? SUCCESS_CASES
    : SUCCESS_CASES.filter((c) => c.category === activeTab);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <section className="relative min-h-[620px] bg-[#0c1427] text-white overflow-hidden flex items-center">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1427] via-[#111e3b]/90 to-[#0c1427]/80 z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>부장검사 · 사법연수원 교수 출신 대표변호사 직접 총괄</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  갑작스레 다가온 법률 분쟁, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
                    의뢰인과 함께하는 행복한 동행
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
                  축적된 검찰 실무와 치밀한 법정 공방 노하우로 최적의 승소 결과를 도출합니다.
                  형사, 성범죄, 중대재해, 민사 분쟁의 든든한 법률 동반자가 되어 드리겠습니다.
                </p>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">1,500+</div>
                  <div className="text-xs text-slate-300 mt-1">승소 및 불기소 사례</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-blue-400">31기</div>
                  <div className="text-xs text-slate-300 mt-1">사법연수원 / 부장검사</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">24H</div>
                  <div className="text-xs text-slate-300 mt-1">긴급 영장·수사 대응</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={onOpenConsultModal}
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-base shadow-xl hover:shadow-amber-400/20 transition flex items-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  <span>지금 무료 법률상담 신청</span>
                </button>

                <Link
                  to="/lawyers"
                  className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition flex items-center space-x-2"
                >
                  <span>변호사진 프로필 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hero Right Visual / Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-slate-800/80 to-slate-900/90 rounded-2xl p-6 border border-slate-700/60 shadow-2xl backdrop-blur-md">
                <div className="flex items-center space-x-4 mb-5">
                  <div className="relative">
                    <img
                      src={ohSeYoung.image}
                      alt={ohSeYoung.name}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-amber-400/80 shadow"
                    />
                    <span className="absolute -bottom-2 -right-1 px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-bold rounded-full">
                      대표
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center">
                      오세영 <span className="text-sm font-normal text-amber-300 ml-1.5">대표변호사</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">전 서울중앙지검·남부지검 부장검사</p>
                    <p className="text-xs text-amber-400/90 font-medium">검찰총장 성범죄 공인전문검사 인증</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-700/80 pt-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>서울대학교 국제경제학과 졸업 (사시 41회)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>사법연수원 및 법무연수원 신임검사 지도교수</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>현 해양경찰청 고문변호사</span>
                  </div>
                </div>

                <div className="mt-5 p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/40 text-xs text-blue-200">
                  <p className="font-semibold text-white mb-1 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    수사 초기 골든타임 24시간 이내 확보
                  </p>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    경찰 첫 조사 입회부터 진술 교정, 압수수색 및 구속영장 청구 방어까지 철저히 보호합니다.
                  </p>
                </div>

                <Link
                  to="/lawyers/oh-se-young"
                  className="mt-4 block w-full text-center py-2.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold transition"
                >
                  오세영 대표변호사 상세 약력 확인 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Practice Areas Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase bg-amber-100/60 px-3 py-1 rounded-full">
              PRACTICE AREAS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 sm:text-4xl">
              전문 분야별 맞춤 법률 서비스
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              각 분야별 풍부한 승소 경험을 보유한 전담 변호사진이 밀착 조력합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRACTICE_AREAS.map((area) => (
              <div
                key={area.id}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-slate-100 transition duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-400 group-hover:text-slate-950 transition">
                    <Gavel className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition">
                    {area.title}
                  </h3>
                  <p className="text-xs text-amber-600 font-semibold mt-1">
                    {area.subtitle}
                  </p>
                  <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                    {area.description}
                  </p>

                  <ul className="mt-5 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                    {area.subItems.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4">
                  <Link
                    to="/practice-areas"
                    className="inline-flex items-center text-xs font-bold text-blue-900 hover:text-amber-600 transition"
                  >
                    <span>자세히 보기</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Representative Lawyer Highlight Banner */}
      <section className="py-20 bg-[#151e3f] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl overflow-hidden border-4 border-amber-400/40 shadow-2xl">
                  <img
                    src={ohSeYoung.image}
                    alt={ohSeYoung.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-amber-400/50 p-4 rounded-xl shadow-xl max-w-[220px]">
                  <p className="text-[11px] font-bold text-amber-300">검찰총장 공인전문검사</p>
                  <p className="text-xs text-white font-semibold mt-0.5">성범죄·형사 분야 공인</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
                  REPRESENTATIVE ATTORNEY
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  오세영 <span className="text-xl font-normal text-slate-300">대표변호사</span>
                </h2>
              </div>

              <blockquote className="text-lg italic text-amber-100/90 border-l-4 border-amber-400 pl-4 py-1">
                "{ohSeYoung.quote}"
              </blockquote>

              <p className="text-slate-300 text-sm leading-relaxed">
                {ohSeYoung.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
                  <h4 className="font-bold text-amber-300 text-sm mb-2">학력</h4>
                  {ohSeYoung.education.map((edu, idx) => (
                    <p key={idx} className="text-slate-300">{edu}</p>
                  ))}
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
                  <h4 className="font-bold text-amber-300 text-sm mb-2">주요 경력</h4>
                  <p className="text-slate-300">· 제41회 사법시험 합격 (연수원 31기)</p>
                  <p className="text-slate-300">· 전 서울중앙지검·남부지검·인천지검 부장검사</p>
                  <p className="text-slate-300">· 전 사법연수원 / 법무연수원 교수</p>
                  <p className="text-slate-300">· 현 해양경찰청 고문변호사</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/lawyers"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition"
                >
                  전체 변호사진 소개
                </Link>
                <button
                  onClick={onOpenConsultModal}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
                >
                  오세영 변호사 1:1 상담 예약
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Success Cases Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase bg-amber-100/60 px-3 py-1 rounded-full">
                CASE STUDIES
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2 sm:text-4xl">
                주요 승소 및 불기소 성공사례
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                결과로 증명하는 법무법인 행복한동행의 실제 해결 사례입니다.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {['all', '형사', '성범죄', '중대재해', '민사'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                    activeTab === tab
                      ? 'bg-blue-900 text-white shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab === 'all' ? '전체' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-amber-400/80 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
                      {item.result}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">담당: {item.lawyerName}</span>
                  <Link
                    to="/cases"
                    className="font-bold text-blue-900 hover:text-amber-600 flex items-center"
                  >
                    <span>사례 상세</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/cases"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow transition"
            >
              <span>성공사례 전체보기 ({SUCCESS_CASES.length}건)</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Media & Notice Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Media list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                    MEDIA & COLUMNS
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">언론보도 및 칼럼</h2>
                </div>
                <Link to="/media" className="text-xs font-semibold text-blue-900 hover:underline">
                  더보기 →
                </Link>
              </div>

              <div className="space-y-3">
                {NEWS_ARTICLES.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow transition flex flex-col justify-between"
                  >
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-amber-600">{article.source}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                      <span>·</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base hover:text-blue-900 transition">
                      <Link to="/media">{article.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consultation widget */}
            <div className="lg:col-span-5">
              <div className="bg-[#151e3f] text-white rounded-2xl p-8 shadow-xl border border-slate-700 space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                    FAST CONTACT
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    신속 온라인 법률상담
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    상담 내용을 간략히 남겨주시면 24시간 이내에 전담 변호사가 사건을 검토하여 전화 또는 문자로 상담을 진행합니다.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>모든 상담 내용은 변호사법상 비밀이 엄격히 보장됩니다.</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>대표 직통 : 02-583-6699 (야간/주말 당직)</span>
                  </div>
                </div>

                <button
                  onClick={onOpenConsultModal}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-sm shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>간편 상담 신청서 작성하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
