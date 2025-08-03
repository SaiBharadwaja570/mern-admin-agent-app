# MERN Admin-Agent Management App

A full-stack application for admin login, agent creation & management, uploading and assigning lists to agents.

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Frontend:** React.js (Vite + Tailwind CSS)

## ✅ Features

* Admin login with JWT authentication
* Add, edit, delete agents
* Upload lists and assign tasks to agents
* View tasks assigned to agents
* Secure backend with middleware validation
* Clean and responsive UI using Tailwind CSS

## 🛠️ Requirements

1. MongoDB for database
2. Express.js & Node.js for backend
3. React.js for frontend
4. Validation & error handling throughout app
5. Clean, readable code with comments
6. `.env` file for configuration

## 📝 Environment Variables

Create a `.env` file in backend root with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 💻 Installation & Running

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The app will run on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## 📋 Run Application

* Login as Admin → Manage Agents → Upload Lists & Assign Tasks → View Dashboard

## 📝 Notes

* Ensure MongoDB is running locally or use MongoDB Atlas.
* Update `.env` values before starting.

## 📄 License

MIT License
