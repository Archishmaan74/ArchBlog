# ArchBlog

**Live Demo:** [https://archblog-trend.netlify.app/](https://archblog-trend.netlify.app/)

![ArchBlog](https://github.com/user-attachments/assets/fd3cfaa1-5a86-4e40-8d8b-d04df867bc2f)

ArchBlog is a full-stack blogging platform where users can write, edit, and share blog posts. It is built using React for the frontend and Spring Boot for the backend. The data is stored in a PostgreSQL database hosted on the cloud.

This project includes user login with JWT, blog management features, and password reset through email OTP. The user interface is designed to work well on both desktop and mobile devices.

---

## Features

- User login and registration using JWT
- Create, edit, and delete blog posts
- View all blogs or only your blogs
- Edit user profile information
- Forgot password and reset password via email OTP
- Responsive design using Material-UI
- Smooth connection between frontend and backend using REST APIs

---

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- RTK Query
- Material-UI
- React Router

### Backend
- Spring Boot (3-layer architecture)
- Spring Security with JWT
- Java MailSender for OTP emails
- PostgreSQL
- ModelMapper

---

## Architecture

**Backend:**
- Controller → Service → Repository structure
- DTOs used for clean data transfer
- Secure JWT-based authentication
- OTP functionality for password reset

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
