🌍 TransitNet 3D Simulator v2.0
React Threejs TailwindCSS Vite

TransitNet 3D Simulator is a high-performance, cinematic visualization tool for transportation networks and graph theory architectures. Built with web-native 3D technologies, it allows users to dynamically build interconnected networks of cities mapped over a premium shader-based Earth model.

Submitted To: Ningombam Anandshree Singh Sir
Developers: Ankur Shakya (1000024065) & Anirudh Garg (1000024114)

✨ Features
Interactive 3D Environment: High-fidelity rotating Earth featuring real-time atmospheric shaders, outer glow, and dynamic star fields powered by Three.js and React Three Fiber.
Dynamic Network Building: Add cities and draw logical flight-pattern transportation routes directly bridging geographic nodes above the Earth's surface.
Algorithm Analysis Engine:
Dijkstra's Algorithm: Instantly compute and visually highlight the shortest path between a source city and all other network destinations.
Minimum Spanning Tree (Prim's): Optimize the entire infrastructure by finding the lowest-cost sub-network that bridges all cities.
BFS & DFS Traversals: Process the geographic relationships of nodes step-by-step.
Reachability Assessment: Calculate which nodes are physically accessible from a specific starting hub.
Premium Glassmorphic UI: Floating control panels, on-demand sliding drawers, and neon-themed interactions that keep the focus strictly on the overarching 3D scene.
🚀 Getting Started
Prerequisites
Make sure you have Node.js installed on your machine.

Installation
Clone the repository (if you haven't already):

git clone https://github.com/Ankursh121/Transportation-Network-Model.git
cd Transportation-Network-Model/transit-net-3d
Install all dependencies:

npm install
Start the local development server:

npm run dev
Experience the app: Open your browser and navigate to http://localhost:5173.

🛠️ Architecture & Technologies
Frontend: React 19, Tailwind CSS (v4)
3D Rendering Pipeline: Three.js, @react-three/fiber, @react-three/drei
Component Styling: Custom glassmorphism variables applied via PostCSS & raw CSS.
State Management: Zustand
Icons: Lucide React
📋 Usage Instructions
Upon mounting, the application simulates a randomized city network across the globe.
Open the Left Control Panel (by clicking the arrow on the left edge if hidden).
Add Nodes: Enter a city name and hit +. The system translates the name into spatial 3D coordinates.
Draw Routes: Select Origin and Destination nodes, input a weight/distance, and link them.
Run Algorithms:
Click any node from the "Manage Cities" list.
Click Set as Source.
Run Dijkstra, MST, or Traversals. The output will immediately dictate the animation highlight paths over the 3D map!
👨‍💻 Connect with us
Ankur Shakya: Instagram | WhatsApp
Anirudh Garg: Instagram | WhatsApp
© 2026 Advanced Network Modeling. Engineered for transit stability.
