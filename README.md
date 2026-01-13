# CodeRoom 🚀

**CodeRoom** is a full-stack real-time collaborative coding platform designed for technical interviews and pair programming. It provides a seamless environment where developers can write code, compile it, and communicate via high-quality video and audio calls—all in real-time.

<img width="1589" height="891" alt="image" src="https://github.com/user-attachments/assets/09804e88-493c-41aa-bb2d-928916169b24" />


## ✨ Key Features

- **Real-Time Collaboration:** Live code synchronization allowing multiple users to edit simultaneously.
- **Integrated Video & Audio:** High-quality video calls powered by **GetStream**, enabling face-to-face communication while coding.
- **Multi-Language Support:** Write and execute code in **JavaScript**, **Python**, **Java**, and more.
- **Instant Code Execution:** Secure, sandboxed code compilation using the **Piston API**.
- **Modern Authentication:** Secure sign-up and login via **Clerk** (supports GitHub & Google).
- **Session Management:** Create, join, and manage active coding sessions with interview history.
- **Beautiful UI:** A responsive, dark-mode-optimized interface built with **Tailwind CSS** and **DaisyUI**.

## 🛠️ Tech Stack

### **Frontend**
- **React.js (Vite):** Fast, modern frontend framework.
- **Tailwind CSS & DaisyUI:** Rapid styling and pre-built components.
- **TanStack Query:** Efficient server state management and caching.
- **Monaco Editor:** The code editor engine that powers VS Code.
- **Stream SDK:** For handling real-time video and chat.
- **Axios:** For handling API requests.

### **Backend**
- **Node.js & Express.js:** Robust server-side runtime.
- **MongoDB & Mongoose:** NoSQL database for storing user and session data.
- **Inngest:** Serverless background job processing and webhook handling.

### **Services & APIs**
- **Clerk:** User Authentication & Management.
- **GetStream.io:** Video, Audio, and Chat infrastructure.
- **Piston:** Open-source code execution engine.
- **Render:** Cloud hosting for deployment.

## 🚀 Getting Started locally

Follow these steps to run CodeRoom on your local machine.

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas connection string
- Clerk API Keys
- Stream API Keys

### 1. Clone the Repository
```bash
git clone [https://github.com/akash1723tripathi/CodeRoom.git](https://github.com/akash1723tripathi/CodeRoom.git)
cd CodeRoom
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file in the backend folder:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### #. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a .env file in the frontend folder:
```bash
# Point to your local backend
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
```

Start the frontend:
```bash
npm run dev
```


🌐 Deployment
This project is configured for deployment on Render.
Backend: Deploy as a Web Service. Ensure you add all backend environment variables in the Render dashboard.
Frontend: Deploy as a Static Site.
Build Command: npm run build
Publish Directory: dist
Environment Variables: Add VITE_API_URL, VITE_CLERK_PUBLISHABLE_KEY, and VITE_STREAM_API_KEY.

---

Made with ❤️ by Akash Tripathi
