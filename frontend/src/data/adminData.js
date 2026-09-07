// LEARNOVA ADMIN CONSOLE MOCK DATA
export const adminProfile = {
  name: "Dr. Marcus Vance",
  role: "Chief Technology Officer & Root Admin",
  email: "admin.root@learnova.edu",
  phone: "+1 (555) 901-4421",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
  securityClearance: "Level 5 (Superuser / Full Authority)",
  lastLogin: "Today at 08:14 AM (IP: 192.168.1.104)",
  twoFactorEnabled: true
};

export const adminStats = {
  totalStudents: 150420,
  newStudentsToday: 142,
  totalTeachers: 1240,
  pendingTeacherApprovals: 6,
  totalCourses: 452,
  pendingCourseApprovals: 8,
  activeEnrollments: 328900,
  liveClassesRunning: 14,
  monthlyPlatformRevenue: 1420500,
  systemUptime: "99.99%",
  apiLatencyMs: 32,
  totalCertificatesIssued: 42180,
  activeSecurityIncidents: 0
};

export const adminStudents = [
  {
    id: "stu-101",
    name: "Alex Morgan",
    email: "alex.morgan@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    enrolledCoursesCount: 4,
    status: "Active",
    joinedDate: "Jan 14, 2026",
    totalSpent: "$329.96",
    country: "United States",
    lastLogin: "2 hours ago"
  },
  {
    id: "stu-102",
    name: "Sophia Martinez",
    email: "sophia.m@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    enrolledCoursesCount: 6,
    status: "Active",
    joinedDate: "Dec 02, 2025",
    totalSpent: "$489.94",
    country: "Spain",
    lastLogin: "10 mins ago"
  },
  {
    id: "stu-103",
    name: "David Kim",
    email: "d.kim@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    enrolledCoursesCount: 2,
    status: "Active",
    joinedDate: "Feb 10, 2026",
    totalSpent: "$169.98",
    country: "South Korea",
    lastLogin: "Yesterday"
  },
  {
    id: "stu-104",
    name: "Chloe Bennett",
    email: "c.bennett@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    enrolledCoursesCount: 3,
    status: "Suspended",
    joinedDate: "Nov 15, 2025",
    totalSpent: "$240.00",
    country: "Canada",
    lastLogin: "1 week ago",
    suspensionReason: "Terms of Service: Multiple concurrent IP logins"
  },
  {
    id: "stu-105",
    name: "Liam O'Connor",
    email: "liam.oc@student.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    enrolledCoursesCount: 5,
    status: "Active",
    joinedDate: "Jan 03, 2026",
    totalSpent: "$419.95",
    country: "Ireland",
    lastLogin: "Just now"
  }
];

export const adminTeachers = [
  {
    id: "tch-201",
    name: "Dr. Elena Vance",
    email: "elena.vance@faculty.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    department: "Artificial Intelligence",
    coursesCount: 5,
    studentsCount: 48920,
    rating: 4.92,
    verificationStatus: "Verified",
    joinedDate: "Sep 2024",
    totalEarnings: "$284,600"
  },
  {
    id: "tch-202",
    name: "Marcus Chen",
    email: "m.chen@faculty.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    department: "Web Development",
    coursesCount: 4,
    studentsCount: 34200,
    rating: 4.88,
    verificationStatus: "Verified",
    joinedDate: "Oct 2024",
    totalEarnings: "$195,400"
  },
  {
    id: "tch-203",
    name: "Maya Lin",
    email: "m.lin@faculty.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
    department: "UI/UX Design Systems",
    coursesCount: 3,
    studentsCount: 28400,
    rating: 4.95,
    verificationStatus: "Verified",
    joinedDate: "Jan 2025",
    totalEarnings: "$162,000"
  },
  {
    id: "tch-204",
    name: "Prof. Kenneth Sterling",
    email: "k.sterling@candidate.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
    department: "Cybersecurity & Cryptography",
    coursesCount: 1,
    studentsCount: 0,
    rating: 0,
    verificationStatus: "Pending Review",
    joinedDate: "Yesterday",
    totalEarnings: "$0"
  },
  {
    id: "tch-205",
    name: "Sarah Jenkins",
    email: "s.jenkins@faculty.learnova.edu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    department: "Cloud Native & DevOps",
    coursesCount: 3,
    studentsCount: 19800,
    rating: 4.86,
    verificationStatus: "Verified",
    joinedDate: "Nov 2024",
    totalEarnings: "$118,500"
  }
];

