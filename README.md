# ArchBlog

ArchBlog is a full-stack personal blogging platform where users can create, read, and share blog posts. Built with React for the frontend, Spring Boot (3-layer architecture) for the backend, and PostgreSQL as the cloud-hosted database, ArchBlog is a clean, scalable solution for publishing thoughts and ideas.

---

## Features

- User authentication using JWT
- Create, update, and delete blog posts
- View all blogs or filter by user
- Profile management
- Forgot password and OTP-based password reset via email
- Fully responsive frontend using Material-UI
- Seamless integration between frontend and backend using RESTful APIs

---

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- RTK Query
- Material-UI (MUI)
- React Router

### Backend
- Spring Boot (3-layer architecture)
- Spring Security (JWT-based)
- Java MailSender for sending OTP emails
- PostgreSQL (cloud-hosted)
- ModelMapper

---

## Architecture

**Backend:**
- 3-layered architecture: Controller → Service → Repository
- DTOs for clean and secure data transfer
- Authentication using JWT and custom security configuration
- OTP-based password reset functionality

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Archishmaan74/ArchBlog.git
```
### 2. Clone the Repository

- Run the backend server:
```bash
./mvnw spring-boot:run
```  

- Navigate to the frontend folder:
```bash
cd archblog_frontend
```
- Install dependencies:
```bash
npm install
```
- Start the frontend app:
```bash
npm start
```
Ensure your RTK Query authApi.js and blogApi.js base URLs are set to match your backend API (e.g., http://localhost:8080).

### Folder Structure
```bash
ArchBlog/
├── archblog_backend/         // Spring Boot backend
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── dto/
│   └── entities/
│
└── archblog_frontend/        // React + Redux frontend
    ├── components/
    ├── pages/
    ├── app/
    └── services/
```

### Contributing
Feel free to fork this repository, raise issues, and submit pull requests. All contributions are welcome!
