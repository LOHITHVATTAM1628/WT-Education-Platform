/**
 * ==============================================================================
 * EduLearn - Comprehensive Application Architecture & Frontend Engine
 * Complete College Project (Phases 1-6 + Dark Mode, Video Embeds & Lesson Modals)
 * Subject: Web Technology (WT) Lab & Theory Project
 * 
 * 🎓 COLLEGE VIVA ARCHITECTURE SUMMARY:
 * 1. Single Page Application (SPA) State Simulation: Pure Vanilla JS without frameworks.
 * 2. Web Storage API (localStorage): Persistent client-side database replacement for
 *    session state, dark/light theme, course progress, and quiz evaluations.
 * 3. Embedded Video & Media Integration: Responsive 16:9 YouTube iframe embeds with
 *    automatic lifecycle teardown (clearing src on close to stop audio playback).
 * 4. Global Dark Mode Architecture: Dynamic CSS class mutation (`dark-theme` on `<body>`)
 *    with CSS custom property inheritance and instant multi-page persistence.
 * 5. Interactive Modal Pattern: Accessible overlay dialog with keyboard navigation (`Esc`),
 *    backdrop dismissal, and bidirectional state synchronization.
 * 6. Route Guard Security Pattern: Protects private routes (`dashboard`, `courses`, `course`, `quiz`, `profile`)
 *    and redirects unauthenticated sessions to `index.html`.
 * 7. URL Parameter Routing: Uses `URLSearchParams` to pass contextual IDs (`?id=python`) across pages.
 * 8. Dynamic DOM Generation: Safely interpolates JavaScript data models into semantic HTML structures.
 * 9. Functional Array Manipulations: Leverages `.filter()`, `.map()`, and `.reduce()` for statistical analytics.
 * ==============================================================================
 */

