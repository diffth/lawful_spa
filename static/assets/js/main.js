/* ------------------------------------------------------------------
   오세영 변호사 개인 홈페이지 — 동작.

   React 판의 훅 · 컴포넌트 로직을 그대로 옮겼다.
   화면 구조는 HTML 에, 조판은 CSS 에 있고 여기에는 상태만 둔다.
------------------------------------------------------------------- */

(function () {
  'use strict';

  var $ = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  var $$ = function (selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  };

  var PAGE = document.body.getAttribute('data-page'); // 'landing' | 'archive'
  var DATA = window.CASE_DATA;

  /* ================================================================
     배경 스크롤 잠금
     오버레이 · 모바일 시트가 열려 있는 동안 배경을 잠근다.
     스크롤바가 사라지며 생기는 가로 밀림을 padding 으로 보정한다.
  ================================================================= */

  var lockCount = 0;
  var prevOverflow = '';
  var prevPadding = '';

  function lockScroll() {
    lockCount += 1;
    if (lockCount > 1) return;

    var body = document.body;
    prevOverflow = body.style.overflow;
    prevPadding = body.style.paddingRight;

    var scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = scrollbar + 'px';
  }

  function unlockScroll() {
    if (lockCount === 0) return;
    lockCount -= 1;
    if (lockCount > 0) return;

    document.body.style.overflow = prevOverflow;
    document.body.style.paddingRight = prevPadding;
  }

  /* ================================================================
     진입 모션 — 화면에 들어온 순간 data-revealed 만 켠다.
     실제 트랜지션은 style.css 의 [data-reveal] 규칙이 담당한다.
  ================================================================= */

  function initReveal() {
    var roots = $$('[data-reveal-root]');
    var reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    roots.forEach(function (root) {
      var stagger = parseInt(root.getAttribute('data-stagger') || '60', 10);
      var targets = root.hasAttribute('data-reveal')
        ? [root]
        : $$('[data-reveal]', root);

      if (targets.length === 0) return;

      // 모션을 끈 사용자에게는 관찰 자체를 걸지 않는다.
      if (reduced || !('IntersectionObserver' in window)) {
        targets.forEach(function (el) {
          el.setAttribute('data-revealed', 'true');
        });
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var index = targets.indexOf(el);
            el.style.setProperty('--reveal-delay', Math.max(index, 0) * stagger + 'ms');
            el.setAttribute('data-revealed', 'true');
            observer.unobserve(el);
          });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
      );

      targets.forEach(function (el) {
        observer.observe(el);
      });
    });
  }

  /* ================================================================
     상단 고정 내비
     랜딩에서는 어두운 히어로 위에 겹쳐 뜨고, 스크롤하면 흰 배경으로 바뀐다.
  ================================================================= */

  function initHeader() {
    var header = $('.site-header');
    if (!header) return;

    var progress = $('.site-header__progress', header);
    var toggle = $('.menu-toggle', header);
    var sheet = $('.mobile-sheet');
    var overlayVariant = header.getAttribute('data-variant') === 'overlay';
    var menuOpen = false;
    var scrolled = false;

    function applyInverted() {
      var inverted = overlayVariant && !scrolled && !menuOpen;
      header.classList.toggle('is-inverted', inverted);
    }

    function onScroll() {
      scrolled = window.scrollY > 24;
      var max = document.body.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progress) progress.style.transform = 'scaleX(' + ratio + ')';
      applyInverted();
    }

    function setMenu(open) {
      menuOpen = open;
      if (sheet) sheet.classList.toggle('is-open', open);
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      }
      if (open) lockScroll();
      else unlockScroll();
      applyInverted();
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        setMenu(!menuOpen);
      });
    }

    // 어떤 경로로 이동하든 열려 있던 시트는 닫는다
    if (sheet) {
      $$('a', sheet).forEach(function (link) {
        link.addEventListener('click', function () {
          if (menuOpen) setMenu(false);
        });
      });
    }

    // 데스크톱 폭으로 넓어지면 시트를 강제로 닫는다
    window.addEventListener('resize', function () {
      if (menuOpen && window.innerWidth >= 1024) setMenu(false);
      onScroll();
    });

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ================================================================
     원페이지 내비의 현재 섹션 판별.

     교차 여부가 아니라 "고정 헤더 바로 아래 선을 지난 마지막 섹션"을 현재로 본다.
     IntersectionObserver 만으로는 섹션 높이가 제각각일 때 두 개가 동시에
     걸리며 하이라이트가 튄다.
  ================================================================= */

  function initScrollSpy() {
    if (PAGE !== 'landing') return;

    var links = $$('.site-nav__link[data-section]');
    if (links.length === 0) return;

    var ids = links.map(function (link) {
      return link.getAttribute('data-section');
    });
    var offset = 96;
    var frame = 0;

    function measure() {
      frame = 0;
      var current = '';

      // 문서 끝에 닿으면 마지막 섹션을 활성으로 — 짧은 마지막 섹션 보정
      var atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

      if (atBottom) {
        current = ids[ids.length - 1] || '';
      } else {
        ids.forEach(function (id) {
          var el = document.getElementById(id);
          if (!el) return;
          if (el.getBoundingClientRect().top <= offset) current = id;
        });
      }

      links.forEach(function (link) {
        link.classList.toggle(
          'is-current',
          link.getAttribute('data-section') === current
        );
      });
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ================================================================
     기동
  ================================================================= */

  function init() {
    initHeader();
    initScrollSpy();

    $$('[data-current-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
