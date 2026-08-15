export interface Lawyer {
  id: string;
  name: string;
  title: string;
  role: 'representative' | 'partner' | 'associate';
  image: string;
  education: string[];
  career: string[];
  specialties: string[];
  quote: string;
  summary: string;
  email?: string;
  phone?: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  description: string;
  subItems: string[];
  highlights: string[];
}

export interface SuccessCase {
  id: string;
  category: string;
  title: string;
  result: string;
  summary: string;
  keyPoints: string[];
  date: string;
  lawyerName: string;
  featured?: boolean;
}

export interface NewsArticle {
  id: string;
  category: '언론보도' | '칼럼' | '영상' | '공지사항';
  title: string;
  date: string;
  source: string;
  excerpt: string;
  content?: string;
  views: number;
  featured?: boolean;
  link?: string;
}

export interface ConsultationForm {
  name: string;
  phone: string;
  email?: string;
  category: string;
  preferredTime: string;
  content: string;
  privacyAgreed: boolean;
}
