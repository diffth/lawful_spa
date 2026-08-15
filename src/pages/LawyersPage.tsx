import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LAWYERS } from '../data/lawyers';
import { Award, BookOpen, Shield, ChevronRight, Phone, Mail } from 'lucide-react';

interface LawyersPageProps {
  onOpenConsultModal: () => void;
}

export const LawyersPage: React.FC<LawyersPageProps> = ({ onOpenConsultModal }) => {
  const [filter, setFilter] = useState<'all' | 'representative' | 'partner'>('all');

  const filteredLawyers = filter === 'all'
    ? LAWYERS
    : LAWYERS.filter((l) => l.role === filter);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#151e3f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            ATTORNEY PROFILE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">변호사 소개</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            부장검사 및 사법연수원 교수 출신을 비롯한 각 분야 전문 변호사진이 탁월한 실력과 헌신으로 함께합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Filter Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
              filter === 'all'
                ? 'bg-blue-950 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            전체 변호사진 ({LAWYERS.length})
          </button>
          <button
            onClick={() => setFilter('representative')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
              filter === 'representative'
                ? 'bg-blue-950 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            대표변호사
          </button>
          <button
            onClick={() => setFilter('partner')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
              filter === 'partner'
                ? 'bg-blue-950 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            파트너변호사
          </button>
        </div>

        {/* Lawyer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition duration-300 flex flex-col"
            >
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                {/* Photo */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="relative w-40 h-52 sm:w-44 sm:h-56 rounded-xl overflow-hidden shadow border border-slate-200">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-blue-900 text-amber-400 text-[10px] font-bold rounded">
                      {lawyer.title}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      {lawyer.role === 'representative' ? '대표변호사' : '파트너변호사'}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 flex items-center">
                      {lawyer.name} <span className="text-sm font-semibold text-slate-500 ml-2">{lawyer.title}</span>
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border-l-2 border-amber-400">
                    "{lawyer.quote}"
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p className="font-bold text-blue-950">▣ 주요 학력 및 경력</p>
                    <ul className="space-y-1 text-slate-600 pl-2">
                      {lawyer.career.slice(0, 4).map((c, i) => (
                        <li key={i} className="truncate">• {c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-blue-950 mb-1.5">▣ 전문 분야</p>
                    <div className="flex flex-wrap gap-1.5">
                      {lawyer.specialties.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-100"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-auto px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/lawyers/${lawyer.id}`}
                  className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center"
                >
                  <span>상세 프로필 보기</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>

                <button
                  onClick={onOpenConsultModal}
                  className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition"
                >
                  1:1 상담 신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
