# EduLearn - Web Technology Education Platform 🎓

A modern, responsive, and interactive educational platform web application built using **HTML5**, **CSS3**, and **Vanilla JavaScript** with **zero backend dependencies**.

---
<img width="1915" height="828" alt="Screenshot 2026-09-14 172244" src="https://github.com/user-attachments/assets/bc3f2067-1633-4293-a81d-c8537c2ea52e" />
<img width="1897" height="822" alt="Screenshot 2026-09-14 172256" src="https://github.com/user-attachments/assets/4b85a013-f998-47a3-8111-fe7b07db4754" />
<img width="1885" height="821" alt="image" src="https://github.com/user-attachments/assets/6c9766fe-a696-4e9e-8aa7-b2cc1bbdbe7f" />

## 🌟 Features

- **Authentication System (Phase 1):** Login gateway with pre-filled demo student credentials (`student` / `12345`) and password visibility toggle.
- **Interactive Student Dashboard (Phase 2):** Real-time metric cards, aggregate syllabus progress, overall performance tracking, and direct access to courses.
- **Course Catalog & Real-Time Filtering (Phase 3):** Search courses dynamically by title/description or filter by category (Programming, Web Tech, AI & ML, Data Science) and difficulty.
- **Detailed Course Syllabus & Video Modals (Phase 4):**
  - Interactive syllabus modules with duration tags.
  - Dedicated modal popup containing 16:9 responsive **HD YouTube video lectures**, comprehensive theoretical study notes, code implementations, and key viva takeaways.
  - Single-click lesson completion toggling with progress synchronization.
- **Interactive MCQ Assessment Engine (Phase 5):** 5-question timed quiz per course with immediate scoring, instant feedback, answer explanations, and retake functionality.
- **Holistic Student Profile & Statistics (Phase 6):** Complete aggregate breakdown of all enrolled courses, completion rates, and quiz evaluations.
- **Global Anti-FOUC Dark Mode:** Smooth theme switching (☀️ / 🌙) with zero visual flash on navigation or page refresh.
- **Dynamic Neural Network Background:** Lightweight, GPU-accelerated HTML5 canvas animation with theme-adaptive node and synaptic connection colors.
- **Celebratory Confetti Effects:** Particle bursts powered by `canvas-confetti` on lesson completion and quiz success.
- **Neon Glowing Progress Bars:** Sleek electric blue and neon cyan gradients with animated light shimmer beam sweeps.

---

## 📁 Project Structure

```
WT Education Platform/
├── index.html          # Authentication & Login Page
├── dashboard.html      # Main Student Dashboard
├── courses.html        # Courses Catalog with Filters & Search
├── course.html         # Course Details & Interactive Lesson Syllabus
├── quiz.html           # 5-Question Multiple Choice Assessment
├── profile.html        # Student Profile & Performance Analytics
├── css/
│   └── style.css       # Unified Design System & Styling
├── js/
│   └── script.js       # Complete Frontend Engine & State Logic
└── README.md           # Project Documentation
```

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/LOHITHVATTAM1628/WT-Education-Platform.git
   ```
2. Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
3. Sign in with the credentials:
   - **Username:** `student`
   - **Password:** `12345`

*No Node.js, server, database, or build tools required.*

---

## 💻 Tech Stack

- **HTML5:** Semantic document architecture
- **CSS3:** Flexbox, CSS Grid, Custom Properties (Variables), Keyframe Animations
- **JavaScript (ES6+):** DOM manipulation, Web Storage API (`localStorage`), HTML5 Canvas 2D Context
