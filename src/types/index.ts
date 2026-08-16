/* ------------------------------------------------------------------
   오세영 변호사 개인 홈페이지 — 데이터 계약.
   화면은 이 타입만 알고, 실제 내용은 src/data/* 가 공급한다.
   실제 자료를 받으면 데이터 파일만 갈아끼우면 된다.
------------------------------------------------------------------- */

/** 표창 · 인증 — 연도와 함께 개별 항목으로 세운다 */
export interface Credential {
  year: string;
  title: string;
  issuer?: string;
}

/**
 * 약력 연표의 한 구간.
 * 항목마다 연도를 붙이면 확인되지 않은 연도를 지어내게 되므로,
 * 확실한 기간 · 기수만 period 에 적고 나머지는 구간으로 묶는다.
 */
export interface CareerPhase {
  label: string;
  period: string;
  items: string[];
}

export interface Profile {
  name: string;
  nameEn: string;
  title: string;
  /** 소속 법인 — 개인 사이트지만 소속은 명시한다 */
  firm: string;
  /** 히어로 한 줄 포지셔닝 */
  positioning: string;
  /** 히어로 아래 리드 문장 */
  lead: string;
  /** 소개 섹션 본문 */
  paragraphs: string[];
  portrait: string;
  education: string[];
  career: CareerPhase[];
  /** 인증 · 위촉 — 연도와 함께 개별 카드로 세운다 */
  credentials: Credential[];
  email: string;
  phone: string;
}

/* 해결사례 --------------------------------------------------------- */

export type CaseCategory = '형사' | '성범죄' | '경제범죄' | '중대재해';

/** 처분기관 — 사건이 어느 단계에서 끝났는지가 결과만큼 중요하다 */
export type Agency = '경찰' | '검찰' | '법원';

/** 해설이 붙는 사례에만 존재. 모든 사례에 서사를 달지 않는다 */
export interface CaseDetail {
  title: string;
  summary: string;
  /** 사건의 쟁점 */
  issues: string[];
  /** 대응 전략 */
  strategy: string[];
  /** 결과에 대한 서술 */
  closing: string;
}

export interface Case {
  id: string;
  /** "2025.04" — 정렬 · 연월 그룹의 키 */
  yearMonth: string;
  agency: Agency;
  /** 죄명 정식명칭 */
  charge: string;
  /** "무죄" · "불송치(혐의없음)" · "불기소" 등 */
  outcome: string;
  category: CaseCategory;
  detail?: CaseDetail;
}

/* 칼럼 · 언론 ------------------------------------------------------ */

export type InsightKind = '칼럼' | '언론보도' | '영상';

export interface Insight {
  id: string;
  kind: InsightKind;
  /** 매체명 — 제목보다 먼저 읽히게 배치한다 */
  source: string;
  date: string;
  title: string;
  excerpt: string;
  /** 본문. 영상 등 외부 콘텐츠는 비어 있을 수 있다 */
  paragraphs?: string[];
  /** 외부 원문 링크. 있으면 새 탭으로 보낸다 */
  link?: string;
  featured?: boolean;
}

/* 업무분야 --------------------------------------------------------- */

export interface PracticeArea {
  id: string;
  title: string;
  summary: string;
  items: string[];
  /** 해결사례 섹션에서 이 분야로 필터를 걸 때 쓰는 키 */
  caseCategory?: CaseCategory;
}
