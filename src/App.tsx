import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { MobileCallBar } from './components/MobileCallBar';
import { Landing } from './pages/Landing';
import { CaseArchive } from './pages/CaseArchive';
import { CaseDetail } from './pages/CaseDetail';
import { InsightDetail } from './pages/InsightDetail';

type BackgroundState = { background?: Location } | null;

/**
 * 페이지 이동 시 스크롤 위치 정리.
 * 원페이지 구조라 해시 처리가 본체다. 고정 헤더에 표제가 가리지 않도록
 * scroll-margin-top 을 index.css 에서 주고, 여기서는 대상만 찾아 보낸다.
 * 오버레이가 열릴 때는 배경이 그대로 있어야 하므로 아무것도 하지 않는다.
 */
const ScrollManager: React.FC<{ overlayOpen: boolean }> = ({ overlayOpen }) => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (overlayOpen) return;

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, search, overlayOpen]);

  return null;
};

export const App: React.FC = () => {
  const location = useLocation();
  const background = (location.state as BackgroundState)?.background;

  // 목록에서 열었으면 배경을, 주소로 직접 들어왔으면 현재 위치를 밑그림으로 쓴다
  const baseLocation = background ?? location;
  const showsLanding =
    baseLocation.pathname === '/' || baseLocation.pathname.startsWith('/insights/');

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <ScrollManager overlayOpen={Boolean(background)} />
      {/* 밑그림이 랜딩(어두운 히어로)이면 헤더를 겹쳐 띄우고, 아카이브면 흰 배경으로 고정한다 */}
      <SiteHeader variant={showsLanding ? 'overlay' : 'solid'} />

      <main className="flex-1">
        <Routes location={baseLocation}>
          <Route path="/" element={<Landing />} />
          <Route path="/cases" element={<CaseArchive />} />

          {/* 주소로 직접 들어온 상세 — 밑그림을 깔고 그 위에 오버레이를 얹는다.
              목록에서 연 경우엔 baseLocation 이 배경이라 이 두 줄은 타지 않는다. */}
          <Route path="/cases/:id" element={<CaseArchive />} />
          <Route path="/insights/:id" element={<Landing />} />

          {/* 기존 법인 사이트 주소 호환 */}
          <Route path="/kwa-gallery_member_v-6" element={<Navigate to="/" replace />} />
          <Route path="/kwa-gallery_member" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <SiteFooter />
      <MobileCallBar />

      {/* 오버레이 — 현재 위치 기준으로 항상 판정한다 */}
      <Routes>
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/insights/:id" element={<InsightDetail />} />
      </Routes>
    </div>
  );
};

export default App;
