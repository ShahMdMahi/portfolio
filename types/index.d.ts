// Global type definitions

// Add Lenis type declarations
declare module "@studio-freight/lenis" {
  export interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
    normalizeWheel?: boolean;
    infinite?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    destroy(): void;
    raf(time: number): void;
    scrollTo(
      target: HTMLElement | string | number,
      options?: { offset?: number; duration?: number }
    ): void;
  }
}

// Extend Window interface to include custom properties
interface Window {
  __lenis: any;
}

// Define project types
interface Project {
  title: string;
  description: string;
  url: string;
  technologies: string[];
  image: string;
  githubUrl: string;
}

interface Experience {
  company: string;
  position: string;
  years: string;
  companyLink: string;
  responsibilities: string[];
}

interface Education {
  institution: string;
  degree: string;
  years: string;
  description: string;
}

interface SkillCategory {
  category: string;
  items: {
    name: string;
    technologies: string[];
  }[];
}

interface SocialMedia {
  name: string;
  url: string;
  username: string;
}

interface PersonalInfo {
  name: string;
  nickname: string;
  title: string;
  image: string;
  dob: string;
  experience?: number;
  location: {
    address: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
  };
  contact: {
    email: string;
    phone: string;
    work: string;
    discord: string;
  };
  socialMedia: SocialMedia[];
}

// Declare global variables
declare global {
  interface Window {
    __lenis: any;
  }
}
