# 🌍 TransitNet 3D Simulator v2.0

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**TransitNet 3D Simulator** is a high-performance, cinematic visualization tool for transportation networks and graph theory architectures. Built with web-native 3D technologies, it allows users to dynamically build interconnected networks of cities mapped over a premium shader-based Earth model.

**Submitted To:** Ningombam Anandshree Singh Sir  
**Developers:** Ankur Shakya (1000024065) & Anirudh Garg (1000024114)

---

## ✨ Features

- **Interactive 3D Environment**: High-fidelity rotating Earth featuring real-time atmospheric shaders, outer glow, and dynamic star fields powered by Three.js and React Three Fiber.
- **Dynamic Network Building**: Add cities and draw logical flight-pattern transportation routes directly bridging geographic nodes above the Earth's surface.
- **Algorithm Analysis Engine**:
  - **Dijkstra's Algorithm**: Instantly compute and visually highlight the shortest path between a source city and all other network destinations.
  - **Minimum Spanning Tree (Prim's)**: Optimize the entire infrastructure by finding the lowest-cost sub-network that bridges all cities.
  - **BFS & DFS Traversals**: Process the geographic relationships of nodes step-by-step.
  - **Reachability Assessment**: Calculate which nodes are physically accessible from a specific starting hub.
- **Premium Glassmorphic UI**: Floating control panels, on-demand sliding drawers, and neon-themed interactions that keep the focus strictly on the overarching 3D scene.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/Ankursh121/Transportation-Network-Model.git
   cd Transportation-Network-Model/transit-net-3d
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Experience the app**:
   Open your browser and navigate to `http://localhost:5173`.

---

## 🛠️ Architecture & Technologies

- **Frontend**: React 19, Tailwind CSS (v4)
- **3D Rendering Pipeline**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Component Styling**: Custom glassmorphism variables applied via PostCSS & raw CSS.
- **State Management**: Zustand
- **Icons**: Lucide React

---

## 📋 Usage Instructions

1. Upon mounting, the application simulates a randomized city network across the globe.
2. Open the **Left Control Panel** (by clicking the arrow on the left edge if hidden).
3. **Add Nodes**: Enter a city name and hit `+`. The system translates the name into spatial 3D coordinates.
4. **Draw Routes**: Select Origin and Destination nodes, input a weight/distance, and link them.
5. **Run Algorithms**: 
   - Click any node from the "Manage Cities" list. 
   - Click `Set as Source`.
   - Run Dijkstra, MST, or Traversals. The output will immediately dictate the animation highlight paths over the 3D map!

---

## 👨‍💻 Connect with us

- **Ankur Shakya**: [Instagram](https://www.instagram.com/ankur_shakya._/?__pwa=1) | [WhatsApp](https://wa.me/919235787767)
- **Anirudh Garg**: [Instagram](https://www.instagram.com/anirudhgargg/?__pwa=1) | [WhatsApp](https://wa.me/918607189849)

*© 2026 Advanced Network Modeling. Engineered for transit stability.*

