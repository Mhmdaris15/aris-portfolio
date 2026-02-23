<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=A855F7&center=true&vCenter=true&width=600&lines=Muhammad+Aris+Septanugroho;Software+Engineer+%7C+Full-Stack+Developer;Building+Scalable+Systems+%26+Web+Apps" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/Mhmdaris15"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/muhammad-aris-septanugroho/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="https://www.kaggle.com/Mhmdaris15"><img src="https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white" /></a>
  <a href="mailto:muhammadaris1945@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>

---

# 🚀 Developer Portfolio

A modern, interactive developer portfolio built with **React**, **TypeScript**, **Three.js**, and **GSAP** — featuring a 3D animated character, smooth scroll animations, an inverted pyramid tech stack, and a built-in chess engine with AI chatbot.

## ✨ Features

- **3D Animated Character** — WebGL-powered avatar using Three.js and React Three Fiber
- **Smooth Scroll Animations** — GSAP + ScrollTrigger with Lenis smooth scrolling
- **Horizontal Work Showcase** — Pin-scrolling project gallery with parallax effects
- **Interactive Tech Stack** — Inverted pyramid layout with hover animations
- **Play Page** — Built-in chess engine (RedoxChess WASM) + AI-powered chatbot
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile
- **Custom Cursor** — Dynamic cursor with context-aware interactions

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React, TypeScript, Vite |
| **3D / Animation** | Three.js, React Three Fiber, GSAP, ScrollTrigger |
| **Styling** | Vanilla CSS, Custom Animations |
| **Routing** | React Router |
| **Deployment** | Vercel |

## 📦 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone git@github.com:Mhmdaris15/aris-portfolio.git
cd aris-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Preview

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── public/
│   ├── images/          # Project screenshots & assets
│   ├── models/          # 3D character model (GLTF)
│   └── video/           # Background video assets
├── src/
│   ├── components/      # React components (Landing, About, Career, etc.)
│   ├── config.ts        # All portfolio data (experiences, projects, skills)
│   ├── context/         # React context providers
│   ├── pages/           # Route pages (MyWorks, Play)
│   └── utils/           # Chess engine & utility functions
├── api/                 # Serverless API (chat endpoint)
└── index.html
```

## ⚙️ Configuration

All portfolio content is centralized in [`src/config.ts`](src/config.ts). Edit this file to update:

- Developer name, title, and bio
- Work experiences and timeline
- Project showcase
- Contact information and social links
- Skills and tools

## 🎮 Play Page

The portfolio includes an interactive Play page with:

- **Chess Engine** — Play against RedoxChess (WASM-powered, ~3640 ELO)
- **AI Chatbot** — Chat with a persona-driven AI assistant

> **Note:** The chatbot requires a serverless API endpoint (`/api/chat`) with an OpenAI-compatible backend.

## 📝 Notes

- GSAP Club plugins (SplitText, DrawSVG) are trial versions — they work in development but **cannot be hosted in production**. For production hosting, obtain a [GSAP Club license](https://gsap.com/docs/v3/Installation/).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Mhmdaris15">Muhammad Aris Septanugroho</a>
</p>
