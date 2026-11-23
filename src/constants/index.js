export const myProjects = [
  {
    id: 1,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "active",
    title: "AI Teammates for everyday Tasks",
    description:
      "An open-source alternative to Grok Bot: AI teammates that each have a job, a memory and a cloud computer of their own, working alongside you in chat.",
    subDescription: [
      "Built a Next.js 16 and React 19 app where each teammate gets a name, a job and persistent instructions, with Clerk for authentication and Neon Postgres with Drizzle ORM for storage.",
      "Gave every bot its own persistent Daytona sandbox with a shell, filesystem and graphical desktop, and let it drive them with computer-use tools, streaming a live desktop view into the chat over noVNC.",
      "Moved chat to a durable Trigger.dev agent running Claude through the Anthropic API, so long desktop tasks survive refreshes, redeploys and closed tabs.",
      "Added group chats where a bot hands a request to the teammate whose job it is, plus a shared memory file for each bot so notes saved in one chat carry into every other.",
      "Deployed the app on Railway.",
    ],
    href: "https://crewmate-production-b05dd579.up.railway.app/",
    sourceCode: "https://github.com/Borhan1997/Crewmate",
    logo: "/assets/logos/crewmate_logo.svg",
    image: "/assets/projects/ai-teammate.jpg",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/nextjs.svg",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 1,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 1,
        name: "Tailwind CSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 5,
        name: "Clerk",
        path: "/assets/logos/clerk.svg",
      },
      {
        id: 6,
        name: "Anthropic",
        path: "/assets/logos/anthropic.svg",
      },
      {
        id: 7,
        name: "Trigger.dev",
        path: "/assets/logos/triggerdotdev.svg",
      },
      {
        id: 8,
        name: "Daytona",
        path: "/assets/logos/daytona.svg",
      },
      {
        id: 9,
        name: "Neon",
        path: "/assets/logos/neon.svg",
      },
      {
        id: 10,
        name: "Railway",
        path: "/assets/logos/railway.svg",
      },
    ],
  },
  {
    id: 2,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "active",
    title: "MLOps for a CV Model",
    description:
      "Automates the full lifecycle of a defect-detection model for industrial castings, from versioned data to a monitored, containerized API.",
    subDescription: [
      "Built a reproducible ResNet18 training pipeline in PyTorch, with every run tracked in MLflow and datasets versioned with DVC on a DagsHub remote.",
      "Implemented an automated evaluation gate that blocks any model whose defect recall drops below a set floor or regresses against the stored baseline.",
      "Designed a CI/CD workflow with GitHub Actions that pulls data, trains, evaluates and gates each change, then publishes a Docker image to GHCR.",
      "Added a FastAPI inference service with prediction logging, plus Prometheus and Grafana dashboards for drift monitoring.",
    ],
    href: "",
    sourceCode: "https://github.com/Borhan1997/casting-defect-MLOps",
    logo: "",
    image: "/assets/projects/mlops-pipeline.jpg",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "PyTorch",
        path: "/assets/logos/pytorch.svg",
      },
      {
        id: 3,
        name: "MLflow",
        path: "/assets/logos/mlflow.svg",
      },
      {
        id: 4,
        name: "DVC",
        path: "/assets/logos/dvc.svg",
      },
      {
        id: 5,
        name: "GitHub Actions",
        path: "/assets/logos/githubactions.svg",
      },
      {
        id: 6,
        name: "Docker",
        path: "/assets/logos/docker.svg",
      },
      {
        id: 7,
        name: "FastAPI",
        path: "/assets/logos/fastapi.svg",
      },
      {
        id: 8,
        name: "Prometheus",
        path: "/assets/logos/prometheus.svg",
      },
      {
        id: 9,
        name: "Grafana",
        path: "/assets/logos/grafana.svg",
      },
    ],
  },
  {
    id: 3,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "active",
    title: "Audio Classification CNN",
    description:
      "A ResNet-style convolutional network built from scratch in PyTorch that classifies 50 categories of environmental sound, paired with a web app that visualizes what the network sees.",
    subDescription: [
      "Designed a custom ResNet-18-style CNN (residual blocks in a 3-4-6-3 layout, no pretrained weights) that classifies log-mel spectrograms of ESC-50 audio clips, reaching 80.25% validation accuracy across 50 classes.",
      "Trained with mixup, frequency and time masking, label smoothing and AdamW with a OneCycle schedule, on serverless A10 GPUs with Modal and TensorBoard tracking.",
      "Deployed the model as a FastAPI inference endpoint on Modal that returns the top-3 predictions together with the spectrogram, waveform and per-layer feature maps.",
      "Built a Next.js and React interface where you upload a .wav file and explore the predictions and the feature maps of every convolutional layer.",
    ],
    href: "https://cnnfromscratch-production.up.railway.app/",
    sourceCode: "https://github.com/Borhan1997/CNN_from_scratch",
    logo: "",
    image: "/assets/projects/neural-ear.jpg",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "PyTorch",
        path: "/assets/logos/pytorch.svg",
      },
      {
        id: 3,
        name: "FastAPI",
        path: "/assets/logos/fastapi.svg",
      },
      {
        id: 4,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 5,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 4,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "wip",
    title: "Multimodal Emotion Recognition",
    description:
      "A secure authentication and authorization system using Auth0 for seamless user management.",
    subDescription: [
      "Integrated Auth0 for authentication, supporting OAuth, JWT, and multi-factor authentication.",
      "Implemented role-based access control (RBAC) for fine-grained user permissions.",
      "Developed a React-based frontend with Tailwind CSS for a sleek user experience.",
      "Connected to a secure SQLite database for user data storage.",
    ],
    href: "",
    sourceCode: "",
    logo: "",
    image: "/assets/projects/emotion-recognition.jpg",
    tags: [],
  },
  {
    id: 5,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "disabled",
    title: "AI Game Generation Engine",
    description:
      "Automates the full lifecycle of a defect-detection model for industrial castings, from versioned data to a monitored, containerized API.",
    subDescription: [
      "Built a reproducible ResNet18 training pipeline in PyTorch, with every run tracked in MLflow and datasets versioned with DVC on a DagsHub remote.",
      "Implemented an automated evaluation gate that blocks any model whose defect recall drops below a set floor or regresses against the stored baseline.",
      "Designed a CI/CD workflow with GitHub Actions that pulls data, trains, evaluates and gates each change, then publishes a Docker image to GHCR.",
      "Added a FastAPI inference service with prediction logging, plus Prometheus and Grafana dashboards for drift monitoring.",
    ],
    href: "",
    sourceCode: "",
    logo: "",
    image: "/assets/projects/game-generation-engine.jpg",
    tags: [],
  },
  {
    id: 6,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "disabled",
    title: "Vision-Language Model (VLM) Fine-Tuning",
    description:
      "A modern, interactive web application built with Blazor WebAssembly and .NET Core.",
    subDescription: [
      "Developed a fully interactive Single Page Application (SPA) using Blazor WebAssembly.",
      "Implemented API interactions using .NET Core for a robust backend.",
      "Designed responsive UI components with Tailwind CSS for an enhanced UX.",
      "Integrated SQLite for efficient client-side database storage.",
    ],
    href: "",
    sourceCode: "",
    logo: "",
    image: "/assets/projects/vlm-finetuning.jpg",
    tags: [],
  },
  {
    id: 7,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "disabled",
    title: "Real-Time Video Understanding System",
    description:
      "A lightweight C++ game engine designed for 2D and 3D game development.",
    subDescription: [
      "Built a powerful rendering engine using OpenGL and C++.",
      "Developed a physics engine with collision detection and particle effects.",
      "Implemented a scripting system for easy game customization.",
      "Optimized performance with multi-threading and efficient memory management.",
    ],
    href: "",
    sourceCode: "",
    logo: "",
    image: "/assets/projects/video-understanding.jpg",
    tags: [],
  },
  {
    id: 8,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "disabled",
    title: "Diffusion-Based Synthetic Data Generator",
    description:
      "A fully customizable WordPress theme optimized for performance and SEO.",
    subDescription: [
      "Developed a responsive WordPress theme using HTML5, CSS3, and JavaScript.",
      "Integrated Tailwind CSS for modern styling and UI enhancements.",
      "Optimized SEO and page speed using Vite.js for fast builds.",
      "Implemented custom widgets and plugin compatibility for extended functionality.",
    ],
    href: "",
    sourceCode: "",
    logo: "",
    image: "/assets/projects/synthetic-data.jpg",
    tags: [],
  },
  {
    id: 9,
    // "active" | "wip" (work in progress, not clickable) | "disabled" (not clickable)
    status: "disabled",
    title: "Vision-Language-Action Agent in Simulation",
    description:
      "A web application that allows users to enroll in courses, watch video lectures, and take quizzes.",
    subDescription: [
      "Built using Blazor WebAssembly for a seamless SPA experience.",
      "Implemented video streaming with Azure Media Services.",
      "Added a quiz system with dynamic question generation and real-time grading.",
      "Integrated Stripe API for secure payment processing.",
    ],
    href: "",
    sourceCode: "",
    logo: "",
    image: "/assets/projects/vla-agent.jpg",
    tags: [],
  },
];

