# 🚀 TransitNet 3D

### Interactive Transportation Network Visualization & Analysis

---

## 📌 Overview

**TransitNet 3D** is an advanced web-based application designed to model, visualize, and analyze a transportation network.
It allows users to create cities and connecting roads, and then apply graph algorithms to explore routes, connectivity, and cost optimization — all within an immersive **3D interactive environment**.

This project combines **data structures, graph algorithms, and modern web technologies** to deliver a visually rich and functional simulation tool.

---

## 🎯 Objectives

* Design and implement a transportation network using graph structures
* Provide interactive visualization of nodes (cities) and edges (roads)
* Apply efficient algorithms for route computation and optimization
* Enhance user experience with real-time 3D rendering and animations

---

## ✨ Features

### 🧱 Network Construction

* Add and remove cities (nodes)
* Add and remove roads (edges) with custom distances
* Minimum 5 cities required for analysis

---

### 🌐 3D Visualization

* Fully interactive **3D graph rendering**
* Cities represented as glowing nodes
* Roads displayed as dynamic connections
* Smooth camera controls (zoom, pan, rotate)
* Real-time updates with animations

---

### 📊 Algorithmic Analysis

#### 🔹 Shortest Path (Dijkstra’s Algorithm)

* Computes minimum distance from selected source city
* Displays paths and distances clearly
* Highlights shortest routes visually

---

#### 🔹 Traversal (BFS / DFS)

* Displays order of node exploration
* Step-by-step animated traversal

---

#### 🔹 Reachability Analysis

* Identifies reachable and unreachable cities
* Color-coded visualization for clarity

---

#### 🔹 Minimum Spanning Tree (MST)

* Computes minimum cost network using Prim’s/Kruskal’s algorithm
* Displays selected edges and total cost

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| Frontend     | React.js                       |
| 3D Rendering | Three.js / React Three Fiber   |
| Styling      | Tailwind CSS                   |
| Animations   | Framer Motion                  |
| Backend      | Node.js (Express) *(optional)* |

---

## 📂 Project Structure

```
TransitNet-3D/
│── src/
│   ├── components/
│   │   ├── Graph3D.jsx
│   │   ├── ControlPanel.jsx
│   │   ├── OutputPanel.jsx
│   │
│   ├── algorithms/
│   │   ├── dijkstra.js
│   │   ├── bfs.js
│   │   ├── dfs.js
│   │   ├── mst.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│
│── public/
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/transitnet-3d.git
cd transitnet-3d
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

```bash
npm run dev
```

---

## 🧪 Usage

1. Add at least **5 cities**
2. Connect cities using roads with distances
3. Select a **source city**
4. Choose an operation:

   * Shortest Path
   * Traversal
   * Reachability
   * Minimum Cost Network
5. View results in both **visual graph** and **output panel**

---

## 📈 Algorithms Used

* Dijkstra’s Algorithm
* Breadth-First Search (BFS)
* Depth-First Search (DFS)
* Prim’s / Kruskal’s Algorithm

---

## 🎨 UI Highlights

* Futuristic dark theme with neon accents
* Glassmorphism-based panels
* Smooth animations and transitions
* Interactive 3D graph experience

---

## 🔍 Future Enhancements

* Real-time traffic simulation
* Map integration (Google Maps API)
* Save/load network configurations
* AI-based route prediction

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork this repository and submit pull requests.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

* Inspired by real-world transportation systems
* Built as part of an academic project on graph algorithms and visualization

---

## 👨‍💻 Author

**Ankur Shakya**
Passionate about coding, problem-solving, and building interactive applications.

---
