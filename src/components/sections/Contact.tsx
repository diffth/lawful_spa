import React, { useState } from 'react';
import clsx from 'clsx';
import { CONSULT_CATEGORIES, CONSULT_TIMES, FAQS, SITE } from '../../data/site';
import { useConsultationForm } from '../../hooks/useConsultationForm';
import { Container, Label, Section, fieldClass, labelClass } from '../primitives';
import { useReveal } from '../../hooks/useReveal';

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-white/10">
      {FAQS.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.q} className="border-b border-white/10">
            <h4>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="text-[15px] leading-[1.6] font-medium text-on-ink">
                  {faq.q}
                </span>
                <span
                  className={clsx(
                    'mt-0.5 shrink-0 text-[16px] leading-none text-on-ink-soft transition-transform duration-200',
                    open && 'rotate-45',
                  )}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h4>
            {open && (
              <p className="pb-6 text-[14px] leading-[1.85] text-on-ink-soft">{faq.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Contact: React.FC = () => {
  const { form, update, error, isSubmitting, isSubmitted, submit, reset } =
    useConsultationForm();
  const ref = useReveal<HTMLDivElement>(80);

  return (
    <Section id="contact" tone="ink">
      <Container>
        <div ref={ref} className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          {/* 연락처 · FAQ */}
          <div data-reveal className="lg:col-span-5">
            <Label tone="ink">Contact</Label>
            <h2 className="mt-4 text-[28px] leading-[1.25] font-semibold tracking-[-0.035em] sm:text-[36px]">
              출석 통보를 받으셨다면
              <br />
              오늘 연락 주십시오.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-on-ink-soft">
              첫 조사 전에 정리할 수 있는 것과 조사 후에 되돌려야 하는 것의 차이는 큽니다.
              상담만 받고 선임하지 않으셔도 비밀유지의무는 동일하게 적용됩니다.
            </p>

            <a
              href={SITE.telHref}
              className="tabular mt-9 block text-[34px] leading-none font-semibold tracking-[-0.035em] transition-colors hover:text-accent-ink sm:text-[40px]"
            >
              {SITE.tel}
            </a>
            <p className="mt-3 text-[13px] text-on-ink-soft">
              {SITE.hours} · {SITE.hoursNote}
            </p>

            <dl className="mt-10 space-y-4 border-t border-white/10 pt-8 text-[14px]">
              <div className="flex gap-6">
                <dt className="w-16 shrink-0 text-on-ink-soft">사무실</dt>
                <dd className="leading-[1.7]">
                  {SITE.address}
                  <span className="mt-1 block text-[13px] text-on-ink-soft">
                    {SITE.landmark}
                  </span>
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-16 shrink-0 text-on-ink-soft">이메일</dt>
                <dd className="tabular">{SITE.email}</dd>
              </div>
            </dl>

            <div className="mt-12">
              <Label tone="ink">FAQ</Label>
              <div className="mt-6">
                <Faq />
              </div>
            </div>
          </div>

          {/* 상담 신청서 */}
          <div data-reveal className="lg:col-span-7">
            <div className="border border-white/10 bg-ink-2 p-6 sm:p-10">
              {isSubmitted ? (
                <div className="py-16 text-center">
                  <p className="text-[20px] font-semibold">상담 신청이 접수되었습니다</p>
                  <p className="mt-4 text-[14px] leading-[1.85] text-on-ink-soft">
                    영업일 기준 24시간 이내에 담당 변호사가 직접 연락드립니다.
                    <br />
                    긴급한 사안이면 {SITE.tel} 로 바로 전화 주십시오.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 border border-white/25 px-6 py-3 text-[14px] font-medium transition-colors hover:border-white/70 hover:bg-white/10"
                  >
                    새로 작성하기
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <p className="text-[18px] font-semibold">상담 신청서</p>
                  <p className="mt-2 text-[13px] text-on-ink-soft">
                    365일 24시간 접수됩니다. 변호사가 직접 확인합니다.
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="contact-name">
                        성함 <span className="text-accent-ink">*</span>
                      </label>
                      <input
                        id="contact-name"
                        className={fieldClass}
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="홍길동"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="contact-phone">
                        연락처 <span className="text-accent-ink">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        className={fieldClass}
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="010-0000-0000"
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="contact-category">
                        사건 분야
                      </label>
                      <select
                        id="contact-category"
                        className={clsx(fieldClass, 'appearance-none')}
                        value={form.category}
                        onChange={(e) => update('category', e.target.value)}
                      >
                        {CONSULT_CATEGORIES.map((option) => (
                          <option key={option} value={option} className="bg-ink-2">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="contact-time">
                        통화 가능 시간
                      </label>
                      <select
                        id="contact-time"
                        className={clsx(fieldClass, 'appearance-none')}
                        value={form.preferredTime}
                        onChange={(e) => update('preferredTime', e.target.value)}
                      >
                        {CONSULT_TIMES.map((option) => (
                          <option key={option} value={option} className="bg-ink-2">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass} htmlFor="contact-email">
                        이메일 (선택)
                      </label>
                      <input
                        id="contact-email"
                        className={fieldClass}
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="name@example.com"
                        inputMode="email"
                        autoComplete="email"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass} htmlFor="contact-content">
                        사건 개요 <span className="text-accent-ink">*</span>
                      </label>
                      <textarea
                        id="contact-content"
                        rows={6}
                        className={clsx(fieldClass, 'resize-y')}
                        value={form.content}
                        onChange={(e) => update('content', e.target.value)}
                        placeholder="현재 어느 단계인지(출석 통보, 조사 완료, 기소 등)와 사실관계를 아시는 범위에서 적어 주십시오."
                      />
                    </div>
                  </div>

                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-[13px] leading-[1.7] text-on-ink-soft">
                    <input
                      type="checkbox"
                      checked={form.agreePrivacy}
                      onChange={(e) => update('agreePrivacy', e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#2f6bff]"
                    />
                    <span>
                      상담 접수를 위한 개인정보(성함·연락처·상담 내용) 수집 및 이용에
                      동의합니다. 수집된 정보는 상담 목적에만 사용되며, 변호사법 제26조에 따라
                      보호됩니다.
                    </span>
                  </label>

                  {error && (
                    <p role="alert" className="mt-5 text-[13px] text-accent-ink">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-7 w-full bg-white px-7 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? '접수 중…' : '상담 신청서 보내기'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