export const adminCourses = [
  {
    id: "ai-agents-engineering",
    title: "Next-Gen AI Agents & LLM Application Engineering",
    instructor: "Dr. Elena Vance",
    instructorEmail: "elena.vance@faculty.learnova.edu",
    category: "Artificial Intelligence",
    status: "Published",
    studentsCount: 24580,
    rating: 4.95,
    price: 89.99,
    submittedDate: "Jan 10, 2026",
    modulesCount: 4,
    revenue: "$221,194"
  },
  {
    id: "deep-learning-nlp-transformers",
    title: "Deep Learning, PyTorch & Transformer Models from Scratch",
    instructor: "Dr. Elena Vance",
    instructorEmail: "elena.vance@faculty.learnova.edu",
    category: "Machine Learning",
    status: "Published",
    studentsCount: 18340,
    rating: 4.91,
    price: 79.99,
    submittedDate: "Feb 01, 2026",
    modulesCount: 5,
    revenue: "$146,701"
  },
  {
    id: "fullstack-mern-mastery",
    title: "Modern Full-Stack Web Development with React & Node.js",
    instructor: "Marcus Chen",
    instructorEmail: "m.chen@faculty.learnova.edu",
    category: "Web Development",
    status: "Published",
    studentsCount: 34200,
    rating: 4.88,
    price: 69.99,
    submittedDate: "Dec 12, 2025",
    modulesCount: 6,
    revenue: "$239,365"
  },
  {
    id: "autonomous-agents-in-prod",
    title: "Autonomous Multi-Agent Systems in Production (2026 Edition)",
    instructor: "Dr. Elena Vance",
    instructorEmail: "elena.vance@faculty.learnova.edu",
    category: "Artificial Intelligence",
    status: "In Review",
    studentsCount: 0,
    rating: 0,
    price: 94.99,
    submittedDate: "3 days ago",
    modulesCount: 4,
    revenue: "$0"
  },
  {
    id: "zero-trust-cloud-sec",
    title: "Zero Trust Architecture & Kubernetes Cluster Hardening",
    instructor: "Prof. Kenneth Sterling",
    instructorEmail: "k.sterling@candidate.learnova.edu",
    category: "Cybersecurity",
    status: "In Review",
    studentsCount: 0,
    rating: 0,
    price: 84.99,
    submittedDate: "Yesterday",
    modulesCount: 3,
    revenue: "$0"
  }
];

export const adminEnrollments = [
  {
    id: "enr-501",
    studentName: "Alex Morgan",
    studentEmail: "alex.morgan@student.learnova.edu",
    courseTitle: "Next-Gen AI Agents & LLM Application Engineering",
    enrolledDate: "Jan 14, 2026",
    progress: 68,
    status: "In Progress",
    amountPaid: "$89.99"
  },
  {
    id: "enr-502",
    studentName: "Sophia Martinez",
    studentEmail: "sophia.m@student.learnova.edu",
    courseTitle: "Figma to Code: Modern UI/UX Design Systems",
    enrolledDate: "Jan 18, 2026",
    progress: 100,
    status: "Completed",
    amountPaid: "$59.99"
  },
  {
    id: "enr-503",
    studentName: "David Kim",
    studentEmail: "d.kim@student.learnova.edu",
    courseTitle: "Modern Full-Stack Web Development with React",
    enrolledDate: "Feb 02, 2026",
    progress: 45,
    status: "In Progress",
    amountPaid: "$69.99"
  },
  {
    id: "enr-504",
    studentName: "Liam O'Connor",
    studentEmail: "liam.oc@student.learnova.edu",
    courseTitle: "Cloud Native Architecture: Docker & Kubernetes",
    enrolledDate: "Jan 10, 2026",
    progress: 95,
    status: "In Progress",
    amountPaid: "$74.99"
  },
  {
    id: "enr-505",
    studentName: "Chloe Bennett",
    studentEmail: "c.bennett@student.learnova.edu",
    courseTitle: "Deep Learning, PyTorch & Transformer Models",
    enrolledDate: "Jan 28, 2026",
    progress: 24,
    status: "Suspended",
    amountPaid: "$79.99"
  }
];