export const mySocials = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/borhan-hleiss-b2b048b2/",
    icon: "/assets/socials/linkedIn.svg",
  },
];

export const experiences = [
  {
    title: "Mechanical Project Engineer",
    job: "Al Khaleej Sugar Co.",
    location: "Dubai, UAE",
    date: "Sep 2019 – Aug 2021",
    contents: [
      "Tracked project schedules and budgets, and reported progress to department executives through status reports and project documentation.",
      "Coordinated installation, modification or upgrade of mechanical equipment (pumps, conveyors, boilers, piping) across production, maintenance, procurement and contractors to keep work on schedule.",
      "Followed HSE (health, safety and environment) and quality procedures during project execution.",
      "Reviewed technical drawings, specifications and vendor quotations.",
    ],
  },
  {
    title: "Control & Simulation Engineer (MSc Thesis Internship)",
    job: "Wind Fisher SAS",
    location: "Montbonnot-Saint-Martin, France",
    date: "Feb 2022 – Aug 2022",
    contents: [
      "Developed and prototyped embedded control systems for an autonomous energy-generation platform.",
      "Processed and analyzed real-time avionics and sensor data to inform control algorithm design and validation.",
      "Designed and implemented control and command algorithms, translating theoretical models into embedded code.",
      "Built full-system simulation models to estimate and validate energy production performance before physical testing.",
    ],
  },
  {
    title: "Associate Digital Engineer — C++/Qt Software Engineer",
    job: "Capgemini Engineering (Aerospace projects)",
    location: "Toulouse, France",
    date: "Nov 2022 – Present",
    contents: [
      "Design and develop software components and system-level features in C++ and Qt on Linux for aerospace products.",
      "Conduct code reviews, debugging and troubleshooting to maintain the quality and reliability of delivered software.",
      "Own build and release workflows with GitHub, Jenkins and Artifactory in a CI/CD pipeline; plan and triage work in Jira.",
      "Work with cross-functional stakeholders to turn requirements into technical solutions and maintain development documentation to project standards.",
    ],
  },
];
export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://robohash.org/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://robohash.org/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://robohash.org/john",
  },
  {
    name: "alice",
    username: "@alice",
    body: "This is hands down the best thing I've experienced. Highly recommend!",
    img: "https://robohash.org/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Incredible work! The attention to detail is phenomenal.",
    img: "https://robohash.org/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "This exceeded all my expectations. Absolutely stunning!",
    img: "https://robohash.org/charlie",
  },
  {
    name: "Dave",
    username: "@dave",
    body: "Simply breathtaking. The best decision I've made in a while.",
    img: "https://robohash.org/dave",
  },
  {
    name: "Eve",
    username: "@eve",
    body: "So glad I found this. It has changed the game for me.",
    img: "https://robohash.org/eve",
  },
];

