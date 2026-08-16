import { useEffect } from 'react';

/**
 * 오버레이·모바일 시트가 열려 있는 동안 배경 스크롤을 잠근다.
 * 스크롤바가 사라지며 생기는 가로 밀림을 padding 으로 보정한다.
 */
export const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [locked]);
};
