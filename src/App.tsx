import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickConsultModal } from './components/QuickConsultModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LawyersPage } from './pages/LawyersPage';
import { LawyerDetailPage } from './pages/LawyerDetailPage';
import { PracticeAreasPage } from './pages/PracticeAreasPage';
import { SuccessCasesPage } from './pages/SuccessCasesPage';
import { MediaPage } from './pages/MediaPage';
import { ConsultationPage } from './pages/ConsultationPage';

// Scroll to top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const handleOpenModal = () => setIsConsultModalOpen(true);
  const handleCloseModal = () => setIsConsultModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <ScrollToTop />
      <Navbar onOpenConsultModal={handleOpenModal} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenConsultModal={handleOpenModal} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/lawyers" element={<LawyersPage onOpenConsultModal={handleOpenModal} />} />
          <Route path="/lawyers/:id" element={<LawyerDetailPage onOpenConsultModal={handleOpenModal} />} />
          <Route path="/practice-areas" element={<PracticeAreasPage onOpenConsultModal={handleOpenModal} />} />
          <Route path="/cases" element={<SuccessCasesPage onOpenConsultModal={handleOpenModal} />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          {/* Legacy / alias redirects */}
          <Route path="/kwa-gallery_member_v-6" element={<Navigate to="/lawyers/oh-se-young" replace />} />
          <Route path="/kwa-gallery_member" element={<Navigate to="/lawyers" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Quick Consultation Popup Modal */}
      <QuickConsultModal
        isOpen={isConsultModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
