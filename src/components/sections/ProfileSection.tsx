import React from 'react';
import { PROFILE } from '../../data/profile';
import { Container, Label, Section, SectionHeader } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

/** 변호사 소개 — 서술 · 연표 · 인증 */
export const ProfileSection: React.FC = () => {
  const ref = useReveal<HTMLDivElement>(70);

  return (
    <Section id="profile" tone="sunken">
      <Container>
        <SectionHeader
          label="Profile"
          title={
            <>
              검사로 26년,
              <br />
              같은 눈으로 반대편에서 봅니다.
            </>
          }
        />

        <div ref={ref} className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* 서술 — 연표가 훨씬 길어 왼쪽이 비므로 붙잡아 둔다 */}
          <div data-reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div className="space-y-6">
              {PROFILE.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 12)} className="text-[15px] leading-[1.9] text-text-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <Label>Education</Label>
              <ul className="mt-4 space-y-2">
                {PROFILE.education.map((item) => (
                  <li key={item} className="text-[14px] leading-[1.7] text-text">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 연표 */}
          <div data-reveal className="lg:col-span-7">
            <Label>Career</Label>
            <div className="mt-6 border-t border-line-strong">
              {PROFILE.career.map((phase) => (
                <div
                  key={phase.label}
                  className="grid gap-3 border-b border-line py-7 sm:grid-cols-[180px_1fr] sm:gap-8"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-text">{phase.label}</p>
                    <p className="tabular mt-1 text-[12px] text-text-muted">{phase.period}</p>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="text-[14px] leading-[1.7] text-text-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 인증 · 위촉 */}
            <div className="mt-10">
              <Label>Credentials</Label>
              <dl className="mt-6 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
                {PROFILE.credentials.map((credential) => (
                  <div key={credential.title} className="bg-sunken px-5 py-6 sm:first:pl-0">
                    <dt className="tabular text-[12px] font-medium text-accent">
                      {credential.year}
                    </dt>
                    <dd className="mt-2 text-[15px] leading-[1.5] font-medium text-text">
                      {credential.title}
                      {credential.issuer && (
                        <span className="mt-1 block text-[13px] font-normal text-text-muted">
                          {credential.issuer}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
