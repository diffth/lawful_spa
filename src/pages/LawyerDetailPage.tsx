import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LAWYERS } from '../data/lawyers';
import { Award, BookOpen, Shield, ChevronLeft, Phone, Mail, CheckCircle2, MessageSquare } from 'lucide-react';

interface LawyerDetailPageProps {
  onOpenConsultModal: () => void;
}

export const LawyerDetailPage: React.FC<LawyerDetailPageProps> = ({ onOpenConsultModal }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const lawyer = LAWYERS.find((l) => l.id === id) || LAWYERS[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#151e3f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/lawyers')}
            className="inline-flex items-center text-xs text-amber-300 hover:text-amber-200 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>변호사 목록으로 돌아가기</span>
          </button>
          <h1 className="text-3xl font-extrabold">{lawyer.name} {lawyer.title} 프로필</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Top Profile Card matching kwa-gallery_member_v-6 */}
          <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-200 bg-gradient-to-b from-slate-50/60 to-white">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  {lawyer.role === 'representative' ? '대표변호사' : '파트너변호사'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151e3f] mt-1">
                  {lawyer.name} <span className="text-xl font-normal text-slate-500">{lawyer.title}</span>
                </h2>
              </div>

              <blockquote className="text-base italic text-slate-700 bg-amber-50/60 p-4 rounded-xl border-l-4 border-amber-400">
                "{lawyer.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lawyer.summary}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOpenConsultModal}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-slate-950 font-bold text-xs shadow-md transition flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lawyer.name} 변호사 직접 상담 예약</span>
                </button>
                <a
                  href="tel:02-583-6699"
                  className="px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>전화 상담 : 02-583-6699</span>
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Tables matching reference structure */}
          <div className="p-8 sm:p-12 space-y-10">
            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center border-l-4 border-blue-900 pl-3">
                ▣ 학력
              </h3>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <ul className="space-y-2 text-sm text-slate-700">
                  {lawyer.education.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Career */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center border-l-4 border-blue-900 pl-3">
                ▣ 주요 경력
              </h3>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  {lawyer.career.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center border-l-4 border-blue-900 pl-3">
                ▣ 전문 분야
              </h3>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {lawyer.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-blue-900 border border-slate-200 shadow-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