export const adminDepartments = [
  {
    id: "dept-1",
    name: "Artificial Intelligence & Autonomous Systems",
    code: "AI-SYS",
    headOfDepartment: "Dr. Elena Vance",
    facultyCount: 14,
    coursesCount: 38,
    studentsEnrolled: 62400,
    budget: "$850,000"
  },
  {
    id: "dept-2",
    name: "Full-Stack Web & Distributed Software",
    code: "CS-WEB",
    headOfDepartment: "Marcus Chen",
    facultyCount: 22,
    coursesCount: 54,
    studentsEnrolled: 84100,
    budget: "$720,000"
  },
  {
    id: "dept-3",
    name: "Cloud Native & DevOps Infrastructure",
    code: "CLOUD-OPS",
    headOfDepartment: "Sarah Jenkins",
    facultyCount: 12,
    coursesCount: 28,
    studentsEnrolled: 41200,
    budget: "$580,000"
  },
  {
    id: "dept-4",
    name: "Product Design Systems & Human-Computer Interaction",
    code: "DESIGN-UX",
    headOfDepartment: "Maya Lin",
    facultyCount: 8,
    coursesCount: 19,
    studentsEnrolled: 31500,
    budget: "$420,000"
  },
  {
    id: "dept-5",
    name: "Cybersecurity, Cryptography & Network Defense",
    code: "SEC-NET",
    headOfDepartment: "Prof. Kenneth Sterling (Acting)",
    facultyCount: 9,
    coursesCount: 16,
    studentsEnrolled: 22800,
    budget: "$510,000"
  }
];

export const adminPrograms = [
  {
    id: "prog-1",
    title: "Executive Specialization in Autonomous AI Engineering",
    code: "SPEC-AI-2026",
    department: "Artificial Intelligence & Autonomous Systems",
    duration: "6 Months",
    credits: 24,
    activeLearners: 1240,
    requiredCourses: 4,
    accreditationStatus: "Accredited"
  },
  {
    id: "prog-2",
    title: "Master Certification in Modern Full-Stack Cloud Architecture",
    code: "CERT-FSD-CLOUD",
    department: "Full-Stack Web & Distributed Software",
    duration: "9 Months",
    credits: 32,
    activeLearners: 2150,
    requiredCourses: 6,
    accreditationStatus: "Accredited"
  },
  {
    id: "prog-3",
    title: "Enterprise Kubernetes & Site Reliability Professional",
    code: "MICRO-K8S-SRE",
    department: "Cloud Native & DevOps Infrastructure",
    duration: "4 Months",
    credits: 16,
    activeLearners: 890,
    requiredCourses: 3,
    accreditationStatus: "Accredited"
  }
];