export const education = [
  {
    title: "BEng, Mechanical Engineering",
    job: "Beirut Arab University, Faculty of Engineering",
    location: "Beirut, Lebanon",
    date: "Jun 2019",
    contents: [
      "A broad mechanical engineering degree with a strong control and instrumentation focus. It gave me the foundation in dynamic systems, sensing and mechatronics that later led me into robotics.",
    ],
    tags: [
      "Dynamic Systems Control",
      "Instrumentation & Measurements",
      "Mechatronics",
      "Thermodynamics",
      "Fluid Mechanics",
    ],
  },
  {
    title: "MSc, Mobile, Autonomous and Robotic Systems",
    job: "Grenoble INP, ENSE3",
    location: "Grenoble, France",
    date: "Sep 2022",
    contents: [
      "A master's programme on how autonomous systems sense, plan and act, covering AI and machine learning, embedded systems, optimal and predictive control, perception and navigation, with hands-on work in Python, Matlab and ROS.",
      "Thesis: designing and implementing a control and command system for a Magnus Effect Kite, completed as an internship at Wind Fisher SAS (Feb – Aug 2022).",
    ],
    tags: [
      "Artificial Intelligence",
      "Machine Learning",
      "Embedded Systems",
      "Optimal & Predictive Control",
      "Perception & Motion Tracking",
      "Navigation & Path Planning",
      "ROS",
    ],
  },
];

export const languages = [
  { name: "Arabic", level: "Native", dots: 5 },
  { name: "English", level: "Fluent", dots: 4 },
  { name: "French", level: "Fluent", dots: 4 },
  { name: "German", level: "Intermediate", dots: 3 },
];
