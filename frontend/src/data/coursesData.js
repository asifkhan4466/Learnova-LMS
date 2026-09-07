export const coursesData = [
  {
    id: 'ai-agents-engineering',
    title: 'Next-Gen AI Agents & LLM Application Engineering',
    subtitle: 'Master LangChain, AutoGen, vector databases, and multi-agent systems to build production-grade autonomous AI agents.',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    rating: 4.9,
    reviewCount: 12480,
    students: 48920,
    instructor: {
      name: 'Dr. Elena Vance',
      title: 'Senior AI Research Scientist & Former ML Lead',
      institution: 'Learnova AI Institute',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      bio: 'Dr. Elena Vance has over 12 years of AI/ML engineering experience at top tech labs. She specializes in agentic workflows, LLM orchestration, and generative AI systems.'
    },
    organization: 'Learnova AI Labs',
    duration: '8 Weeks (5 hrs/week)',
    lessonsCount: 54,
    price: 69.99,
    originalPrice: 119.99,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    featured: true,
    trending: true,
    popular: true,
    description: 'Autonomous AI agents are transforming modern software development. In this comprehensive course, you will progress from understanding prompt engineering and vector embeddings to architecting enterprise-grade multi-agent autonomous systems using LangChain, LangGraph, and AutoGen. You will construct self-healing agent pipelines, integrate tool-calling APIs, deploy scalable retrieval-augmented generation (RAG) vector pipelines, and benchmark reasoning frameworks.',
    whatYouWillLearn: [
      'Architect robust multi-agent systems using LangGraph and AutoGen',
      'Implement high-speed Hybrid RAG pipelines with Pinecone and Qdrant',
      'Deploy autonomous tool-calling agents with strict schema validation',
      'Evaluate agent performance, hallucinations, and safety with Ragas',
      'Fine-tune open-source models (Llama 3, Mistral) for domain-specific agent tasks',
      'Deploy low-latency agent microservices with streaming SSE responses'
    ],
    skillsGained: ['LangChain', 'LangGraph', 'Vector DBs', 'RAG Architecture', 'Python', 'LLM Fine-tuning', 'Prompt Optimization'],
    prerequisites: ['Proficiency in Python', 'Basic familiarity with REST APIs', 'Foundational understanding of machine learning concepts'],
    curriculum: [
      {
        title: 'Module 1: Foundations of Agentic Workflows & Prompt Reasoning',
        duration: '6 lessons • 4.5 hours',
        lessons: [
          { name: 'Introduction to Autonomous Agent Paradigms', duration: '35 min' },
          { name: 'Chain of Thought (CoT) and ReAct Frameworks', duration: '45 min' },
          { name: 'Structured JSON Outputs and Function Calling', duration: '50 min' },
          { name: 'Hands-on Lab: Building your first Tool-Calling Agent', duration: '60 min' }
        ]
      },
      {
        title: 'Module 2: Advanced Retrieval-Augmented Generation (RAG)',
        duration: '8 lessons • 6.5 hours',
        lessons: [
          { name: 'Chunking Strategies, Dense vs Sparse Embeddings', duration: '45 min' },
          { name: 'Vector Databases: Pinecone, Chroma, and Qdrant in Production', duration: '55 min' },
          { name: 'Hybrid Search, Re-ranking with Cohere, and Query Decomposition', duration: '60 min' },
          { name: 'Contextual Compression & Parent Document Retrievers', duration: '50 min' }
        ]
      },
      {
        title: 'Module 3: Multi-Agent Orchestration with LangGraph',
        duration: '7 lessons • 6 hours',
        lessons: [
          { name: 'Graph-based State Machines for AI Agents', duration: '50 min' },
          { name: 'Human-in-the-Loop Approval Workflows', duration: '40 min' },
          { name: 'Supervisor and Worker Agent Architecture', duration: '65 min' },
          { name: 'Handling Edge Cases and Self-Correction Loops', duration: '55 min' }
        ]
      },
      {
        title: 'Module 4: Production Deployment, Observability & Security',
        duration: '6 lessons • 5 hours',
        lessons: [
          { name: 'Monitoring Agent Traces with LangSmith and Phoenix', duration: '45 min' },
          { name: 'Prompt Injection Defense & Guardrails', duration: '50 min' },
          { name: 'Dockerizing & Deploying with FastAPI and Redis Caching', duration: '60 min' },
          { name: 'Capstone Project Presentation & Certification', duration: '75 min' }
        ]
      }
    ]
  },
  {
    id: 'fullstack-mern-mastery',
    title: 'Modern Full-Stack Web Development with React & Node.js',
    subtitle: 'From zero to full-stack engineer: Build scalable, real-time web applications with React 19, Node.js, Express, and PostgreSQL.',
    category: 'Web Development',
    level: 'Beginner',
    rating: 4.8,
    reviewCount: 18920,
    students: 95400,
    instructor: {
      name: 'Marcus Chen',
      title: 'Principal Software Engineer',
      institution: 'Learnova Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      bio: 'Marcus has built web systems serving millions of daily active users. He is passionate about modern JavaScript, accessible UX, and modular full-stack architecture.'
    },
    organization: 'WebDev Guild',
    duration: '10 Weeks (6 hrs/week)',
    lessonsCount: 68,
    price: 59.99,
    originalPrice: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot & New',
    featured: true,
    trending: false,
    popular: true,
    description: 'Transform into an industry-ready full-stack developer. This course covers everything from modern ES6+ and React component patterns to RESTful API creation, database modeling, secure authentication, and cloud deployment on modern PaaS platforms.',
    whatYouWillLearn: [
      'Build responsive, production-ready React UIs with modern hooks and state management',
      'Create robust RESTful APIs with Node.js and Express',
      'Model relational and document data with PostgreSQL and Prisma',
      'Implement industry-standard JWT authentication and role-based access control',
      'Write comprehensive unit and integration tests with Vitest and Supertest',
      'Deploy full-stack applications with automated CI/CD pipelines'
    ],
    skillsGained: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Git', 'CI/CD'],
    prerequisites: ['Basic HTML and CSS knowledge', 'No prior programming experience required'],
    curriculum: [
      {
        title: 'Module 1: JavaScript Mastery & Modern React 19',
        duration: '10 lessons • 8 hours',
        lessons: [
          { name: 'Modern ES6+ Syntax, Closures, and Async/Await', duration: '50 min' },
          { name: 'Component Architecture & Props Drilling Solutions', duration: '55 min' },
          { name: 'Custom React Hooks for Reusable Business Logic', duration: '60 min' }
        ]
      },
      {
        title: 'Module 2: Server-Side Development with Node & Express',
        duration: '8 lessons • 7 hours',
        lessons: [
          { name: 'Node.js Event Loop and Asynchronous I/O', duration: '45 min' },
          { name: 'Structuring Clean Express Controllers & Routers', duration: '60 min' },
          { name: 'Middleware, Error Handling, and Request Validation', duration: '50 min' }
        ]
      },
      {
        title: 'Module 3: Database Design & ORM Modeling',
        duration: '7 lessons • 6 hours',
        lessons: [
          { name: 'Relational Database Principles and Schema Normalization', duration: '55 min' },
          { name: 'Prisma ORM with PostgreSQL', duration: '65 min' },
          { name: 'Transactions, Indexing, and Query Optimization', duration: '60 min' }
        ]
      }
    ]
  },
  {
    id: 'cloud-devops-kubernetes',
    title: 'Cloud Native Architecture: Docker, Kubernetes & AWS',
    subtitle: 'Design, containerize, and orchestrate resilient microservices with Terraform, Docker, Kubernetes, and AWS infrastructure.',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    rating: 4.9,
    reviewCount: 8120,
    students: 34200,
    instructor: {
      name: 'Sarah Jenkins',
      title: 'Principal Cloud Infrastructure Architect',
      institution: 'CloudOps Alliance',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      bio: 'Sarah has architected high-availability cloud infrastructure for Fortune 500 financial platforms. AWS Certified Solutions Architect Professional.'
    },
    organization: 'CloudOps Alliance',
    duration: '6 Weeks (4 hrs/week)',
    lessonsCount: 42,
    price: 74.99,
    originalPrice: 129.99,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    featured: true,
    trending: true,
    popular: false,
    description: 'Learn how modern tech enterprises maintain 99.99% uptime. This intensive program takes you through containerization fundamentals, Helm chart packaging, Kubernetes cluster administration (EKS), infrastructure as code with Terraform, and zero-downtime Canary deployments.',
    whatYouWillLearn: [
      'Build multi-stage optimized Docker containers for production',
      'Manage Kubernetes Pods, Deployments, Services, and Ingress controllers',
      'Automate cloud provisioning with Terraform and GitOps (ArgoCD)',
      'Set up end-to-end monitoring and alerting with Prometheus and Grafana',
      'Implement zero-downtime rolling updates and blue-green deployments',
      'Secure container registries and configure IAM least-privilege policies'
    ],
    skillsGained: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'Prometheus', 'Helm', 'ArgoCD'],
    prerequisites: ['Familiarity with Linux command line', 'Basic networking concepts (TCP/IP, DNS, HTTP)'],
    curriculum: [
      {
        title: 'Module 1: Docker Deep Dive & Container Best Practices',
        duration: '5 lessons • 4 hours',
        lessons: [
          { name: 'Namespaces, Cgroups, and Container Internals', duration: '45 min' },
          { name: 'Multi-stage Dockerfile Optimization & Security Scanning', duration: '50 min' },
          { name: 'Docker Compose for Local Microservice Orchestration', duration: '55 min' }
        ]
      },
      {
        title: 'Module 2: Kubernetes Orchestration Essentials',
        duration: '8 lessons • 6.5 hours',
        lessons: [
          { name: 'Kube-Apiserver, Etcd, and Controller Manager Architecture', duration: '50 min' },
          { name: 'Deployments, ReplicaSets, and Self-Healing Pods', duration: '60 min' },
          { name: 'Services, Ingress Controllers, and SSL Termination', duration: '65 min' }
        ]
      }
    ]
  },
  {
    id: 'data-science-python-powerbi',
    title: 'Data Science & Advanced Analytics with Python and Power BI',
    subtitle: 'Extract actionable business insights, build predictive statistical models, and build executive dashboards that drive decisions.',
    category: 'Data Science',
    level: 'Beginner',
    rating: 4.7,
    reviewCount: 22400,
    students: 112000,
    instructor: {
      name: 'Dr. Rajesh Kothari',
      title: 'Data Science Director',
      institution: 'StatIQ Analytics',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      bio: 'Dr. Kothari has spearheaded analytics divisions across global retail and fintech sectors with a strong focus on real-world storytelling with data.'
    },
    organization: 'StatIQ Institute',
    duration: '8 Weeks (4 hrs/week)',
    lessonsCount: 50,
    price: 49.99,
    originalPrice: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    featured: false,
    trending: true,
    popular: true,
    description: 'Learn the complete end-to-end data lifecycle. From data wrangling with Pandas and exploratory data analysis (EDA) to hypothesis testing, predictive Scikit-Learn pipelines, and interactive executive reporting with Microsoft Power BI.',
    whatYouWillLearn: [
      'Master data manipulation and cleaning with Python Pandas and NumPy',
      'Conduct statistical hypothesis testing and exploratory data analyses',
      'Build machine learning regression and classification models with Scikit-Learn',
      'Design interactive storytelling dashboards in Power BI and Tableau',
      'Perform advanced SQL queries including window functions and CTEs',
      'Communicate complex analytical insights clearly to executive stakeholders'
    ],
    skillsGained: ['Python', 'Pandas', 'NumPy', 'Power BI', 'SQL', 'Scikit-Learn', 'Data Visualization'],
    prerequisites: ['Basic high school mathematics', 'Curiosity for data and patterns'],
    curriculum: [
      {
        title: 'Module 1: Python for Data Analysis & Wrangling',
        duration: '7 lessons • 5 hours',
        lessons: [
          { name: 'DataFrames, Series, and Vectorized Operations', duration: '50 min' },
          { name: 'Handling Missing Values, Duplicates, and Outliers', duration: '55 min' },
          { name: 'Merging, Joining, and Pivoting Datasets', duration: '60 min' }
        ]
      },
      {
        title: 'Module 2: Statistical Modeling & Machine Learning',
        duration: '8 lessons • 6.5 hours',
        lessons: [
          { name: 'Descriptive vs Inferential Statistics', duration: '45 min' },
          { name: 'Linear & Logistic Regression Pipelines', duration: '60 min' },
          { name: 'Model Evaluation: Cross-Validation, ROC-AUC, and F1-Score', duration: '65 min' }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity-ethical-hacking',
    title: 'Cybersecurity Defense, Network Security & Ethical Hacking',
    subtitle: 'Protect enterprise infrastructure, execute vulnerability assessments, and implement zero-trust defense architectures.',
    category: 'Cybersecurity',
    level: 'Intermediate',
    rating: 4.8,
    reviewCount: 9450,
    students: 41800,
    instructor: {
      name: 'Aiden Cross',
      title: 'Certified Ethical Hacker (CEH) & Threat Analyst',
      institution: 'CyberDefense Global',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
      bio: 'Aiden has investigated advanced persistent threats and audited financial institutions across North America and Europe.'
    },
    organization: 'CyberDefense Global',
    duration: '7 Weeks (5 hrs/week)',
    lessonsCount: 46,
    price: 64.99,
    originalPrice: 109.99,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    featured: false,
    trending: true,
    popular: true,
    description: 'Step into the cybersecurity battleground. Learn real penetration testing techniques, Kali Linux toolkits (Nmap, Metasploit, Wireshark), threat modeling, web application security (OWASP Top 10), and SOC incident response procedures.',
    whatYouWillLearn: [
      'Conduct network reconnaissance and packet analysis with Wireshark',
      'Identify and remediate the OWASP Top 10 web vulnerabilities',
      'Configure enterprise intrusion detection systems (Snort, Suricata)',
      'Design Zero-Trust network segmentation and identity access policies',
      'Perform hands-on ethical hacking in controlled lab environments',
      'Prepare for industry certifications like CompTIA Security+ and CEH'
    ],
    skillsGained: ['Network Security', 'Ethical Hacking', 'OWASP', 'Wireshark', 'Kali Linux', 'Penetration Testing', 'SIEM'],
    prerequisites: ['Basic understanding of computer networks and operating systems'],
    curriculum: [
      {
        title: 'Module 1: Network Protocols & Traffic Analysis',
        duration: '6 lessons • 4.5 hours',
        lessons: [
          { name: 'TCP/IP Handshakes, Subnetting, and Port Scanning', duration: '50 min' },
          { name: 'Wireshark Deep Packet Inspection', duration: '55 min' },
          { name: 'Detecting Spoofing and Man-in-the-Middle Attacks', duration: '60 min' }
        ]
      }
    ]
  },
  {
    id: 'ui-ux-design-systems',
    title: 'Figma to Code: Modern UI/UX Design Systems & Product Strategy',
    subtitle: 'Design beautiful, accessible, and scalable digital product interfaces in Figma and translate them into robust design systems.',
    category: 'UI/UX Design',
    level: 'Beginner',
    rating: 4.9,
    reviewCount: 14300,
    students: 63100,
    instructor: {
      name: 'Maya Lin',
      title: 'Head of Product Design & Design Systems Lead',
      institution: 'StudioFlow UI',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      bio: 'Maya has designed user interfaces for global mobile apps and led design systems that accelerate engineering velocity by 40%.'
    },
    organization: 'StudioFlow UI',
    duration: '6 Weeks (4 hrs/week)',
    lessonsCount: 38,
    price: 54.99,
    originalPrice: 94.99,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    featured: true,
    trending: false,
    popular: true,
    description: 'Great products start with world-class user experience. Learn design research, wireframing, interactive prototyping in Figma, design tokens, responsive typography, and how to build a unified design system that syncs seamlessly with code.',
    whatYouWillLearn: [
      'Master auto-layout, components, variants, and variables in Figma',
      'Build comprehensive, accessible design systems (WCAG 2.1 AA)',
      'Conduct user interviews, usability testing, and persona mapping',
      'Create high-fidelity interactive mobile and web prototypes',
      'Handoff pixel-perfect specs and CSS tokens to developers',
      'Assemble an impressive portfolio of real-world UX case studies'
    ],
    skillsGained: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility', 'Wireframing'],
    prerequisites: ['No prior design or coding experience required'],
    curriculum: [
      {
        title: 'Module 1: UX Research & Information Architecture',
        duration: '6 lessons • 4 hours',
        lessons: [
          { name: 'User Journey Mapping and Problem Statement Definition', duration: '45 min' },
          { name: 'Information Architecture & Wireframe Skeletons', duration: '50 min' },
          { name: 'Usability Testing Methodologies', duration: '55 min' }
        ]
      }
    ]
  },
  {
    id: 'deep-learning-nlp-transformers',
    title: 'Deep Learning, PyTorch & Transformer Models from Scratch',
    subtitle: 'Build deep neural networks, CNNs, RNNs, and custom Transformer architectures using PyTorch and Hugging Face.',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    rating: 4.9,
    reviewCount: 7800,
    students: 29400,
    instructor: {
      name: 'Dr. Elena Vance',
      title: 'Senior AI Research Scientist',
      institution: 'Learnova AI Institute',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      bio: 'Dr. Elena Vance leads research on transformer optimizations and multimodal foundational architectures.'
    },
    organization: 'Learnova AI Labs',
    duration: '9 Weeks (6 hrs/week)',
    lessonsCount: 58,
    price: 79.99,
    originalPrice: 139.99,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot & New',
    featured: false,
    trending: true,
    popular: false,
    description: 'Demystify deep learning under the hood. Implement backpropagation from scratch, build convolutional vision models, train attention mechanisms, and fine-tune state-of-the-art transformer models using PyTorch.',
    whatYouWillLearn: [
      'Write custom PyTorch tensors, autograd engines, and training loops',
      'Construct Convolutional Neural Networks (CNNs) for computer vision',
      'Implement Self-Attention and Multi-Head Attention mathematical layers',
      'Fine-tune Hugging Face transformers with LoRA and QLoRA quantization',
      'Optimize training with mixed-precision (FP16/BF16) and distributed DataParallel',
      'Deploy inference servers with ONNX Runtime and TensorRT'
    ],
    skillsGained: ['PyTorch', 'Deep Learning', 'Transformers', 'Hugging Face', 'Computer Vision', 'NLP', 'TensorRT'],
    prerequisites: ['Strong Python skills', 'Linear algebra and calculus basics'],
    curriculum: [
      {
        title: 'Module 1: PyTorch Essentials & Backprop from Scratch',
        duration: '7 lessons • 5.5 hours',
        lessons: [
          { name: 'Tensors, Gradients, and Computational Graphs', duration: '50 min' },
          { name: 'Building a Micrograd Neural Engine in Pure Python', duration: '65 min' },
          { name: 'Optimization: SGD, Momentum, AdamW, and Learning Rate Schedulers', duration: '60 min' }
        ]
      }
    ]
  },
  {
    id: 'microservices-system-design',
    title: 'High-Scalability System Design & Distributed Architecture',
    subtitle: 'Learn the architectural principles used by top tech companies to scale platforms to tens of millions of concurrent requests.',
    category: 'Software Engineering',
    level: 'Advanced',
    rating: 4.9,
    reviewCount: 11200,
    students: 52700,
    instructor: {
      name: 'Marcus Chen',
      title: 'Principal Software Engineer',
      institution: 'Learnova Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      bio: 'Marcus has designed high-throughput distributed architectures processing 100M+ events per day.'
    },
    organization: 'WebDev Guild',
    duration: '8 Weeks (5 hrs/week)',
    lessonsCount: 44,
    price: 69.99,
    originalPrice: 119.99,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    featured: true,
    trending: false,
    popular: true,
    description: 'Prepare for senior engineering roles and system design interviews. Master CAP theorem, load balancing strategies, distributed caching with Redis, message brokers (Kafka/RabbitMQ), database sharding, and fault-tolerant event-driven architecture.',
    whatYouWillLearn: [
      'Design large-scale distributed architectures from first principles',
      'Implement asynchronous messaging patterns with Apache Kafka and RabbitMQ',
      'Apply database sharding, read replicas, and consistent hashing',
      'Utilize distributed cache patterns (Cache-Aside, Write-Through)',
      'Manage distributed transactions with Sagas and Two-Phase Commit',
      'Ace senior and staff system design interviews with structured frameworks'
    ],
    skillsGained: ['System Design', 'Distributed Systems', 'Kafka', 'Redis', 'Database Sharding', 'Microservices', 'High Availability'],
    prerequisites: ['Proficiency in at least one backend language', 'Experience building web services'],
    curriculum: [
      {
        title: 'Module 1: Distributed Systems Core Foundations',
        duration: '6 lessons • 4.5 hours',
        lessons: [
          { name: 'CAP Theorem, PACELC, and Eventual Consistency', duration: '45 min' },
          { name: 'Load Balancing Algorithms: Round Robin, Least Connections, Consistent Hashing', duration: '55 min' },
          { name: 'Rate Limiting Algorithms (Token Bucket, Leaky Bucket)', duration: '50 min' }
        ]
      }
    ]
  }
];