// ==============================================================================
// 1. GLOBAL APPLICATION CONFIGURATION & COURSE REPOSITORY
// ==============================================================================
const APP_CONFIG = {
    // Hardcoded permanent credentials (per project requirements)
    CREDENTIALS: {
        USERNAME: "student",
        PASSWORD: "12345"
    },
    // Standard localStorage keys used throughout the system
    STORAGE_KEYS: {
        IS_LOGGED_IN: "isLoggedIn",
        CURRENT_USER: "currentUser",
        THEME: "edulearn_theme",
        STATS: "edulearn_stats",
        COURSE_PROGRESS: "edulearn_course_progress",
        QUIZ_SCORES: "edulearn_quiz_scores"
    },
    // Page Route Registry
    PAGES: {
        LOGIN: "index.html",
        DASHBOARD: "dashboard.html",
        COURSES: "courses.html",
        COURSE_DETAIL: "course.html",
        QUIZ: "quiz.html",
        PROFILE: "profile.html"
    },
    // Initial baseline progress seed data
    DEFAULT_COURSE_PROGRESS: {
        "python": { completedLessons: [1, 2, 3] },        // 3 of 5 = 60%
        "web-dev": { completedLessons: [1, 2, 3, 4] },    // 4 of 5 = 80%
        "machine-learning": { completedLessons: [1, 2] }, // 2 of 5 = 40%
        "data-science": { completedLessons: [1] }         // 1 of 5 = 20%
    },
    // Initial baseline quiz scores seed data
    DEFAULT_QUIZ_SCORES: {
        "python": { score: 4, total: 5, percentage: 80 },
        "web-dev": { score: 5, total: 5, percentage: 100 },
        "machine-learning": { score: 4, total: 5, percentage: 80 },
        "data-science": { score: 4, total: 5, percentage: 80 }
    },
    // The 4 Core Courses with Rich Lessons, Embedded Videos, Detailed Notes, Code Snippets & MCQs
    COURSES: [
        {
            id: "python",
            title: "Python Programming Masterclass",
            category: "Programming",
            description: "Learn core Python syntax, control structures, object-oriented programming (OOP), file operations, and practical scripting from scratch.",
            instructor: "Dr. Alan Turing",
            difficulty: "Beginner",
            totalLessons: 5,
            iconColor: "blue",
            lessons: [
                {
                    number: 1,
                    title: "Introduction to Python & Environment Setup",
                    description: "Install Python 3, understand the Python interpreter, write your first 'Hello World' script, and explore VS Code tooling.",
                    duration: "25 mins",
                    videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
                    notes: "Python is an interpreted, high-level, dynamically typed programming language created by Guido van Rossum in 1991. The Python interpreter executes code line-by-line, converting source code into intermediate bytecode (.pyc) which runs on the Python Virtual Machine (PVM).",
                    codeSnippet: `# 1. Outputting text to standard output\nprint("Hello, EduLearn Student!")\n\n# 2. Reading dynamic user input\nuser_name = input("Enter your name: ")\nprint(f"Welcome to Python Masterclass, {user_name}!")`,
                    takeaways: [
                        "Python code is interpreted line-by-line by the PVM without explicit compilation steps.",
                        "Indentation (standard 4 spaces) defines code blocks instead of curly braces.",
                        "Use formatted string literals (f-strings) for clean variable interpolation."
                    ]
                },
                {
                    number: 2,
                    title: "Variables, Data Types & Arithmetic Operators",
                    description: "Master dynamic typing, integers, floats, strings, booleans, type casting, and standard Python mathematical expressions.",
                    duration: "35 mins",
                    videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
                    notes: "Python does not require explicit variable declaration with types. Variables are references pointing to objects in memory. The fundamental primitive data types include int, float, str, and bool. Sequences include lists (mutable) and tuples (immutable).",
                    codeSnippet: `# Dynamic Variable Assignment\ncourse_name = "Python 101"   # str\ncredits = 4                   # int\npassing_rate = 94.5          # float\nis_active = True              # bool\n\n# Arithmetic operations & Type Conversion\ntotal_score = int("95") + 5\nprint(f"Course: {course_name}, Total Score: {total_score}")`,
                    takeaways: [
                        "Variables are dynamically bound to values; type checking occurs at runtime.",
                        "Tuples are immutable; lists are mutable ordered collections.",
                        "Type casting functions like int(), float(), and str() convert between compatible types."
                    ]
                },
                {
                    number: 3,
                    title: "Control Flow, Conditionals & Loops",
                    description: "Learn boolean logic with if-elif-else branches, for loops, while loops, break/continue statements, and range generators.",
                    duration: "40 mins",
                    videoUrl: "https://www.youtube.com/embed/6iF8Xb7Z3wQ",
                    notes: "Decision making in Python relies on relational operators (==, !=, >, <, >=, <=) and logical operators (and, or, not). Iteration is performed using `for` loops with the `range()` sequence generator or `while` loops conditioned on a boolean predicate.",
                    codeSnippet: `# Conditional Branching\nscore = 88\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\n\n# For Loop with range()\nfor i in range(1, 4):\n    print(f"Iteration step: {i}")`,
                    takeaways: [
                        "The `elif` keyword provides chained multi-condition branching.",
                        "`range(start, stop, step)` generates arithmetic progressions efficiently.",
                        "`break` terminates a loop immediately, whereas `continue` skips to the next iteration."
                    ]
                },
                {
                    number: 4,
                    title: "Functions, Scope & Modular Programming",
                    description: "Define reusable functions, understand positional and keyword arguments, default parameters, lambda expressions, and import modules.",
                    duration: "45 mins",
                    videoUrl: "https://www.youtube.com/embed/9Os0o3wzS_I",
                    notes: "Functions are declared using the `def` keyword. Python supports positional arguments, default values, arbitrary arguments (*args, **kwargs), and anonymous single-expression lambda functions. Python uses the LEGB (Local, Enclosing, Global, Built-in) rule for variable scope resolution.",
                    codeSnippet: `# Function Definition with Default Argument\ndef calculate_gpa(scores, bonus=2):\n    average = sum(scores) / len(scores)\n    return min(100, average + bonus)\n\n# Anonymous Lambda Function\nsquare = lambda x: x * x\n\nmy_scores = [85, 90, 92]\nprint("Final Grade:", calculate_gpa(my_scores))`,
                    takeaways: [
                        "Functions return `None` by default if no explicit return statement is provided.",
                        "Default parameter values must follow non-default parameters in the signature.",
                        "The LEGB rule determines how Python resolves identifier names across scopes."
                    ]
                },
                {
                    number: 5,
                    title: "Object-Oriented Programming (OOP) in Python",
                    description: "Design classes, create object instances, implement constructors (__init__), inheritance, encapsulation, and method overriding.",
                    duration: "50 mins",
                    videoUrl: "https://www.youtube.com/embed/JeznW_7DlB0",
                    notes: "Python is fundamentally object-oriented. Classes act as blueprints for creating objects. The `__init__` constructor method initializes instance attributes upon instantiation. The `self` parameter references the current object instance.",
                    codeSnippet: `class Student:\n    def __init__(self, name, roll_no):\n        self.name = name          # Instance attribute\n        self.roll_no = roll_no\n\n    def get_details(self):\n        return f"Student: {self.name} (Roll #{self.roll_no})"\n\ns1 = Student("Alice Smith", 101)\nprint(s1.get_details())`,
                    takeaways: [
                        "`__init__()` acts as the class constructor to initialize instance attributes.",
                        "`self` must be the first parameter in instance methods to reference the calling object.",
                        "Inheritance allows child classes to extend and override parent class behavior."
                    ]
                }
            ],
            quiz: [
                {
                    id: 1,
                    question: "Which of the following data types is immutable in Python?",
                    options: [
                        "List",
                        "Tuple",
                        "Dictionary",
                        "Set"
                    ],
                    correctAnswer: 1, // Tuple
                    explanation: "Tuples are immutable in Python, meaning their elements cannot be modified, added, or removed after creation."
                },
                {
                    id: 2,
                    question: "Which keyword is used to declare a function in Python?",
                    options: [
                        "function",
                        "def",
                        "define",
                        "func"
                    ],
                    correctAnswer: 1, // def
                    explanation: "The 'def' keyword is standard in Python syntax to begin a function definition."
                },
                {
                    id: 3,
                    question: "What is the output of len(['apple', 'banana', 'cherry']) in Python?",
                    options: [
                        "2",
                        "3",
                        "4",
                        "Error"
                    ],
                    correctAnswer: 1, // 3
                    explanation: "The len() function counts the number of top-level items in a sequence. The list has 3 strings."
                },
                {
                    id: 4,
                    question: "In Python OOP, what special method serves as the class constructor?",
                    options: [
                        "__construct__()",
                        "__init__()",
                        "__main__()",
                        "__start__()"
                    ],
                    correctAnswer: 1, // __init__()
                    explanation: "The '__init__' method is automatically invoked when a new object instance is instantiated from a class."
                },
                {
                    id: 5,
                    question: "Which character is used to write single-line comments in Python?",
                    options: [
                        "//",
                        "/*",
                        "#",
                        "--"
                    ],
                    correctAnswer: 2, // #
                    explanation: "In Python, single-line comments start with the hash (#) symbol."
                }
            ]
        },
        {
            id: "web-dev",
            title: "Full-Stack Web Development",
            category: "Web Tech",
            description: "Master modern HTML5 semantics, CSS3 Flexbox/Grid architectures, Vanilla JavaScript DOM engineering, and responsive UI design.",
            instructor: "Prof. John Anderson",
            difficulty: "Intermediate",
            totalLessons: 5,
            iconColor: "amber",
            lessons: [
                {
                    number: 1,
                    title: "Semantic HTML5 & Accessible Web Layouts",
                    description: "Structure web pages with modern semantic tags (header, nav, main, section, article), meta viewport, and accessibility best practices.",
                    duration: "30 mins",
                    videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg",
                    notes: "Semantic HTML imparts structural meaning to web documents beyond pure visual presentation. Search engine crawlers (SEO) and assistive screen readers (A11y) rely on tags like <header>, <nav>, <main>, <article>, and <footer> to parse the page outline.",
                    codeSnippet: `<!-- Accessible Semantic Structure -->\n<header class="app-header">\n    <nav aria-label="Main Navigation">\n        <a href="dashboard.html">Home</a>\n    </nav>\n</header>\n<main>\n    <article>\n        <h1>Semantic HTML5 Architecture</h1>\n    </article>\n</main>`,
                    takeaways: [
                        "Semantic elements enhance both search engine indexing and assistive technology accessibility.",
                        "Always declare `<meta name='viewport' content='width=device-width, initial-scale=1.0'>`.",
                        "Use `<main>` once per document to house the primary content area."
                    ]
                },
                {
                    number: 2,
                    title: "CSS3 Mastery, Flexbox & CSS Grid Systems",
                    description: "Build adaptive, fluid layouts using CSS Custom Properties (variables), Flexbox alignment, 2D Grid layouts, and media queries.",
                    duration: "45 mins",
                    videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc",
                    notes: "CSS Flexbox provides one-dimensional axis distribution (row or column alignment), while CSS Grid enables two-dimensional layout architectures. CSS custom properties (`--variable-name`) allow theme switching with zero runtime overhead.",
                    codeSnippet: `/* CSS Variables & Flexbox Alignment */\n:root {\n    --brand-primary: #2563eb;\n}\n\n.card-container {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 1.5rem;\n}`,
                    takeaways: [
                        "Flexbox aligns items along a single axis (`justify-content` / `align-items`).",
                        "CSS Grid creates 2D multi-column/multi-row layouts with `grid-template-columns`.",
                        "CSS Custom Properties enable clean runtime theme toggling via `var(--custom-prop)`."
                    ]
                },
                {
                    number: 3,
                    title: "JavaScript DOM Manipulation & Event Handling",
                    description: "Query and mutate HTML elements dynamically, listen to user input events, manage form submission, and build interactive UI components.",
                    duration: "50 mins",
                    videoUrl: "https://www.youtube.com/embed/0ik6X4DJKCc",
                    notes: "The Document Object Model (DOM) represents HTML as a tree of JavaScript nodes. Methods such as `document.getElementById()` and `document.querySelectorAll()` allow query selection, while `addEventListener()` registers asynchronous user interaction handlers.",
                    codeSnippet: `// DOM Selection and Event Binding\nconst toggleBtn = document.getElementById("toggle-btn");\n\ntoggleBtn.addEventListener("click", function(event) {\n    document.body.classList.toggle("dark-theme");\n    console.log("Theme switched successfully!");\n});`,
                    takeaways: [
                        "`addEventListener('event', handler)` ensures clean separation of structure and behavior.",
                        "`event.preventDefault()` suppresses default browser behavior like form reloading.",
                        "`classList.toggle()` dynamically adds or removes CSS styling classes."
                    ]
                },
                {
                    number: 4,
                    title: "Asynchronous JavaScript & Web Storage APIs",
                    description: "Understand the event loop, Promises, Fetch API, and persist user sessions locally using browser localStorage and sessionStorage.",
                    duration: "40 mins",
                    videoUrl: "https://www.youtube.com/embed/PoRJizFvM7s",
                    notes: "JavaScript operates on a single-threaded asynchronous event loop. Web Storage APIs (`localStorage` and `sessionStorage`) store client-side key-value pairs (up to ~5MB). Data is serialized to string format using `JSON.stringify()` and restored via `JSON.parse()`.",
                    codeSnippet: `// Saving Complex State into localStorage\nconst userProfile = { username: "student", score: 95 };\nlocalStorage.setItem("user_data", JSON.stringify(userProfile));\n\n// Retrieving and Deserializing\nconst saved = JSON.parse(localStorage.getItem("user_data"));\nconsole.log(saved.username); // "student"`,
                    takeaways: [
                        "`localStorage` persists data permanently across browser restarts.",
                        "`sessionStorage` is scoped to the lifecycle of a single browser tab.",
                        "Always wrap `JSON.parse()` in error handling when loading persisted state."
                    ]
                },
                {
                    number: 5,
                    title: "Building Responsive Full-Stack User Interfaces",
                    description: "Integrate components into unified SPAs, apply state management patterns, and optimize frontend rendering performance.",
                    duration: "55 mins",
                    videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
                    notes: "Frontend Single Page Applications (SPAs) emulate server-side routing by listening to URL parameters or history state, updating the DOM dynamically without complete page reloads.",
                    codeSnippet: `// Dynamic URL Parameter Handling\nconst params = new URLSearchParams(window.location.search);\nconst currentCourseId = params.get("id");\nconsole.log("Active Course ID:", currentCourseId);`,
                    takeaways: [
                        "`URLSearchParams` parses query string parameters without complex regex.",
                        "Component-driven design decouples UI cards, modals, and navigation bars.",
                        "Clean CSS animations and CSS transitions enhance user feedback and perceived speed."
                    ]
                }
            ],
            quiz: [
                {
                    id: 1,
                    question: "Which HTML5 semantic element is designed specifically for navigation links?",
                    options: [
                        "<section>",
                        "<aside>",
                        "<nav>",
                        "<header>"
                    ],
                    correctAnswer: 2, // <nav>
                    explanation: "The <nav> element represents a section of a page whose purpose is to provide navigation links."
                },
                {
                    id: 2,
                    question: "In CSS Flexbox, which property aligns flex items along the primary (main) axis?",
                    options: [
                        "align-items",
                        "justify-content",
                        "align-content",
                        "flex-direction"
                    ],
                    correctAnswer: 1, // justify-content
                    explanation: "'justify-content' aligns children along the main axis, while 'align-items' controls cross-axis alignment."
                },
                {
                    id: 3,
                    question: "Which Web Storage API stores key-value pairs permanently without an expiration date?",
                    options: [
                        "sessionStorage",
                        "localStorage",
                        "document.cookie",
                        "window.cache"
                    ],
                    correctAnswer: 1, // localStorage
                    explanation: "localStorage persists data across browser tabs and restarts until explicitly cleared by JavaScript or the user."
                },
                {
                    id: 4,
                    question: "What does the DOM stand for in frontend web development?",
                    options: [
                        "Data Object Model",
                        "Document Object Model",
                        "Design Operations Module",
                        "Document Origin Map"
                    ],
                    correctAnswer: 1, // Document Object Model
                    explanation: "The DOM (Document Object Model) represents HTML documents as nodes and objects for programming languages."
                },
                {
                    id: 5,
                    question: "Which CSS length unit is calculated relative to the root (<html>) element's font size?",
                    options: [
                        "em",
                        "rem",
                        "px",
                        "vh"
                    ],
                    correctAnswer: 1, // rem
                    explanation: "'rem' stands for Root EM and is always relative to the font-size defined on the root <html> element."
                }
            ]
        },
        {
            id: "machine-learning",
            title: "Machine Learning Foundations",
            category: "AI & ML",
            description: "Understand mathematical foundations, supervised and unsupervised algorithms, regression models, classification pipelines, and neural networks.",
            instructor: "Dr. Andrew Ng",
            difficulty: "Advanced",
            totalLessons: 5,
            iconColor: "purple",
            lessons: [
                {
                    number: 1,
                    title: "Introduction to Machine Learning & NumPy Basics",
                    description: "Learn the core taxonomy of ML (supervised, unsupervised, reinforcement) and perform high-speed matrix computations with NumPy.",
                    duration: "35 mins",
                    videoUrl: "https://www.youtube.com/embed/Gv9_4yMHFhI",
                    notes: "Machine learning empowers software systems to extract statistical patterns from empirical training data without being explicitly programmed. Supervised learning utilizes labeled inputs, unsupervised learning discovers hidden clusters, and reinforcement learning optimizes action rewards.",
                    codeSnippet: `import numpy as np\n\n# Creating feature matrix and target vector\nX = np.array([[1.5, 2.3], [3.1, 4.0], [5.2, 6.1]])\ny = np.array([10.5, 22.0, 35.4])\n\nprint("Feature Matrix Shape:", X.shape)`,
                    takeaways: [
                        "Supervised learning maps feature vectors X to target values y.",
                        "NumPy arrays provide vectorized, C-speed multi-dimensional matrix operations.",
                        "Data preprocessing and feature normalization prevent gradient instability."
                    ]
                },
                {
                    number: 2,
                    title: "Linear Regression & Gradient Descent Optimization",
                    description: "Formulate cost functions, minimize Mean Squared Error (MSE) via gradient descent, and predict continuous target values.",
                    duration: "45 mins",
                    videoUrl: "https://www.youtube.com/embed/7ArmBVF2dCs",
                    notes: "Linear regression predicts a continuous output by fitting a linear hypothesis: h(x) = W*x + b. Gradient Descent computes partial derivatives of the Mean Squared Error (MSE) loss function, iteratively updating weights in the opposite direction of the gradient.",
                    codeSnippet: `# Linear Regression Hypothesis & MSE Loss\ndef predict(X, w, b):\n    return np.dot(X, w) + b\n\ndef compute_mse_cost(y_pred, y_true):\n    return np.mean((y_pred - y_true) ** 2)`,
                    takeaways: [
                        "Mean Squared Error (MSE) penalizes large prediction errors quadratically.",
                        "Learning rate (alpha) determines the step size taken during gradient updates.",
                        "Feature scaling (StandardScaler) accelerates convergence during gradient descent."
                    ]
                },
                {
                    number: 3,
                    title: "Classification, Decision Trees & Random Forests",
                    description: "Implement Logistic Regression for binary classification, construct decision trees with entropy/Gini index, and ensemble forests.",
                    duration: "50 mins",
                    videoUrl: "https://www.youtube.com/embed/7VeUPuFGJHk",
                    notes: "Classification models assign input data points into discrete categories. Logistic Regression passes linear outputs through a Sigmoid activation function to yield probabilistic predictions between 0 and 1.",
                    codeSnippet: `# Sigmoid Activation Function for Binary Classification\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\nprobabilities = sigmoid(np.array([-2.5, 0.0, 3.2]))\nprint("Predicted Probabilities:", probabilities)`,
                    takeaways: [
                        "Sigmoid squashes linear real numbers into probability range [0, 1].",
                        "Decision trees split nodes by maximizing Information Gain or minimizing Gini Impurity.",
                        "Random Forests combine multiple decision trees via Bagging (Bootstrap Aggregation)."
                    ]
                },
                {
                    number: 4,
                    title: "Model Evaluation, Overfitting & Cross-Validation",
                    description: "Assess models with precision, recall, F1-score, ROC curves, and prevent variance overfitting with k-fold cross-validation.",
                    duration: "40 mins",
                    videoUrl: "https://www.youtube.com/embed/fSytzGwwBVw",
                    notes: "Evaluating models solely on training accuracy creates a false sense of security due to overfitting (high variance). Cross-validation partitions data into K folds, training on K-1 folds and validating on the remaining fold to assess generalization.",
                    codeSnippet: `# Computing Precision, Recall, and F1 Score\ndef calculate_f1(tp, fp, fn):\n    precision = tp / (tp + fp)\n    recall = tp / (tp + fn)\n    return 2 * (precision * recall) / (precision + recall)`,
                    takeaways: [
                        "Overfitting occurs when a model memorizes noise instead of general patterns.",
                        "F1-Score represents the harmonic mean of precision and recall.",
                        "K-Fold Cross-Validation ensures every data sample is evaluated."
                    ]
                },
                {
                    number: 5,
                    title: "Neural Networks & Deep Learning Fundamentals",
                    description: "Explore artificial neurons, activation functions (ReLU, Sigmoid), forward propagation, backpropagation, and multi-layer perceptrons.",
                    duration: "60 mins",
                    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
                    notes: "Artificial Neural Networks (ANNs) consist of interconnected layers of artificial neurons. Forward propagation computes predictions through successive linear matrix multiplications and non-linear activation functions (e.g., ReLU). Backpropagation uses the calculus chain rule to calculate weight gradients.",
                    codeSnippet: `# Rectified Linear Unit (ReLU) Activation\ndef relu(x):\n    return np.maximum(0, x)\n\nlayer_input = np.array([-1.5, 0.4, -0.2, 3.8])\nprint("ReLU Activated:", relu(layer_input))`,
                    takeaways: [
                        "Non-linear activation functions allow neural nets to model complex non-linear frontiers.",
                        "ReLU (max(0, x)) avoids vanishing gradient problems common in deep networks.",
                        "Backpropagation computes error gradients layer-by-layer via the chain rule."
                    ]
                }
            ],
            quiz: [
                {
                    id: 1,
                    question: "Which type of machine learning algorithm is trained on labeled input-output datasets?",
                    options: [
                        "Unsupervised Learning",
                        "Supervised Learning",
                        "Reinforcement Learning",
                        "Clustering"
                    ],
                    correctAnswer: 1, // Supervised Learning
                    explanation: "Supervised learning models learn mappings from input features to known ground-truth output labels."
                },
                {
                    id: 2,
                    question: "In Linear Regression, which optimization algorithm iteratively adjusts weights to minimize the cost function?",
                    options: [
                        "Gradient Descent",
                        "K-Nearest Neighbors",
                        "Dijkstra's Algorithm",
                        "Binary Search"
                    ],
                    correctAnswer: 0, // Gradient Descent
                    explanation: "Gradient Descent calculates the derivative gradient of the cost function and takes steps in the direction of steepest descent."
                },
                {
                    id: 3,
                    question: "Which classification evaluation metric balances Precision and Recall, making it ideal for imbalanced datasets?",
                    options: [
                        "Accuracy",
                        "F1-Score",
                        "Mean Squared Error",
                        "R-Squared"
                    ],
                    correctAnswer: 1, // F1-Score
                    explanation: "The F1-Score is the harmonic mean of precision and recall, providing a more robust performance measure on uneven classes."
                },
                {
                    id: 4,
                    question: "What validation technique splits the dataset into K subsets to evaluate model stability and avoid overfitting?",
                    options: [
                        "Linear Interpolation",
                        "K-Fold Cross-Validation",
                        "Principal Component Analysis",
                        "One-Hot Encoding"
                    ],
                    correctAnswer: 1, // K-Fold Cross-Validation
                    explanation: "K-Fold Cross-Validation rotates training and testing across K distinct partitions to reliably measure generalization."
                },
                {
                    id: 5,
                    question: "Which non-linear activation function is defined mathematically as f(x) = max(0, x)?",
                    options: [
                        "Sigmoid",
                        "Tanh",
                        "ReLU (Rectified Linear Unit)",
                        "Softmax"
                    ],
                    correctAnswer: 2, // ReLU
                    explanation: "ReLU outputs zero for negative inputs and returns x directly for positive inputs, avoiding gradient saturation."
                }
            ]
        },
        {
            id: "data-science",
            title: "Data Science & Visual Analytics",
            category: "Data Science",
            description: "Master exploratory data analysis (EDA), Pandas dataframes, statistical hypothesis testing, data wrangling, and rich data visualization.",
            instructor: "Prof. Grace Hopper",
            difficulty: "Intermediate",
            totalLessons: 5,
            iconColor: "cyan",
            lessons: [
                {
                    number: 1,
                    title: "Introduction to Data Science & Pandas DataFrames",
                    description: "Load structured CSV/JSON data, inspect tabular dataframes, select series columns, and filter rows by boolean conditions.",
                    duration: "30 mins",
                    videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
                    notes: "Pandas is the premier Python library for structured data manipulation. The primary data structure is the `DataFrame` (a 2D labeled tabular structure with rows and columns) and the `Series` (a 1D labeled array).",
                    codeSnippet: `import pandas as pd\n\n# Loading dataset and basic inspection\ndf = pd.DataFrame({\n    "student": ["Alice", "Bob", "Charlie"],\n    "grade": [92, 85, 96]\n})\nprint(df.describe())`,
                    takeaways: [
                        "DataFrames represent 2-dimensional tabular datasets with labeled axes.",
                        "`df.head()` and `df.info()` provide fast structural overviews of data frames.",
                        "Boolean indexing filters data rows based on logical conditions."
                    ]
                },
                {
                    number: 2,
                    title: "Data Cleaning, Handling Missing Values & Transformations",
                    description: "Identify null values (NaN), apply imputation strategies, drop corrupted records, remove duplicates, and encode categorical variables.",
                    duration: "40 mins",
                    videoUrl: "https://www.youtube.com/embed/bDhvCp3_lYw",
                    notes: "Real-world data is inherently noisy and incomplete. Common data cleaning operations include detecting missing values (`isna()`), dropping invalid rows (`dropna()`), imputing mean/median values (`fillna()`), and converting categorical string columns into numerical codes.",
                    codeSnippet: `# Data Cleaning Operations\ndf_clean = df.drop_duplicates()\ndf_clean["grade"] = df_clean["grade"].fillna(df_clean["grade"].median())`,
                    takeaways: [
                        "`df.dropna()` removes records containing null or undefined values.",
                        "`df.fillna()` imputes missing values using statistics like mean or median.",
                        "One-hot encoding converts categorical variables into binary indicator vectors."
                    ]
                },
                {
                    number: 3,
                    title: "Exploratory Data Analysis (EDA) & Descriptive Statistics",
                    description: "Compute central tendency metrics (mean, median, mode), dispersion (standard deviation, IQR), correlation matrices, and distributions.",
                    duration: "45 mins",
                    videoUrl: "https://www.youtube.com/embed/gpqcuWjE9pE",
                    notes: "Exploratory Data Analysis (EDA) summarizes the primary statistical properties of a dataset. Pearson's correlation coefficient (r) ranges from -1 to +1, measuring the strength and direction of linear associations between numerical variables.",
                    codeSnippet: `# Descriptive Statistics & Correlation Matrix\nmean_grade = df["grade"].mean()\nstd_grade = df["grade"].std()\ncorrelation = df.corr()`,
                    takeaways: [
                        "Central tendency (mean, median) summarizes the center of data distribution.",
                        "Standard deviation measures data dispersion around the mean.",
                        "Correlation does not imply causation."
                    ]
                },
                {
                    number: 4,
                    title: "Data Visualization with Matplotlib & Seaborn",
                    description: "Create impactful histograms, scatter plots, box-and-whisker plots, heatmaps, and publication-ready charts.",
                    duration: "50 mins",
                    videoUrl: "https://www.youtube.com/embed/a9UrKTVEeZA",
                    notes: "Visual analytics communicates statistical insights quickly. Histograms reveal data distributions, scatter plots uncover bivariate relationships, and box plots highlight outliers beyond 1.5 times the Interquartile Range (IQR).",
                    codeSnippet: `import matplotlib.pyplot as plt\n\n# Creating a bar chart\nplt.figure(figsize=(8, 5))\nplt.bar(["Python", "Web Dev", "ML"], [88, 92, 85], color="#2563eb")\nplt.title("Course Average Grades")\nplt.show()`,
                    takeaways: [
                        "Histograms display probability distributions of continuous variables.",
                        "Box plots highlight median, quartiles, and statistical outliers.",
                        "Heatmaps visualize correlation matrices clearly."
                    ]
                },
                {
                    number: 5,
                    title: "Statistical Hypothesis Testing & A/B Testing",
                    description: "Formulate null hypotheses (H0), compute p-values, perform Student's t-tests, Chi-Square tests, and validate experiment conclusions.",
                    duration: "50 mins",
                    videoUrl: "https://www.youtube.com/embed/0oc49DyA3hU",
                    notes: "Hypothesis testing evaluates whether an observed effect in sample data is statistically significant or merely due to random sampling chance. If the computed p-value is less than the significance threshold alpha (commonly 0.05), we reject the null hypothesis (H0).",
                    codeSnippet: `from scipy import stats\n\n# Two-Sample Student's t-test\ngroup_a = [85, 88, 90, 92, 89]\ngroup_b = [78, 82, 80, 84, 81]\n\nt_stat, p_val = stats.ttest_ind(group_a, group_b)\nprint(f"p-value: {p_val:.4f} (Significant: {p_val < 0.05})")`,
                    takeaways: [
                        "Null Hypothesis (H0) assumes no true effect or difference exists.",
                        "p-value < 0.05 provides standard statistical evidence to reject H0.",
                        "A/B testing uses hypothesis tests to validate product feature modifications."
                    ]
                }
            ],
            quiz: [
                {
                    id: 1,
                    question: "Which Python data manipulation library provides the primary 'DataFrame' structure?",
                    options: [
                        "NumPy",
                        "Pandas",
                        "Matplotlib",
                        "SciPy"
                    ],
                    correctAnswer: 1, // Pandas
                    explanation: "Pandas provides high-performance, easy-to-use data structures including Series and DataFrames."
                },
                {
                    id: 2,
                    question: "In Pandas, which method is used to fill missing or null (NaN) values in a DataFrame?",
                    options: [
                        "df.dropna()",
                        "df.fillna()",
                        "df.replace()",
                        "df.isnull()"
                    ],
                    correctAnswer: 1, // df.fillna()
                    explanation: "The fillna() method replaces NaN or missing entries with specified replacement values or statistical estimates."
                },
                {
                    id: 3,
                    question: "What statistical chart is specifically designed to display data distributions and outliers via quartiles?",
                    options: [
                        "Scatter Plot",
                        "Box Plot (Box & Whisker)",
                        "Line Chart",
                        "Pie Chart"
                    ],
                    correctAnswer: 1, // Box Plot
                    explanation: "Box plots visualize minimum, 25th percentile (Q1), median, 75th percentile (Q3), maximum, and outlier data points."
                },
                {
                    id: 4,
                    question: "In statistical hypothesis testing, what threshold p-value is conventionally considered statistically significant?",
                    options: [
                        "p < 0.50",
                        "p < 0.05",
                        "p > 0.95",
                        "p = 1.00"
                    ],
                    correctAnswer: 1, // p < 0.05
                    explanation: "A p-value below the standard 0.05 significance level (alpha) provides empirical evidence to reject the null hypothesis."
                },
                {
                    id: 5,
                    question: "What is the theoretical range of Pearson's correlation coefficient (r)?",
                    options: [
                        "0 to 1",
                        "0 to 100",
                        "-1 to +1",
                        "-infinity to +infinity"
                    ],
                    correctAnswer: 2, // -1 to +1
                    explanation: "Pearson's correlation coefficient ranges from -1.0 (perfect negative linear association) to +1.0 (perfect positive linear association)."
                }
            ]
        }
    ]
};

