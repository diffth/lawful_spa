# 법무법인 행복한동행 (Law Firm SPA)

[법무법인 행복한동행](https://haengdong.co.kr/kwa-gallery_member_v-6)의 공식 웹사이트를 **React + Vite + TypeScript + Tailwind CSS** 기반의 초고속 모던 SPA(Single Page Application)로 구현한 프로젝트입니다. **Cloudflare Pages**에 무중단/오류 없이 완벽하게 배포되도록 설계되었습니다.

---

## 🛠 기술 스택
- **Framework**: React 18 / 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Modern Custom Utilities
- **Routing**: React Router DOM (SPA 라우팅 및 ScrollToTop)
- **Icons**: Lucide React
- **배포 타깃**: Cloudflare Pages (정적 SPA 호스팅)

---

## 📁 프로젝트 구조

```
lawful_spa/
├── public/
│   ├── _redirects            # Cloudflare Pages SPA 404 방지 라우팅 설정
│   └── favicon.svg           # 법무법인 상징 파비콘
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # 최상단 긴급연락처 + 네비게이션 + 모바일 드로어
│   │   ├── Footer.tsx        # 사업자정보, 대표변호사, 오시는길, 약관
│   │   └── QuickConsultModal.tsx # 1분 빠른 무료법률상담 모달
│   ├── data/
│   │   ├── lawyers.ts        # 오세영 대표변호사 (부장검사·연수원 교수 출신) 및 변호사진
│   │   ├── practiceAreas.ts  # 형사, 성범죄, 중대재해, 민사, 행정, 가사, 기업
│   │   ├── cases.ts          # 무죄, 불기소, 전부승소 판결 사례
│   │   └── news.ts           # 언론보도 및 전문가 칼럼
│   ├── pages/
│   │   ├── HomePage.tsx          # 메인 랜딩 (비주얼, 대표변호사, 업무분야, 사례)
│   │   ├── AboutPage.tsx         # 인사말, 4대 핵심가치, 교대역 오시는길/지도
│   │   ├── LawyersPage.tsx       # 전체 변호사진 프로필 갤러리
│   │   ├── LawyerDetailPage.tsx   # 오세영 대표변호사 상세 약력 페이지
│   │   ├── PracticeAreasPage.tsx # 분야별 세부 사건 및 4단계 해결 프로세스
│   │   ├── SuccessCasesPage.tsx  # 성공사례 검색 및 필터링 상세 뷰어
│   │   ├── MediaPage.tsx         # 언론보도 및 영상 모음
│   │   └── ConsultationPage.tsx  # 온라인 무료상담 신청 폼 & FAQ
│   ├── types/
│   │   └── index.ts          # 도메인 모델 TypeScript 타입 정의
│   ├── App.tsx               # 전체 라우터 및 상태 관리
│   ├── main.tsx              # 앱 엔트리포인트
│   └── index.css             # Tailwind 및 Pretendard 폰트/스타일
├── index.html                # SEO 메타태그 및 오픈그래프 설정
├── package.json              # 빌드 스크립트 및 의존성
├── tsconfig.json             # TypeScript 설정
└── vite.config.ts            # Vite 번들러 설정 (@tailwindcss/vite 포함)
```

---

## 🚀 로컬 개발 및 빌드 실행

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 배포용 번들 빌드 (dist 폴더 생성)
npm run build

# 4. 빌드 결과물 로컬 미리보기
npm run preview
```

---

## 🌐 Cloudflare Pages 배포 가이드

### 방법 1: Cloudflare 대시보드 (Git 연동) - 가장 권장
1. [Cloudflare Dashboard](https://dash.cloudflare.com/)에 로그인합니다.
2. **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**을 선택합니다.
3. 이 저장소(GitHub / GitLab)를 선택합니다.
4. 빌드 설정을 아래와 같이 입력합니다:
   - **Framework preset**: `Vite` (또는 None)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. **Save and Deploy**를 클릭하면 수 초 내에 전 세계 엣지 네트워크로 자동 배포됩니다.

### 방법 2: Wrangler CLI를 통한 직접 배포
```bash
# Wrangler CLI 전역 설치 (최초 1회)
npm install -g wrangler

# Cloudflare 계정 로그인
wrangler login

# 프로젝트 빌드 후 dist 폴더 배포
npm run build
wrangler pages deploy dist --project-name=lawful-companion
```

---

## ⚡ Cloudflare Pages 404 라우팅 방지 설정 검증
Cloudflare Pages는 SPA에서 브라우저 주소창에 `/lawyers`, `/cases` 등의 내부 경로를 직접 입력하거나 새로고침할 때 404 오류가 발생하지 않도록 `public/_redirects` 파일이 필요합니다.

본 프로젝트에는 `public/_redirects`에 다음 설정이 이미 적용되어 있으며, 빌드 시 `dist/_redirects`로 자동 복사됩니다:
```
/*  /index.html  200
```
