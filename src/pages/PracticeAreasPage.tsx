import React, { useState } from 'react';
import { PRACTICE_AREAS } from '../data/practiceAreas';
import { Gavel, CheckCircle2, ArrowRight, ShieldCheck, FileCheck, Phone } from 'lucide-react';

interface PracticeAreasPageProps {
  onOpenConsultModal: () => void;
}

export const PracticeAreasPage: React.FC<PracticeAreasPageProps> = ({ onOpenConsultModal }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(PRACTICE_AREAS[0].id);

  const selectedArea = PRACTICE_AREAS.find((a) => a.id === selectedAreaId) || PRACTICE_AREAS[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#151e3f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            PRACTICE AREAS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">주요 업무분야</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            부장검사 출신 대표변호사와 각 분야 전문 변호사진이 사건 유형별 최적화된 전략을 수립합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Area Navigation Tabs */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              분야 선택
            </h3>
            {PRACTICE_AREAS.map((area) => {
              const isSelected = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`w-full text-left p-4 rounded-xl font-bold text-sm transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Gavel className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{area.title}</span>
                  </div>
                  <span className={`text-xs ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                    {area.category}
                  </span>
                </button>
              );
            })}

            {/* Quick Banner on sidebar */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/20 border border-amber-400/40 text-slate-900 mt-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase">24시 야간 당직제</span>
                <h4 className="font-extrabold text-base mt-0.5">긴급 영장 및 수사대응</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                체포·압수수색 등 긴급 상황 발생 시 24시간 즉시 출동 및 진술 입회를 지원합니다.
              </p>
              <a
                href="tel:02-583-6699"
                className="block text-center py-2.5 bg-blue-950 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition shadow"
              >
                02-583-6699 직통 연결
              </a>
            </div>
          </div>

          {/* Right Detailed Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-8">
              {/* Header */}
              <div className="border-b border-slate-100 pb-6">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-extrabold bg-amber-100 text-amber-900 mb-2">
                  {selectedArea.category} 전문센터
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedArea.title}
                </h2>
                <p className="text-sm font-semibold text-blue-900 mt-1">
                  {selectedArea.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                  {selectedArea.description}
                </p>
              </div>

              {/* Sub items */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center">
                  <FileCheck className="w-4 h-4 mr-2 text-blue-900" />
                  주요 취급 세부 사건
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedArea.subItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center space-x-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" />
                  행복한동행만의 특화 강점
                </h4>
                <div className="space-y-2.5">
                  {selectedArea.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-950 flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                <p className="text-xs text-slate-500">
                  사건의 본질을 정확히 진단해 드릴 전담 변호사와 지금 상담해 보세요.
                </p>
                <button
                  onClick={onOpenConsultModal}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition"
                >
                  {selectedArea.title} 무료 상담 접수
                </button>
              </div>
            </div>

            {/* Defense Process Steps */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-6">
                법무법인 행복한동행의 체계적인 4단계 사건 해결 프로세스
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                    STEP 01
                  </span>
                  <h5 className="font-bold text-slate-900 mt-2">1:1 심층 상담</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    변호사 직접 사실관계 분석 및 법리 검토
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                    STEP 02
                  </span>
                  <h5 className="font-bold text-slate-900 mt-2">전담 TF 구성</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    대표변호사 지휘 하에 맞춤 방어 전략 수립
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                    STEP 03
                  </span>
                  <h5 className="font-bold text-slate-900 mt-2">수사 및 재판 동행</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    조사 입회, 증거 수집 및 정밀 서면 제출
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                    STEP 04
                  </span>
                  <h5 className="font-bold text-slate-900 mt-2">최적의 결과 도출</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    불기소, 무죄, 승소 판결 및 사후 관리
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