// ==============================================================================
// 2. DOM INITIALIZATION & LIFECYCLE DISPATCHER
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("EduLearn Frontend Engine Initializing...");

    // 1. Initialize Theme (Dark Mode / Light Mode) immediately
    initTheme();

    // 2. Execute Authentication Route Guard
    handleAuthGuard();

    // 3. Page-Specific Controller Routing
    const currentPage = getCurrentPageName();
    console.log(`Current page route: [${currentPage}]`);

    if (currentPage === "index.html" || currentPage === "") {
        initLoginPage();
    } else if (currentPage === "dashboard.html") {
        initDashboardPage();
    } else if (currentPage === "courses.html") {
        initCoursesPage();
    } else if (currentPage === "course.html") {
        initCourseDetailsPage();
    } else if (currentPage === "quiz.html") {
        initQuizPage();
    } else if (currentPage === "profile.html") {
        initProfilePage();
    }

    // 4. Setup global navbar, mobile drawer, and logout listeners
    setupGlobalNavigation();

    // 5. Initialize dynamic neural network canvas background animation
    initNeuralNetworkBackground();
});

// ==============================================================================
// 3. GLOBAL DARK MODE THEME CONTROLLER
// ==============================================================================
/**
 * Function: initTheme
 * Viva Explanation:
 * 1. Checks localStorage for a saved theme ('dark' or 'light') across 'theme' & 'edulearn_theme' keys.
 * 2. Applies both `.dark-theme` and `.dark-mode` classes to `<html>` and `<body>` to toggle CSS variables.
 * 3. Updates the toggle button icon (☀️ for dark mode, 🌙 for light mode).
 * 4. Binds click event listeners across all theme toggle buttons on the page.
 */
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || 
                       localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || 
                       "light";
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.documentElement.classList.add("dark-theme", "dark-mode");
        document.body.classList.add("dark-theme", "dark-mode");
    } else {
        document.documentElement.classList.remove("dark-theme", "dark-mode");
        document.body.classList.remove("dark-theme", "dark-mode");
    }

    updateThemeToggleIcons(isDark);
    attachThemeToggleListeners();
}

