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
     해결사례 표
     연월 · 처분기관 · 죄명 · 처분결과 네 항목이 열로 고정된다.
     결과는 색이 아니라 굵기로만 세운다.
  ================================================================= */

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** 현재 주소를 유지한 채 오버레이 파라미터만 얹는다 */
  function overlayHref(key, id) {
    var params = new URLSearchParams(window.location.search);
    params.set(key, id);
    return window.location.pathname + '?' + params.toString();
  }

  function caseRowBody(item, interactive) {
    return (
      '<div class="case-row__body">' +
      '<div class="case-row__meta">' +
      '<span class="case-row__ym tabular">' + escapeHtml(item.yearMonth) + '</span>' +
      '<span class="case-row__agency">' + escapeHtml(item.agency) + '</span>' +
      '</div>' +
      '<p class="case-row__charge">' + escapeHtml(item.charge) + '</p>' +
      '<p class="case-row__outcome">' + escapeHtml(item.outcome) + '</p>' +
      '<span class="case-row__mark" aria-hidden="' + (interactive ? 'false' : 'true') + '">' +
      (interactive ? '→' : '') +
      '</span>' +
      '</div>'
    );
  }

  // 해설이 있는 사건만 상세로 연다. 나머지는 목록 항목으로만 존재한다.
  function caseRow(item) {
    if (!item.detail) {
      return '<li class="case-row case-row--static">' + caseRowBody(item, false) + '</li>';
    }

    var label = item.yearMonth + ' ' + item.charge + ' ' + item.outcome + ' — 해설 보기';
    return (
      '<li class="case-row">' +
      '<a class="case-row__link" data-overlay="case" data-id="' + escapeHtml(item.id) + '"' +
      ' href="' + escapeHtml(overlayHref('case', item.id)) + '"' +
      ' aria-label="' + escapeHtml(label) + '">' +
      caseRowBody(item, true) +
      '</a>' +
      '</li>'
    );
  }

  var CASE_HEAD =
    '<div class="case-table__head">' +
    '<span>연월</span><span>기관</span><span>죄명</span><span>처분결과</span><span></span>' +
    '</div>';

  function renderCaseTable(mount, items, groupByYear) {
    if (items.length === 0) {
      mount.innerHTML =
        '<p class="case-table__empty">해당 분야의 사례가 아직 없습니다.</p>';
      return;
    }

    if (!groupByYear) {
      mount.innerHTML =
        CASE_HEAD +
        '<ul class="case-table__list">' +
        items.map(caseRow).join('') +
        '</ul>';
      return;
    }

    var years = [];
    items.forEach(function (item) {
      var year = item.yearMonth.slice(0, 4);
      if (years.indexOf(year) === -1) years.push(year);
    });

    mount.innerHTML =
      CASE_HEAD +
      years
        .map(function (year) {
          var rows = items.filter(function (item) {
            return item.yearMonth.indexOf(year) === 0;
          });
          return (
            '<div>' +
            '<div class="case-table__year">' +
            '<span class="case-table__year-label tabular">' + year + '</span>' +
            '<span class="case-table__year-count tabular">' + rows.length + '건</span>' +
            '</div>' +
            '<ul class="case-table__list">' + rows.map(caseRow).join('') + '</ul>' +
            '</div>'
          );
        })
        .join('');
  }

  /* 랜딩 — 12건까지만 보여주고 나머지는 아카이브로 넘긴다 --------- */

  var PREVIEW_COUNT = 12;

  function initLandingCases() {
    var mount = $('#cases-table');
    if (!mount || !DATA) return;

    var chips = $$('#cases-filters .chip');
    var count = $('#cases-count');
    var more = $('#cases-more');
    var moreLink = $('#cases-more-link');
    var category = '전체';

    function render() {
      var filtered =
        category === '전체'
          ? DATA.sorted
          : DATA.sorted.filter(function (item) {
              return item.category === category;
            });

      renderCaseTable(mount, filtered.slice(0, PREVIEW_COUNT), false);
      if (count) count.textContent = '총 ' + filtered.length + '건';

      var rest = filtered.length - PREVIEW_COUNT;
      if (more) more.hidden = rest <= 0;
      if (moreLink && rest > 0) {
        moreLink.firstChild.nodeValue = '나머지 ' + rest + '건 더 보기 ';
      }

      chips.forEach(function (chip) {
        chip.setAttribute(
          'aria-pressed',
          String(chip.getAttribute('data-value') === category)
        );
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        category = chip.getAttribute('data-value');
        render();
      });
    });

    render();
  }

  /* 아카이브 — 필터를 쿼리스트링에 두어 업무분야에서 바로 걸어 들어온다 */

  function initArchiveCases() {
    var mount = $('#archive-table');
    if (!mount || !DATA) return;

    var chips = $$('#archive-filters .chip');
    var count = $('#archive-count');
    var params = new URLSearchParams(window.location.search);
    var raw = params.get('category');
    var category = DATA.categories.indexOf(raw) !== -1 ? raw : '전체';

    function render() {
      var filtered =
        category === '전체'
          ? DATA.sorted
          : DATA.sorted.filter(function (item) {
              return item.category === category;
            });

      renderCaseTable(mount, filtered, true);
      if (count) count.textContent = '총 ' + filtered.length + '건';

      chips.forEach(function (chip) {
        chip.setAttribute(
          'aria-pressed',
          String(chip.getAttribute('data-value') === category)
        );
      });
    }

    function syncUrl() {
      var next = new URLSearchParams(window.location.search);
      if (category === '전체') next.delete('category');
      else next.set('category', category);
      var query = next.toString();
      history.replaceState(
        history.state,
        '',
        window.location.pathname + (query ? '?' + query : '')
      );
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        category = chip.getAttribute('data-value');
        syncUrl();
        render();
      });
    });

    render();
  }

  /* ================================================================
     칼럼 · 언론 — 유형 필터
     목록은 HTML 에 그대로 있고 여기서는 보이고 감추기만 한다.
  ================================================================= */

  function initInsights() {
    var section = $('#insights');
    if (!section) return;

    var chips = $$('.chip', section);
    var featured = $('.insight-featured', section);
    var rows = $$('.insight-row', section);
    var empty = $('#insights-empty', section);
    var list = $('.insight-list', section);

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var kind = chip.getAttribute('data-value');

        chips.forEach(function (other) {
          other.setAttribute(
            'aria-pressed',
            String(other.getAttribute('data-value') === kind)
          );
        });

        var visibleRows = 0;
        rows.forEach(function (row) {
          var match = kind === '전체' || row.getAttribute('data-kind') === kind;
          row.hidden = !match;
          if (match) visibleRows += 1;
        });

        var featuredMatch =
          featured &&
          (kind === '전체' || featured.getAttribute('data-kind') === kind);
        if (featured) featured.hidden = !featuredMatch;
        if (list) list.hidden = visibleRows === 0;
        if (empty) empty.hidden = visibleRows > 0 || Boolean(featuredMatch);
      });
    });
  }

  /* ================================================================
     아코디언 — 업무분야(한 번에 하나) · FAQ(한 번에 하나, 전부 닫힘 허용)
  ================================================================= */

  function initAccordion(rootSelector) {
    var root = $(rootSelector);
    if (!root) return;

    var triggers = $$('[aria-controls]', root).filter(function (el) {
      return el.tagName === 'BUTTON';
    });

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var open = trigger.getAttribute('aria-expanded') === 'true';

        triggers.forEach(function (other) {
          var panel = document.getElementById(other.getAttribute('aria-controls'));
          var next = other === trigger && !open;
          other.setAttribute('aria-expanded', String(next));
          if (panel) panel.hidden = !next;
        });
      });
    });
  }

  /* ================================================================
     상담 신청 폼

     NOTE: 접수는 아직 프런트엔드에서만 처리된다. 실제 운영에서는
     제출 지점을 메일 발송 API 로 연결해야 한다.
  ================================================================= */

  function initConsultForm() {
    var form = $('#consult-form');
    if (!form) return;

    var error = $('#consult-error');
    var done = $('#consult-done');
    var submit = $('#consult-submit');
    var reset = $('#consult-reset');

    function fail(message) {
      if (!error) return;
      error.textContent = message;
      error.hidden = false;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.trim();
      var content = form.elements.content.value.trim();

      if (!name || !phone || !content) {
        fail('성함, 연락처, 상담 내용을 입력해 주십시오.');
        return;
      }
      if (!form.elements.agreePrivacy.checked) {
        fail('개인정보 수집 및 이용에 동의하셔야 접수가 가능합니다.');
        return;
      }

      if (error) error.hidden = true;
      submit.disabled = true;
      submit.textContent = '접수 중…';

      window.setTimeout(function () {
        submit.disabled = false;
        submit.textContent = '상담 신청서 보내기';
        form.hidden = true;
        if (done) done.hidden = false;
      }, 600);
    });

    if (reset) {
      reset.addEventListener('click', function () {
        form.reset();
        if (error) error.hidden = true;
        if (done) done.hidden = true;
        form.hidden = false;
      });
    }
  }

  /* ================================================================
     상세 오버레이

     원페이지를 유지하면서 상세에 고유 주소를 준다.
     목록에서 열면 pushState 로 쌓아 뒤로가기가 곧 닫기가 되고,
     주소를 직접 입력해 들어오면 닫을 때 파라미터만 지운다.
  ================================================================= */

  var FOCUSABLE =
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  var overlay = {
    root: null,
    panel: null,
    body: null,
    label: null,
    openedByPush: false,
    returnFocus: null,
    isOpen: false,
  };

  function caseDetailHtml(item) {
    var detail = item.detail;

    var block = function (title, items) {
      return (
        '<div class="detail__block">' +
        '<h3 class="detail__block-title">' + title + '</h3>' +
        '<ul>' +
        items
          .map(function (line) {
            return '<li>' + escapeHtml(line) + '</li>';
          })
          .join('') +
        '</ul>' +
        '</div>'
      );
    };

    return (
      '<div class="detail__meta tabular">' +
      '<span>' + escapeHtml(item.yearMonth) + '</span><span>·</span>' +
      '<span>' + escapeHtml(item.agency) + '</span><span>·</span>' +
      '<span>' + escapeHtml(item.category) + '</span>' +
      '</div>' +
      '<p class="detail__charge">' + escapeHtml(item.charge) + '</p>' +
      '<p class="detail__outcome">' + escapeHtml(item.outcome) + '</p>' +
      '<h2 class="detail__title">' + escapeHtml(detail.title) + '</h2>' +
      '<p class="detail__summary">' + escapeHtml(detail.summary) + '</p>' +
      block('쟁점', detail.issues) +
      block('대응', detail.strategy) +
      '<div class="detail__closing-wrap">' +
      '<h3 class="detail__block-title">결과</h3>' +
      '<p class="detail__closing">' + escapeHtml(detail.closing) + '</p>' +
      '</div>' +
      '<p class="detail__disclaimer">' + escapeHtml(DATA.disclaimer) + '</p>'
    );
  }

  function showOverlay(label, html) {
    overlay.label.textContent = label;
    overlay.body.innerHTML = html;
    overlay.body.scrollTop = 0;
    overlay.root.hidden = false;
    overlay.isOpen = true;

    lockScroll();

    // 열릴 때 포커스를 패널로 가져오고, 닫으면 원래 있던 곳으로 되돌린다
    overlay.returnFocus = document.activeElement;
    overlay.panel.focus();
  }

  function hideOverlay() {
    if (!overlay.isOpen) return;
    overlay.isOpen = false;
    overlay.root.hidden = true;
    overlay.body.innerHTML = '';
    unlockScroll();

    if (overlay.returnFocus && overlay.returnFocus.focus) {
      overlay.returnFocus.focus();
    }
    overlay.returnFocus = null;
  }

  /** 주소에서 오버레이 파라미터만 지운다 */
  function stripOverlayParams(replace) {
    var params = new URLSearchParams(window.location.search);
    params.delete('case');
    params.delete('insight');
    var query = params.toString();
    var url = window.location.pathname + (query ? '?' + query : '');
    if (replace) history.replaceState({ overlay: false }, '', url);
    return url;
  }

  function closeOverlay() {
    // 목록에서 열렸으면 뒤로가기가 곧 닫기다. 직접 진입은 파라미터만 지운다.
    if (overlay.openedByPush) {
      overlay.openedByPush = false;
      history.back();
      return;
    }
    stripOverlayParams(true);
    hideOverlay();
  }

  function openCase(id) {
    var item = null;
    if (DATA) {
      DATA.cases.forEach(function (candidate) {
        if (candidate.id === id) item = candidate;
      });
    }

    // 해설이 없는 사건은 상세 화면 자체가 없다
    if (!item || !item.detail) {
      stripOverlayParams(true);
      hideOverlay();
      return;
    }

    showOverlay('해결사례', caseDetailHtml(item));
  }

  function openInsight(id) {
    var template = document.getElementById('insight-' + id);
    if (!template) {
      stripOverlayParams(true);
      hideOverlay();
      return;
    }

    showOverlay(
      template.getAttribute('data-kind') || '칼럼',
      template.innerHTML
    );
  }

  /** 현재 주소에 맞춰 오버레이를 연다 · 닫는다 */
  function syncOverlayFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var caseId = params.get('case');
    var insightId = params.get('insight');

    if (caseId) {
      openCase(caseId);
    } else if (insightId) {
      openInsight(insightId);
    } else {
      hideOverlay();
    }
  }

  function initOverlay() {
    overlay.root = $('#overlay');
    if (!overlay.root) return;

    overlay.panel = $('.overlay__panel', overlay.root);
    overlay.body = $('.overlay__body', overlay.root);
    overlay.label = $('.overlay__label', overlay.root);

    $$('[data-overlay-close]', overlay.root).forEach(function (button) {
      button.addEventListener('click', closeOverlay);
    });

    // 목록 링크 — 새 탭 · 보조 클릭은 브라우저에 맡긴다
    document.addEventListener('click', function (event) {
      var link = event.target.closest ? event.target.closest('[data-overlay]') : null;
      if (!link) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

      event.preventDefault();

      var kind = link.getAttribute('data-overlay');
      var id = link.getAttribute('data-id');

      history.pushState({ overlay: true }, '', link.getAttribute('href'));
      overlay.openedByPush = true;

      if (kind === 'case') openCase(id);
      else openInsight(id);
    });

    document.addEventListener('keydown', function (event) {
      if (!overlay.isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeOverlay();
        return;
      }
      if (event.key !== 'Tab') return;

      var items = $$(FOCUSABLE, overlay.panel);
      if (items.length === 0) return;

      var first = items[0];
      var last = items[items.length - 1];
      var active = document.activeElement;

      if (event.shiftKey && (active === first || active === overlay.panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener('popstate', function () {
      overlay.openedByPush = false;
      syncOverlayFromUrl();
    });

    syncOverlayFromUrl();
  }

  /* ================================================================
     기동
  ================================================================= */

  function init() {
    initHeader();
    initScrollSpy();
    initLandingCases();
    initArchiveCases();
    initInsights();
    initAccordion('#practice-list');
    initAccordion('#faq');
    initConsultForm();
    initOverlay();

    $$('[data-current-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    // 목록을 그린 뒤에 관찰을 건다 — 표는 스크립트가 만든다
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
