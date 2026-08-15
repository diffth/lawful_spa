import React, { useState } from 'react';
import { X, CheckCircle2, Phone, AlertCircle, Send } from 'lucide-react';

interface QuickConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickConsultModal: React.FC<QuickConsultModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '형사/수사대응',
    preferredTime: '가능한 빠른 시간',
    content: '',
    agree: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.content.trim()) {
      setErrorMsg('이름, 연락처, 상담 내용을 모두 입력해 주세요.');
      return;
    }
    if (!formData.agree) {
      setErrorMsg('개인정보 수집 및 이용에 동의하셔야 상담 접수가 가능합니다.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate fast dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      category: '형사/수사대응',
      preferredTime: '가능한 빠른 시간',
      content: '',
      agree: true,
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#151e3f] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              1:1 비밀보장 긴급 법률상담
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">무료 상담 신청</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">상담 신청이 접수되었습니다</h4>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                대표변호사 및 전담 법률팀이 내용을 검토한 후 기재해주신 연락처로 신속히 연락드리겠습니다.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-[#151e3f] hover:bg-blue-900 text-white font-semibold rounded-xl transition shadow"
                >
                  확인 및 닫기
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    의뢰인 성함 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    사건 분야
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white transition"
                  >
                    <option value="형사/수사대응">형사 / 수사대응</option>
                    <option value="성범죄 전담">성범죄 전담</option>
                    <option value="중대재해/산재">중대재해 / 산재</option>
                    <option value="민사/부동산">민사 / 부동산</option>
                    <option value="가사/이혼/상속">가사 / 이혼 / 상속</option>
                    <option value="행정처분/조세">행정처분 / 조세</option>
                    <option value="기업법무/기타">기업법무 / 기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    희망 상담 시간
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white transition"
                  >
                    <option value="가능한 빠른 시간">가능한 빠른 시간</option>
                    <option value="오전 (09:00 ~ 12:00)">오전 (09:00 ~ 12:00)</option>
                    <option value="오후 (13:00 ~ 18:00)">오후 (13:00 ~ 18:00)</option>
                    <option value="야간 긴급 (18:00 이후)">야간 긴급 (18:00 이후)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  사건 요약 및 상담 문의 내용 *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="예: 경찰에서 출석 요구를 받았습니다. 혐의 내용과 향후 대응 방안에 대해 긴급히 상담받고 싶습니다."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                ></textarea>
              </div>

              <div className="pt-1">
                <label className="flex items-start space-x-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 border-slate-300"
                  />
                  <span>[필수] 개인정보 수집 및 이용(상담 회신 목적)에 동의합니다.</span>
                </label>
              </div>

              <div className="pt-3 flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>접수 처리 중...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>무료 상담 접수하기</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <a
                  href="tel:02-583-6699"
                  className="inline-flex items-center text-xs text-blue-900 font-bold hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 mr-1 text-amber-500" />
                  긴급할 땐 대표 직통 전화 : 02-583-6699
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
