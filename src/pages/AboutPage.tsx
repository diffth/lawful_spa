import React from 'react';
import { Scale, ShieldCheck, HeartHandshake, Award, MapPin, Phone, Mail, Navigation, Car, Train } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Subpage Header Banner */}
      <div className="bg-[#151e3f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            ABOUT LAW FIRM
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">법무법인 소개</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            전문성과 진정성으로 의뢰인의 가장 어려운 순간에 든든한 동반자가 되어 드립니다.
          </p>
        </div>
      </div>

      {/* Greeting Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              GREETING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              "의뢰인의 권리와 명예를 지키는 가장 든든한 울타리가 되겠습니다."
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              안녕하십니까, <strong>법무법인 행복한동행</strong>을 찾아주신 여러분을 진심으로 환영합니다.
            </p>
            <p>
              살아가며 예기치 않게 마주하는 법률적 갈등과 형사적 수사는 개인의 일상과 기업의 존립을 송두리째 뒤흔들 수 있는 중대한 위기입니다. 
              이러한 위기의 순간, 의뢰인에게 가장 절실한 것은 <strong>냉철한 법리 분석과 따뜻한 공감, 그리고 흔들림 없는 승소의 추진력</strong>입니다.
            </p>
            <p>
              법무법인 행복한동행은 <strong>부장검사 및 사법연수원 교수 출신의 오세영 대표변호사</strong>와 <strong>민사·기업 전문 노정환 대표변호사</strong>를 중심으로, 
              각 분야 최고의 전문 역량을 갖춘 변호사진이 팀을 이루어 유기적으로 협력하고 있습니다.
            </p>
            <p>
              저희는 사건을 단순한 사무로 대하지 않습니다. 의뢰인 한 분 한 분의 억울함과 고민에 깊이 공감하며, 
              수사 초기 단계부터 대법원 상고심에 이르기까지 타협 없는 열정으로 최상의 해결책을 찾아냅니다.
            </p>
            <p className="font-semibold text-slate-900 pt-4">
              의뢰인의 밝은 내일을 향한 길, 법무법인 행복한동행이 끝까지 함께하겠습니다.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end items-center space-x-6 text-sm text-slate-800">
            <div>
              <span className="text-xs text-slate-500 block">법무법인 행복한동행</span>
              <span className="font-bold text-base">대표변호사 노정환 · 오세영</span>
            </div>
          </div>
        </div>

        {/* 4 Core Principles */}
        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              CORE VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              행복한동행의 4대 핵심 가치
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">압도적인 전문성과 실무 노하우</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  부장검사 및 사법연수원 교수 출신을 비롯한 각 분야 전문 변호사진이 수사기관과 법원의 생리를 정확히 꿰뚫어 대응합니다.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">수사 초기 24시간 긴급 대응</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  영장실질심사, 압수수색, 첫 경찰 조사 등 사건 승패를 가르는 골든타임에 변호사가 즉시 현장에 동행합니다.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">의뢰인 중심 맞춤형 전담제</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  사무장이 아닌 담당 변호사가 직접 1:1로 의뢰인과 소통하며 모든 서면을 꼼꼼하게 검토하고 작성합니다.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">철저한 비밀보장 및 신뢰</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  모든 상담 내역과 사건 기록은 철저한 보안 시스템 하에 비밀이 유지되며 의뢰인의 명예를 최우선으로 보호합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Directions / Map Section */}
        <div id="directions" className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-8">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              LOCATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              오시는 길
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              지하철 2·3호선 교대역 8번 출구 바로 앞 로이어즈타워 6층에 위치해 있습니다.
            </p>
          </div>

          {/* Interactive Map card / Simulation */}
          <div className="h-64 sm:h-80 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center">
            <div className="text-center p-6 space-y-3 z-10">
              <div className="w-12 h-12 rounded-full bg-blue-900 text-amber-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                법무법인 행복한동행 (로이어즈타워 602호)
              </h4>
              <p className="text-xs text-slate-600">
                서울특별시 서초구 서초중앙로 125 (서초동 1714-21)
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <a
                  href="https://map.naver.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
                >
                  네이버 지도 길찾기
                </a>
                <a
                  href="https://map.kakao.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-bold transition shadow"
                >
                  카카오맵 길찾기
                </a>
              </div>
            </div>
            {/* Background grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* Transportation info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 font-bold text-blue-900 text-sm">
                <Train className="w-4 h-4 text-blue-600" />
                <span>지하철 이용 시</span>
              </div>
              <p className="text-slate-600">
                <strong>2호선 / 3호선 교대역</strong> 8번 출구로 나오신 후 도보 10m (로이어즈타워 본관 602호)
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 font-bold text-blue-900 text-sm">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>버스 이용 시</span>
              </div>
              <p className="text-slate-600">
                '교대역' 또는 '서울중앙지방법원·검찰청' 정류장 하차 (간선 144, 740, 지선 5413, 3420 등)
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 font-bold text-blue-900 text-sm">
                <Car className="w-4 h-4 text-blue-600" />
                <span>자가용 / 주차 안내</span>
              </div>
              <p className="text-slate-600">
                내비게이션에 <strong>'로이어즈타워'</strong> 검색 후 건물 지하 주차장 이용 (상담 시 무료 주차권 지원)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
