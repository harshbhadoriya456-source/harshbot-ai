export interface LearningModule {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  category: "python" | "react" | "api" | "git" | "ml" | "dsa" | "os" | "docker" | "ai" | "db";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeToRead: string;
  glowingColor: string;
  
  // Extended Details
  explanation: string;
  codeExample: string;
  proTips: string[];
  roadmap: string[];
}

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "python-decorators",
    title: "Python Decorators",
    icon: "Code",
    shortDesc: "Master function wraps, closure scopes, dynamic wrappers, and parameterized decorator matrices.",
    category: "python",
    difficulty: "Intermediate",
    timeToRead: "8 mins",
    glowingColor: "border-violet-500/30 text-violet-400 shadow-violet-500/10 hover:border-violet-400 hover:shadow-violet-500/20",
    explanation: `Python Decorators represent a very clean design pattern that allows developers to inject behavior into functions dynamically or modify call parameters without permanently changing the source. Underneath the hood, decorators rely on Python's first-class function hierarchy and lexical scopes (closures).

When you annotate a function with \`@my_decorator\`, you are performing a syntactic transformation:
\`\`\`
target = my_decorator(target)
\`\`\`

#### Architectural Execution Stream:
\`\`\`
[Function Invoke] ──> [Decorator Inner Wrapper] ──> [Pre-execution Log/Metrics]
                                                            │
                                                     [Target Executed]
                                                            │
[Return Value Saved] <── [Post-execution cleanups] <────────┘
\`\`\`

By storing state values within functions in Python's closures, we gain massive caching, performance logging, or authentication triggers.`,
    codeExample: `import time
from functools import wraps

def time_telemetry(label="GLOBAL"):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            print(f"[SYSTEM-DIAGNOSTICS] Starting latency counter [{label}]")
            result = func(*args, **kwargs)
            duration = (time.perf_counter() - start) * 1000
            print(f"[SYSTEM-DIAGNOSTICS] completed: result={result} | delay={duration:.3f}ms")
            return result
        return wrapper
    return decorator

@time_telemetry(label="DATABASE_QUERY")
def get_user_records(user_id: int):
    # Simulating standard active query latency
    time.sleep(0.045)
    return {"id": user_id, "username": "harsh_developer_45"}

# invoke
get_user_records(100)`,
    proTips: [
      "Always apply 'functools.wraps' inside your wrappers to keep correct __name__ and __doc__ metadata values active.",
      "Decorators execute immediately during module import phase, not during dynamic function callbacks.",
      "Chain multiple decorators seamlessly; remember they compile bottom-to-top (last declared runs first)."
    ],
    roadmap: [
      "1. Comprehend lexical scopes and higher-order functions.",
      "2. Write simple decorators with no arguments.",
      "3. Upgrade to parameterized decorator functions.",
      "4. Master Class-based decorators and context managers."
    ]
  },
  {
    id: "react-hooks",
    title: "React Hooks",
    icon: "Layers",
    category: "react",
    shortDesc: "Deep-dive React fiber tree state, dependency arrays, custom functional state abstraction, and memory closures.",
    difficulty: "Intermediate",
    timeToRead: "10 mins",
    glowingColor: "border-sky-500/30 text-sky-400 shadow-sky-500/10 hover:border-sky-400 hover:shadow-sky-500/20",
    explanation: `React Hooks were introduced to enable state and lifecycle hooks inside functional components, entirely avoiding traditional Class hierarchies. Under deep fiber architecture, React maintains an ordered array/linked-list of state cells mapped directly to component execution sequences.

Because components invoke Hook cells in chronological sequences, you must strictly follow the Rules of Hooks: Never execute hooks inside conditional logic, nesting levels, or loop sequences.

#### Internals Layout Grid:
\`\`\`
[Fiber Component State Sequence]
  Index 0: useState  ──> "HarshBot AI" Label
  Index 1: useEffect ──> [Observer Bind Linkage]
  Index 2: useMemo   ──> Calculated parameters Cache
\`\`\``,
    codeExample: `import React, { useState, useEffect, useMemo, useCallback } from "react";

export function ActiveObserver({ targetId }) {
  const [data, setData] = useState(null);
  const [active, setActive] = useState(true);

  // Memoizing heavy computation variables with high fidelity
  const processedMetrics = useMemo(() => {
    if (!data) return [];
    return data.map(item => ({ ...item, timestamp: Date.now() }));
  }, [data]);

  // Preventing child hook infinite re-renders
  const triggerTelemetry = useCallback(() => {
    console.log("Telemetry dispatched for: ", targetId);
  }, [targetId]);

  useEffect(() => {
    let activeStream = true;
    const fetchStatus = () => {
      setTimeout(() => {
        if (activeStream) {
          setData([{ metric: "LOAD", value: "Optimal" }]);
        }
      }, 1000);
    };

    fetchStatus();
    return () => { activeStream = false; };
  }, [targetId]);

  return <div>Active Subscriptions count: {processedMetrics.length}</div>;
}`,
    proTips: [
      "Never map dynamic objects directly into your useEffect dependencies; React uses referential comparison.",
      "Clean up window events and intervals inside useEffect returns to absolutely avoid persistent memory leaks.",
      "Utilize useMemo only when computational stress justifies caching, otherwise initialization overhead dominates."
    ],
    roadmap: [
      "1. Learn execution flow of useState & state immutability.",
      "2. Deep dive useEffect and the cleanup lifecycle handles.",
      "3. Leverage custom descriptive hooks for state extraction.",
      "4. Optimize rendering with useMemo, useCallback, and Memo."
    ]
  },
  {
    id: "rest-apis",
    title: "REST APIs",
    icon: "Network",
    category: "api",
    shortDesc: "Architect scalable, stateless HTTP servers following REST methodologies, secure headers, and cache tags.",
    difficulty: "Beginner",
    timeToRead: "7 mins",
    glowingColor: "border-cyan-500/30 text-cyan-400 shadow-cyan-500/10 hover:border-cyan-400 hover:shadow-cyan-500/20",
    explanation: `Representational State Transfer (REST) is a architectural design template widely selected to build web app endpoints. It is governed by stateless client-server separations, resource paths, content type headers, and uniform standard methods.

A true REST configuration acts on direct operations using appropriate HTTP Verbs (GET, POST, PUT, DELETE, PATCH).

#### Typical Server Gateway Pipeline:
\`\`\`
[HTTP GET /api/v1/users/45] ──> [Route Decoupler] ──> [JWT Parser (Auth)]
                                                            │
                                                   [Resource Retrieved]
                                                            │
[HTTP Code 200 JSON payload] <── [MIME Content Setup] <─────┘
\`\`\``,
    codeExample: `import express from "express";
const app = express();
app.use(express.json());

const MOCK_DB = [
  { id: 1, name: "Harsh Bhadoriya", role: "Software Architect" }
];

// GET: Query dynamic user records
app.get("/api/v1/users/:id", (req, res) => {
  const user = MOCK_DB.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "USER_SPEC_NOT_FOUND", payload: null });
  }
  res.status(200).json({ success: true, payload: user });
});

// POST: Register static payloads
app.post("/api/v1/users", (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
  }
  const newUser = { id: MOCK_DB.length + 1, name, role };
  MOCK_DB.push(newUser);
  res.status(201).json({ success: true, payload: newUser });
});`,
    proTips: [
      "Emulate standard status codes: 200 for OK, 201 for Created, 400 for bad query patterns, and 500 for server errors.",
      "Avoid nested paths like /getUsers?id=5; prefer restful resource locators like /api/v1/users/5.",
      "Secure REST services with proper Cross-Origin Resource Sharing (CORS) rules and rate limit tokens."
    ],
    roadmap: [
      "1. Understand URI designs and resource representations.",
      "2. Learn HTTP verbs and correct payload structures.",
      "3. Master authentication patterns: Bearer JWTs and API Keys.",
      "4. Formulate rate limit mechanisms and cache headers."
    ]
  },
  {
    id: "git-github",
    title: "Git vs GitHub",
    icon: "GitBranch",
    category: "git",
    shortDesc: "Understand localized DAG repository tracks, structural commit hashes, branching models, and remote syncs.",
    difficulty: "Beginner",
    timeToRead: "6 mins",
    glowingColor: "border-teal-500/30 text-teal-400 shadow-teal-500/10 hover:border-teal-400 hover:shadow-teal-500/20",
    explanation: `Many developers conflate Git with GitHub, yet they stand as entirely separate frameworks.

- **Git** is a localized, offline, open-source Distributed Version Control System (DVCS). Git stores code history as a Directed Acyclic Graph (DAG) with unique SHA-1 hashes indicating every file adjustment.
- **GitHub** is an enterprise cloud cloud portal hosting your remote repository tracks, Pull Request flows, social coding metrics, issue boards, and automated CI/CD features.

#### Architecture Model:
\`\`\`
[LOCAL WORKSPACE]                                 [REMOTE TARGET]
  Working Directory ──> Stage ──> Local Commits ──> "git push" ──> GitHub Cloud Engine
\`\`\``,
    codeExample: `# Create a feature branch and sync it cleanly to upstream master
git checkout -b feature/jarvis-orb

# Perform atomic commits
git add .
git commit -m "feat: design floating neural particle core framework"

# Fetch latest updates from remote master branch without merges
git fetch origin

# Rebase local features on top of current master
git rebase origin/master

# Push final rebased commits cleanly
git push origin feature/jarvis-orb --force-with-lease`,
    proTips: [
      "Never run standard 'git push --force' blindly; opt for '--force-with-lease' to prevent overwrites of teammate commits.",
      "Utilize .gitignore configurations early to keep node_modules and api keys strictly isolated.",
      "Structure your commit messages cleanly with semantic markers (e.g., 'feat:', 'fix:', 'docs:', 'chore:')."
    ],
    roadmap: [
      "1. Learn local terminal Git configuration.",
      "2. Understand tracking, staging, and basic committing.",
      "3. Comprehend branching, merge conflicts, and rebasing tasks.",
      "4. Set up remote repos, SSH key signatures, and GitHub PR flows."
    ]
  },
  {
    id: "ml-basics",
    title: "Machine Learning Basics",
    icon: "Cpu",
    category: "ml",
    shortDesc: "Comprehend supervised vectors, neural activation thresholds, gradient optimizations, and loss solvers.",
    difficulty: "Intermediate",
    timeToRead: "9 mins",
    glowingColor: "border-pink-500/30 text-pink-400 shadow-pink-500/10 hover:border-pink-400 hover:shadow-pink-500/20",
    explanation: `Machine Learning (ML) moves programming away from hardcoded logic rules toward data-driven training. Instead of coding absolute constraints, you train algorithms on massive inputs so the system optimizes high-dimensional math equations to make accurate predictions.

Deep Learning uses multi-layered artificial neural connections simulating animal brains to extract complex hierarchical features.

#### Deep Training Cycle:
\`\`\`
[Features Matrix X] ──> [Forward Prop (y_pred)] ──> [Compute Loss / Error (E)]
                             ▲                               │
                             │                           [Backprop]
                     [Update Weights W, b] <── [Compute Gradients dW, db]
\`\`\``,
    codeExample: `import numpy as np

# A skeletal representation of a plain neural neuron with ReLU
class SimpleNeuron:
    def __init__(self, input_dim):
        # Initializing random weight nodes and bias offsets
        self.weights = np.random.randn(input_dim) * 0.01
        self.bias = 0.0
        
    def forward(self, inputs):
        # Linear product equation: z = W * X + b
        self.inputs = np.array(inputs)
        self.z = np.dot(self.inputs, self.weights) + self.bias
        # Retaining activation values: ReLU
        self.output = max(0, self.z)
        return self.output

# test neuron
neuron = SimpleNeuron(input_dim=3)
print("Output Activation:", neuron.forward([1.2, -0.8, 3.1]))`,
    proTips: [
      "Keep standard validation datasets entirely isolated; testing on training sets causes severe overfitting risks.",
      "Normalize input ranges (e.g., transform to [0,1] or standard normal) to stabilize vector mathematical weights.",
      "Use proper optimizers (like Adam or RMSprop) to automatically scale steps for faster gradient descent calculations."
    ],
    roadmap: [
      "1. Master Linear and Logistic Regression statistics.",
      "2. Learn basic linear algebra vectors and matrix calculus frameworks.",
      "3. Code basic Activation functions (ReLU, Sigmoid, Softmax).",
      "4. Construct multi-layer perceptron neural networks from scratch."
    ]
  },
  {
    id: "dsa-roadmap",
    title: "DSA Roadmap",
    icon: "Binary",
    category: "dsa",
    shortDesc: "Acquire systematic mastery of memory references, trees, graphs, sorting techniques, and Big-O runtimes.",
    difficulty: "Beginner",
    timeToRead: "12 mins",
    glowingColor: "border-emerald-500/30 text-emerald-400 shadow-emerald-500/10 hover:border-emerald-400 hover:shadow-emerald-500/20",
    explanation: `Data Structures & Algorithms (DSA) provide the fundamental foundations of logical space-time complexity analysis. Learning DSA shapes your spatial-logical thinking on how computers organize, index, search, and recall data matrices.

We classify resources into foundational, linear, hierarchical, and dynamic categories. Every algorithm must be accompanied by detailed space and time analysis.

#### Big-O Efficiency Hierarchy:
\`\`\`
O(1) [Constant]  ──> O(log N) [Logarithmic] ──> O(N) [Linear] ──> O(N log N) [Heap/Merge]
                                                                        │
O(2^N) [Exponential] <── O(N^2) [Quadratic] <───────────────────────────┘
\`\`\``,
    codeExample: `# Optimized Binary Search: Runtime complexity O(log N) | Space complexity O(1)
def binary_search(sorted_arr, target):
    left, right = 0, len(sorted_arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Safeguard against integer stack overflows
        
        if sorted_arr[mid] == target:
            return mid
        elif sorted_arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# execute
dataset = [2, 5, 8, 12, 19, 23, 38, 56, 72, 91]
print("Index matches at target:", binary_search(dataset, 38))`,
    proTips: [
      "Solve challenges logically on paper or boards before writing actual terminal code files.",
      "Always inquire about input extreme bounds first: null inputs, massive loads, duplicates, negative numbers.",
      "Trade-off memory spaces to optimize execution latency (e.g., utilize HashSets to complete scans in O(1) time)."
    ],
    roadmap: [
      "1. Master Big-O notations, runtimes, and space complexities.",
      "2. Learn linear lists: Arrays, Single/Double LinkedLists, Stacks, Queues.",
      "3. Explore non-linear structures: Trees, Graphs, Trie, and Heap nodes.",
      "4. Grasp algorithmic concepts: Two-pointers, Sliding Window, Recursion, DP."
    ]
  },
  {
    id: "open-source-contributions",
    title: "Open Source Contributions",
    icon: "Terminal",
    category: "os",
    shortDesc: "Initiate upstream code changes, fork structures, branch protections, issue triage, and licensing.",
    difficulty: "Beginner",
    timeToRead: "6 mins",
    glowingColor: "border-pink-500/30 text-pink-400 shadow-pink-500/10 hover:border-pink-400 hover:shadow-pink-500/20",
    explanation: `Contributing to Open Source is the fastest route to accelerate software engineering skills and build a public portfolio. By contributing to key repositories, you learn about code review standards, documentation pipelines, and collective code testing.

Before submitting code, participate in issue triaging and update outdated documentation files. Always read the root \`CONTRIBUTING.md\` schema of target open-source repositories.

#### Code Submission Cycle:
\`\`\`
[Fork Upstream Repo] ──> [Code Bug Fix Branch] ──> [Local Test Assertions]
                                                         │
                                               [Open Pull Request]
                                                         │
[Merge Core Complete] <── [Core Review & Squash] <──────┘
\`\`\``,
    codeExample: `# Adding remote references to stay fully synced with main project changes
git remote add upstream https://github.com/original-creator/main-project.git

# Pull upstream changes directly into your local workspace
git fetch upstream
git checkout master
git merge upstream/master

# Squash commits together before final merge to preserve a clean history
git rebase -i HEAD~3`,
    proTips: [
      "Start by resolving minor issues labeled 'good first issue' or translating missing document sheets.",
      "Discuss your planned solution with maintainers within active issue threads before drafting massive code blocks.",
      "Strictly check standard code linters, typings, and run unit tests before initiating a pull request."
    ],
    roadmap: [
      "1. Learn how to navigate GitHub issues, triages, and project boards.",
      "2. Comprehend fork-pull models, remotes, and code rebasing rules.",
      "3. Write concise, clear documentation in README files.",
      "4. Initiate code adjustments on verified public software libraries."
    ]
  },
  {
    id: "docker-fundamentals",
    title: "Docker Fundamentals",
    icon: "Cpu",
    category: "docker",
    shortDesc: "Package microservices using immutable layers, isolated image scopes, networks, and YAML blueprints.",
    difficulty: "Intermediate",
    timeToRead: "7 mins",
    glowingColor: "border-blue-500/30 text-blue-400 shadow-blue-500/10 hover:border-blue-400 hover:shadow-blue-500/20",
    explanation: `Docker isolates applications inside lightweight, self-contained packages called Containers. Unlike virtual machines that replicate entire guest operating systems, containers share the host Linux kernel directly, resulting in massive startup performance gains and low resource usage.

Containers compile in layered file schemas defined sequentially through standard Dockerfiles.

#### Docker Engine Workspace:
\`\`\`
[Dockerfile Recipe] ──> [Docker Build Command] ──> [Immutable Static Image]
                                                           │
                                                     [Docker Run]
                                                           │
[Isolated Sandbox Shell] <── [Expose Port 3000] <──────────┘
\`\`\``,
    codeExample: `# An optimized Node.js multi-stage build recipe
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`,
    proTips: [
      "Write multi-stage Dockerfiles to minimize final artifact size by stripping build-time SDKs and caches.",
      "Specify explicit version tags (e.g. node:18-alpine) rather than mutable tags like 'latest'.",
      "Avoid running applications as root; declare custom users inside Dockerfiles."
    ],
    roadmap: [
      "1. Understand kernel namespaces, cgroups, and container virtualization.",
      "2. Write custom Dockerfiles containing multi-stage recipes.",
      "3. Learn caching mechanics, mounting, and environment variables.",
      "4. Orchestrate multi-container networks using Docker Compose blueprints."
    ]
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    icon: "Sparkles",
    category: "ai",
    shortDesc: "Formulate elite contextual instructions, dynamic agents, few-shot structures, and logical reasoning steps.",
    difficulty: "Beginner",
    timeToRead: "5 mins",
    glowingColor: "border-amber-500/30 text-amber-400 shadow-amber-500/10 hover:border-amber-400 hover:shadow-amber-500/20",
    explanation: `Prompt Engineering is the practice of crafting optimal structured text instructions to get high-quality, predictable outputs from Generative AI Models (like Gemini).

Rather than writing simple vague queries, elite prompt engineers leverage specific contextual boundaries, programmatic system behavior rules, few-shot examples, and systematic logical paths (Chain of Thought).

#### Prompt Construction Model:
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│ [ROLE] Senior Architect  ──> [TASK] Solve Race Conditions                │
│ [CONTEXT] Async Python   ──> [FORMAT] Markdown ASCII Diagrams          │
│ [CONSTRAINT] Zero external libraries allowed                         │
└────────────────────────────────────────────────────────────────────────┘
\`\`\``,
    codeExample: `You are an elite database performance tuner.
Analyze the following slow-running composite index query transaction.

[DATABASE SCHEMA]:
Table: user_logs
Indexes: (created_at)

[CORRUPTED SLOW QUERY]:
SELECT * FROM user_logs WHERE tenant_id = 45 ORDER BY created_at DESC LIMIT 50;

Systematic Processing Checklist:
1. Explain why ordering on created_at without tenant_id causes a full index scan.
2. Outline the optimal compound index strategy: (tenant_id, created_at).
3. Draft the exact SQL migrations migration queries.`,
    proTips: [
      "Apply 'Chain of Thought' by appending instructions like 'Let's solve this step by step' to dramatically boost model reasoning metrics.",
      "Apply negative constraints (e.g., 'Never output boilerplate code blocks') to minimize generation noise.",
      "Use XML tags (e.g. <context>...</context>) to isolate input parameters from instructions."
    ],
    roadmap: [
      "1. Learn basic zero-shot and few-shot formatting schemas.",
      "2. Master structural roleplaying directives and context boundary setups.",
      "3. Write Chain of Thought, ReAct, and Self-Consistency patterns.",
      "4. Secure prompts against jailbreaks and injection attacks."
    ]
  },
  {
    id: "database-fundamentals",
    title: "Database Fundamentals",
    icon: "Network",
    category: "db",
    shortDesc: "Understand relation structures, index b-trees, ACID transactions, data locks, and non-relational document trees.",
    difficulty: "Beginner",
    timeToRead: "8 mins",
    glowingColor: "border-violet-500/30 text-violet-400 shadow-violet-500/10 hover:border-violet-400 hover:shadow-violet-500/20",
    explanation: `Databases compose the primary state layer of any mature application architecture. Software engineers must navigate relational databases (SQL) and non-relational databases (NoSQL).

- **Relational Databases** guarantee ACID transactional rules, solid schema models, and utilize rapid B-Tree indexes.
- **NoSQL Databases** prioritize quick horizontal scaling, document store architectures, or fast key-value caches.

#### ACID Core Principles:
\`\`\`
Atomicity  ──> Complete ALL or roll back nothing
Consistency ──> Transition databases between valid states
Isolation  ──> Concurrent executions yield identical serial outputs
Durability  ──> Committed writes survive permanent node failures
\`\`\``,
    codeExample: `-- Optimize search patterns with composite indexes
CREATE TABLE developer_profiles (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    active_language VARCHAR(30) NOT NULL,
    github_rating INT DEFAULT 0
);

-- Index creation speeding up high-frequency searches
CREATE INDEX idx_dev_lang_rating ON developer_profiles (active_language, github_rating DESC);

-- Accelerated search query utilizing index scans
SELECT username, github_rating 
FROM developer_profiles 
WHERE active_language = 'Python' AND github_rating > 90;`,
    proTips: [
      "Run 'EXPLAIN ANALYZE' on slow queries to identify full table scans and index choices.",
      "Do not index highly duplicated columns; it ruins write latency and inflates storage space.",
      "Use transaction block queries (BEGIN...COMMIT) to keep relational databases perfectly synchronized."
    ],
    roadmap: [
      "1. Learn basic relational SQL syntax queries (SELECT, JOINs, Group By).",
      "2. Comprehend ACID guidelines and different isolation levels.",
      "3. Understand index mechanics: B-Trees, Hash, and GIST search shapes.",
      "4. Compare Relational vs Document databases (PostgreSQL vs MongoDB)."
    ]
  }
];

