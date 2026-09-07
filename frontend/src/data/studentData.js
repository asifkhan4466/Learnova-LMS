export const studentProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@student.learnova.edu",
  phone: "+1 (555) 234-5678",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  role: "Student",
  department: "Computer Science & Artificial Intelligence",
  headline: "Aspiring AI Application Engineer & Full-Stack Developer",
  bio: "Passionate about autonomous agent workflows, distributed cloud microservices, and modern React architectures. Currently preparing for Senior AI Software Engineer technical loops.",
  joinedDate: "January 2026",
  location: "San Francisco, CA, USA",
  learningGoal: "Complete AI Agent & Kubernetes Specializations by Q4 2026",
  education: "B.S. in Computer Science (In Progress)",
  github: "github.com/alexmorgan-dev",
  linkedin: "linkedin.com/in/alexmorgan-learnova"
};

export const studentStats = {
  totalHours: 54.5,
  weeklyHours: 14.2,
  weeklyStreak: 6,
  completedLessons: 60,
  totalLessons: 160,
  avgQuizScore: 94,
  completedCoursesCount: 1,
  inProgressCount: 2,
  notStartedCount: 1,
  certificatesCount: 1
};

export const enrolledCourses = [
  {
    id: "ai-agents-engineering",
    title: "Next-Gen AI Agents & LLM Application Engineering",
    category: "Artificial Intelligence",
    instructor: "Dr. Elena Vance",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    status: "in-progress",
    progress: 68,
    completedLessons: 36,
    totalLessons: 54,
    currentModule: "Module 3: Multi-Agent Orchestration with LangGraph",
    currentLesson: "Lesson 14: Graph-based State Machines & Human-in-the-Loop",
    duration: "8 Weeks (5 hrs/week)",
    lastAccessed: "2 hours ago",
    nextAction: "Continue Lesson 14"
  },
  {
    id: "fullstack-mern-mastery",
    title: "Modern Full-Stack Web Development with React & Node.js",
    category: "Web Development",
    instructor: "Marcus Chen",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    status: "in-progress",
    progress: 35,
    completedLessons: 24,
    totalLessons: 68,
    currentModule: "Module 2: Server-Side Development with Node & Express",
    currentLesson: "Lesson 8: Structuring Clean Express Controllers & Routers",
    duration: "10 Weeks (6 hrs/week)",
    lastAccessed: "Yesterday",
    nextAction: "Continue Lesson 8"
  },
  {
    id: "ui-ux-design-systems",
    title: "Figma to Code: Modern UI/UX Design Systems & Product Strategy",
    category: "UI/UX Design",
    instructor: "Maya Lin",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
    status: "completed",
    progress: 100,
    completedLessons: 38,
    totalLessons: 38,
    currentModule: "Course Finished",
    currentLesson: "Capstone Review Completed with Honors",
    duration: "6 Weeks",
    lastAccessed: "Completed Aug 26, 2026",
    nextAction: "View Certificate",
    certificateId: "LNV-CERT-8842-UX"
  },
  {
    id: "cloud-devops-kubernetes",
    title: "Cloud Native Architecture: Docker, Kubernetes & AWS",
    category: "Cloud & DevOps",
    instructor: "Sarah Jenkins",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    status: "not-started",
    progress: 0,
    completedLessons: 0,
    totalLessons: 42,
    currentModule: "Module 1: Docker Deep Dive & Container Best Practices",
    currentLesson: "Lesson 1: Namespaces, Cgroups, and Container Internals",
    duration: "6 Weeks (4 hrs/week)",
    lastAccessed: "Enrolled 3 days ago",
    nextAction: "Start First Lesson"
  }
];

export const studentAssignments = [
  {
    id: "assign-1",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    title: "Project 2: Autonomous Tool-Calling Agent with Validation Guardrails",
    dueDate: "Sep 12, 2026",
    status: "Pending",
    weight: "20% of final grade",
    instructions: "Implement an autonomous agent using LangChain tool calling that executes SQL query inspection, validates output against Pydantic schema, and raises self-healing fallback loops on syntax errors.",
    score: null,
    maxScore: 100
  },
  {
    id: "assign-2",
    courseId: "fullstack-mern-mastery",
    courseName: "Modern Full-Stack Web Development with React & Node.js",
    title: "Lab 3: RESTful Auth Middleware & Protected Route Guard",
    dueDate: "Sep 18, 2026",
    status: "Submitted",
    weight: "15% of final grade",
    instructions: "Write secure Express JWT verification middleware with refresh token rotation and client-side cookie storage.",
    score: null,
    maxScore: 100
  },
  {
    id: "assign-3",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    title: "Lab 1: Hybrid RAG Pipeline Benchmarking (Pinecone vs Qdrant)",
    dueDate: "Aug 24, 2026",
    status: "Graded",
    weight: "15% of final grade",
    instructions: "Benchmark dense vs sparse vector search retrieval latencies on a 100k chunk technical documentation dataset.",
    score: 96,
    maxScore: 100
  },
  {
    id: "assign-4",
    courseId: "ui-ux-design-systems",
    courseName: "Figma to Code: Modern UI/UX Design Systems & Product Strategy",
    title: "Capstone Project: Enterprise Design System Token Architecture",
    dueDate: "Aug 20, 2026",
    status: "Graded",
    weight: "35% of final grade",
    instructions: "Deliver a complete Figma component library with WCAG 2.1 AA accessible color tokens and auto-layout variations.",
    score: 98,
    maxScore: 100
  }
];

