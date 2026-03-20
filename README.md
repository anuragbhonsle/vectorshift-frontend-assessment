# 🌀 VectorShift Pipeline Builder

A high-performance, node-based visual programming interface built for the **VectorShift Frontend Technical Assessment**. This project features a custom-built node abstraction layer, a dynamic "Night-owl" aesthetic, and a FastAPI-powered backend for graph validation.

---

## 🚀 Live Links
* **Frontend:** [vflow-ui.vercel.app](https://vectorshift-anurag.vercel.app/)
* **Backend:** [vectorshift-backend.onrender.com](https://vectorshift-backend.onrender.com)

---

## 🛠️ The Challenge: Four-Part Assessment

### 1. Node Abstraction (Architecture)
Instead of hardcoding every node, I developed a **BaseNode** higher-order component. This allows for the creation of new nodes in minutes by simply defining their unique inputs and outputs.
* **Nodes Created:** Input, Output, LLM, Text, **Math, Boolean, Dropdown, Condition, and String Join.**
* **Efficiency:** Reduced boilerplate code by ~70% across node files.

### 2. Styling (The "Night-Owl" Aesthetic)
Inspired by modern developer environments and Studio Ghibli's soft color palettes:
* **Glassmorphism:** UI elements feature `backdrop-filter: blur()` for a premium feel.
* **Animated Canvas:** Backgrounds utilize subtle motion to keep the workspace feeling "alive."
* **Bento Grids:** The sidebar uses a structured grid system for node selection.

### 3. Smart Text Node Logic
The Text node isn't just a static box; it's an intelligent component:
* **Dynamic Resizing:** The node grows vertically and horizontally as the user types.
* **Variable Detection:** It uses Regex to scan for `{{ variable_name }}`. When found, it **automatically renders a new input handle** on the left side of the node.

### 4. Backend Integration (DAG Validation)
The frontend communicates with a Python/FastAPI backend to parse the pipeline.
* **Algorithm:** Implemented **Kahn’s Algorithm** (Topological Sort) to detect cycles.
* **Result:** The user receives an instant alert showing the total node/edge count and a status confirming if the pipeline is a **Directed Acyclic Graph (DAG)**.

---

## 📂 Project Structure

```text
├── frontend/
│   ├── src/
│   │   ├── nodes/         # Abstracted node components
│   │   ├── store.js       # Zustand state management
│   │   ├── PipelineUI.js  # Main React Flow canvas
│   │   └── submit.js      # Backend integration logic
└── backend/
    ├── main.py            # FastAPI routes & DAG logic
    └── requirements.txt
```
