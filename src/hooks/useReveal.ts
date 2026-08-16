import { useEffect, useRef } from 'react';

/**
 * 진입 시 한 번만 켜지는 등장 모션.
 * 실제 트랜지션은 index.css 의 [data-reveal] 규칙이 담당하고,
 * 여기서는 화면에 들어온 순간 data-revealed 만 켠다.
 *
 * 요소에 data-reveal 속성이 있어야 하며, 컨테이너에 붙이면
 * 자식의 [data-reveal] 까지 순서대로(stagger) 켠다.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(stagger = 60) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.hasAttribute('data-reveal')
      ? [root]
      : Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (targets.length === 0) return;

    // 모션을 끈 사용자에게는 관찰 자체를 걸지 않는다.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.setAttribute('data-revealed', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const index = targets.indexOf(el);
          el.style.setProperty('--reveal-delay', `${Math.max(index, 0) * stagger}ms`);
          el.setAttribute('data-revealed', 'true');
          observer.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
};