export const adminLiveClasses = [
  {
    id: "live-adm-1",
    title: "Live Lab: Debugging Multi-Agent Cyclic Deadlocks in LangGraph",
    course: "Next-Gen AI Agents",
    teacher: "Dr. Elena Vance",
    status: "Live Now",
    attendees: 342,
    bitrate: "1080p 60fps (Healthy)",
    startedAt: "18 mins ago",
    health: "Normal"
  },
  {
    id: "live-adm-2",
    title: "Workshop: Building Secure Express Authentication with JWT & Refresh Tokens",
    course: "Modern Full-Stack Web Development",
    teacher: "Marcus Chen",
    status: "Live Now",
    attendees: 512,
    bitrate: "1080p 30fps (Healthy)",
    startedAt: "45 mins ago",
    health: "Normal"
  },
  {
    id: "live-adm-3",
    title: "Office Hours: Vector Database Partitioning & Hybrid Benchmarks",
    course: "Enterprise RAG at Scale",
    teacher: "Dr. Elena Vance",
    status: "Upcoming",
    attendees: 215,
    bitrate: "Scheduled",
    startedAt: "Tomorrow at 10:00 AM",
    health: "Ready"
  },
  {
    id: "live-adm-4",
    title: "Masterclass: Figma Design Tokens to Code Architecture",
    course: "UI/UX Design Systems",
    teacher: "Maya Lin",
    status: "Completed",
    attendees: 430,
    bitrate: "Archived",
    startedAt: "Aug 26, 2026",
    health: "Stored"
  }
];

export const adminRecordings = [
  {
    id: "rec-adm-1",
    title: "Masterclass: Pretraining Llama-style Attention Modules from Scratch",
    course: "Deep Learning, PyTorch & Transformer Models",
    teacher: "Dr. Elena Vance",
    duration: "1 hr 50 mins",
    fileSize: "1.4 GB",
    views: 1240,
    status: "Processed & Distributed",
    date: "Aug 28, 2026",
    cdnEdge: "Cloudflare R2 (US-West)"
  },
  {
    id: "rec-adm-2",
    title: "Workshop: Building Stateful Supervisor Agents with LangGraph Checkpointers",
    course: "Next-Gen AI Agents",
    teacher: "Dr. Elena Vance",
    duration: "1 hr 25 mins",
    fileSize: "1.1 GB",
    views: 2150,
    status: "Processed & Distributed",
    date: "Aug 15, 2026",
    cdnEdge: "Cloudflare R2 (Global)"
  },
  {
    id: "rec-adm-3",
    title: "Keynote: Architectural Shifts in React 19 Server Components",
    course: "Full-Stack Web Development",
    teacher: "Marcus Chen",
    duration: "54 mins",
    fileSize: "720 MB",
    views: 3840,
    status: "Processed & Distributed",
    date: "Aug 02, 2026",
    cdnEdge: "Cloudflare R2 (Global)"
  }
];

export const adminAssignments = [
  {
    id: "assign-adm-1",
    title: "Project 2: Autonomous Tool-Calling Agent with Validation Guardrails",
    course: "Next-Gen AI Agents",
    teacher: "Dr. Elena Vance",
    totalSubmissions: 142,
    pendingGrading: 8,
    status: "Active & Monitored",
    flaggedPlagiarism: 0
  },
  {
    id: "assign-adm-2",
    title: "Capstone Project: Enterprise Design System Token Architecture",
    course: "UI/UX Design Systems",
    teacher: "Maya Lin",
    totalSubmissions: 284,
    pendingGrading: 0,
    status: "Completed",
    flaggedPlagiarism: 0
  },
  {
    id: "assign-adm-3",
    title: "Lab 3: RESTful Auth Middleware & Protected Route Guard",
    course: "Modern Full-Stack Web Development",
    teacher: "Marcus Chen",
    totalSubmissions: 198,
    pendingGrading: 4,
    status: "Active & Monitored",
    flaggedPlagiarism: 1
  }
];

