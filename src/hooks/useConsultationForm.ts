import { useState } from 'react';
import type { FormEvent } from 'react';
import { CONSULT_CATEGORIES, CONSULT_TIMES } from '../data/site';

export interface ConsultationFormState {
  name: string;
  phone: string;
  email: string;
  category: string;
  preferredTime: string;
  content: string;
  agreePrivacy: boolean;
}

const EMPTY: ConsultationFormState = {
  name: '',
  phone: '',
  email: '',
  category: CONSULT_CATEGORIES[0],
  preferredTime: CONSULT_TIMES[0],
  content: '',
  agreePrivacy: false,
};

/**
 * 상담 신청 폼의 상태·검증·제출을 담당한다.
 *
 * NOTE: 접수는 아직 프런트엔드에서만 처리된다. 실제 운영에서는
 * onSubmit 지점을 메일 발송 API(예: Cloudflare Pages Functions)로 연결해야 한다.
 */
export const useConsultationForm = () => {
  const [form, setForm] = useState<ConsultationFormState>(EMPTY);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = <K extends keyof ConsultationFormState>(
    key: K,
    value: ConsultationFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.content.trim()) {
      setError('성함, 연락처, 상담 내용을 입력해 주십시오.');
      return;
    }
    if (!form.agreePrivacy) {
      setError('개인정보 수집 및 이용에 동의하셔야 접수가 가능합니다.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const reset = () => {
    setForm(EMPTY);
    setError('');
    setIsSubmitted(false);
  };

  return { form, update, error, isSubmitting, isSubmitted, submit, reset };
};