/**
 * Function: toggleTheme
 * Toggles dark mode state on html/body, persists choice in localStorage keys, and updates UI icons.
 */
function toggleTheme() {
    const isDarkNow = document.documentElement.classList.toggle("dark-theme");
    document.documentElement.classList.toggle("dark-mode", isDarkNow);
    document.body.classList.toggle("dark-theme", isDarkNow);
    document.body.classList.toggle("dark-mode", isDarkNow);

    const newTheme = isDarkNow ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, newTheme);

    updateThemeToggleIcons(isDarkNow);
    console.log(`EduLearn Theme toggled to: ${newTheme}`);
}

/**
 * Function: updateThemeToggleIcons
 * Updates the visual ☀️ / 🌙 indicator inside any theme button.
 */
function updateThemeToggleIcons(isDark) {
    const toggleButtons = document.querySelectorAll(".btn-theme-toggle, #theme-toggle-btn");
    toggleButtons.forEach(btn => {
        const iconSpan = btn.querySelector(".theme-icon");
        if (iconSpan) {
            iconSpan.textContent = isDark ? "☀️" : "🌙";
        } else {
            btn.innerHTML = `<span class="theme-icon">${isDark ? "☀️" : "🌙"}</span>`;
        }
        btn.setAttribute("title", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
        btn.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
    });
}

/**
 * Function: attachThemeToggleListeners
 * Registers click handlers on all theme toggle elements present in the DOM.
 */
function attachThemeToggleListeners() {
    const toggleButtons = document.querySelectorAll(".btn-theme-toggle, #theme-toggle-btn");
    toggleButtons.forEach(btn => {
        btn.removeEventListener("click", toggleTheme);
        btn.addEventListener("click", toggleTheme);
    });
}

// ==============================================================================
// 4. AUTHENTICATION ROUTE GUARD
// ==============================================================================
/**
 * Function: handleAuthGuard
 * Viva Explanation:
 * Intercepts page load to verify if user holds an active session flag in localStorage.
 * Unauthenticated users trying to access protected pages are kicked to index.html.
 * Authenticated users visiting index.html are auto-forwarded to dashboard.html.
 */
function handleAuthGuard() {
    const isLoggedIn = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.IS_LOGGED_IN) === "true";
    const currentPage = getCurrentPageName();
    const isPublicPage = currentPage === "index.html" || currentPage === "";

    if (!isLoggedIn && !isPublicPage) {
        console.warn("Unauthorized access. Redirecting to login page...");
        window.location.href = APP_CONFIG.PAGES.LOGIN;
    } else if (isLoggedIn && isPublicPage) {
        console.log("Active session detected. Redirecting to dashboard...");
        window.location.href = APP_CONFIG.PAGES.DASHBOARD;
    }
}

function getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return page || "index.html";
}

