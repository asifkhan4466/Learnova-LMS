// LEARNOVA TEACHER STUDIO MOCK DATA
export const teacherProfile = {
  name: "Dr. Elena Vance",
  role: "Lead AI Instructor & Curriculum Director",
  email: "elena.vance@faculty.learnova.edu",
  phone: "+1 (555) 349-8102",
  location: "San Francisco, CA, USA",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
  department: "School of Artificial Intelligence & Distributed Systems",
  joinedDate: "September 2024",
  headline: "Principal AI Architect & Former Research Lead | Teaching LLM Orchestration and Scalable Cloud Systems",
  bio: "Dr. Elena Vance has over 14 years of research and production engineering experience spanning OpenAI API integration, LangGraph stateful multi-agent workflows, and distributed transformer infrastructure. At Learnova, she leads the AI Engineering curriculum designed to transform software developers into elite autonomous systems practitioners.",
  expertise: [
    "Autonomous Agent Workflows",
    "LangGraph & LangChain",
    "Transformer Architectures",
    "PyTorch Deep Learning",
    "Vector Search & Hybrid RAG",
    "Distributed Kubernetes"
  ],
  socialLinks: {
    website: "https://elenavance.ai",
    linkedin: "linkedin.com/in/elena-vance-ai",
    github: "github.com/evance-research",
    scholar: "scholar.google.com/citations?user=elena-vance"
  }
};

export const teacherStats = {
  totalStudents: 48920,
  publishedCourses: 4,
  draftCourses: 1,
  inReviewCourses: 1,
  overallRating: 4.92,
  ratingCount: 12450,
  monthlyEarnings: 34250,
  totalEarnings: 284600,
  pendingGrading: 8,
  upcomingLive: 2
};