export const adminQuizzes = [
  {
    id: "quiz-adm-1",
    title: "Module 2 Quiz: RAG Chunking, Embeddings & Vector Stores",
    course: "Next-Gen AI Agents",
    teacher: "Dr. Elena Vance",
    questionsCount: 10,
    attemptsCount: 312,
    avgScore: "89%",
    passRate: "92%",
    status: "Verified Quality"
  },
  {
    id: "quiz-adm-2",
    title: "Module 1 Quiz: ES6+ Asynchronous Patterns & React 19 Hooks",
    course: "Modern Full-Stack Web Development",
    teacher: "Marcus Chen",
    questionsCount: 15,
    attemptsCount: 450,
    avgScore: "91%",
    passRate: "94%",
    status: "Verified Quality"
  },
  {
    id: "quiz-adm-3",
    title: "Module 1 Quiz: Container Isolation & Multi-Stage Builds",
    course: "Cloud Native Architecture",
    teacher: "Sarah Jenkins",
    questionsCount: 10,
    attemptsCount: 180,
    avgScore: "85%",
    passRate: "88%",
    status: "Verified Quality"
  }
];

export const adminGradebook = [
  {
    studentName: "Alex Morgan",
    studentEmail: "alex.morgan@student.learnova.edu",
    course: "Next-Gen AI Agents",
    teacher: "Dr. Elena Vance",
    assignmentScore: "96%",
    quizScore: "95%",
    overallGrade: "95.5% (A)",
    status: "In Good Standing"
  },
  {
    studentName: "Sophia Martinez",
    studentEmail: "sophia.m@student.learnova.edu",
    course: "UI/UX Design Systems",
    teacher: "Maya Lin",
    assignmentScore: "98%",
    quizScore: "96%",
    overallGrade: "97.0% (A+)",
    status: "Honors"
  },
  {
    studentName: "David Kim",
    studentEmail: "d.kim@student.learnova.edu",
    course: "Modern Full-Stack Web Development",
    teacher: "Marcus Chen",
    assignmentScore: "88%",
    quizScore: "86%",
    overallGrade: "87.0% (B+)",
    status: "In Good Standing"
  },
  {
    studentName: "Liam O'Connor",
    studentEmail: "liam.oc@student.learnova.edu",
    course: "Cloud Native Architecture",
    teacher: "Sarah Jenkins",
    assignmentScore: "99%",
    quizScore: "98%",
    overallGrade: "98.5% (A+)",
    status: "Honors"
  },
  {
    studentName: "Chloe Bennett",
    studentEmail: "c.bennett@student.learnova.edu",
    course: "Next-Gen AI Agents",
    teacher: "Dr. Elena Vance",
    assignmentScore: "72%",
    quizScore: "74%",
    overallGrade: "73.0% (C)",
    status: "Academic Probation"
  }
];

export const adminCertificates = [
  {
    id: "cert-adm-1",
    certificateId: "LNV-CERT-8842-UX",
    studentName: "Alex Morgan",
    course: "Figma to Code: Modern UI/UX Design Systems & Product Strategy",
    instructor: "Maya Lin",
    issueDate: "August 26, 2026",
    status: "Active & Verified",
    verificationUrl: "https://learnova.edu/verify/LNV-CERT-8842-UX"
  },
  {
    id: "cert-adm-2",
    certificateId: "LNV-CERT-7719-AI",
    studentName: "Sophia Martinez",
    course: "Deep Learning, PyTorch & Transformer Models from Scratch",
    instructor: "Dr. Elena Vance",
    issueDate: "July 14, 2026",
    status: "Active & Verified",
    verificationUrl: "https://learnova.edu/verify/LNV-CERT-7719-AI"
  },
  {
    id: "cert-adm-3",
    certificateId: "LNV-CERT-6630-DEV",
    studentName: "Liam O'Connor",
    course: "Modern Full-Stack Web Development with React & Node.js",
    instructor: "Marcus Chen",
    issueDate: "June 30, 2026",
    status: "Active & Verified",
    verificationUrl: "https://learnova.edu/verify/LNV-CERT-6630-DEV"
  }
];