// ==============================================================================
// 5. PHASE 1: LOGIN PAGE CONTROLLER
// ==============================================================================
function initLoginPage() {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("toggle-password-btn");
    const fillUserBtn = document.getElementById("fill-user");
    const fillPassBtn = document.getElementById("fill-pass");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

    if (usernameInput) usernameInput.addEventListener("input", clearLoginError);
    if (passwordInput) passwordInput.addEventListener("input", clearLoginError);

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener("click", () => {
            const isPassword = passwordInput.getAttribute("type") === "password";
            passwordInput.setAttribute("type", isPassword ? "text" : "password");
            
            togglePasswordBtn.innerHTML = isPassword 
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                     <line x1="1" y1="23" x2="23" y2="23"></line>
                   </svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                     <circle cx="12" cy="12" r="3"></circle>
                   </svg>`;
        });
    }

    // Auto-fill helpers for college viva testing
    if (fillUserBtn && usernameInput) {
        fillUserBtn.addEventListener("click", () => {
            usernameInput.value = APP_CONFIG.CREDENTIALS.USERNAME;
            clearLoginError();
            if (passwordInput) passwordInput.focus();
        });
    }
    if (fillPassBtn && passwordInput) {
        fillPassBtn.addEventListener("click", () => {
            passwordInput.value = APP_CONFIG.CREDENTIALS.PASSWORD;
            clearLoginError();
        });
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    if (enteredUsername === "" || enteredPassword === "") {
        showLoginError("Please enter both username and password.");
        return;
    }

    if (enteredUsername === APP_CONFIG.CREDENTIALS.USERNAME && enteredPassword === APP_CONFIG.CREDENTIALS.PASSWORD) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.IS_LOGGED_IN, "true");
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.CURRENT_USER, enteredUsername);

        ensureCourseProgressInitialized();
        ensureQuizScoresInitialized();

        const loginBtn = document.getElementById("login-btn");
        if (loginBtn) {
            loginBtn.innerHTML = "<span>Signing in...</span>";
            loginBtn.style.opacity = "0.8";
            loginBtn.disabled = true;
        }

        setTimeout(() => {
            window.location.href = APP_CONFIG.PAGES.DASHBOARD;
        }, 350);
    } else {
        showLoginError("Invalid username or password.");
        if (passwordInput) {
            passwordInput.value = "";
            passwordInput.focus();
        }
    }
}

function showLoginError(msg) {
    const errorContainer = document.getElementById("error-message");
    const errorText = document.getElementById("error-text");
    if (errorContainer && errorText) {
        errorText.textContent = msg;
        errorContainer.classList.add("show");
        errorContainer.style.animation = "none";
        void errorContainer.offsetWidth;
        errorContainer.style.animation = "shake 0.4s ease-in-out";
    }
}

function clearLoginError() {
    const errorContainer = document.getElementById("error-message");
    if (errorContainer && errorContainer.classList.contains("show")) {
        errorContainer.classList.remove("show");
    }
}

// ==============================================================================
// 6. PHASE 2: GLOBAL NAVIGATION & LOGOUT
// ==============================================================================
function setupGlobalNavigation() {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", handleLogout);
    }

    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    const currentUser = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.CURRENT_USER) || "Student";
    const userDisplayName = document.getElementById("user-display-name");
    const userInitial = document.getElementById("user-initial");

    if (userDisplayName) userDisplayName.textContent = capitalizeFirstLetter(currentUser);
    if (userInitial) userInitial.textContent = currentUser.charAt(0).toUpperCase();
}

function handleLogout() {
    if (confirm("Are you sure you want to sign out?")) {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.IS_LOGGED_IN);
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.CURRENT_USER);
        window.location.href = APP_CONFIG.PAGES.LOGIN;
    }
}

// ==============================================================================
// 7. PHASE 2: DASHBOARD STATS CALCULATION (Live Sync from Progress & Quiz)
// ==============================================================================
function initDashboardPage() {
    const progressData = ensureCourseProgressInitialized();
    const quizData = ensureQuizScoresInitialized();
    const stats = calculateAggregateStats(progressData, quizData);

    const currentUser = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.CURRENT_USER) || "Student";
    const welcomeUsername = document.getElementById("welcome-username");
    if (welcomeUsername) {
        welcomeUsername.textContent = capitalizeFirstLetter(currentUser);
    }

    renderDashboardMetrics(stats);
}

/**
 * Function: calculateAggregateStats
 * Viva Explanation:
 * Pure aggregator that loops over the course repository, tallies completed lessons
 * from localStorage, and averages quiz scores via Array.reduce().
 */
function calculateAggregateStats(progressData, quizData) {
    const totalCourses = APP_CONFIG.COURSES.length;
    let totalLessons = 0;
    let totalCompletedLessons = 0;

    APP_CONFIG.COURSES.forEach(course => {
        totalLessons += course.totalLessons;
        const p = progressData[course.id];
        if (p && Array.isArray(p.completedLessons)) {
            totalCompletedLessons += p.completedLessons.length;
        }
    });

    const scoresArray = [];
    if (quizData) {
        Object.values(quizData).forEach(q => {
            if (q && typeof q.percentage === "number") {
                scoresArray.push(q.percentage);
            }
        });
    }

    const fallbackScores = scoresArray.length > 0 ? scoresArray : [85, 92, 78, 95];

    return {
        enrolledCourses: totalCourses,
        completedLessons: totalCompletedLessons,
        totalLessons: totalLessons,
        quizScores: fallbackScores
    };
}

function ensureCourseProgressInitialized() {
    let savedProgress = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.COURSE_PROGRESS);
    if (!savedProgress) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(APP_CONFIG.DEFAULT_COURSE_PROGRESS));
        return APP_CONFIG.DEFAULT_COURSE_PROGRESS;
    }
    try {
        return JSON.parse(savedProgress);
    } catch (e) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(APP_CONFIG.DEFAULT_COURSE_PROGRESS));
        return APP_CONFIG.DEFAULT_COURSE_PROGRESS;
    }
}

function ensureQuizScoresInitialized() {
    let savedQuiz = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.QUIZ_SCORES);
    if (!savedQuiz) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(APP_CONFIG.DEFAULT_QUIZ_SCORES));
        return APP_CONFIG.DEFAULT_QUIZ_SCORES;
    }
    try {
        return JSON.parse(savedQuiz);
    } catch (e) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(APP_CONFIG.DEFAULT_QUIZ_SCORES));
        return APP_CONFIG.DEFAULT_QUIZ_SCORES;
    }
}

function renderDashboardMetrics(stats) {
    const progressPercentage = stats.totalLessons > 0 
        ? Math.round((stats.completedLessons / stats.totalLessons) * 100) 
        : 0;

    const totalScoreSum = stats.quizScores.reduce((sum, score) => sum + score, 0);
    const averageQuizScore = stats.quizScores.length > 0 
        ? Math.round(totalScoreSum / stats.quizScores.length) 
        : 0;

    const remainingLessons = Math.max(0, stats.totalLessons - stats.completedLessons);

    const enrolledEl = document.getElementById("stat-enrolled-courses");
    if (enrolledEl) enrolledEl.textContent = stats.enrolledCourses;

    const overallProgressEl = document.getElementById("stat-overall-progress");
    const progressBarEl = document.getElementById("stat-progress-bar");
    if (overallProgressEl) overallProgressEl.textContent = `${progressPercentage}%`;
    if (progressBarEl) {
        setTimeout(() => { progressBarEl.style.width = `${progressPercentage}%`; }, 150);
    }

    const completedLessonsEl = document.getElementById("stat-completed-lessons");
    const totalLessonsLabelEl = document.getElementById("stat-total-lessons-label");
    const lessonsBarEl = document.getElementById("stat-lessons-bar");
    const remainingLessonsEl = document.getElementById("stat-remaining-lessons");

    if (completedLessonsEl) completedLessonsEl.textContent = stats.completedLessons;
    if (totalLessonsLabelEl) totalLessonsLabelEl.textContent = `/ ${stats.totalLessons} Lessons`;
    if (remainingLessonsEl) remainingLessonsEl.textContent = `${remainingLessons} Remaining`;
    if (lessonsBarEl) {
        setTimeout(() => { lessonsBarEl.style.width = `${progressPercentage}%`; }, 150);
    }

    const quizScoreEl = document.getElementById("stat-quiz-score");
    const quizBarEl = document.getElementById("stat-quiz-bar");
    const quizzesTakenEl = document.getElementById("stat-quizzes-taken");

    if (quizScoreEl) quizScoreEl.textContent = `${averageQuizScore}%`;
    if (quizzesTakenEl) quizzesTakenEl.textContent = `${stats.quizScores.length} Quizzes`;
    if (quizBarEl) {
        setTimeout(() => { quizBarEl.style.width = `${averageQuizScore}%`; }, 150);
    }
}

// ==============================================================================
// 8. PHASE 3: COURSES CATALOG & FILTERING ENGINE
// ==============================================================================
function initCoursesPage() {
    const searchInput = document.getElementById("course-search-input") || document.getElementById("course-search");
    const filterSelect = document.getElementById("course-filter");

    const progressData = ensureCourseProgressInitialized();
    renderCourseCards(APP_CONFIG.COURSES, progressData);

    function handleFilter() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedCategory = filterSelect ? filterSelect.value : "all";

        const filtered = APP_CONFIG.COURSES.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(query) ||
                                  course.description.toLowerCase().includes(query) ||
                                  course.category.toLowerCase().includes(query);
            
            const matchesCategory = selectedCategory === "all" || 
                                    course.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
                                    course.difficulty.toLowerCase() === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        renderCourseCards(filtered, progressData);
    }

    if (searchInput) searchInput.addEventListener("input", handleFilter);
    if (filterSelect) filterSelect.addEventListener("change", handleFilter);
}

function renderCourseCards(courses, progressData) {
    const coursesGrid = document.getElementById("courses-grid");
    if (!coursesGrid) return;

    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="empty-state-box" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--card-bg); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
                <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">No matching courses found</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Try adjusting your search keyword or category filter.</p>
            </div>
        `;
        return;
    }

    const cardsHTML = courses.map(course => {
        const cp = progressData[course.id] || { completedLessons: [] };
        const completedCount = cp.completedLessons.length;
        const totalCount = course.totalLessons;
        const progressPct = Math.round((completedCount / totalCount) * 100);

        let difficultyClass = "badge-beginner";
        if (course.difficulty === "Intermediate") difficultyClass = "badge-intermediate";
        if (course.difficulty === "Advanced") difficultyClass = "badge-advanced";

        return `
            <article class="course-card" id="course-card-${course.id}">
                <div>
                    <div class="course-card-header">
                        <div class="course-icon icon-${course.iconColor}">
                            ${getCourseIconSVG(course.id)}
                        </div>
                        <span class="badge-difficulty ${difficultyClass}">${course.difficulty}</span>
                    </div>

                    <span class="course-category-tag">${course.category}</span>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-desc">${course.description}</p>

                    <div class="course-meta">
                        <div class="course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>${course.instructor}</span>
                        </div>
                        <div class="course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            <span>${totalCount} Lessons</span>
                        </div>
                    </div>

                    <div class="course-progress-box">
                        <div class="course-progress-header">
                            <span>Course Progress</span>
                            <span class="course-progress-pct">${completedCount}/${totalCount} (${progressPct}%)</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill ${progressPct === 100 ? 'progress-fill-success' : ''}" style="width: ${progressPct}%;"></div>
                        </div>
                    </div>
                </div>

                <a href="course.html?id=${course.id}" class="btn-view-course" title="Start or Resume ${course.title}">
                    <span>View Course</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </article>
        `;
    }).join("");

    coursesGrid.innerHTML = cardsHTML;
}

// ==============================================================================
// 9. PHASE 4: COURSE DETAILS & INTERACTIVE LESSON MODAL CONTROLLER
// ==============================================================================
let currentActiveCourse = null;
let currentActiveLessonNumber = null;

function initCourseDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const currentCourse = APP_CONFIG.COURSES.find(c => c.id === courseId);

    if (!currentCourse) {
        alert("Course not found! Redirecting to available courses.");
        window.location.href = APP_CONFIG.PAGES.COURSES;
        return;
    }

    currentActiveCourse = currentCourse;

    document.title = `${currentCourse.title} | EduLearn`;
    const breadcrumbTitle = document.getElementById("breadcrumb-course-title");
    if (breadcrumbTitle) breadcrumbTitle.textContent = currentCourse.title;

    const categoryEl = document.getElementById("course-detail-category");
    const difficultyEl = document.getElementById("course-detail-difficulty");
    const titleEl = document.getElementById("course-detail-title");
    const descEl = document.getElementById("course-detail-description");
    const instructorEl = document.getElementById("course-detail-instructor");
    const lessonsCountEl = document.getElementById("course-detail-lessons-count");
    const syllabusBadge = document.getElementById("syllabus-badge");

    if (categoryEl) categoryEl.textContent = currentCourse.category;
    if (difficultyEl) {
        difficultyEl.textContent = currentCourse.difficulty;
        let diffClass = "badge-beginner";
        if (currentCourse.difficulty === "Intermediate") diffClass = "badge-intermediate";
        if (currentCourse.difficulty === "Advanced") diffClass = "badge-advanced";
        difficultyEl.className = `badge-difficulty ${diffClass}`;
    }
    if (titleEl) titleEl.textContent = currentCourse.title;
    if (descEl) descEl.textContent = currentCourse.description;
    if (instructorEl) instructorEl.textContent = `Instructor: ${currentCourse.instructor}`;
    if (lessonsCountEl) lessonsCountEl.textContent = `${currentCourse.totalLessons} Structured Lessons`;
    if (syllabusBadge) syllabusBadge.textContent = `${currentCourse.totalLessons} Modules`;

    const quizBtn = document.getElementById("btn-take-quiz");
    if (quizBtn) {
        quizBtn.setAttribute("href", `${APP_CONFIG.PAGES.QUIZ}?id=${currentCourse.id}`);
    }

    renderCourseLessons(currentCourse);
    setupLessonModalEvents();
}