export interface ChatPresetAnswer {
  question: string;
  answer: string;
}

export const CHAT_PRESET_ANSWERS: Record<string, string> = {
  "Explain Python Decorators": `🐍 **Python Decorators Demystified [HARSHBOT TERMINAL]**

A Python decorator is a premium design template that allows you to wrapping logic parameters dynamically around executable functions. Under the hood, decorators use **Python Closures**, keeping parent scopes active even after outer functions exit.

#### Code Implementation Blueprint:
\`\`\`python
import time
from functools import wraps

def monitor_execution(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t1 = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = (time.perf_counter() - t1) * 1000
        print(f"[SYSTEM] Logged: '{func.__name__}' -> Delay: {elapsed:.3f}ms")
        return result
    return wrapper

@monitor_execution
def crunch_matrices():
    time.sleep(0.04) # Simulate calculation latency

crunch_matrices()
\`\`\`

**Senior Developer Tip:** Always apply \`@wraps(func)\` to wrapper metrics, making sure you don't corrupt dynamic naming or docstring metadata parameters.`,

  "What is React?": `⚛️ **React Framework Mechanics [HARSHBOT TERMINAL]**

React is a massive, highly efficient library designed to construct component-driven browser interfaces. Developed by Meta, React leverages a high-tech **Virtual DOM** structure to optimize browser redraw overheads.

#### Key Architectural Principles:
1. **Virtual DOM:** React maps a fast memory tree representation. When parameters change, it performs a 'diffing' calculation and applies only the specific changes to the real browser DOM.
2. **One-Way Data Binding:** Data flows strictly downwards from parent controllers to child layouts via immutable \`props\`.
3. **Declarative Rendering:** You formulate how the UI should look for a given active state, and React handles the low-level rendering mechanics automatically.

#### Rendering Core Cycle:
\`\`\`
State change ──> Render Virtual DOM ──> Diff with Previous Layout ──> Apply Batch Updates
\`\`\``,

  "What is Machine Learning?": `🧠 **Intro to Machine Learning [HARSHBOT TERMINAL]**

Machine Learning (ML) is the computational branch that empowers systems to learn complex logic models from training datasets without explicitly programmed rules.

#### Three Primary Categories:
- **Supervised Learning:** Training models on labeled inputs (e.g., predicting real-estate prices based on square footage variables).
- **Unsupervised Learning:** Grouping unlabeled inputs to find nested patterns (e.g., clustering active e-commerce customers).
- **Reinforcement Learning:** Training autonomous agents to optimize rewards by taking actions within environments (e.g., chess solvers).

#### Mathematical Learning Loop:
\`\`\`
[Inputs X] ──> [Models Prediction y_pred] ──> [Loss Valuation (E)]
                        ▲                             │
                [Weight Adjustment] <─── [Gradient Descent Solver]
\`\`\``,

  "Git vs GitHub": `🐙 **Git vs GitHub Dissection [HARSHBOT TERMINAL]**

These represent two entirely distinct software layers of system development:

| PARAMETER | LOCAL GIT TOOL | CLOUD GITHUB INFRASTRUCTURE |
| :--- | :--- | :--- |
| **Primary Definition** | Distributed Version Control Utility | Cloud Hosting Portal & Collaboration Hub |
| **Offline Performance** | 100% Offline. Stores tracking graph on local disk | Requires remote networks and valid auth tokens |
| **Core Functions** | Branch creation, commit hashes, local merges | Pull Request reviews, CI/CD Actions, issues |

#### Essential Collaboration workflow:
\`\`\`
[Local workspace edits] ──> [Git commit actions] ──> [Git push upstream] ──> [GitHub PR Review]
\`\`\``,

  "How APIs Work?": `🔌 **API Mechanics and HTTP Streams [HARSHBOT TERMINAL]**

An Application Programming Interface (API) acts as a secure, standardized bridge enabling distinct standalone systems to correspond. The Web mostly relies on **REST** (stateless resource paths) or **GraphQL** (custom multi-query structures) using standard protocols like HTTP.

#### Typical Request Response Pipeline:
1. **Client Request:** Browser transmits a request containing target nouns (e.g., \`GET /users/12\`) along with authentication headers.
2. **Server Middleware:** Decouples paths, validates user credentials, and executes queries.
3. **MIME Returns:** Server returns a response, typically formatted as a clean **JSON** string carrying HTTP validation statuses (e.g., 200 OK or 404 Not Found).

#### Active Path Flow Matrix:
\`\`\`
[Browser Client] ─── (GET req + Jwt payload) ───> [Rest Controller] ───> [SQL Storage Node]
                                                                                │
[Render screen] <─── (JSON return + Status 200) <─── [MIME Formatter] <─────────┘
\`\`\``,

  "Explain Docker": `🐳 **Docker Containers Solved [HARSHBOT TERMINAL]**

Docker is an automated container engine designed to package applications with their dependencies into isolated containers. Unlike Virtual Machines, containers share the host's Linux Kernel directly, bypassing hypervisor overheads and guest OS boots.

#### Key Container Architecture:
- **Dockerfile:** A text recipe defining actions to build your application image.
- **Image:** Retains read-only static layers representing configuration packages, libraries, and binary parameters.
- **Container:** An active, isolated sandbox instance created by running an image.

#### Isolated Lifecycle:
\`\`\`
[Code Workspace] ──> [Dockerfile Script] ──> [Immutable Images] ──> [Running Sandbox Container]
\`\`\``,

  "What is DSA?": `📐 **Data Structures & Algorithms (DSA) [HARSHBOT TERMINAL]**

DSA is the core foundation of computer science. It covers the structures used to organize data and the step-by-step algorithms used to process it efficiently.

#### Key Categories:
1. **Linear Structures:** Arrays, dynamic LinkedList arrays, Stacks (LIFO), and Queues (FIFO).
2. **Hierarchical Collections:** Binary Trees, Red-Black Trees, and Graphs.
3. **Optimizing Solvers:** Sorting, binary indexing, greedy strategies, and dynamic programming scales.

**Space-Time Paradigm:** Every program trades off execution latency (Time Complexity) for memory usage (Space Complexity). We evaluate algorithm efficiency using **Big-O Notation** (e.g. O(1), O(log N), O(N), O(N^2)).`,

  "Open Source Guide": `🌐 **Open Source Participation Guide [HARSHBOT TERMINAL]**

Contributing to open-source projects is the fastest way to build credit as a professional developer.

#### Contribution Pipeline:
1. **Locate Target Repository:** Pinpoint projects containing labels like \`good first issue\` or \`help wanted\`.
2. **Fork and Clone:** Create a personal remote copy of the project and clone it to your local machine.
3. **Commit Branch:** Set up branches (e.g., \`fix/db-leak\`), perform modifications, write structural assertions, and commit.
4. **Synchronize:** Fetch upstream updates to avoid rebase and merge conflict failures.
5. **PR Dispatches:** Create a Pull Request detailing the changes, benchmarks, and why maintainers should merge them.`,

  "Prompt Engineering": `✍️ **AI Prompt Engineering Strategies [HARSHBOT TERMINAL]**

Prompt Engineering is the practice of crafting optimal inputs to guide AI Large Language Models (like Gemini) to produce high-quality, predictable outputs.

#### Core Techniques for Elite Prompts:
- **Role Assignment:** Define the model's persona (e.g., "Act as a senior database administrator").
- **XML Tag Isolation:** Wrap source documentation or files inside labels like \`<context>...</context>\`.
- **Chain of Thought (CoT):** Request step-by-step logical reasoning to dramatically boost accuracy.
- **Few-Shot Examples:** Provide sample input-output pairs to demonstrate the desired format and tone.`,

  "SQL vs NoSQL": `🗄️ **SQL vs NoSQL Databases [HARSHBOT TERMINAL]**

Selecting a database structure dictates how your application's state will scale:

| PARAMETER | RELATIONAL SQL | DOCUMENTS NOSQL |
| :--- | :--- | :--- |
| **Schema Model** | Strict tabular schema (Rows and Columns) | Dynamic, schema-less (JSON, Key-Value, Graph) |
| **Scaling Strategy** | Vertical scaling (upgrade CPU / storage) | Horizontal scaling (distribute nodes across servers) |
| **Transactions** | Strict **ACID** consistency compliance | Eventual consistency (**BASE** methodology) |
| **Typical Tech** | PostgreSQL, MySQL, SQLite | MongoDB, Cassandra, Redis |

#### ACID Transaction Flow:
\`\`\`
Begin transaction ──> Write records ──> Assert constraints ──> Commit to disk (Permanent)
\`\`\``
};
