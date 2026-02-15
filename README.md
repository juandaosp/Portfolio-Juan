# ⚡ Principal Systems Architect Dashboard

A high-performance, data-driven portfolio built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**. This application serves as a "Proof of Work" engine, visualizing **822.5 Story Points** of delivered engineering value across global financial platforms.



## 🎯 The Vision
This dashboard is designed to solve the "Senior Portfolio Problem": instead of just listing skills, it provides **auditability**. It bridges the gap between high-level architectural strategy (Epics) and ground-level execution (Jira Work Logs).

## 🏗️ Architectural Layers

### 1. Strategic Pillars (The "Epics")
Represented in the top grid, these cards showcase large-scale methodology.
* **Strangler Pattern:** Modernization of legacy monoliths (Ember.js → Vue 3).
* **Global Platforms:** Engineering for 2M+ monthly active users.
* **Systems Engineering:** Foundations in scalability and honors-level academic theory.

### 2. Verified Execution (The "Heatmap")
The skill grid acts as a heatmap of actual effort.
* **Data-Driven:** All points are pulled from a processed dataset of historical work logs.
* **Traceability:** Clicking a skill reveals the exact issue keys (e.g., `CW-6586`) and tasks completed.

## 🛠️ Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Animation:** Framer Motion (Orchestrated Layout Transitions)
* **Styling:** Tailwind CSS (Enterprise Dark Mode)
* **Icons:** Lucide React
* **Types:** TypeScript (Strictly typed for Metric interfaces)

---

## 🚀 Implementation Highlights

### Unified Evidence Drawer
The app uses a polymorphic drawer system. Depending on the `activeItem` type, it dynamically renders:
* **Pillar View:** Focuses on strategic metrics (LCP improvement, user scale).
* **Skill View:** Focuses on technical execution (Tech stack chips, Raw ticket summaries).



### Performance Indexing
The "822.5" score is not a random number. It is a calculated metric derived from:
$$TotalPoints = \sum (StoryPoints_{completed})$$
This provides a quantifiable "Career Velocity" metric for technical recruiters.

---

## 🚧 In Progress (Roadmap)

### Phase 1: Temporal Visualizations (Q2 2026)
* [ ] **Velocity Sparklines:** Interactive graphs showing point delivery over specific quarters.
* [ ] **Sprint Distribution:** A breakdown of time spent on Feature Dev vs. Architecture vs. Bug Fixes.

### Phase 2: AI Integration (NVIDIA GenAI Path)
* [ ] **RAG-based Career Assistant:** A chatbot trained on my professional history to answer specific "Have you worked with...?" questions.
* [ ] **Semantic Search:** Searching for a keyword (e.g., "Observability") will highlight all related work logs across different skills.

### Phase 3: Live Ecosystem
* [ ] **Harness/CI-CD Integration:** Pulling live deployment statuses for current personal projects.

---

## 🔒 Security & Confidentiality
All data presented in `portfolio_data.json` has been sanitized. Issue summaries are used to provide architectural context without exposing proprietary logic or sensitive financial data.

---

## 📦 Deployment
Designed for a zero-cost, high-availability footprint:
1. Push code to GitHub.
2. Connect to **Vercel** for automatic CI/CD.
3. Edge-optimized delivery for sub-1s load times globally.