/**
 * Function: renderCourseLessons
 * Viva Explanation:
 * Generates lesson cards dynamically with dual action triggers:
 * 1. Clicking the card body opens the interactive educational notes modal with video.
 * 2. Clicking the 'Mark as Completed' button toggles completion state directly.
 */
function renderCourseLessons(course) {
    const container = document.getElementById("lessons-list-container");
    if (!container) return;

    const progressData = ensureCourseProgressInitialized();
    const courseProgress = progressData[course.id] || { completedLessons: [] };
    const completedSet = new Set(courseProgress.completedLessons);

    const lessonsHTML = course.lessons.map(lesson => {
        const isDone = completedSet.has(lesson.number);

        return `
            <div class="lesson-card ${isDone ? 'is-completed' : ''}" id="lesson-card-${lesson.number}" data-lesson-num="${lesson.number}" title="Click to open lesson video, notes & code snippet" style="cursor: pointer;">
                <div class="lesson-left">
                    <div class="lesson-number-badge">
                        ${isDone ? '✓' : lesson.number}
                    </div>
                    <div class="lesson-info">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <h3 class="lesson-title">${lesson.title}</h3>
                            <span style="font-size: 0.75rem; font-weight: 600; color: var(--primary-color); background: var(--primary-light); padding: 0.15rem 0.45rem; border-radius: 4px;">Video & Notes 🎥</span>
                        </div>
                        <p class="lesson-desc">${lesson.description}</p>
                        <div class="lesson-meta-tags">
                            <span class="lesson-meta-tag">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>${lesson.duration}</span>
                            </span>
                            <span class="lesson-meta-tag">
                                <span>• Video Lecture & Interactive Code</span>
                            </span>
                        </div>
                    </div>
                </div>

                <button 
                    type="button" 
                    class="btn-lesson-toggle ${isDone ? 'completed' : ''}" 
                    data-course-id="${course.id}" 
                    data-lesson-num="${lesson.number}"
                    aria-pressed="${isDone}"
                    title="Toggle Lesson Completion"
                >
                    ${isDone ? '<span>Completed ✓</span>' : '<span>Mark as Completed</span>'}
                </button>
            </div>
        `;
    }).join("");

    container.innerHTML = lessonsHTML;

    // 1. Attach Card Click to open Interactive Lesson Modal
    const lessonCards = container.querySelectorAll(".lesson-card");
    lessonCards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Prevent modal opening if the user clicked the direct toggle button inside the card
            if (e.target.closest(".btn-lesson-toggle")) return;
            const lessonNum = parseInt(card.getAttribute("data-lesson-num"), 10);
            openLessonModal(course.id, lessonNum);
        });
    });

    // 2. Attach Direct Toggle Button Listener
    const toggleButtons = container.querySelectorAll(".btn-lesson-toggle");
    toggleButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Avoid triggering card modal
            const cId = btn.getAttribute("data-course-id");
            const lNum = parseInt(btn.getAttribute("data-lesson-num"), 10);
            toggleLessonCompletion(cId, lNum, course);
        });
    });

    updateCourseSidebarProgress(course, courseProgress.completedLessons);
}

/**
 * Function: toggleLessonCompletion
 * Toggles lesson completion status in localStorage and syncs all page elements.
 */
function toggleLessonCompletion(courseId, lessonNumber, course) {
    const progressData = ensureCourseProgressInitialized();
    if (!progressData[courseId]) {
        progressData[courseId] = { completedLessons: [] };
    }

    let completedList = progressData[courseId].completedLessons || [];
    const isCurrentlyCompleted = completedList.includes(lessonNumber);

    if (isCurrentlyCompleted) {
        completedList = completedList.filter(num => num !== lessonNumber);
    } else {
        completedList.push(lessonNumber);
    }

    progressData[courseId].completedLessons = completedList;
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(progressData));

    const cardEl = document.getElementById(`lesson-card-${lessonNumber}`);
    const btnEl = cardEl ? cardEl.querySelector(".btn-lesson-toggle") : null;
    const badgeEl = cardEl ? cardEl.querySelector(".lesson-number-badge") : null;

    const nowCompleted = completedList.includes(lessonNumber);

    if (cardEl && btnEl && badgeEl) {
        if (nowCompleted) {
            cardEl.classList.add("is-completed");
            btnEl.classList.add("completed");
            btnEl.innerHTML = "<span>Completed ✓</span>";
            btnEl.setAttribute("aria-pressed", "true");
            badgeEl.textContent = "✓";

            // Trigger visual celebratory confetti burst on lesson completion
            triggerCelebrationConfetti();
        } else {
            cardEl.classList.remove("is-completed");
            btnEl.classList.remove("completed");
            btnEl.innerHTML = "<span>Mark as Completed</span>";
            btnEl.setAttribute("aria-pressed", "false");
            badgeEl.textContent = lessonNumber;
        }
    }

    // Sync modal button if open
    syncModalToggleButton(nowCompleted);

    updateCourseSidebarProgress(course, completedList);
}

function updateCourseSidebarProgress(course, completedList) {
    const completedCount = completedList.length;
    const totalCount = course.totalLessons;
    const progressPct = Math.round((completedCount / totalCount) * 100);
    const remainingCount = Math.max(0, totalCount - completedCount);

    const pctEl = document.getElementById("sidebar-progress-pct");
    const fillEl = document.getElementById("sidebar-progress-fill");
    const completedCountEl = document.getElementById("sidebar-completed-count");
    const remainingCountEl = document.getElementById("sidebar-remaining-count");

    if (pctEl) pctEl.textContent = `${progressPct}%`;
    if (fillEl) fillEl.style.width = `${progressPct}%`;
    if (completedCountEl) completedCountEl.textContent = `${completedCount} / ${totalCount}`;
    if (remainingCountEl) remainingCountEl.textContent = `${remainingCount} Lessons`;
}

// ==============================================================================
// 10. INTERACTIVE LESSON CONTENT MODAL ENGINE (With YouTube Video Player)
// ==============================================================================
/**
 * Function: setupLessonModalEvents
 * Registers backdrop click, close button, and Esc key dismissal handlers.
 */
function setupLessonModalEvents() {
    const modal = document.getElementById("lesson-modal");
    const closeBtn = document.getElementById("btn-modal-close");
    const dismissBtn = document.getElementById("btn-modal-dismiss");
    const toggleCompleteBtn = document.getElementById("btn-modal-toggle-complete");

    if (closeBtn) {
        closeBtn.addEventListener("click", closeLessonModal);
    }
    if (dismissBtn) {
        dismissBtn.addEventListener("click", closeLessonModal);
    }
    if (modal) {
        // Backdrop Click Outside to Close
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeLessonModal();
            }
        });
    }

    // Modal Footer Mark as Completed Action
    if (toggleCompleteBtn) {
        toggleCompleteBtn.addEventListener("click", () => {
            if (currentActiveCourse && currentActiveLessonNumber !== null) {
                toggleLessonCompletion(currentActiveCourse.id, currentActiveLessonNumber, currentActiveCourse);
            }
        });
    }

    // Keyboard ESC key listener
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLessonModal();
        }
    });
}

/**
 * Function: openLessonModal
 * Populates modal dialog with embedded YouTube video, educational notes, syntax block, and takeaways.
 */
function openLessonModal(courseId, lessonNumber) {
    const course = APP_CONFIG.COURSES.find(c => c.id === courseId);
    if (!course) return;

    const lesson = course.lessons.find(l => l.number === lessonNumber);
    if (!lesson) return;

    currentActiveCourse = course;
    currentActiveLessonNumber = lessonNumber;

    const modal = document.getElementById("lesson-modal");
    const badgeEl = document.getElementById("modal-lesson-badge");
    const titleEl = document.getElementById("modal-lesson-title");
    const bodyEl = document.getElementById("modal-lesson-body");

    if (badgeEl) badgeEl.textContent = `Module ${lesson.number} • ${course.category}`;
    if (titleEl) titleEl.textContent = lesson.title;

    // Check completion state
    const progressData = ensureCourseProgressInitialized();
    const isCompleted = (progressData[course.id]?.completedLessons || []).includes(lesson.number);

    // Build takeaways HTML
    const takeawaysHTML = (lesson.takeaways || []).map(item => `
        <li class="key-takeaway-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${item}</span>
        </li>
    `).join("");

    if (bodyEl) {
        bodyEl.innerHTML = `
            <!-- 1. Embedded Responsive 16:9 YouTube Video Lecture -->
            <div class="modal-video-container">
                <iframe 
                    id="lesson-video-frame" 
                    src="${lesson.videoUrl}" 
                    title="${escapeHTML(lesson.title)} Video Lecture" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                ></iframe>
            </div>

            <div style="margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <span class="lesson-meta-tag" style="background: var(--primary-light); color: var(--primary-color); font-weight: 700; padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span>⏱️ Duration: ${lesson.duration}</span>
                </span>
                <span style="font-size: 0.85rem; color: var(--text-muted);">HD Video Tutorial Included</span>
            </div>

            <!-- 2. Comprehensive Educational Notes & Theory -->
            <h4 class="modal-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>Educational Overview & Theory</span>
            </h4>
            <p style="margin-bottom: 1.25rem; font-size: 0.95rem; line-height: 1.7;">${lesson.notes || lesson.description}</p>

            <!-- 3. Sample Code Snippet & Implementation -->
            <h4 class="modal-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <span>Live Sample Code & Syntax Implementation</span>
            </h4>
            <div class="modal-code-wrapper">
                <div class="modal-code-header">
                    <span>${course.id === 'python' ? 'Python 3' : course.id === 'web-dev' ? 'HTML / CSS / JS' : 'Python (NumPy / SciPy)'}</span>
                    <span>Sample Code Example</span>
                </div>
                <pre class="modal-code-block"><code>${escapeHTML(lesson.codeSnippet || '# No code snippet provided for this lesson.')}</code></pre>
            </div>

            <!-- 4. Viva Takeaways -->
            <h4 class="modal-section-title" style="margin-top: 1.5rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Key Takeaways for College Viva</span>
            </h4>
            <ul class="key-takeaways-list">
                ${takeawaysHTML}
            </ul>
        `;
    }

    syncModalToggleButton(isCompleted);

    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
}

/**
 * Function: closeLessonModal
 * Viva Explanation:
 * Hides modal dialog, restores document body scroll, and crucially clears the
 * iframe `src` to pause video playback immediately.
 */
