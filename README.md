# 오세영 변호사 개인 홈페이지

부장검사 · 사법연수원 교수 출신 **오세영 변호사**의 1인 개인 홈페이지입니다. **React + Vite + TypeScript + Tailwind CSS** 기반 SPA이며 **Cloudflare Pages** 정적 호스팅에 그대로 배포됩니다.

법인 사이트가 아니라 개인 사이트이므로, 무게중심은 법인 소개가 아니라 **해결사례와 칼럼**에 있습니다.

---

## 정보구조 — 원페이지 스크롤 + 사례 아카이브

랜딩 한 장으로 읽히되, 쌓이는 콘텐츠(사례·칼럼)에는 고유 주소를 준다는 원칙입니다. 주요 안내 문구 및 헤드라인은 깔끔한 완성도를 위해 마침표(.)로 마감합니다.

```
/                 랜딩 (아래 순서로 이어지는 10개 섹션)
/cases            해결사례 전체 아카이브 (연도 그룹 · ?category= 필터)
/cases/:id        사례 해설 — 랜딩/아카이브 위에 오버레이
/insights/:id     칼럼 전문 — 오버레이
```

섹션 순서는 설득의 순서입니다.

| 앵커 | 섹션 | 역할 |
|---|---|---|
| — | Hero + 자격 스트립 | 이름 · 포지셔닝 · 사시 41회 / 부장검사 / 공인전문검사 |
| `#cases` | **해결사례** | 연월 · 처분기관 · 죄명 · 처분결과 4열 아카이브 |
| `#profile` | 변호사 소개 | 서술 + 검찰 26년 연표 + 인증·위촉 |
| `#principles` | "직접" 4원칙 | 직접 상담 / 소통 / 참여 / 변론 |
| `#practice` | 업무분야 | 형사를 축으로 한 5개 아코디언 |
| `#insights` | **칼럼·언론** | 매체명을 앞세운 읽을거리 목록 |
| `#process` | 상담·선임 절차 | 4단계 |
| `#checklist` | 변호사 선택 체크리스트 | 판단 기준 5개 |
| `#contact` | 상담 신청 | 폼 + 연락처 + FAQ |

**해결사례를 첫 화면 직후에 두는 것이 이 구조의 핵심 판단**입니다. 형사사건 의뢰인이 가장 먼저 확인하려는 것은 "이 사람이 실제로 끝내봤는가"입니다. 설득력은 개별 사례의 서사가 아니라 목록의 밀도와 최신성에서 나오므로, 모든 사례에 해설을 달지 않고 대부분은 한 줄 레코드로 둡니다.

---

## 디자인 방향 — 모던 미니멀

흰 지면을 기본으로 하고 히어로·상담처럼 **선언하는 구간만 잉크(`#0b0f14`)로 눌러** 리듬을 만듭니다.

- **타이포그래피** : Pretendard 단일 서체. 위계는 크기·굵기·자간으로만 만듭니다. 한글 표제가 어절 중간에서 끊기지 않도록 `word-break: keep-all` 전역 적용. 연월·사건번호는 `.tabular`로 자릿수를 정렬합니다.
- **색** : 흰 지면(`#ffffff`) · 가라앉은 면(`#f5f7f9`) · 잉크(`#0b0f14`)에 시그널 블루(`#2f6bff`)를 포인트로만 씁니다. 그라데이션·글래스·컬러 배지는 시스템에 존재하지 않습니다.
- **처분결과에 색을 쓰지 않습니다** : 무죄·불기소를 초록색으로 칠하는 순간 광고처럼 읽히고 신뢰를 잃습니다. 굵기와 위치로만 세웁니다.
- **면 대신 선** : 그림자를 쓰지 않고 1px 괘선과 여백으로 구분합니다. 모서리는 각을 살립니다.
- **모션** : 진입 시 `opacity + translateY` 한 종류만. `prefers-reduced-motion: reduce`면 전면 정지합니다.

토큰은 `src/index.css`의 `@theme` 블록 한 곳에, 조판 요소(`Container` · `Section` · `SectionHeader` · `Button` · `Chip` · `ArrowLink`)는 `src/components/primitives.tsx`에 모여 있습니다. 새 화면은 이 둘만 쓰면 톤이 어긋나지 않습니다.

---

## 기술 스택

- **Framework** : React 19 (TypeScript)
- **Build Tool** : Vite
- **Styling** : Tailwind CSS v4 (`@theme` 토큰)
- **Routing** : React Router DOM — 앵커 스크롤 + 배경 위치(`state.background`) 기반 오버레이 라우팅
- **배포 타깃** : Cloudflare Pages

---

## 프로젝트 구조

