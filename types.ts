
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  isFuture?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  details: string;
}

export interface SocialLink {
  platform: 'LinkedIn' | 'GitHub' | 'Email';
  username: string;
  url: string;
  icon?: any;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    about: string;
    avatarUrl: string;
    avatarHoverUrl?: string;
  };
  socials: SocialLink[];
  clearance: string;
  education: EducationItem[];
  certificates: CertificateItem[];
  skills: string[]; // Simplified list as per image
  languages: string[];
  experience: ExperienceItem[];
}