function closeLessonModal() {
    const modal = document.getElementById("lesson-modal");
    const videoFrame = document.getElementById("lesson-video-frame");
    
    // Clear video frame src to stop audio/video immediately
    if (videoFrame) {
        videoFrame.src = "";
    }

    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function syncModalToggleButton(isCompleted) {
    const btn = document.getElementById("btn-modal-toggle-complete");
    if (btn) {
        if (isCompleted) {
            btn.classList.add("completed");
            btn.innerHTML = "<span>Completed ✓</span>";
        } else {
            btn.classList.remove("completed");
            btn.innerHTML = "<span>Mark as Completed</span>";
        }
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==============================================================================
// 11. PHASE 5: INTERACTIVE QUIZ CONTROLLER & EVALUATION ENGINE
// ==============================================================================
function initQuizPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const currentCourse = APP_CONFIG.COURSES.find(c => c.id === courseId);

    if (!currentCourse || !currentCourse.quiz) {
        alert("Quiz not found for this course! Redirecting to courses catalog.");
        window.location.href = APP_CONFIG.PAGES.COURSES;
        return;
    }

    document.title = `Quiz: ${currentCourse.title} | EduLearn`;
    const categoryEl = document.getElementById("quiz-course-category");
    const titleEl = document.getElementById("quiz-course-title");
    const breadcrumbLink = document.getElementById("breadcrumb-course-link");
    const backToCourseBtn = document.getElementById("btn-back-to-course");

    if (categoryEl) categoryEl.textContent = currentCourse.category;
    if (titleEl) titleEl.textContent = `${currentCourse.title} - Final Assessment`;
    if (breadcrumbLink) {
        breadcrumbLink.textContent = currentCourse.title;
        breadcrumbLink.setAttribute("href", `${APP_CONFIG.PAGES.COURSE_DETAIL}?id=${currentCourse.id}`);
    }
    if (backToCourseBtn) {
        backToCourseBtn.setAttribute("href", `${APP_CONFIG.PAGES.COURSE_DETAIL}?id=${currentCourse.id}`);
    }

    renderQuizQuestions(currentCourse.quiz);

    const quizForm = document.getElementById("quiz-form");
    if (quizForm) {
        quizForm.addEventListener("submit", (e) => handleQuizSubmission(e, currentCourse));
    }

    const retakeBtn = document.getElementById("btn-retake-quiz");
    if (retakeBtn) {
        retakeBtn.addEventListener("click", () => retakeQuiz(currentCourse));
    }
}

function renderQuizQuestions(questions) {
    const container = document.getElementById("questions-container");
    if (!container) return;

    const questionsHTML = questions.map((q, qIndex) => {
        const questionNumber = qIndex + 1;

        const optionsHTML = q.options.map((opt, optIndex) => {
            return `
                <label class="option-tile" id="option-tile-${questionNumber}-${optIndex}">
                    <input 
                        type="radio" 
                        name="question_${questionNumber}" 
                        value="${optIndex}" 
                        required
                    >
                    <span class="option-indicator" aria-hidden="true"></span>
                    <span class="option-label">${opt}</span>
                </label>
            `;
        }).join("");

        return `
            <article class="question-card" id="question-card-${questionNumber}">
                <div class="question-header">
                    <span class="question-num-tag">Question ${questionNumber} of ${questions.length}</span>
                    <h3 class="question-text">${q.question}</h3>
                </div>

                <div class="options-grid">
                    ${optionsHTML}
                </div>

                <div class="question-explanation-box" id="explanation-${questionNumber}">
                    <div class="explanation-title">Explanation:</div>
                    <p>${q.explanation}</p>
                </div>
            </article>
        `;
    }).join("");

    container.innerHTML = questionsHTML;

    const radioInputs = container.querySelectorAll("input[type='radio']");
    radioInputs.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const groupName = e.target.getAttribute("name");
            const groupInputs = container.querySelectorAll(`input[name="${groupName}"]`);
            groupInputs.forEach(input => {
                const label = input.closest(".option-tile");
                if (label) label.classList.remove("selected");
            });
            const selectedLabel = e.target.closest(".option-tile");
            if (selectedLabel) selectedLabel.classList.add("selected");

            const validationMsg = document.getElementById("quiz-validation-msg");
            if (validationMsg) validationMsg.classList.remove("show");
        });
    });
}

function handleQuizSubmission(event, course) {
    event.preventDefault();

    const quizForm = document.getElementById("quiz-form");
    const validationMsg = document.getElementById("quiz-validation-msg");
    const errorText = document.getElementById("quiz-error-text");
    const questions = course.quiz;

    let allAnswered = true;
    let firstUnansweredNum = null;

    for (let i = 1; i <= questions.length; i++) {
        const selectedOption = quizForm.querySelector(`input[name="question_${i}"]:checked`);
        if (!selectedOption) {
            allAnswered = false;
            if (!firstUnansweredNum) firstUnansweredNum = i;
        }
    }

    if (!allAnswered) {
        if (validationMsg && errorText) {
            errorText.textContent = `Please answer Question ${firstUnansweredNum} before submitting!`;
            validationMsg.classList.add("show");
            
            const targetCard = document.getElementById(`question-card-${firstUnansweredNum}`);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
        return;
    }

    if (validationMsg) validationMsg.classList.remove("show");

    let correctCount = 0;

    questions.forEach((q, qIndex) => {
        const qNum = qIndex + 1;
        const selectedRadio = quizForm.querySelector(`input[name="question_${qNum}"]:checked`);
        const userChoice = parseInt(selectedRadio.value, 10);
        const correctChoice = q.correctAnswer;

        const chosenLabel = document.getElementById(`option-tile-${qNum}-${userChoice}`);
        const correctLabel = document.getElementById(`option-tile-${qNum}-${correctChoice}`);
        const explanationBox = document.getElementById(`explanation-${qNum}`);

        if (userChoice === correctChoice) {
            correctCount++;
            if (chosenLabel) chosenLabel.classList.add("correct");
        } else {
            if (chosenLabel) chosenLabel.classList.add("incorrect");
            if (correctLabel) correctLabel.classList.add("correct");
        }

        if (explanationBox) explanationBox.classList.add("show");
    });

    const allRadios = quizForm.querySelectorAll("input[type='radio']");
    allRadios.forEach(radio => {
        radio.disabled = true;
    });

    const submitBtn = document.getElementById("btn-submit-quiz");
    if (submitBtn) submitBtn.style.display = "none";

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let feedback = "Good effort! Review the explanations below and retake to improve.";
    let headline = "Quiz Completed!";

    if (percentage === 100) {
        headline = "Perfect Score! 🌟";
        feedback = "Outstanding mastery! You answered every question correctly.";
    } else if (percentage >= 80) {
        headline = "Great Job! 🎯";
        feedback = "Excellent understanding! You have a solid grasp of this subject.";
    } else if (percentage >= 60) {
        headline = "Good Progress! 👍";
        feedback = "You passed! Review the detailed answers below to reinforce your knowledge.";
    }

    saveQuizScore(course.id, correctCount, totalQuestions, percentage);

    const resultsCard = document.getElementById("quiz-results-card");
    const rawScoreEl = document.getElementById("results-raw-score");
    const pctBadgeEl = document.getElementById("results-pct-badge");
    const headlineEl = document.getElementById("results-headline");
    const feedbackEl = document.getElementById("results-feedback-msg");

    if (rawScoreEl) rawScoreEl.textContent = `${correctCount} / ${totalQuestions}`;
    if (pctBadgeEl) pctBadgeEl.textContent = `(${percentage}%)`;
    if (headlineEl) headlineEl.textContent = headline;
    if (feedbackEl) feedbackEl.textContent = feedback;

    if (resultsCard) {
        resultsCard.classList.add("show");
        resultsCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Trigger celebratory confetti if passed
    if (percentage >= 60) {
        triggerCelebrationConfetti(percentage === 100);
    }
}

function saveQuizScore(courseId, score, total, percentage) {
    const quizScores = ensureQuizScoresInitialized();
    quizScores[courseId] = {
        score: score,
        total: total,
        percentage: percentage,
        completedAt: new Date().toISOString()
    };

    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(quizScores));
    console.log(`Saved quiz score for ${courseId}: ${score}/${total} (${percentage}%)`);
}

function retakeQuiz(course) {
    const quizForm = document.getElementById("quiz-form");
    const resultsCard = document.getElementById("quiz-results-card");
    const submitBtn = document.getElementById("btn-submit-quiz");

    if (resultsCard) resultsCard.classList.remove("show");
    if (submitBtn) submitBtn.style.display = "inline-flex";

    if (quizForm) {
        quizForm.reset();
        const allRadios = quizForm.querySelectorAll("input[type='radio']");
        allRadios.forEach(radio => {
            radio.disabled = false;
        });

        const allTiles = quizForm.querySelectorAll(".option-tile");
        allTiles.forEach(tile => {
            tile.classList.remove("selected", "correct", "incorrect");
        });

        const allExplanations = quizForm.querySelectorAll(".question-explanation-box");
        allExplanations.forEach(exp => {
            exp.classList.remove("show");
        });

        quizForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// ==============================================================================
// 12. PHASE 6: STUDENT PROFILE CONTROLLER & DATA AGGREGATION
// ==============================================================================
/**
 * Function: initProfilePage
 * Viva Explanation:
 * Aggregates all user performance metrics (completed lessons across 4 courses,
 * quiz scores, and course completion rates) dynamically from localStorage
 * without any server-side database.
 */
function initProfilePage() {
    const currentUser = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.CURRENT_USER) || "Student";
    const fullNameEl = document.getElementById("profile-full-name");
    const usernameHandleEl = document.getElementById("profile-username-handle");
    const avatarInitialEl = document.getElementById("profile-avatar-initial");

    if (fullNameEl) fullNameEl.textContent = capitalizeFirstLetter(currentUser);
    if (usernameHandleEl) usernameHandleEl.textContent = `@${currentUser.toLowerCase()}`;
    if (avatarInitialEl) avatarInitialEl.textContent = currentUser.charAt(0).toUpperCase();

    // Attach Reset Demo Data Listener
    const resetBtn = document.getElementById("btn-reset-profile-data");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetDemoData);
    }

    // Load and Aggregate Data
    const progressData = ensureCourseProgressInitialized();
    const quizData = ensureQuizScoresInitialized();

    renderProfileAggregates(progressData, quizData);
    renderCourseBreakdown(progressData, quizData);
}

