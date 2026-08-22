# 오세영 변호사 개인 홈페이지

부장검사 · 사법연수원 교수 출신 **오세영 변호사**의 1인 개인 홈페이지입니다. 빌드 도구 없는 **HTML · CSS · JavaScript** 정적 사이트이며, 파일을 그대로 올리면 동작합니다(**Cloudflare Pages** 기준).

법인 사이트가 아니라 개인 사이트이므로, 무게중심은 법인 소개가 아니라 **해결사례와 칼럼**에 있습니다.

---

## 정보구조 — 원페이지 스크롤 + 사례 아카이브

랜딩 한 장으로 읽히되, 쌓이는 콘텐츠(사례·칼럼)에는 고유 주소를 준다는 원칙입니다. 주요 안내 문구 및 헤드라인은 깔끔한 완성도를 위해 마침표(.)로 마감합니다.

```
index.html            랜딩 (아래 순서로 이어지는 10개 섹션)
cases.html            해결사례 전체 아카이브 (연도 그룹 · ?category= 필터)
?case=:id             사례 해설 — 랜딩/아카이브 위에 오버레이
?insight=:id          칼럼 전문 — 오버레이
```

상세는 `history.pushState`로 쌓기 때문에 **뒤로가기가 곧 닫기**이고, 주소를 직접 열어 들어와도 배경 위에 그대로 뜹니다. 아카이브에서 연 사례는 닫을 때 걸어둔 분야 필터가 유지됩니다.

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

토큰은 `assets/css/style.css` 맨 위 `:root` 한 곳에, 공용 조판 요소(`.container` · `.section` · `.section-head` · `.btn` · `.chip` · `.arrow-link`)는 그 바로 아래에 모여 있습니다. 새 화면은 이 둘만 쓰면 톤이 어긋나지 않습니다. 반응형 규칙은 파일 끝의 미디어 쿼리 블록(sm 640 / md 768 / lg 1024)에 한데 모아 두었습니다.

---

## 기술 스택

- **Markup** : HTML5 (빌드 단계 없음)
- **Styling** : 단일 CSS 파일 · CSS 사용자 지정 속성 토큰
- **Script** : 의존성 없는 바닐라 JavaScript (클래식 스크립트 2개)
- **배포 타깃** : Cloudflare Pages

외부에서 받아오는 것은 Pretendard 웹폰트(jsDelivr)와 히어로 초상 사진(현재 Unsplash 자리표시자)뿐입니다.

---

## 프로젝트 구조

```
lawful_spa/
├── index.html          랜딩 원페이지 — SEO 메타태그, Attorney JSON-LD, 폰트,
│                       10개 섹션 마크업, 칼럼 본문 <template>
├── cases.html          해결사례 전체 아카이브
├── favicon.svg
└── assets/
    ├── css/
    │   └── style.css   디자인 토큰 · 조판 · 섹션별 규칙 · 반응형
    └── js/
        ├── data.js     해결사례 목록(CASES) · 분야 · 면책 문구
        └── main.js     배경 스크롤 잠금 · 진입 모션 · 고정 헤더 · 스크롤스파이
                        · 사례 표 렌더링 · 필터 · 아코디언 · 상담 폼 · 상세 오버레이
```

### 콘텐츠를 갈아끼우는 곳

| 바꿀 것 | 위치 |
|---|---|
| 해결사례 목록 | `assets/js/data.js`의 `CASES` — 연월·처분기관·죄명·처분결과 네 항목이면 한 행이 성립합니다. 해설을 붙일 사건에만 `detail`을 답니다 |
| 칼럼·언론 | `index.html`의 `#insights` 목록 + 맨 아래 `<template id="insight-…">` 본문 (`data-id`로 짝을 맞춥니다) |
| 약력·초상 사진 | `index.html`의 `#profile` 섹션과 `.hero__portrait`의 `src` 한 줄 |
| 연락처·문구 | `index.html` · `cases.html` (헤더 · 히어로 · 상담 · 푸터 · 모바일 바에 전화번호가 반복 등장하므로 함께 고쳐야 합니다) |

해결사례만 데이터 파일로 분리한 이유는 랜딩(최근 12건)과 아카이브(연도별 전체)가 같은 목록을 서로 다른 형태로 쓰기 때문입니다. 나머지 지면은 HTML에 그대로 적혀 있어 검색엔진이 스크립트 없이도 읽습니다.

---

## 로컬 확인

빌드가 없습니다. 정적 서버로 열기만 하면 됩니다.

```bash
python3 -m http.server 4321
# http://localhost:4321
```

`file://`로 직접 열어도 대부분 동작하지만, 상세 오버레이의 주소 갱신(`history.pushState`)은 서버로 띄운 경우에만 정상입니다.

---

## Cloudflare Pages 배포

### 방법 1 — 대시보드 Git 연동 (권장)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 저장소 선택 후 빌드 설정 입력
   - Framework preset : `None`
   - Build command : *(비움)*
   - Build output directory : `/`
4. **Save and Deploy**

### 방법 2 — Wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=lawful-companion
```

페이지가 실제 파일(`index.html` · `cases.html`)로 존재하므로 SPA 리라이트(`_redirects`)가 필요 없습니다. 다만 기존 법인 사이트 주소를 넘겨받는다면 `_redirects` 파일에 개별 규칙을 적어 두십시오.

```
/kwa-gallery_member_v-6   /   301
/kwa-gallery_member       /   301
```

---

## 운영 전 확인할 것

- **해결사례·칼럼 데이터** : 현재 `assets/js/data.js`의 사례와 `index.html`의 칼럼은 **자리표시자**입니다. 게재 전 실제 자료로 교체하고 사실관계와 표기(변호사 광고 규정 포함)를 검토해 주십시오. 사례 섹션·아카이브·푸터에는 면책 문구가 항상 노출됩니다.
- **초상 사진** : `.hero__portrait`의 `src`는 Unsplash 자리표시자입니다. 실제 촬영본으로 교체해야 합니다.
- **OG 이미지** : `og:image`가 `/images/og-image.jpg`를 가리키지만 파일이 아직 없습니다.
- **상담 폼 전송** : 접수는 프런트엔드에서만 처리됩니다(제출 시 완료 화면만 표시). 실제 운영에서는 `assets/js/main.js`의 `initConsultForm` 제출 지점을 메일 발송 API(예: Cloudflare Pages Functions + Resend/SES)로 연결해야 합니다.
- **연락처** : 현재 대표번호 하나(`02-583-6699`)를 씁니다. 상담예약 전용번호나 카카오톡 채널을 쓰려면 두 HTML의 헤더·히어로·상담·푸터·모바일 바에 함께 반영해야 합니다.
