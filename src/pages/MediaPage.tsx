import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/news';
import { Newspaper, Video, BookOpen, Bell, ExternalLink, Eye, Calendar } from 'lucide-react';

export const MediaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 보기', icon: Newspaper },
    { id: '언론보도', label: '언론보도', icon: Newspaper },
    { id: '칼럼', label: '전문가 칼럼', icon: BookOpen },
    { id: '영상', label: '유튜브/영상', icon: Video },
    { id: '공지사항', label: '공지사항', icon: Bell },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-[#151e3f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            MEDIA & INSIGHTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">언론보도 및 칼럼</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            법무법인 행복한동행의 주요 언론 보도, 법률 칼럼 및 최신 소식을 확인하실 수 있습니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Media Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg border border-slate-200 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="px-2.5 py-1 rounded-md font-bold bg-amber-100 text-amber-900">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {article.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      {article.views}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 hover:text-blue-900 transition leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">출처: {article.source}</span>
                <span className="font-bold text-blue-900 flex items-center hover:underline cursor-pointer">
                  <span>전문 보기</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
