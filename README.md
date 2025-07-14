# ❤️ HeartSync Project: A Complete Overview

## 🩺 Core Idea
**HeartSync** is a comprehensive health monitoring application designed to help users track, visualize, and understand their key health metrics — focusing on cardiovascular health, physical activity, and sleep patterns. It provides actionable insights to help users improve their overall well-being.

## 👥 Target Audience
Ideal for individuals seeking to manage their health proactively, fitness enthusiasts, and those interested in gaining a deeper understanding of their activity and sleep quality.

---

## 🎯 1. Project Vision & Goals

HeartSync aims to:

- 📊 Simplify health tracking with intuitive UI
- 📈 Offer actionable health insights
- 💪 Promote consistent healthy habits
- 🔐 Ensure robust data privacy and security

---

## 🧰 2. Technology Stack

| Layer         | Tool/Framework |
|--------------|----------------|
| Frontend     | Next.js (App Router) |
| UI Components| shadcn/ui (Radix UI + Tailwind) |
| Styling      | Tailwind CSS |
| Icons        | Lucide React |
| Authentication | NextAuth.js |
| ORM & DB     | Prisma + PostgreSQL |
| Language     | TypeScript |

---

## 🏗️ 3. Architecture Overview

### 🖥️ Frontend (Client-side)
- Built using React (Next.js)
- Uses shadcn/ui for accessible design system
- Interactive components marked with `use client`
- API and Server Actions used for data handling

### 🧠 Backend (Server-side)
- API Routes and Server Actions in `app/api`
- Authentication via NextAuth.js
- Data operations with Prisma ORM
- Middleware for protected routes

### 🗃️ Database (PostgreSQL + Prisma)
- Stores users, health metrics (heart rate, activity, sleep)
- Prisma provides type-safe DB operations

---

## 🔑 4. Key Features

### ✅ Phase 1: Foundation (Completed)
- UI Components: Navbar, Sidebar, HeartRateCard, ActivityCard
- Authentication: Login, Signup, Google OAuth, Session handling
- Prisma Models:
  - User
  - HeartRate
  - Activity
  - SleepRecord
- Pages: Landing (`/`), Dashboard (`/dashboard`)

### 🛠️ Phase 2: Core Features (Next)
- Profile management
- Manual/Integrated data input forms
- Data visualization (charts, graphs)
- Health summaries and goal tracking

### 🚀 Phase 3: Advanced Features (Planned)
- Real-time data from wearables
- Notifications and reminders
- Predictive analytics and insights
- Social sharing and connections

---

## 📌 5. Current Status

✅ **Phase 1 Complete** — Core UI, authentication, and database schema are ready. The base system is now functional.

---

## ⏭️ 6. Next Steps

- Setup PostgreSQL DB & Prisma migrations
- Begin Phase 2:
  - Build user profile page
  - Add APIs and forms for heart/activity/sleep data
  - Create data visualizations

---

## 💡 Get Involved

Interested in collaborating or contributing to HeartSync?  
Let’s build a healthier future, together. Reach out or fork the repo to begin.

---

<p align="center">
  Built with ❤️ using Next.js, Tailwind, Prisma, and a passion for personal health 🌿
</p>