export const teacherCourses = [
  {
    id: "ai-agents-engineering",
    title: "Next-Gen AI Agents & LLM Application Engineering",
    subtitle: "Build enterprise autonomous agents, multi-agent LangGraph workflows, and self-correcting code loops",
    status: "published",
    studentsCount: 24580,
    rating: 4.95,
    reviewsCount: 6420,
    price: 89.99,
    category: "Artificial Intelligence",
    level: "Advanced",
    language: "English (US)",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    modulesCount: 4,
    lessonsCount: 16,
    description: "Master production-grade autonomous agent systems, multi-agent orchestration with LangGraph, tool invocation schemas, and hybrid vector RAG pipelines.",
    outcomes: [
      "Architect autonomous agents with structured tool calling & validation guardrails",
      "Construct cyclic multi-agent supervisors using LangGraph state graphs",
      "Deploy self-correcting code and SQL generation pipelines",
      "Benchmark dense vs sparse vector search at scale"
    ],
    prerequisites: [
      "Solid understanding of Python 3.10+ async syntax",
      "Familiarity with REST APIs and basic machine learning concepts",
      "Foundational experience with Docker containers"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Foundations of Autonomous Agents & Function Calling",
        lessons: [
          { id: "l-1", title: "Introduction to Agentic Architectures vs Traditional Chains", duration: "18 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { id: "l-2", title: "Tool Calling Specs & Pydantic Schema Validation", duration: "25 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { id: "l-3", title: "Handling Hallucinations with Self-Consistency Guardrails", duration: "32 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { id: "l-4", title: "Hands-on Lab: Writing Your First Tool-Augmented Agent", duration: "45 mins", type: "lab", videoUrl: "" }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Advanced Retrieval-Augmented Generation (Hybrid RAG)",
        lessons: [
          { id: "l-5", title: "Chunking Strategies: Semantic vs Recursive Token Splitting", duration: "22 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { id: "l-6", title: "BM25 Sparse Retrieval Combined with Dense Embeddings", duration: "28 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { id: "l-7", title: "Re-ranking Pipeline Benchmark: Cohere vs Cross-Encoders", duration: "34 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { id: "l-8", title: "Lab: Production Pinecone & Qdrant Index Deployment", duration: "50 mins", type: "lab", videoUrl: "" }
        ]
      },
      {
        id: "mod-3",
        title: "Module 3: Multi-Agent Orchestration with LangGraph",
        lessons: [
          { id: "l-9", title: "StateGraph Concepts: Nodes, Edges & Reducers", duration: "30 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { id: "l-10", title: "Supervisor Pattern: Delegating to Specialized Workers", duration: "38 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { id: "l-11", title: "Human-in-the-Loop Interrupts & State Checkpointing", duration: "26 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { id: "l-12", title: "Lab: Multi-Agent Software Development Team", duration: "60 mins", type: "lab", videoUrl: "" }
        ]
      },
      {
        id: "mod-4",
        title: "Module 4: Enterprise Productionization & Observability",
        lessons: [
          { id: "l-13", title: "Tracing & Token Auditing with LangSmith & OpenTelemetry", duration: "24 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { id: "l-14", title: "Rate-Limiting, Fallback Providers & Circuit Breakers", duration: "28 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { id: "l-15", title: "Docker Containerization & Kubernetes Helm Deployment", duration: "35 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { id: "l-16", title: "Capstone Project Evaluation & Certification Criteria", duration: "20 mins", type: "text", videoUrl: "" }
        ]
      }
    ]
  },
  {
    id: "deep-learning-nlp-transformers",
    title: "Deep Learning, PyTorch & Transformer Models from Scratch",
    subtitle: "From tensors to multi-head self-attention, rotary embeddings, and fine-tuning BERT & GPT architectures",
    status: "published",
    studentsCount: 18340,
    rating: 4.91,
    reviewsCount: 4120,
    price: 79.99,
    category: "Machine Learning",
    level: "Intermediate to Advanced",
    language: "English (US)",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
    modulesCount: 5,
    lessonsCount: 20,
    description: "Deep mathematical and engineering exploration into modern neural networks, backprop calculus, PyTorch autograd engine, and implementing Transformer encoder-decoder blocks.",
    outcomes: ["Build PyTorch neural networks", "Implement Multi-Head Attention", "Pre-train and fine-tune language models"],
    prerequisites: ["Python fundamentals", "Linear algebra basics"],
    modules: []
  },
  {
    id: "rag-vector-engineering",
    title: "Enterprise Retrieval-Augmented Generation (RAG) at Scale",
    subtitle: "Production indexing, reranking models, metadata filtering, and semantic caching",
    status: "published",
    studentsCount: 6000,
    rating: 4.89,
    reviewsCount: 1910,
    price: 69.99,
    category: "Artificial Intelligence",
    level: "Advanced",
    language: "English (US)",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    modulesCount: 3,
    lessonsCount: 12,
    description: "Architect high-performance retrieval pipelines handling millions of documents with sub-100ms retrieval latency.",
    outcomes: ["Deploy enterprise vector databases", "Implement semantic cache with Redis"],
    prerequisites: ["Python", "SQL knowledge"],
    modules: []
  },
  {
    id: "autonomous-agents-in-prod",
    title: "Autonomous Multi-Agent Systems in Production (2026 Edition)",
    subtitle: "Decentralized consensus, tool reflection, and long-term memory architectures",
    status: "in-review",
    studentsCount: 0,
    rating: 0,
    reviewsCount: 0,
    price: 94.99,
    category: "AI Engineering",
    level: "Expert",
    language: "English (US)",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    modulesCount: 4,
    lessonsCount: 15,
    description: "Pending final review by the Learnova Academic Board for Q4 release.",
    outcomes: ["Design production consensus agents", "Handle memory persistence across sessions"],
    prerequisites: ["Next-Gen AI Agents course completion"],
    modules: []
  },
  {
    id: "fine-tuning-slms",
    title: "Small Language Models (SLMs) Fine-Tuning with LoRA & Unsloth",
    subtitle: "Run 7B/8B models efficiently on consumer hardware with 4-bit quantization",
    status: "draft",
    studentsCount: 0,
    rating: 0,
    reviewsCount: 0,
    price: 64.99,
    category: "Machine Learning",
    level: "Intermediate",
    language: "English (US)",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    modulesCount: 2,
    lessonsCount: 8,
    description: "Draft syllabus currently in progress.",
    outcomes: ["Fine-tune models using LoRA and QLoRA", "Deploy quantized models locally"],
    prerequisites: ["Python and PyTorch basics"],
    modules: []
  }
];

export const teacherStudents = [
  {
    id: "stu-1",
    name: "Alex Morgan",
    email: "alex.morgan@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    enrolledDate: "Jan 14, 2026",
    progress: 68,
    grade: "96%",
    status: "Top Performer",
    lastActive: "2 hours ago"
  },
  {
    id: "stu-2",
    name: "Sophia Martinez",
    email: "sophia.m@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    enrolledDate: "Jan 18, 2026",
    progress: 82,
    grade: "98%",
    status: "Top Performer",
    lastActive: "Today"
  },
  {
    id: "stu-3",
    name: "David Kim",
    email: "d.kim@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    courseId: "deep-learning-nlp-transformers",
    courseName: "Deep Learning, PyTorch & Transformer Models",
    enrolledDate: "Feb 02, 2026",
    progress: 45,
    grade: "88%",
    status: "On Track",
    lastActive: "Yesterday"
  },
  {
    id: "stu-4",
    name: "Chloe Bennett",
    email: "c.bennett@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    enrolledDate: "Jan 28, 2026",
    progress: 24,
    grade: "74%",
    status: "Needs Attention",
    lastActive: "4 days ago"
  },
  {
    id: "stu-5",
    name: "Liam O'Connor",
    email: "liam.oc@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    courseId: "rag-vector-engineering",
    courseName: "Enterprise Retrieval-Augmented Generation (RAG)",
    enrolledDate: "Jan 10, 2026",
    progress: 95,
    grade: "99%",
    status: "Top Performer",
    lastActive: "1 hour ago"
  },
  {
    id: "stu-6",
    name: "Priya Sharma",
    email: "priya.s@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    courseId: "deep-learning-nlp-transformers",
    courseName: "Deep Learning, PyTorch & Transformer Models",
    enrolledDate: "Feb 12, 2026",
    progress: 62,
    grade: "91%",
    status: "On Track",
    lastActive: "3 hours ago"
  },
  {
    id: "stu-7",
    name: "Ethan Zhang",
    email: "ezhang@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    enrolledDate: "Feb 05, 2026",
    progress: 18,
    grade: "68%",
    status: "Needs Attention",
    lastActive: "6 days ago"
  }
];

export const teacherAssignments = [
  {
    id: "assign-1",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    title: "Project 2: Autonomous Tool-Calling Agent with Validation Guardrails",
    dueDate: "Sep 12, 2026",
    totalSubmissions: 142,
    pendingGrading: 8,
    gradedCount: 134,
    submissions: [
      {
        id: "sub-1",
        studentName: "Alex Morgan",
        studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        submittedDate: "Sep 04, 2026, 4:20 PM",
        repoUrl: "github.com/alexmorgan-dev/langgraph-tool-caller",
        codeSnippet: `class AutonomousAgent:
    def __init__(self, tools, schema_validator):
        self.tools = tools
        self.validator = schema_validator
        self.state_graph = StateGraph(AgentState)

    def execute_with_guardrails(self, prompt):
        result = self.supervisor.invoke({'input': prompt})
        validated = self.validator.parse_obj(result)
        return validated`,
        status: "Pending",
        score: null,
        feedback: ""
      },
      {
        id: "sub-2",
        studentName: "Sophia Martinez",
        studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
        submittedDate: "Sep 03, 2026, 8:15 PM",
        repoUrl: "github.com/smartinez-ai/autonomous-db-guard",
        codeSnippet: `def handle_retry_loop(state: AgentState):
    if state.error_count > 3:
        return 'human_review'
    return 'self_correct'`,
        status: "Graded",
        score: 98,
        feedback: "Exceptional architecture design! Elegant recursive fallbacks with zero hallucinated tool args."
      }
    ]
  },
  {
    id: "assign-2",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    title: "Lab 1: Hybrid RAG Pipeline Benchmarking (Pinecone vs Qdrant)",
    dueDate: "Aug 24, 2026",
    totalSubmissions: 188,
    pendingGrading: 0,
    gradedCount: 188,
    submissions: []
  },
  {
    id: "assign-3",
    courseId: "deep-learning-nlp-transformers",
    courseName: "Deep Learning, PyTorch & Transformer Models",
    title: "Milestone 1: Rotary Position Embeddings (RoPE) Mathematical Implementation",
    dueDate: "Sep 15, 2026",
    totalSubmissions: 96,
    pendingGrading: 5,
    gradedCount: 91,
    submissions: [
      {
        id: "sub-3",
        studentName: "David Kim",
        studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        submittedDate: "Sep 04, 2026, 11:45 PM",
        repoUrl: "github.com/davidkim/rope-pytorch",
        codeSnippet: `def precompute_freqs_cis(dim: int, end: int, theta: float = 10000.0):
    freqs = 1.0 / (theta ** (torch.arange(0, dim, 2)[: (dim // 2)].float() / dim))
    t = torch.arange(end, device=freqs.device)
    freqs = torch.outer(t, freqs).float()
    freqs_cis = torch.polar(torch.ones_like(freqs), freqs)
    return freqs_cis`,
        status: "Pending",
        score: null,
        feedback: ""
      }
    ]
  }
];

export const teacherQuizzes = [
  {
    id: "quiz-1",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    title: "Module 2 Quiz: RAG Chunking, Embeddings & Vector Stores",
    questionsCount: 10,
    duration: "20 mins",
    passingScore: 70,
    averageScore: 89,
    attemptsCount: 312,
    passRate: "92%",
    questions: [
      {
        id: "q-1",
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
        id: "q-2",
        question: "Which component in LangGraph handles cyclic loops and conditional routing between multiple agent workers?",
        options: [
          "Static Router Map",
          "StateGraph Conditional Edges",
          "Vector Retriever",
          "Token Bucket Limiter"
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
    passingScore: 70,
    averageScore: 86,
    attemptsCount: 280,
    passRate: "88%",
    questions: [
      {
        id: "q-3",
        question: "When designing a multi-agent system, what role does the Supervisor agent play?",
        options: [
          "It compiles Python bytecode into machine instructions.",
          "It inspects user intent, delegates tasks to specialized worker agents, and aggregates results.",
          "It manages CSS styles in the React frontend.",
          "It handles AWS billing credentials."
        ],
        answer: 1
      }
    ]
  }
];

export const teacherGradebook = [
  {
    studentId: "stu-1",
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    course: "Next-Gen AI Agents",
    assign1: 96,
    assign2: 95,
    quiz1: 95,
    quiz2: 92,
    overall: 95,
    letterGrade: "A",
    status: "Honors"
  },
  {
    studentId: "stu-2",
    name: "Sophia Martinez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    course: "Next-Gen AI Agents",
    assign1: 98,
    assign2: 97,
    quiz1: 98,
    quiz2: 95,
    overall: 97,
    letterGrade: "A+",
    status: "Honors"
  },
  {
    studentId: "stu-3",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    course: "Deep Learning Transformers",
    assign1: 88,
    assign2: 85,
    quiz1: 90,
    quiz2: 84,
    overall: 87,
    letterGrade: "B+",
    status: "Passing"
  },
  {
    studentId: "stu-4",
    name: "Chloe Bennett",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    course: "Next-Gen AI Agents",
    assign1: 72,
    assign2: 74,
    quiz1: 76,
    quiz2: 70,
    overall: 73,
    letterGrade: "C+",
    status: "At Risk"
  },
  {
    studentId: "stu-5",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    course: "Enterprise RAG",
    assign1: 99,
    assign2: 98,
    quiz1: 98,
    quiz2: 100,
    overall: 99,
    letterGrade: "A+",
    status: "Honors"
  }
];

export const teacherLiveClasses = [
  {
    id: "live-1",
    title: "Live Lab: Debugging Multi-Agent Cyclic Deadlocks in LangGraph",
    course: "Next-Gen AI Agents & LLM Application Engineering",
    dateTime: "Tomorrow at 10:00 AM PST",
    duration: "90 mins",
    enrolledAttendees: 340,
    status: "upcoming",
    agenda: "Hands-on debugging session dissecting worker infinite recursion, conditional edge loops, and configuring human-in-the-loop fallback nodes."
  },
  {
    id: "live-2",
    title: "Office Hours: Vector Database Partitioning & Hybrid Benchmarks",
    course: "Enterprise Retrieval-Augmented Generation (RAG) at Scale",
    dateTime: "Sep 10, 2026 at 2:00 PM PST",
    duration: "60 mins",
    enrolledAttendees: 215,
    status: "upcoming",
    agenda: "Open Q&A addressing dense vs sparse hybrid search latencies and memory management in Pinecone and Qdrant clusters."
  },
  {
    id: "live-3",
    title: "Masterclass: Pretraining Llama-style Attention Modules from Scratch",
    course: "Deep Learning, PyTorch & Transformer Models",
    dateTime: "Aug 28, 2026 (Completed)",
    duration: "110 mins",
    enrolledAttendees: 520,
    status: "completed",
    recordingAvailable: true
  }
];

export const teacherRecordings = [
  {
    id: "rec-1",
    title: "Masterclass: Pretraining Llama-style Attention Modules from Scratch",
    course: "Deep Learning, PyTorch & Transformer Models",
    chapter: "Module 2: Self-Attention Mechanics",
    date: "Aug 28, 2026",
    duration: "1 hr 50 mins",
    views: 1240,
    fileSize: "1.4 GB",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "rec-2",
    title: "Workshop: Building Stateful Supervisor Agents with LangGraph Checkpointers",
    course: "Next-Gen AI Agents & LLM Application Engineering",
    chapter: "Module 3: Multi-Agent Systems",
    date: "Aug 15, 2026",
    duration: "1 hr 25 mins",
    views: 2150,
    fileSize: "1.1 GB",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "rec-3",
    title: "Deep Dive: Evaluating Retrieval Accuracy with Ragas & TruLens",
    course: "Enterprise Retrieval-Augmented Generation (RAG) at Scale",
    chapter: "Module 1: Production Indexing",
    date: "Jul 30, 2026",
    duration: "58 mins",
    views: 1890,
    fileSize: "780 MB",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }
];
