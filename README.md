# ArchBlog

**Live Demo:** [https://archblog-frontend.onrender.com](https://archblog-frontend.onrender.com)

![ArchBlog_1](https://github.com/user-attachments/assets/af791eba-51c0-4d4d-8f8a-3ac0b4a3ae64)

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
- Light and dark mode toggle using React Context API
- Theme preference persisted using localStorage
- Smooth connection between frontend and backend using REST APIs

---

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- RTK Query
- React Context API
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

The backend uses:

- Controllers for handling HTTP requests
- Services for business logic
- Repositories for database operations
- DTOs for data transfer
- Entities for database persistence
- ModelMapper for object mapping
- Spring Security for authentication and authorization
- JWT for stateless authentication
- JJWT for JWT token handling
- Bean Validation for request validation
- Global exception handling
- Standardized API responses

### Frontend Architecture

```text
Pages
  ↓
Components
  ↓
Redux Toolkit / RTK Query
  ↓
REST APIs
  ↓
Spring Boot Backend
```

The frontend is organized into reusable pages, components, API services, shared types, utilities, test setup, and styling modules.

### Theme Management

ArchBlog uses the **React Context API** for application theme management. A custom `ThemeContext` provides the current theme and a `toggleTheme` function to switch between light and dark mode. The selected theme is integrated with Material-UI's theme system, and the user's preference is stored in `localStorage` so the selected theme is preserved across page reloads and future visits.

---

## API Response Structure

The backend uses a standardized response structure:

```json
{
  "status": "SUCCESS",
  "message": "Operation completed successfully",
  "data": {}
}
```

This provides a consistent response format across the application.

---

## Error Handling

### Backend

The backend provides centralized exception handling for:

- Validation errors
- Authentication errors
- Authorization errors
- Resource not found errors
- Business exceptions
- General server errors

### Frontend

The frontend provides user-friendly handling for:

- Unauthorized requests
- Forbidden requests
- Resource not found
- Server errors
- Request timeouts
- Network failures
- Empty API responses

---

## Testing

The frontend uses Vitest and React Testing Library.

Current frontend test suite:

- 14 test files
- 40 tests
- 100% tests passing

Latest frontend coverage:

| Metric | Coverage |
| --- | --- |
| Statements | 96.44% |
| Branches | 91.94% |
| Functions | 91.02% |
| Lines | 96.85% |

### Run Frontend Tests

Run tests:

```bash
npm test
```

Run tests once:

```bash
npm test -- --run
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Run Backend Tests

Navigate to the backend:

```bash
cd archblog-backend
```

Run backend tests:

```bash
./mvnw test
```

On Windows:

```bash
mvnw.cmd test
```

---

## CI/CD

ArchBlog uses GitHub Actions for automated quality checks.

### Frontend CI

The frontend workflow:

1. Installs dependencies
2. Runs frontend tests
3. Builds the production application

### Backend CI

The backend workflow:

1. Sets up Java 21
2. Installs dependencies
3. Runs backend tests
4. Builds the Spring Boot application

Frontend deployment on Render is configured to deploy after the required CI checks pass.

---

## Deployment

### Frontend

The frontend is deployed as a Render Static Site.

**Live Application:**

[https://archblog-frontend.onrender.com](https://archblog-frontend.onrender.com)

The frontend production build is generated using Vite.

Render is configured with an SPA rewrite so React Router routes work correctly when accessed directly.

```text
/* → /index.html
```

### Backend

The backend is deployed on Render using Docker.

**Backend:**

[https://archblog-backend-r43p.onrender.com](https://archblog-backend-r43p.onrender.com)

### Database

PostgreSQL is hosted using Aiven.

The backend connects to the cloud PostgreSQL database through environment-based configuration.

---

## Environment Configuration

The frontend uses a Vite environment variable for the backend API URL.

Example:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Backend configuration requires environment-specific values for:

- PostgreSQL database connection
- JWT configuration
- Email/SMTP configuration
- Application secrets

Sensitive credentials should never be committed to the repository.

---

## Installation

### Prerequisites

Make sure you have the following installed:

- Java 21
- Node.js 20+
- npm
- Git
- PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/Archishmaan74/ArchBlog.git
cd ArchBlog
```

### 2. Backend Setup

Navigate to the backend:

```bash
cd archblog-backend
```

Configure the required environment variables for:

- PostgreSQL database
- JWT
- Email/SMTP

Run the backend:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd archblog-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL provided by Vite.

---

## Production Build

### Frontend

Build the production frontend:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Backend

Build the backend:

```bash
./mvnw package
```

On Windows:

```bash
mvnw.cmd package
```

---

## Project Structure

```text
ArchBlog/
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── frontend-ci.yml
│
├── archblog-backend/
│   ├── src/
│   │   ├── main/
│   │   │   └── java/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
│
├── archblog-frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── utils/
│   │   └── test/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vitest.config.ts
│
└── README.md
```

---

## Security

ArchBlog follows several security practices:

- JWT-based authentication
- Protected backend APIs
- Protected frontend routes
- Password hashing through Spring Security
- Request validation
- Environment-based secrets
- CORS configuration
- Sensitive credentials excluded from Git
- Authentication and authorization error handling

---

## Recent Upgrades

The project has been upgraded with:

- Java 17 → Java 21
- JavaScript → TypeScript on the frontend
- Standardized backend API responses
- Global backend exception handling
- Improved request validation
- Improved JWT authentication error handling
- Frontend API timeout handling
- Frontend API and network error handling
- Reusable error modal
- Reusable empty state component
- Protected frontend routes
- Comprehensive frontend tests
- Backend JUnit tests
- Frontend CI workflow
- Backend CI workflow
- Production frontend build verification
- Render SPA routing configuration
- Improved responsive UI
- Light and dark mode toggle using React Context API
- Persistent theme preference using localStorage
- Improved theme-aware styling across the application
- Improved frontend project structure
- More than 90% frontend test coverage across all major metrics
- Test coverage excluded from Git tracking

---

## Contributing

Contributions are welcome.

### 1. Fork the Repository

Fork the ArchBlog repository on GitHub.

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/ArchBlog.git
cd ArchBlog
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Install and Configure the Project

Follow the Installation steps to configure the backend and frontend.

### 5. Make Your Changes

Implement your feature or fix while following the existing project structure and coding conventions.

### 6. Run Tests

Run the frontend and backend tests before submitting your changes.

Frontend:

```bash
cd archblog-frontend
npm test -- --run
```

Backend:

```bash
cd archblog-backend
./mvnw test
```

### 7. Verify the Build

Frontend:

```bash
cd archblog-frontend
npm run build
```

Backend:

```bash
cd archblog-backend
./mvnw package
```

### 8. Commit Your Changes

```bash
git add .
git commit -m "feat: describe your change"
```

### 9. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 10. Create a Pull Request

Open a pull request from your feature branch to the `main` branch of the ArchBlog repository.

## License

This project is available for learning, development, and personal use.
