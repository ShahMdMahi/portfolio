export const personalInfo: PersonalInfo = {
  name: "Shah Md. Mahi",
  nickname: "Mahi",
  title: "Full-Stack Developer",
  image: "/avatar.png",
  dob: "27 September 2005",
  experience: 4,
  location: {
    address: "Narail Town Chourasta, Mohishkhola",
    city: "Sadar Narail",
    region: "Khulna",
    country: "Bangladesh",
    postalCode: "7500",
  },
  contact: {
    email: "shahmdmahi24@gmail.com",
    phone: "+8801757290258",
    work: "+8809696990258",
    discord: "shahmdmahi",
  },
  socialMedia: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/shah-md-mahi",
      username: "shah-md-mahi",
    },
    {
      name: "GitHub",
      url: "https://github.com/ShahMdMahi",
      username: "ShahMdMahi",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/shah.md.mahi13",
      username: "shah.md.mahi13",
    },
    {
      name: "X",
      url: "https://x.com/shahmdmahi_",
      username: "shahmdmahi_",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/Shah.Md.Mahi13",
      username: "Shah.Md.Mahi13",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@shahmdmahi",
      username: "@shahmdmahi",
    },
  ],
};

export const professionalSummary =
  "I am a highly skilled Full-Stack Developer with four years of hands-on experience in designing, developing, and deploying scalable, high-performance applications. My expertise spans modern front-end frameworks, advanced back-end architectures, and DevOps best practices. I am proficient in creating user-centric solutions that enhance business operations and drive digital transformation. Passionate about innovation, security, and performance optimization, I leverage cutting-edge technologies to develop efficient, secure, and seamless digital experiences.";

export const skills: SkillCategory[] = [
  {
    category: "Front-End",
    items: [
      {
        name: "Frameworks & Libraries",
        technologies: ["Next.js", "React.js", "Remix.js"],
      },
      {
        name: "Languages & Markup",
        technologies: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
      },
      {
        name: "Styling & UI",
        technologies: [
          "Tailwind CSS",
          "SASS",
          "CSS Modules",
          "Styled Components",
          "ShadCN UI",
        ],
      },
      {
        name: "State Management",
        technologies: ["TanStack", "Redux", "Context API"],
      },
    ],
  },
  {
    category: "Back-End",
    items: [
      {
        name: "Frameworks",
        technologies: ["Nest.js", "Express.js", "Node.js", "Django"],
      },
      {
        name: "API Development",
        technologies: ["RESTful APIs", "GraphQL"],
      },
      {
        name: "Architecture",
        technologies: ["Microservices", "Serverless Functions"],
      },
    ],
  },
  {
    category: "Database & Storage",
    items: [
      {
        name: "Databases",
        technologies: ["MongoDB", "PostgreSQL", "Redis", "MySQL"],
      },
      {
        name: "Data Management",
        technologies: ["NoSQL", "SQL", "ORM tools"],
      },
    ],
  },
  {
    category: "Mobile Development",
    items: [
      {
        name: "Frameworks",
        technologies: ["Flutter", "React Native", "Jetpack Compose"],
      },
      {
        name: "Platforms",
        technologies: ["iOS", "Android"],
      },
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      {
        name: "Containerization & Orchestration",
        technologies: ["Docker", "Kubernetes"],
      },
      {
        name: "CI/CD",
        technologies: ["GitHub Actions", "Jenkins", "GitLab CI"],
      },
      {
        name: "Cloud Platforms",
        technologies: ["AWS", "Google Cloud", "Azure", "Cloudflare", "VPS"],
      },
    ],
  },
  {
    category: "Testing & Quality Assurance",
    items: [
      {
        name: "Frameworks",
        technologies: ["Jest", "Mocha", "Chai"],
      },
      {
        name: "Testing Practices",
        technologies: [
          "TDD",
          "Unit Testing",
          "Integration Testing",
          "Continuous Integration",
        ],
      },
    ],
  },
  {
    category: "Version Control & Collaboration",
    items: [
      {
        name: "Tools",
        technologies: ["Git", "GitHub", "Bitbucket"],
      },
      {
        name: "Methodologies",
        technologies: ["Agile", "Scrum", "Project Management"],
      },
    ],
  },
  {
    category: "Additional Skills",
    items: [
      {
        name: "Other",
        technologies: [
          "API Integrations",
          "WebSockets",
          "Real-time Communication",
          "JWT Authentication",
          "OWASP Security Guidelines",
          "HTTPS/TLS",
          "Performance Optimization",
          "Code Refactoring",
        ],
      },
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Narail Govt. Victoria College",
    degree: "HSC (Higher Secondary Certificate)",
    years: "2023-2025",
    description: "Classes 11 & 12, HSC (2025)",
  },
  {
    institution: "Narail Govt. High School",
    degree: "SSC (Secondary School Certificate)",
    years: "2018-2023",
    description: "Classes 6 to SSC (2023)",
  },
  {
    institution: "Narail Town Primary School",
    degree: "Primary Education",
    years: "2016-2017",
    description: "Classes 4 & 5",
  },
  {
    institution: "Scholastic International School",
    degree: "Kindergarten",
    years: "2010-2015",
    description: "Play, Nursery, KG, Classes 1, 2, 3",
  },
];

export const projects: Project[] = [
  {
    title: "NRLIT Store",
    description:
      "A comprehensive eCommerce platform offering seamless shopping experiences.",
    url: "https://nrlit.store",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ShahMdMahi/nrlit-store",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio showcasing skills and projects with modern animations.",
    url: "#",
    technologies: ["Next.js", "Framer Motion", "Lenis", "Tailwind CSS"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ShahMdMahi/portfolio",
  },
  {
    title: "E-commerce",
    description:
      "A comprehensive eCommerce platform offering seamless shopping experiences.",
    url: "https://zest-bd.store",
    technologies: ["Wordpress", "Elementor", "Woodmart", "MySQL"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ShahMdMahi/zeststore",
  },
  {
    title: "Agency Website",
    description:
      "A modern website for a digital agency with a focus on user experience.",
    url: "https://royalmotion.com",
    technologies: ["Wordpress", "Elementor", "Astra", "MySQL"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ShahMdMahi/royalmotionit",
  },
];

export const experiences: Experience[] = [
  {
    company: "NRLIT",
    position: "Full-Stack Developer",
    years: "2021 - Present",
    companyLink: "https://linkedin.com/company/nrlit/",
    responsibilities: [
      "Developed and maintained scalable web and mobile applications for enhanced performance and user experience.",
      "Integrated modern front-end frameworks with advanced back-end solutions.",
      "Implemented DevOps workflows using Docker, Kubernetes, and CI/CD pipelines.",
      "Optimized system architecture to improve efficiency and reliability.",
    ],
  },
  {
    company: "RoyalMotionIT",
    position: "Web Developer",
    years: "2023 - Present",
    companyLink: "https://linkedin.com/company/royalmotionit",
    responsibilities: [
      "Built dynamic and responsive websites using the latest technologies.",
      "Enhanced website performance and optimized UI/UX for better user engagement.",
      "Collaborated with design and marketing teams to maintain brand consistency.",
    ],
  },
];
