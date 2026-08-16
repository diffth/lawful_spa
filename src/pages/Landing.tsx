import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Cases } from '../components/sections/Cases';
import { ProfileSection } from '../components/sections/ProfileSection';
import { Principles } from '../components/sections/Principles';
import { Practice } from '../components/sections/Practice';
import { Insights } from '../components/sections/Insights';
import { Process } from '../components/sections/Process';
import { Checklist } from '../components/sections/Checklist';
import { Contact } from '../components/sections/Contact';

/**
 * 원페이지 랜딩.
 * 순서는 설득의 순서다 — 자격 → 실적 → 사람 → 방식 → 분야 → 생각 → 절차 → 검증 → 상담.
 */
export const Landing: React.FC = () => (
  <>
    <Hero />
    <Cases />
    <ProfileSection />
    <Principles />
    <Practice />
    <Insights />
    <Process />
    <Checklist />
    <Contact />
  </>
);