function renderProfileAggregates(progressData, quizData) {
    const stats = calculateAggregateStats(progressData, quizData);

    const progressPercentage = stats.totalLessons > 0 
        ? Math.round((stats.completedLessons / stats.totalLessons) * 100) 
        : 0;

    const totalScoreSum = stats.quizScores.reduce((sum, score) => sum + score, 0);
    const averageQuizScore = stats.quizScores.length > 0 
        ? Math.round(totalScoreSum / stats.quizScores.length) 
        : 0;

    const remainingLessons = Math.max(0, stats.totalLessons - stats.completedLessons);

    const totalCoursesEl = document.getElementById("profile-total-courses");
    const completedLessonsEl = document.getElementById("profile-completed-lessons");
    const totalLessonsRatioEl = document.getElementById("profile-total-lessons-ratio");
    const lessonsBarEl = document.getElementById("profile-lessons-bar");
    const lessonsRemainingEl = document.getElementById("profile-lessons-remaining");

    if (totalCoursesEl) totalCoursesEl.textContent = stats.enrolledCourses;
    if (completedLessonsEl) completedLessonsEl.textContent = stats.completedLessons;
    if (totalLessonsRatioEl) totalLessonsRatioEl.textContent = `/ ${stats.totalLessons} Lessons`;
    if (lessonsRemainingEl) lessonsRemainingEl.textContent = `${remainingLessons} Remaining`;
    if (lessonsBarEl) {
        setTimeout(() => { lessonsBarEl.style.width = `${progressPercentage}%`; }, 150);
    }

    const overallProgressEl = document.getElementById("profile-overall-progress");
    const progressBarEl = document.getElementById("profile-progress-bar");
    if (overallProgressEl) overallProgressEl.textContent = `${progressPercentage}%`;
    if (progressBarEl) {
        setTimeout(() => { progressBarEl.style.width = `${progressPercentage}%`; }, 150);
    }

    const avgQuizScoreEl = document.getElementById("profile-avg-quiz-score");
    const quizBarEl = document.getElementById("profile-quiz-bar");
    const quizzesCountEl = document.getElementById("profile-quizzes-count");

    if (avgQuizScoreEl) avgQuizScoreEl.textContent = `${averageQuizScore}%`;
    if (quizzesCountEl) quizzesCountEl.textContent = `${stats.quizScores.length} Quizzes`;
    if (quizBarEl) {
        setTimeout(() => { quizBarEl.style.width = `${averageQuizScore}%`; }, 150);
    }
}

function renderCourseBreakdown(progressData, quizData) {
    const container = document.getElementById("course-breakdown-container");
    if (!container) return;

    const breakdownHTML = APP_CONFIG.COURSES.map(course => {
        const cp = progressData[course.id] || { completedLessons: [] };
        const completedCount = cp.completedLessons.length;
        const totalCount = course.totalLessons;
        const progressPct = Math.round((completedCount / totalCount) * 100);

        // Quiz score lookup
        const qScoreObj = quizData[course.id];
        const quizDisplay = qScoreObj 
            ? `${qScoreObj.percentage}% (${qScoreObj.score}/${qScoreObj.total})`
            : "Not Attempted";

        return `
            <article class="breakdown-card">
                <div>
                    <div class="breakdown-card-top">
                        <span class="course-category-tag">${course.category}</span>
                        <span class="badge-difficulty ${course.difficulty === 'Beginner' ? 'badge-beginner' : course.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'}">
                            ${course.difficulty}
                        </span>
                    </div>

                    <h3 class="breakdown-title">${course.title}</h3>
                    <p class="breakdown-instructor">Instructor: ${course.instructor}</p>

                    <div class="breakdown-stats-row">
                        <div class="breakdown-stat-item">
                            <span class="breakdown-stat-label">Lessons Completed</span>
                            <span class="breakdown-stat-value">${completedCount} / ${totalCount}</span>
                        </div>
                        <div class="breakdown-stat-item">
                            <span class="breakdown-stat-label">Quiz Score</span>
                            <span class="breakdown-stat-value" style="color: ${qScoreObj && qScoreObj.percentage >= 80 ? 'var(--success-color)' : 'var(--primary-color)'};">
                                ${quizDisplay}
                            </span>
                        </div>
                    </div>

                    <div class="course-progress-box">
                        <div class="course-progress-header">
                            <span>Syllabus Progress</span>
                            <span class="course-progress-pct">${progressPct}%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill ${progressPct === 100 ? 'progress-fill-success' : ''}" style="width: ${progressPct}%;"></div>
                        </div>
                    </div>
                </div>

                <div class="breakdown-buttons">
                    <a href="course.html?id=${course.id}" class="btn-breakdown-action btn-breakdown-course">
                        <span>Go to Course</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                    <a href="quiz.html?id=${course.id}" class="btn-breakdown-action btn-breakdown-quiz">
                        <span>Take Quiz</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </a>
                </div>
            </article>
        `;
    }).join("");

    container.innerHTML = breakdownHTML;
}

function resetDemoData() {
    if (confirm("Reset all course progress and quiz scores to default demo values?")) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(APP_CONFIG.DEFAULT_COURSE_PROGRESS));
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(APP_CONFIG.DEFAULT_QUIZ_SCORES));
        alert("Demo data successfully reset!");
        location.reload();
    }
}

// ==============================================================================
// 13. HELPER UTILITIES
// ==============================================================================
function getCourseIconSVG(courseId) {
    switch (courseId) {
        case "python":
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>`;
        case "web-dev":
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>`;
        case "machine-learning":
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>`;
        case "data-science":
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>`;
        default:
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>`;
    }
}

function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Function: triggerCelebrationConfetti
 * Viva Explanation:
 * Invokes the client-side canvas-confetti particle engine to deliver celebratory
 * feedback when a student marks a lesson completed or achieves high marks in a quiz.
 */
function triggerCelebrationConfetti(isGrand = false) {
    if (typeof confetti === "function") {
        if (isGrand) {
            // Two-stage grand celebration burst
            confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
            });
            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 }
                });
                confetti({
                    particleCount: 60,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 }
                });
            }, 250);
        } else {
            // Standard single celebratory burst
            confetti({
                particleCount: 75,
                spread: 65,
                origin: { y: 0.65 },
                colors: ['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
            });
        }
    } else {
        console.log("Celebration triggered (canvas-confetti loaded or offline).");
    }
}

// ==============================================================================
// 14. NEURAL NETWORK NODE CONNECTION BACKGROUND ANIMATION ENGINE
// ==============================================================================
/**
 * Function: initNeuralNetworkBackground
 * 🎓 Viva Explanation:
 * 1. Generates a lightweight, 60fps HTML5 Canvas particle system simulating an
 *    interconnected Artificial Neural Network (ANN) of nodes & synapses.
 * 2. Employs `requestAnimationFrame()` for GPU-accelerated rendering without blocking
 *    DOM operations or user clicks (`pointer-events: none`).
 * 3. Dynamically computes Euclidean distances `sqrt(dx^2 + dy^2)` between particle pairs.
 *    Nodes within threshold distance draw synaptic connection lines whose opacity
 *    inversely scales with distance.
 * 4. Theme Reactive: Continuously polls the active theme (dark/light) to seamlessly
 *    switch node and synapse colors (Subtle Royal Blue in light mode vs. Glowing Cyan Neon in dark mode).
 * 5. Interactive: Tracks cursor coordinates to draw subtle interactive connections to the mouse.
 */
function initNeuralNetworkBackground() {
    let canvas = document.getElementById("neural-bg-canvas") || 
                 document.getElementById("neural-canvas") || 
                 document.querySelector(".neural-bg-canvas") || 
                 document.querySelector(".neural-canvas");

    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "neural-bg-canvas";
        canvas.className = "neural-bg-canvas neural-canvas";
        canvas.setAttribute("aria-hidden", "true");
        document.body.insertBefore(canvas, document.body.firstChild);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic responsive particle count calculation (scales gracefully with viewport size)
    const getParticleCount = () => {
        if (width < 600) return 35;       // Mobile devices
        if (width < 1200) return 60;      // Tablets / small laptops
        return 85;                        // Desktops / HD monitors
    };

    let particles = [];
    const maxConnectionDistance = 140;
    const mouseConnectionDistance = 160;

    // Mouse coordinates tracking
    const mouse = {
        x: null,
        y: null,
        radius: mouseConnectionDistance
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Handle high-DPI retina display resolution & resize events
    function handleResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    }

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });

    // Particle Object Constructor
    class NeuralNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Smooth randomized drift velocities
            this.vx = (Math.random() - 0.5) * 0.75;
            this.vy = (Math.random() - 0.5) * 0.75;
            this.baseRadius = Math.random() * 1.8 + 1.2; // 1.2px - 3px radius
            this.radius = this.baseRadius;
            this.pulseAngle = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.02;
        }

        update() {
            // Position step
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off boundary walls
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Gentle pulsating breathing effect
            this.pulseAngle += this.pulseSpeed;
            this.radius = this.baseRadius + Math.sin(this.pulseAngle) * 0.4;
        }

        draw(isDarkTheme) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.75, this.radius), 0, Math.PI * 2);
            
            if (isDarkTheme) {
                // Dark Theme: Ultra-Vibrant Glowing Cyan Neon Node with Core
                ctx.fillStyle = "rgba(186, 230, 253, 0.95)";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(56, 189, 248, 0.95)";
            } else {
                // Light Theme: Bright Crisp Electric Blue Node with Subtle Aura
                ctx.fillStyle = "rgba(37, 99, 235, 0.85)";
                ctx.shadowBlur = 4;
                ctx.shadowColor = "rgba(37, 99, 235, 0.45)";
            }
            
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = getParticleCount();
        for (let i = 0; i < count; i++) {
            particles.push(new NeuralNode());
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Check current active theme
        const isDarkTheme = document.documentElement.classList.contains("dark-theme") || 
                            document.body.classList.contains("dark-theme") ||
                            document.documentElement.classList.contains("dark-mode") || 
                            document.body.classList.contains("dark-mode");

        // 1. Draw Synaptic Connections between Node Pairs
        const particleCount = particles.length;
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxConnectionDistance) {
                    const alpha = (1 - dist / maxConnectionDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);

                    if (isDarkTheme) {
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.42})`;
                        ctx.lineWidth = alpha * 1.4;
                    } else {
                        ctx.strokeStyle = `rgba(14, 165, 233, ${alpha * 0.38})`;
                        ctx.lineWidth = alpha * 1.25;
                    }
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            }

            // 2. Mouse Proximity Interactive Synaptic Connections
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const mouseDist = Math.sqrt(dx * dx + dy * dy);

                if (mouseDist < mouseConnectionDistance) {
                    const alpha = (1 - mouseDist / mouseConnectionDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);

                    if (isDarkTheme) {
                        ctx.strokeStyle = `rgba(96, 165, 250, ${alpha * 0.65})`;
                        ctx.lineWidth = alpha * 1.8;
                    } else {
                        ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.48})`;
                        ctx.lineWidth = alpha * 1.5;
                    }
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            }
        }

        // 3. Update & Render Individual Particles
        particles.forEach(p => {
            p.update();
            p.draw(isDarkTheme);
        });

        requestAnimationFrame(animate);
    }

    initParticles();
    requestAnimationFrame(animate);
    console.log("Neural Network canvas background animation engine initialized.");
}