```
lawful_spa/
├── public/
│   ├── _redirects                 # Cloudflare Pages SPA 라우팅 (404 방지)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── primitives.tsx         # 공용 조판 요소 (Container/Section/Button/Chip/…)
│   │   ├── SiteHeader.tsx         # 고정 내비 + 스크롤스파이 + 모바일 시트
│   │   ├── SiteFooter.tsx
│   │   ├── MobileCallBar.tsx      # 모바일 하단 고정 전화 · 상담 CTA
│   │   ├── CaseTable.tsx          # 해결사례 아카이브 표 (랜딩/아카이브 공용)
│   │   ├── DetailOverlay.tsx      # 포커스 트랩 · Esc · 스크롤 락 오버레이
│   │   └── sections/              # 랜딩 10개 섹션
│   ├── hooks/
│   │   ├── useConsultationForm.ts # 상담 폼 상태·검증·제출
│   │   ├── useScrollSpy.ts        # 현재 섹션 판별
│   │   ├── useReveal.ts           # 진입 모션 (IntersectionObserver)
│   │   └── useLockBodyScroll.ts
│   ├── data/
│   │   ├── profile.ts             # 오세영 변호사 프로필 · 연표 · 인증
│   │   ├── site.ts                # 연락처 · 내비 · 4원칙 · 절차 · 체크리스트 · FAQ
│   │   ├── practice.ts            # 업무분야 5종
│   │   ├── cases.ts               # 해결사례 아카이브
│   │   └── insights.ts            # 칼럼 · 언론 · 영상
│   ├── pages/
│   │   ├── Landing.tsx            # 원페이지 랜딩 조립
│   │   ├── CaseArchive.tsx        # /cases 전체 아카이브
│   │   ├── CaseDetail.tsx         # /cases/:id 오버레이
│   │   └── InsightDetail.tsx      # /insights/:id 오버레이
│   ├── types/index.ts             # 도메인 타입 (Profile/Case/Insight/PracticeArea)
│   ├── App.tsx                    # 라우터 + 스크롤 관리 + 오버레이 라우팅
│   ├── main.tsx
│   └── index.css                  # 디자인 토큰 및 base 스타일
├── index.html                     # SEO 메타태그, Attorney JSON-LD, 폰트
├── vite.config.ts
└── tsconfig.json
```

### 콘텐츠를 갈아끼우는 곳

UI와 데이터가 완전히 분리되어 있습니다. 실제 자료를 받으면 아래 파일만 교체하면 됩니다.

| 바꿀 것 | 파일 |
|---|---|
| 해결사례 목록 | `src/data/cases.ts` — 연월·처분기관·죄명·처분결과 네 항목이면 한 행이 성립합니다 |
| 칼럼·언론 | `src/data/insights.ts` |
| 약력·초상 사진 | `src/data/profile.ts` (사진은 `PROFILE.portrait` 한 줄) |
| 연락처·문구 | `src/data/site.ts` |

---

## 로컬 개발 및 빌드

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버
npm run build    # dist 번들 생성
npm run preview  # 빌드 결과 미리보기
```

타입 검사는 `npx tsc --noEmit`으로 확인합니다.

---

## Cloudflare Pages 배포

### 방법 1 — 대시보드 Git 연동 (권장)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 저장소 선택 후 빌드 설정 입력
   - Framework preset : `Vite`
   - Build command : `npm run build`
   - Build output directory : `dist`
4. **Save and Deploy**

### 방법 2 — Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=lawful-companion
```

### SPA 404 방지

`/cases`, `/insights/:id` 같은 내부 경로로 직접 진입하거나 새로고침할 때 404가 나지 않도록 `public/_redirects`에 아래 규칙이 포함되어 있으며, 빌드 시 `dist/_redirects`로 복사됩니다.

```
/*  /index.html  200
```

---

## 운영 전 확인할 것

- **해결사례·칼럼 데이터** : 현재 `src/data/cases.ts`, `src/data/insights.ts`의 내용은 **자리표시자**입니다. 게재 전 실제 자료로 교체하고 사실관계와 표기(변호사 광고 규정 포함)를 검토해 주십시오. 사례 섹션·아카이브·푸터에는 `src/data/site.ts`의 `CASE_DISCLAIMER` 면책 문구가 항상 노출됩니다.
- **초상 사진** : `src/data/profile.ts`의 `portrait`는 Unsplash 자리표시자입니다. 실제 촬영본으로 교체해야 합니다.
- **상담 폼 전송** : 접수는 프런트엔드에서만 처리됩니다(제출 시 완료 화면만 표시). 실제 운영에서는 `src/hooks/useConsultationForm.ts`의 제출 지점을 메일 발송 API(예: Cloudflare Pages Functions + Resend/SES)로 연결해야 합니다.
- **연락처** : 현재 대표번호 하나(`02-583-6699`)를 씁니다. 상담예약 전용번호나 카카오톡 채널을 쓰려면 `src/data/site.ts`에 추가하면 헤더·히어로·상담·푸터에 함께 반영됩니다.
