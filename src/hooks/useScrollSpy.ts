import { useEffect, useState } from 'react';

/**
 * 원페이지 내비의 현재 섹션 판별.
 *
 * IntersectionObserver 만으로는 섹션 높이가 제각각일 때 두 개가 동시에
 * 걸리며 하이라이트가 튄다. 그래서 교차 여부가 아니라
 * "고정 헤더 바로 아래 선을 지난 마지막 섹션"을 현재로 본다.
 */
export const useScrollSpy = (ids: readonly string[], offset = 96) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      // 문서 끝에 닿으면 마지막 섹션을 활성으로 — 짧은 마지막 섹션 보정
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        setActiveId(ids[ids.length - 1] ?? '');
        return;
      }

      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return activeId;
};