export const studentQuizzes = [
  {
    id: "quiz-1",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    title: "Module 2 Quiz: RAG Chunking, Embeddings & Vector Stores",
    questionsCount: 10,
    duration: "20 mins",
    status: "Passed",
    score: 95,
    attempts: "1 / 3",
    questions: [
      {
        question: "What is the primary advantage of Hybrid Search over pure dense vector search?",
        options: [
          "It combines keyword-based BM25 sparse search with semantic dense embeddings for higher precision on domain jargon.",
          "It reduces the vector database storage footprint by 90%.",
          "It completely prevents LLM hallucinations without prompt engineering.",
          "It eliminates the need for token chunking."
        ],
        answer: 0
      },
      {
        question: "Which component in LangGraph handles cyclic loops and conditional routing between multiple agent workers?",
        options: [
          "Static Router Map",
          "StateGraph Conditional Edges",
          "Vector Retriever",
          "Token Bucket Limiter"
        ],
        answer: 1
      },
      {
        question: "What is the purpose of Re-ranking (e.g. Cohere Rerank) after initial vector retrieval?",
        options: [
          "To translate the retrieved documents into another language.",
          "To score the top-k retrieved chunks using a cross-encoder model for optimal relevance.",
          "To compress PDF files into smaller vectors.",
          "To delete duplicate documents in PostgreSQL."
        ],
        answer: 1
      }
    ]
  },
  {
    id: "quiz-2",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    title: "Module 3 Quiz: LangGraph State Machines & Agent Supervision",
    questionsCount: 12,
    duration: "25 mins",
    status: "Available",
    score: null,
    attempts: "0 / 3",
    questions: [
      {
        question: "When designing a multi-agent system, what role does the Supervisor agent play?",
        options: [
          "It compiles Python bytecode into machine instructions.",
          "It inspects user intent, delegates tasks to specialized worker agents, and aggregates results.",
          "It manages CSS styles in the React frontend.",
          "It handles AWS billing credentials."
        ],
        answer: 1
      },
      {
        question: "How should an agent handle a Tool Execution error in a production LangGraph pipeline?",
        options: [
          "Immediately terminate the entire server without responding.",
          "Feed the error trace back into the agent context state for self-correction and retry.",
          "Ignore the error and return empty JSON.",
          "Force restart the Docker container."
        ],
        answer: 1
      }
    ]
  },
  {
    id: "quiz-3",
    courseId: "fullstack-mern-mastery",
    courseName: "Modern Full-Stack Web Development with React & Node.js",
    title: "Module 1 Quiz: ES6+ Asynchronous Patterns & React 19 Hooks",
    questionsCount: 15,
    duration: "30 mins",
    status: "Passed",
    score: 92,
    attempts: "1 / 3",
    questions: [
      {
        question: "In React 19, what is the primary benefit of the new Actions paradigm?",
        options: [
          "Automatic handling of pending states, optimistic updates, and error rollbacks for async operations.",
          "It replaces JavaScript with WebAssembly in the browser.",
          "It eliminates the DOM entirely.",
          "It allows running Express directly inside the client bundle."
        ],
        answer: 0
      }
    ]
  },
  {
    id: "quiz-4",
    courseId: "cloud-devops-kubernetes",
    courseName: "Cloud Native Architecture: Docker, Kubernetes & AWS",
    title: "Module 1 Quiz: Container Isolation & Multi-Stage Builds",
    questionsCount: 10,
    duration: "20 mins",
    status: "Not Started",
    score: null,
    attempts: "0 / 3",
    questions: [
      {
        question: "Which Linux kernel feature provides process isolation and private process trees for Docker containers?",
        options: [
          "Namespaces (pid, net, ipc, mnt, uts)",
          "Control Groups (cgroups)",
          "Swap Partitioning",
          "GRUB Bootloader"
        ],
        answer: 0
      }
    ]
  }
];

export const studentCertificates = [
  {
    id: "cert-1",
    certificateId: "LNV-CERT-8842-UX",
    courseId: "ui-ux-design-systems",
    courseTitle: "Figma to Code: Modern UI/UX Design Systems & Product Strategy",
    category: "UI/UX Design",
    issueDate: "August 26, 2026",
    recipientName: "Alex Morgan",
    instructorName: "Maya Lin",
    instructorTitle: "Head of Product Design, StudioFlow UI",
    grade: "98% (High Distinction)",
    skillsCovered: ["Figma Systems", "Design Tokens", "WCAG 2.1 AA Accessibility", "Component Libraries", "UX Research"],
    verificationUrl: "https://learnova.edu/verify/LNV-CERT-8842-UX"
  }
];

export const weeklyActivity = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.0 },
  { day: "Fri", hours: 2.8 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 0.4 }
];
