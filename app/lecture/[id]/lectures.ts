export interface Chapter {
    id: number;
    title: string;
    duration: string;
    videoUrl: string;
    description: string;
    isFree: boolean;
  }
  
  export interface Instructor {
    name: string;
    bio: string;
    avatar: string;
    experience: string;
    specialties: string[];
  }
  
  export interface Lecture {
    id: number;
    badge: string;
    title: string;
    instructor: Instructor;
    description: string;
    detailedDescription: string;
    rating: number | null;
    reviews: number | null;
    category: string;
    image: string;
    isNew?: boolean;
    url: string;
    
    // 상세 페이지용 추가 정보
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    language: string;
    lastUpdated: string;
    enrolledStudents: number;
    price: {
      original: number;
      discounted?: number;
      currency: string;
    };
    
    // 학습 정보
    learningOutcomes: string[];
    prerequisites: string[];
    tags: string[];
    
    // 커리큘럼
    chapters: Chapter[];
    
    // 추가 정보
    certificateProvided: boolean;
    hasSubtitles: boolean;
    supportedDevices: string[];
  }
  
  export const lectures: Lecture[] = [
    {
      id: 1,
      badge: "웹개발",
      title: "개발 몰라도 AI로 3시간이면 웹사이트 코딩 가능",
      instructor: {
        name: "데모데브",
        bio: "실무 10년차 풀스택 개발자이자 AI 도구 전문가입니다. 복잡한 개발을 쉽게 설명하는 것을 좋아합니다.",
        avatar: "/instructor-avatar-1.jpg",
        experience: "10년",
        specialties: ["웹개발", "AI 도구", "React", "Next.js"]
      },
      description: "AI 도구를 활용해 개발 지식 없이도 3시간 만에 완성도 높은 웹사이트를 만드는 방법을 배웁니다.",
      detailedDescription: `
        이 강의는 코딩을 전혀 모르는 분들도 AI의 도움을 받아 실제 웹사이트를 만들 수 있도록 설계되었습니다. 
        
        ChatGPT, Claude, Cursor 등 최신 AI 도구들을 실전에서 어떻게 활용하는지 단계별로 학습하며, 
        실습을 통해 랜딩 페이지부터 간단한 쇼핑몰까지 다양한 웹사이트를 직접 만들어보게 됩니다.
        
        특히 이 강의의 핵심은 AI와 대화하는 방법, 즉 '프롬프트 엔지니어링'입니다. 
        올바른 질문과 요청으로 AI가 원하는 코드를 정확히 생성하도록 하는 노하우를 전수합니다.
      `,
      rating: 4.96,
      reviews: 4446,
      category: "웹개발",
      image: "https://img.youtube.com/vi/VIHDmUJY4f0/maxresdefault.jpg",
      isNew: true,
      url: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
      
      duration: "3시간 15분",
      level: "beginner",
      language: "한국어",
      lastUpdated: "2024년 1월",
      enrolledStudents: 12450,
      price: {
        original: 49000,
        discounted: 29000,
        currency: "KRW"
      },
      
      learningOutcomes: [
        "AI 도구(ChatGPT, Claude, Cursor)를 활용한 웹 개발 방법",
        "효과적인 프롬프트 작성 및 AI와의 협업 스킬",
        "HTML, CSS, JavaScript 기초 이해",
        "반응형 웹사이트 제작 실습",
        "웹 호스팅 및 도메인 연결 방법",
        "실제 프로젝트 배포까지의 전 과정"
      ],
      prerequisites: [
        "컴퓨터 기초 사용 능력",
        "인터넷 검색 및 파일 관리 가능",
        "학습 의지와 호기심"
      ],
      tags: ["AI", "웹개발", "초보자", "ChatGPT", "Cursor", "노코드"],
      
      chapters: [
        {
          id: 1,
          title: "AI 도구 소개 및 환경 설정",
          duration: "25분",
          videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
          description: "ChatGPT, Claude, Cursor 등 AI 도구 소개 및 개발 환경 설정",
          isFree: true
        },
        {
          id: 2,
          title: "첫 번째 웹페이지 만들기",
          duration: "35분",
          videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
          description: "AI와 함께 간단한 HTML 페이지 작성하기",
          isFree: true
        },
        {
          id: 3,
          title: "CSS로 디자인 꾸미기",
          duration: "40분",
          videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
          description: "AI를 활용한 CSS 스타일링 및 반응형 디자인",
          isFree: false
        },
        {
          id: 4,
          title: "JavaScript로 동적 기능 추가",
          duration: "45분",
          videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
          description: "AI 도움으로 인터랙티브한 웹페이지 만들기",
          isFree: false
        },
        {
          id: 5,
          title: "실전 프로젝트: 랜딩 페이지 완성",
          duration: "50분",
          videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
          description: "실제 비즈니스에서 사용할 수 있는 랜딩 페이지 제작",
          isFree: false
        }
      ],
      
      certificateProvided: true,
      hasSubtitles: true,
      supportedDevices: ["PC", "모바일", "태블릿"]
    },
    {
      id: 2,
      badge: "웹개발",
      title: "바이브 코딩, 반드시 알아야 하는 것",
      instructor: {
        name: "바이브 코딩",
        bio: "실무 중심의 개발 교육으로 유명한 개발자입니다. 복잡한 개념을 쉽게 풀어서 설명하는 것이 특기입니다.",
        avatar: "/instructor-avatar-2.jpg",
        experience: "8년",
        specialties: ["React", "Node.js", "풀스택 개발", "실무 팁"]
      },
      description: "실무에서 바로 써먹을 수 있는 핵심적인 웹 개발 지식과 노하우를 배웁니다.",
      detailedDescription: `
        8년간의 실무 경험을 바탕으로 한 진짜 개발 이야기입니다.
        
        이론보다는 실무에서 정말 필요한 것들, 면접에서 자주 나오는 질문들,
        신입 개발자가 꼭 알아야 할 핵심 개념들을 중심으로 구성했습니다.
        
        특히 많은 개발자들이 놓치기 쉬운 기본기와 실무 팁들을 
        생생한 경험담과 함께 전달합니다.
      `,
      rating: 4.67,
      reviews: 1252,
      category: "웹개발",
      image: "https://img.youtube.com/vi/z4HfvrPA_kI/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
      
      duration: "2시간 45분",
      level: "intermediate",
      language: "한국어",
      lastUpdated: "2023년 12월",
      enrolledStudents: 8934,
      price: {
        original: 39000,
        discounted: 25000,
        currency: "KRW"
      },
      
      learningOutcomes: [
        "실무에서 바로 사용하는 개발 패턴과 기법",
        "코드 리뷰 및 협업 방법",
        "성능 최적화 기본기",
        "디버깅 및 문제 해결 능력",
        "개발자 면접 대비 핵심 지식",
        "실무 프로젝트 경험 공유"
      ],
      prerequisites: [
        "HTML, CSS, JavaScript 기초 지식",
        "간단한 웹 프로젝트 경험",
        "개발에 대한 기본적인 이해"
      ],
      tags: ["실무", "웹개발", "면접", "코딩테스트", "협업", "성능최적화"],
      
      chapters: [
        {
          id: 1,
          title: "실무 개발자의 하루",
          duration: "20분",
          videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
          description: "실제 개발팀에서의 업무 흐름과 협업 방식",
          isFree: true
        },
        {
          id: 2,
          title: "코드 리뷰의 기술",
          duration: "35분",
          videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
          description: "효과적인 코드 리뷰 방법과 피드백 주고받기",
          isFree: false
        },
        {
          id: 3,
          title: "성능 최적화 핵심 원리",
          duration: "40분",
          videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
          description: "웹 성능 개선을 위한 핵심 기법들",
          isFree: false
        },
        {
          id: 4,
          title: "디버깅 마스터하기",
          duration: "30분",
          videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
          description: "효율적인 디버깅 방법과 도구 활용",
          isFree: false
        },
        {
          id: 5,
          title: "면접 대비 핵심 질문들",
          duration: "40분",
          videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
          description: "자주 나오는 면접 질문과 모범 답안",
          isFree: false
        }
      ],
      
      certificateProvided: true,
      hasSubtitles: true,
      supportedDevices: ["PC", "모바일", "태블릿"]
    },
    {
      id: 3,
      badge: "BEST",
      title: "개발 아예 몰라도 커서로 AI 서비스 만들기",
      instructor: {
        name: "AI 서비스 전문가",
        bio: "AI 스타트업에서 5년간 제품 개발을 담당했으며, 비개발자도 쉽게 AI 서비스를 만들 수 있는 방법을 연구합니다.",
        avatar: "/instructor-avatar-3.jpg",
        experience: "5년",
        specialties: ["AI 서비스", "Cursor", "노코드", "프로덕트"]
      },
      description: "Cursor AI를 활용해서 개발 지식 없이도 실제 서비스할 수 있는 AI 애플리케이션을 만들어봅니다.",
      detailedDescription: `
        프로그래밍을 전혀 모르는 상태에서도 Cursor AI의 도움을 받아 
        실제로 사용자들이 이용할 수 있는 AI 서비스를 만드는 과정을 다룹니다.
        
        단순한 토이 프로젝트가 아닌, 실제 배포하고 사용자를 받을 수 있는 
        수준의 웹 애플리케이션을 완성하는 것이 목표입니다.
        
        AI 도구의 발전으로 이제 아이디어만 있다면 누구나 서비스를 만들 수 있는 
        시대가 되었습니다. 이 강의로 그 가능성을 직접 경험해보세요.
      `,
      rating: 4.89,
      reviews: 394,
      category: "AI/머신러닝",
      image: "https://img.youtube.com/vi/NLn2klcB-F0/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=NLn2klcB-F0",
      
      duration: "4시간 30분",
      level: "beginner",
      language: "한국어",
      lastUpdated: "2024년 2월",
      enrolledStudents: 3247,
      price: {
        original: 69000,
        discounted: 45000,
        currency: "KRW"
      },
      
      learningOutcomes: [
        "Cursor AI 도구 완벽 활용법",
        "AI 서비스 기획 및 설계 방법",
        "실제 배포 가능한 웹 애플리케이션 개발",
        "사용자 인증 및 데이터베이스 연동",
        "서비스 배포 및 도메인 연결",
        "수익화 전략 및 비즈니스 모델"
      ],
      prerequisites: [
        "기본적인 컴퓨터 사용 능력",
        "AI 서비스에 대한 관심",
        "창업이나 사이드 프로젝트에 대한 의지"
      ],
      tags: ["AI", "Cursor", "노코드", "창업", "서비스개발", "배포"],
      
      chapters: [
        {
          id: 1,
          title: "Cursor AI 완벽 가이드",
          duration: "45분",
          videoUrl: "https://www.youtube.com/watch?v=NLn2klcB-F0",
          description: "Cursor 설치부터 고급 기능까지 완벽 마스터",
          isFree: true
        },
        {
          id: 2,
          title: "AI 서비스 아이디어 발굴",
          duration: "30분",
          videoUrl: "https://www.youtube.com/watch?v=NLn2klcB-F0",
          description: "시장성 있는 AI 서비스 아이디어 찾기",
          isFree: true
        },
        {
          id: 3,
          title: "프론트엔드 개발 실습",
          duration: "70분",
          videoUrl: "https://www.youtube.com/watch?v=NLn2klcB-F0",
          description: "React를 활용한 사용자 인터페이스 구축",
          isFree: false
        },
        {
          id: 4,
          title: "백엔드 API 개발",
          duration: "60분",
          videoUrl: "https://www.youtube.com/watch?v=NLn2klcB-F0",
          description: "Node.js와 데이터베이스 연동하기",
          isFree: false
        },
        {
          id: 5,
          title: "AI 모델 통합하기",
          duration: "50분",
          videoUrl: "https://www.youtube.com/watch?v=NLn2klcB-F0",
          description: "OpenAI API 및 다양한 AI 서비스 연동",
          isFree: false
        },
        {
          id: 6,
          title: "서비스 배포 및 운영",
          duration: "35분",
          videoUrl: "https://www.youtube.com/watch?v=NLn2klcB-F0",
          description: "Vercel, AWS를 활용한 서비스 배포",
          isFree: false
        }
      ],
      
      certificateProvided: true,
      hasSubtitles: true,
      supportedDevices: ["PC", "모바일", "태블릿"]
    },
    {
      id: 4,
      badge: "앱개발",
      title: "풀스택 앱 처음부터 끝까지? 바이브 코딩으로 직접 보여드립니다",
      instructor: {
        name: "바이브 코딩",
        bio: "모바일 앱 개발 전문가로, React Native와 Flutter를 활용한 크로스플랫폼 개발에 특화되어 있습니다.",
        avatar: "/instructor-avatar-2.jpg",
        experience: "7년",
        specialties: ["React Native", "Flutter", "풀스택", "앱스토어 출시"]
      },
      description: "실제 앱스토어에 출시할 수 있는 수준의 모바일 앱을 처음부터 끝까지 완성하는 전 과정을 다룹니다.",
      detailedDescription: `
        모바일 앱 개발의 A to Z를 모두 경험할 수 있는 완성형 강의입니다.
        
        기획부터 디자인, 개발, 테스트, 배포까지 실제 앱 출시에 필요한 
        모든 과정을 단계별로 따라하며 학습합니다.
        
        React Native를 기반으로 iOS와 Android 모두에서 동작하는 
        크로스플랫폼 앱을 개발하며, 실제 사용자가 사용할 수 있는 
        수준의 완성도를 목표로 합니다.
      `,
      rating: 4.93,
      reviews: 344,
      category: "앱개발",
      image: "https://img.youtube.com/vi/px3DyO18yMc/maxresdefault.jpg",
      url: "https://youtu.be/px3DyO18yMc",
      
      duration: "6시간 20분",
      level: "intermediate",
      language: "한국어",
      lastUpdated: "2024년 1월",
      enrolledStudents: 2156,
      price: {
        original: 89000,
        discounted: 59000,
        currency: "KRW"
      },
      
      learningOutcomes: [
        "React Native를 활용한 크로스플랫폼 앱 개발",
        "Firebase를 이용한 백엔드 서비스 구축",
        "사용자 인증 및 실시간 데이터 동기화",
        "푸시 알림 및 딥링크 구현",
        "앱스토어 및 플레이스토어 출시 과정",
        "앱 성능 최적화 및 테스팅"
      ],
      prerequisites: [
        "JavaScript 기초 지식",
        "React 기본 이해",
        "모바일 앱 개발에 대한 관심",
        "개발 환경 설정 가능"
      ],
      tags: ["React Native", "모바일앱", "풀스택", "Firebase", "앱스토어", "크로스플랫폼"],
      
      chapters: [
        {
          id: 1,
          title: "개발 환경 설정 및 프로젝트 초기화",
          duration: "40분",
          videoUrl: "https://youtu.be/px3DyO18yMc",
          description: "React Native 개발 환경 구축 및 첫 번째 앱 생성",
          isFree: true
        },
        {
          id: 2,
          title: "UI/UX 디자인 및 네비게이션",
          duration: "55분",
          videoUrl: "https://youtu.be/px3DyO18yMc",
          description: "앱의 전체적인 디자인과 화면 간 이동 구현",
          isFree: false
        },
        {
          id: 3,
          title: "Firebase 백엔드 연동",
          duration: "65분",
          videoUrl: "https://youtu.be/px3DyO18yMc",
          description: "사용자 인증, 데이터베이스, 스토리지 연동",
          isFree: false
        },
        {
          id: 4,
          title: "핵심 기능 개발",
          duration: "80분",
          videoUrl: "https://youtu.be/px3DyO18yMc",
          description: "앱의 주요 기능들을 하나씩 구현해보기",
          isFree: false
        },
        {
          id: 5,
          title: "성능 최적화 및 테스팅",
          duration: "45분",
          videoUrl: "https://youtu.be/px3DyO18yMc",
          description: "앱 성능 개선과 다양한 테스트 방법",
          isFree: false
        },
        {
          id: 6,
          title: "앱스토어 출시 준비",
          duration: "35분",
          videoUrl: "https://youtu.be/px3DyO18yMc",
          description: "iOS App Store, Google Play Store 출시 과정",
          isFree: false
        }
      ],
      
      certificateProvided: true,
      hasSubtitles: true,
      supportedDevices: ["PC", "모바일", "태블릿"]
    }
  ];
  
  // 레벨별 한글 변환 함수
  export function getLevelText(level: Lecture['level']): string {
    const levelMap = {
      beginner: '초급',
      intermediate: '중급',
      advanced: '고급'
    };
    return levelMap[level];
  }
  
  // 가격 포맷팅 함수
  export function formatPrice(price: Lecture['price']): string {
    const formatter = new Intl.NumberFormat('ko-KR');
    if (price.discounted) {
      return `${formatter.format(price.discounted)}원`;
    }
    return `${formatter.format(price.original)}원`;
  }
  
  // 할인율 계산 함수
  export function getDiscountRate(price: Lecture['price']): number | null {
    if (!price.discounted) return null;
    return Math.round(((price.original - price.discounted) / price.original) * 100);
  } 
