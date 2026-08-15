import React, { useState } from 'react';
import { Send, Phone, ShieldCheck, Clock, CheckCircle2, HelpCircle, AlertCircle, FileText } from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '형사 / 수사대응',
    preferredTime: '가능한 빠른 시간',
    content: '',
    agreePrivacy: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.content.trim()) {
      setErrorMsg('성함, 연락처, 상담 내용을 필수 입력해 주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      setErrorMsg('개인정보 수집 및 이용에 동의해 주셔야 상담 접수가 진행됩니다.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      category: '형사 / 수사대응',
      preferredTime: '가능한 빠른 시간',
      content: '',
      agreePrivacy: true,
    });
    setIsSubmitted(false);
  };

  const faqs = [
    {
      q: '상담 내용은 정말 비밀이 보장되나요?',
      a: '네, 변호사법 제26조(비밀유지의무)에 따라 모든 상담 내용 및 개인정보는 철저히 비밀이 보장되며 법적으로 보호받습니다.',
    },
    {
      q: '경찰 첫 조사를 앞두고 있는데 언제 상담을 받아야 하나요?',
      a: '경찰 첫 피의자 신문 조사가 사건 전체의 기소 여부를 결정짓는 가장 중요한 분수령입니다. 조사 출석 전 반드시 변호사와 진술 방향을 점검하고 동행하는 것이 결정적으로 유리합니다.',
    },
    {
      q: '상담 비용은 어떻게 되나요?',
      a: '온라인 간편 상담 및 1차 유선 초기 진단 상담은 무료로 진행됩니다. 심층 대면 상담 및 사건 수임료는 사안의 난이도에 따라 투명하게 책정됩니다.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#151e3f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            FREE LEGAL CONSULTATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">온라인 무료상담</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            어려운 법률 문제, 혼자 고민하지 마시고 부장검사 출신 대표변호사와 전문 법률팀의 명쾌한 진단을 받아보세요.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">상담 신청이 완료되었습니다</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  담당 변호사가 접수된 내용을 면밀히 검토한 후 남겨주신 연락처로 신속히 연락드리겠습니다.
                </p>
                <div className="pt-6">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition shadow"
                  >
                    새로운 상담 신청하기
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">법률 상담 신청서</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    * 표시는 필수 입력 항목입니다.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      의뢰인 성함 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="성함을 입력해 주세요"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      연락처 (휴대전화) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      사건 상담 분야
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                    >
                      <option value="형사 / 수사대응">형사 / 수사대응</option>
                      <option value="성범죄 전담">성범죄 전담</option>
                      <option value="중대재해 / 산업안전">중대재해 / 산업안전</option>
                      <option value="민사 / 부동산 / 손해배상">민사 / 부동산 / 손해배상</option>
                      <option value="가사 / 상속 / 이혼">가사 / 상속 / 이혼</option>
                      <option value="행정처분 / 조세">행정처분 / 조세</option>
                      <option value="기업법무 / 기타">기업법무 / 기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      희망 상담 시간
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                    >
                      <option value="가능한 빠른 시간">가능한 빠른 시간</option>
                      <option value="오전 (09:00 ~ 12:00)">오전 (09:00 ~ 12:00)</option>
                      <option value="오후 (13:00 ~ 18:00)">오후 (13:00 ~ 18:00)</option>
                      <option value="야간 긴급 (18:00 이후)">야간 긴급 (18:00 이후)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    이메일 주소 (선택)
                  </label>
                  <input
                    type="email"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    상담 문의 내용 *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="사건의 발생 경위, 현재 수사나 소송 진행 단계, 가장 궁금하신 점을 상세히 기재해 주시면 더욱 정확한 상담이 가능합니다."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50 leading-relaxed"
                  ></textarea>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <label className="flex items-start space-x-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                      className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 border-slate-300"
                    />
                    <span className="font-semibold">
                      [필수] 개인정보 수집 및 이용 동의
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                    수집 항목: 성명, 연락처, 이메일, 상담 내용 / 이용 목적: 법률 상담 및 답변 안내 / 보유 기간: 법률상담 목적 달성 후 파기
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-slate-950 font-extrabold text-sm shadow-md transition flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>상담 접수 처리 중...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>무료 온라인 상담 신청 완료</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#151e3f] text-white p-7 rounded-2xl shadow-sm space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                DIRECT CALL
              </span>
              <h4 className="text-xl font-bold text-white">
                긴급 전화 상담
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                체포, 구속영장 청구 등 긴급한 사안은 전화로 문의하시면 당직 변호사가 즉시 조력합니다.
              </p>
              <a
                href="tel:02-583-6699"
                className="block text-center py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-lg hover:from-amber-300 transition shadow"
              >
                02-583-6699
              </a>
              <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                <p>• 평일 09:00 ~ 20:00</p>
                <p>• 야간 및 주말 24시 긴급 대응</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2" />
                행복한동행의 3대 안심 약속
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <span><strong>100% 비밀 보장</strong>: 의뢰인의 신원과 사건 내용은 철저히 보호됩니다.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <span><strong>변호사 직접 검토</strong>: 사무장이 아닌 담당 변호사가 직접 검토합니다.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <span><strong>신속한 피드백</strong>: 접수 즉시 신속하고 정확한 법리 분석을 제공합니다.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-blue-900" />
            <h3 className="text-xl font-bold text-slate-900">자주 묻는 법률상담 질문</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Q. {faq.q}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