export const adminReports = {
  monthlyLearnerGrowth: [
    { month: "Apr", count: 98000 },
    { month: "May", count: 112000 },
    { month: "Jun", count: 128000 },
    { month: "Jul", count: 139000 },
    { month: "Aug", count: 147000 },
    { month: "Sep", count: 150420 }
  ],
  departmentDistribution: [
    { dept: "Artificial Intelligence", pct: 38 },
    { dept: "Full-Stack Web Dev", pct: 28 },
    { dept: "Cloud Native & DevOps", pct: 16 },
    { dept: "UI/UX Design Systems", pct: 12 },
    { dept: "Cybersecurity", pct: 6 }
  ],
  completionRates: {
    averageCourseCompletion: "74.2%",
    capstoneProjectPassRate: "91.8%",
    retention30Days: "88.4%"
  }
};

export const adminAnnouncements = [
  {
    id: "ann-1",
    title: "Scheduled Maintenance: Global Database Sharding Migration",
    targetAudience: "All Users (Students & Instructors)",
    priority: "High / Critical",
    publishDate: "Sep 01, 2026, 12:00 PM",
    content: "Learnova database clusters will undergo seamless zero-downtime maintenance on Sunday, Sep 14 from 2:00 AM to 4:00 AM UTC.",
    status: "Delivered (150,420 users)"
  },
  {
    id: "ann-2",
    title: "New AI Engineering Specialization Track Officially Approved",
    targetAudience: "Students Only",
    priority: "Standard",
    publishDate: "Aug 20, 2026, 09:00 AM",
    content: "We are pleased to announce the accreditation of the 2026 Multi-Agent Systems Specialization designed with Google DeepMind frameworks.",
    status: "Delivered (150,420 users)"
  },
  {
    id: "ann-3",
    title: "Faculty Reminder: Fall 2026 Grade Submission Deadlines",
    targetAudience: "Instructors Only",
    priority: "Important",
    publishDate: "Aug 10, 2026, 04:00 PM",
    content: "Please ensure all milestone labs and capstone project grades are finalized by Sep 18 for accredited transcript generation.",
    status: "Delivered (1,240 faculty)"
  }
];

export const adminSettings = {
  platformName: "Learnova Enterprise Learning Management System",
  supportEmail: "support@learnova.edu",
  domain: "learnova.edu",
  allowSelfRegistration: true,
  enforce2FAForInstructors: true,
  enforce2FAForAdmins: true,
  sessionTimeoutMinutes: 60,
  maxFileUploadSizeMB: 500,
  enablePlagiarismDetection: true,
  smtpServer: "smtp.mail.learnova.edu:587",
  cloudflareR2StorageStatus: "Connected & Operational"
};

export const adminAuditLogs = [
  {
    id: "log-901",
    adminUser: "Dr. Marcus Vance (Root)",
    action: "PUBLISH_COURSE",
    target: "Next-Gen AI Agents & LLM Application Engineering",
    timestamp: "Today at 07:15 AM",
    ipAddress: "192.168.1.104",
    status: "Success"
  },
  {
    id: "log-902",
    adminUser: "Dr. Marcus Vance (Root)",
    action: "APPROVE_TEACHER",
    target: "Sarah Jenkins (Cloud Native)",
    timestamp: "Yesterday at 04:20 PM",
    ipAddress: "192.168.1.104",
    status: "Success"
  },
  {
    id: "log-903",
    adminUser: "System Automated Sentinel",
    action: "SECURITY_FLAG",
    target: "User Chloe Bennett (Multiple IP sessions)",
    timestamp: "Sep 03, 2026, 11:10 PM",
    ipAddress: "10.0.4.12",
    status: "Account Suspended"
  },
  {
    id: "log-904",
    adminUser: "Dr. Marcus Vance (Root)",
    action: "ISSUE_CREDENTIAL",
    target: "Alex Morgan (LNV-CERT-8842-UX)",
    timestamp: "Aug 26, 2026, 03:45 PM",
    ipAddress: "192.168.1.104",
    status: "Success"
  }
];
