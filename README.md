# 🚀 NeoFinance - Premium Finance Dashboard

A modern, high-fidelity finance dashboard built to fulfill the "Finance Dashboard UI" assignment with a focus on visual excellence, interactive insights, and role-based functionality.

![Final Dashboard](file:///C:/Users/user/.gemini/antigravity/brain/509838af-1682-4c4d-a4a4-4b8e0c9a96f2/modern_dashboard_final_1775390011970.png)

## 📋 Assignment Fulfillment Overview

This project satisfies all core requirements and several optional enhancements:

| Requirement | Implementation Detail | Status |
| :--- | :--- | :--- |
| **1. Dashboard Overview** | Summary Cards (Balance, Income, etc.), Area Trend Chart & Donut Breakdown. | ✅ Done |
| **2. Transactions** | Sortable/paginated table with search and multi-category filters. | ✅ Done |
| **3. RBAC Simulation** | Admin vs Viewer switcher. Admin enables Add/Edit/Delete & CSV Export. | ✅ Done |
| **4. Insights Section** | "Smart Recommendations", MoM trend analysis, and spending concentration. | ✅ Done |
| **5. State Management** | Global `AppContext` with `useReducer` for clean, predictable state flow. | ✅ Done |
| **6. UI/UX** | Mobile-responsive, dark-mode, glassmorphism design using Tailwind CSS. | ✅ Done |
| **7. Enhancements** | LocalStorage persistence, CSV Export, Framer-motion style transitions. | ✅ Done |

---

## 🛠️ Tech Stack & Architecture

- **Core**: 
  - [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
  - [Tailwind CSS v3](https://tailwindcss.com/) for modern styling.
  - [Recharts](https://recharts.org/) for high-performance visualizations.
  - [Lucide React](https://lucide.dev/) for consistent iconography.
- **State Management**: React Context API + `useReducer` hooks for centralized data management and persistence.
- **Data Handling**: [date-fns](https://date-fns.org/) for robust temporal calculations.
- **Persistence**: Automatic state synchronization with `localStorage` to preserve data across sessions.

---

## 🔐 Role-Based Access Control (RBAC)

The dashboard simulates a split-permission environment:

- **Admin (Super Admin)**:
  - Full CRUD access (Add/Edit/Delete) on all transactions.
  - Ability to **Export CSV** reports from the Transactions page.
  - Interactive charts and detailed analytics.
- **Viewer (Read Only)**:
  - Read-only access to all dashboards and tables.
  - All management buttons (Add/Edit/Delete/Export) are dynamically hidden.
  - Role switcher located top-right in the Header.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- `npm` or `yarn`

### Installation
1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd fin-ui
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Launch the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 💡 Key Design Decisions

- **Dark-Mode First**: Chose a deep navy-zinc palette to provide a "FinTech" aesthetic that reduces eye strain and highlights color-coded data.
- **Glassmorphism**: Layers and borders use subtle blurs and transparency to create depth without clutter.
- **Modular Components**: Every section (Charts, Filters, Tables, Cards) is isolated for maximum maintainability and testability.
- **Accessibility**: High-contrast ratios and clear labels ensure readability across the analytics panels.

---

