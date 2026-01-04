# Trello Lite 🧩

A small, clean Trello-like board built for interview and demonstration purposes.  
Focused on **architecture, clean code, and UX**, not backend complexity.

This project intentionally avoids a real API and persists everything locally, so the emphasis stays on **frontend engineering quality**.

---

## ✨ Features

- 📋 Board with multiple lists (columns)
- 🧱 Cards inside lists
- ✏️ Inline editing (list titles & card titles)
- ➕ Create / 🗑️ delete lists and cards (with confirmation)
- 💬 Card comments (modal-based)
- 🔄 Move cards between lists
  - Drag & drop (desktop)
  - Explicit “Move” action (mobile-friendly)
- 🌗 Light / Dark theme toggle
- 💾 Local persistence via `localStorage`
- 🦴 Skeleton loading state
- 🧯 Error boundaries for graceful failures

---

## 🧠 Design Goals

This project is intentionally opinionated:

- Clean architecture
- Separation of concerns
- Readable naming
- Predictable state
- Safe runtime behavior

It is **not** meant to be:

- A pixel-perfect Trello clone
- Backend-heavy
- Feature-bloated

---

## 🏗️ Tech Stack

- **Next.js (App Router)**
- **React + TypeScript**
- **Redux Toolkit**
- **SCSS Modules**
- **@dnd-kit** (drag & drop)
- **LocalStorage** (persistence)

No UI libraries. No magic.

---

## 📁 Project Structure (simplified)

src/
├─ app/ # Next.js app router
├─ features/
│ ├─ board/ # Board domain (lists, cards, comments)
│ └─ theme/ # Theme feature (light / dark)
├─ shared/
│ ├─ components/ # Reusable UI & feedback components
│ ├─ hooks/ # Shared hooks
│ └─ hoc/ # Error boundary, guards, etc.
├─ core/
│ ├─ storage/ # LocalStorage abstraction & keys
│ ├─ errors/ # Error mapping & messages
│ └─ utils/ # Small helpers
├─ styles/ # Global styles, tokens, themes

---

## 🎯 State Management

- **Redux Toolkit** for board data and theme
- **Normalized state** (entities + ids)
- UI-only state (modals, inline edit) lives locally
- Derived data via **memoized selectors**

---

## 💾 Persistence Strategy

- Board state is saved to `localStorage`
- On load:
  - State is **validated at runtime**
  - Corrupted or incompatible data is discarded safely
- Prevents crashes caused by stale persisted data

---

## 🧪 Error Handling

- Global `ErrorBoundary` wraps the board
- UI remains usable even if a component fails
- Confirmation dialogs protect destructive actions

---

## 📱 Mobile Considerations

Drag & drop is great on desktop, painful on mobile.

So cards also support:

- Explicit “Move” action
- Modal-based list selection
- Fully usable without drag gestures

---

## 🎨 Styling & Theming

- SCSS Modules
- Design tokens (`--bg`, `--panel`, `--text`, etc.)
- Theme applied via `data-theme` on `<html>`
- No hardcoded colors in components

---

## 🚀 Getting Started

npm install
npm run dev

Open:

http://localhost:3000

---

## 📝 Notes

- Optimized for **readability and discussion**
- Architectural decisions are intentional
- Easy to extend with:
  - Backend API
  - Auth
  - Real-time updates
  - Multi-board support

---

## 🙌 Why This Exists

This is not “yet another Trello clone”.

It’s a **conversation piece**:

- for interviews
- for code reviews
- for showing how you think, not just what you build
