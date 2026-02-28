# Cosmic CRM 🚀 — Modern Lead Management System

A high-performance, **futuristic MERN stack** Customer Relationship Management system designed to seamlessly manage leads from your web portfolio. Featuring a stunning glassmorphic UI, real-time analytics, and an interactive drag-and-drop pipeline.

---

## ✨ Features at a Glance

### 🏠 High-Fidelity Landing Page
A professional, conversion-focused home page with:
- **Hero Section**: Bold gradient typography and floating interactive dashboard mockup.
- **Trust Indicators**: Real-time stats strip (Satisfaction, Conversion, Follow-up speed).
- **Social Proof**: Active user avatars and lead tracking metrics.

### 📊 Interactive Kanban Pipeline
Move leads through their lifecycle with a intuitive drag-and-drop interface:
- **Stages**: New → Contacted → Converted.
- **Auto-Sync**: Status updates persist to the database instantly upon drop.
- **Visual Feedback**: Dynamic progress indicators and lead counting badges.

### 📈 Advanced Analytics Dashboard
Data-driven insights powered by **Recharts**:
- **Acquisition Trends**: Weekly lead flow visualization.
- **Source Breakdown**: Donut chart showing where your leads come from (LinkedIn, Twitter, Portfolio, etc.).
- **Quick Stats**: At-a-glance performance metrics for the current month.

### ➕ Lead Management & Details
- **Add Lead**: Direct manual entry via a sleek modal interface.
- **Deep-Dive View**: Full lead profile, communication history, and activity timeline.
- **Bulk Actions**: Search, filter, and delete functionality for enterprise-scale management.

### ⚙️ User Settings & Customization
- **Multi-Tab Settings**: Manage Profile, Security (JWT Auth), and Notifications.
- **Theming**: Toggle between Dark, Midnight, and Ocean UI modes.
- **Accent Picker**: Personalize your dashboard color palette.

---

## 📸 visual Preview

![Landing Page Screenshot](https://raw.githubusercontent.com/piyushraj9286/FUTURE_FS_02/main/frontend/public/home_screenshot.png)
*(Note: Replace with your hosted screenshot or relative path after pushing)*

---

## 🛠️ Tech Stack

**Frontend**
- **React 19** + **Vite 7** (Lightning fast dev experience)
- **React Router 7** (SPA Navigation)
- **Lucide React** (Consistent, modern iconography)
- **Framer Motion** (Smooth transitions and glassmorphic animations)
- **Axios** (Robust API communication)

**Backend**
- **Node.js** & **Express.js** (Scalable REST API)
- **MongoDB** (Flexible document-based database)
- **JWT** & **Bcrypt** (Secure, industry-standard authentication)
- **Mongoose** (Elegant object modeling)

---

## 📂 Project Structure

```text
crm_project/
├── frontend/          # React.js SPA (Vite + Tailwind)
│   ├── src/components # Reusable UI components (Modals, Sidebar)
│   ├── src/pages      # Optimized view components
│   └── src/assets     # Style definitions and images
├── backend/           # Node.js API
│   ├── models/        # Mongoose Schema (Lead, Admin)
│   ├── routes/        # API Endpoints
│   └── controllers/   # Business Logic
├── schema.sql         # Legacy database schema (for cross-ref)
└── README.md          # Project Documentation
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Atlas URI)

### 1. Clone & Install
```bash
git clone https://github.com/piyushraj9286/FUTURE_FS_02.git
cd FUTURE_FS_02
```

### 2. Configure Backend
```bash
cd backend
npm install
# Update .env with your MONGO_URI
node seedAdmin.js   # Initialize admin user
npm start           # Starts on port 5000
```

### 3. Launch Frontend
```bash
cd ../frontend
npm install
npm run dev         # Starts on port 5173
```

---

## 🤝 Community & Support
- **Author**: [Piyush Raj](https://github.com/piyushraj9286)
- **License**: MIT
- **Project Link**: [https://github.com/piyushraj9286/FUTURE_FS_02](https://github.com/piyushraj9286/FUTURE_FS_02)

---
<p align="center">Made with ❤️ for the Future of Full Stack Development</p>
