import React, { useState } from 'react';
import { SUCCESS_CASES } from '../data/cases';
import { Search, CheckCircle2, ChevronRight, Award, Gavel, Calendar } from 'lucide-react';

interface SuccessCasesPageProps {
  onOpenConsultModal: () => void;
}

export const SuccessCasesPage: React.FC<SuccessCasesPageProps> = ({ onOpenConsultModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(SUCCESS_CASES[0].id);

  const categories = ['all', '형사', '성범죄', '중대재해', '민사', '가사', '행정'];

  const filteredCases = SUCCESS_CASES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesKeyword =
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.result.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  const activeCase = SUCCESS_CASES.find((c) => c.id === selectedCaseId) || filteredCases[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#151e3f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            SUCCESS STORIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">주요 성공사례</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            의뢰인의 억울함을 풀고 권리를 지켜낸 법무법인 행복한동행의 실제 판결 및 처분 결과입니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Search & Category Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? '전체 분야' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="사례 키워드 검색 (예: 무죄, 사기)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50 transition"
            />
          </div>
        </div>

        {/* Content Layout: Left List + Right Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Case List */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs text-slate-500 font-semibold px-1">
              검색 결과: 총 {filteredCases.length}건
            </p>

            {filteredCases.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                검색 조건에 맞는 성공사례가 없습니다.
              </div>
            ) : (
              filteredCases.map((item) => {
                const isSelected = activeCase?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCaseId(item.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition duration-200 bg-white ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{item.date}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-2">
                      {item.title}
                    </h4>

                    <div className="inline-block px-2.5 py-0.5 rounded text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
                      {item.result}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>담당: {item.lawyerName}</span>
                      <span className="text-blue-900 font-bold flex items-center">
                        상세 보기 <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Case Deep Dive */}
          {activeCase && (
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200 sticky top-28 space-y-6">
              <div className="border-b border-slate-100 pb-6 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-md text-xs font-extrabold bg-blue-900 text-amber-300">
                    {activeCase.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {activeCase.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {activeCase.title}
                </h3>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">
                    최종 법원/검찰 결과
                  </span>
                  <p className="text-lg font-black text-emerald-950">
                    {activeCase.result}
                  </p>
                </div>
              </div>

              {/* Case Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  사건 개요 및 쟁점
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {activeCase.summary}
                </p>
              </div>

              {/* Key points & Defence strategy */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center">
                  <Award className="w-4 h-4 text-amber-500 mr-1.5" />
                  행복한동행 전담팀의 핵심 변호 전략
                </h4>
                <div className="space-y-2">
                  {activeCase.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-950 flex items-start space-x-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-semibold">
                  담당 변호인 : {activeCase.lawyerName}
                </span>

                <button
                  onClick={onOpenConsultModal}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition"
                >
                  비슷한 사건 1:1 비밀상담 신청
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
