# ✅ Done It

A minimal yet powerful task management web app that lets you **create, manage, and track your tasks** — whether you’re a guest or a logged-in user. Built with a modern tech stack including **React, Redux Toolkit, TailwindCSS, and Firebase**, with smooth animations powered by **Framer Motion**.

[Live Site URL📎](https://doneit.vercel.app/)

---

## ✨ Features

### 🌟 Core Features
- **Full CRUD for Tasks**: Add, edit, and delete tasks with optional descriptions.
- **Task Tracking**: Mark tasks as completed with satisfying, smooth animations.
- **Filtering**: Easily filter tasks by `All`, `Completed`, or `Pending` status.
- **Theme Toggling**: Switch between **Dark and Light** themes, with system preference detection.
- **Responsive Design**: A clean and modern UI that works beautifully on both mobile and desktop devices.

### 🆚 Guest vs. Logged-in Users

The app provides a seamless experience for both user types, with features unlocking upon authentication.

| Feature                     | Guest (localStorage) 👤 | Logged-in (Firebase) 🔒 |
|-----------------------------|-------------------------|-------------------------|
| Create & manage tasks       | ✅                      | ✅                      |
| Cross-device sync           | ❌                      | ✅                      |
| Weekly activity dashboard   | ❌                      | ✅                      |
| Light/Dark theme            | ✅                      | ✅                      |

### 📊 Dashboard (Logged-in Only)
- **At-a-Glance Stats**: See cards for total tasks, completed tasks, pending tasks, tasks added today, and tasks completed this week.
- **Activity Chart**: A visual representation of your productivity, showing daily tasks added and completed over the current week and previous weeks.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS v4
- **Authentication** Firebase Auth (Google Sign-in)
- **Database**: Firebase Firestore
- **Routing**: React Router
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Utilities**: `date-fns` for date manipulation, `lucide-react` for icons.
- **Toast notifications**: Sonner

---

## 🚀 Architectural Highlights

### Authentication & Data Management
- **Protected Routes**: The `/dashboard` route is protected using a custom wrapper, redirecting unauthenticated users to the login page.
- **Context-based Auth**: Custom `AuthContext` with Google OAuth integration for simple login experience.

- **Dual Data Sources**: Firestore for authenticated users, localStorage for guests

### Theming
- **Custom Theme Context**: Manual theme management with system preference detection and local storage persistence.

### Custom Hooks
To keep components clean and logic reusable, the app relies on several custom hooks:
- **`useAuth`**: Subscribes to Firebase Authentication state.
- **`useTheme`**: Theme toggling with persistence.
- **`useTodos`**: Unified CRUD operations for both guest and authenticated users.
- **`useTaskStats` & `useActivityCharts`**: Fetch and compute real-time data for the user dashboard statistics.

### Performance
- **Lazy Loading**: Home page sections are lazy-loaded with skeleton loading states
- **Real-time Updates**: Firestore listeners for instant data sync

---

## 📦 Installation & Setup

Follow these steps to get the project running locally.

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/done-it.git
cd done-it
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up Firebase:**
   - Create a new project at firebase.google.com.
   - Create a new Web App in your Firebase project.
   - Enable **Email/Password** authentication in the "Authentication" -> "Sign-in method" tab.
   - Create a **Firestore Database** in test mode to get started quickly.
   - Copy your Firebase project configuration credentials.

**4. Create an environment file:**
   - In the root of the project, create a file named `.env.local`.
   - Add your Firebase credentials to it like this:

   ```
   VITE_API_KEY="your-api-key"
   VITE_AUTH_DOMAIN="your-auth-domain"
   VITE_PROJECT_ID="your-project-id"
   VITE_STORAGE_BUCKET="your-storage-bucket"
   VITE_MESSAGING_SENDER_ID="your-messaging-sender-id"
   VITE_APP_ID="your-app-id"
   ```

**5. Run the development server:**
```bash
npm run dev
```
The app should now be running on `http://localhost:5173`.

---

## 🔐 Access Control

- `/` → Landing page (public)
- `/dashboard` → Accessible only to logged-in users.
- `/todo` → Accessible to both guest and logged-in users.
- Unauthenticated users attempting to access protected routes are redirected to `/login`.

---

## 🖼️ Screenshots

### Landing Page
![Landing page Screenshot](/public/landing-page-ss.jpeg)

### Todo Page
![Todo page Screenshot](/public/todo-page-ss.jpeg)

### Dashboard
![Todo page Screenshot](/public/dashboard-page-ss.png)
---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard-specific components
│   ├── todo/           # Todo management components
│   └── ui/             # Base UI components (Radix UI)
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── layout/             # Layout components
├── lib/                # Utilities and Firebase config
└── pages/              # Route components

```

---

## 🙌 Acknowledgements

- **UI Inspiration**: Dribbble shots & minimal task management designs.
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Claude**: Thanks to the ClaudeAI for suggesting some beautiful UI designs.