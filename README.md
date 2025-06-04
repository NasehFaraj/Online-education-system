 
# Online Education System

# 📚 Project Overview

This is a simple and scalable Online Education System built with Node.js, TypeScript, MongoDB, and JWT for authentication. The system aims to provide a platform where users can register, log in, browse, and manage courses, quizzes, and educational content. The platform also supports features like user favorites, dynamic content management, and secure API endpoint

# 🚀 Tech Stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (JSON Web Tokens) for authentication

# ⚙️ Features

- Authentication: JWT-based authentication for secure login and registration

- Courses Management: Users can add, edit, delete, and view courses

- Quizzes: Interactive quizzes that allow users to take tests related to the courses

- Favorites: Users can save their favorite courses to access them later

- RESTful API: Clean and scalable API for backend interactions

- Modular Architecture: Well-organized code structure that supports easy maintenance and future updates


# 🛠️ Installation & Running Locally

1. Clone the repository:
   `bash
   git clone https://github.com/NasehFaraj/Online-education-system
   cd Online-education-system

2. Install dependencies:

npm install

3. Setup environment variables:

Create a .env file in the root directory and add the following:
## 🌱 Environment Variables

To run this project locally, create a .env file in the root directory and add the following environment variables:

`env
# Database
DATABASE_URL=your-mongodb-uri

# Email Service (Gmail SMTP or OAuth2)
EMAIL_SERVICE=Gmail
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password-or-oauth-password
MAIL_CLIENT_ID=your-client-id
MAIL_CLIENT_SECRET=your-client-secret
MAIL_REFRESH_TOKEN=your-refresh-token
MAIL_REDIRECT_URL=http://localhost/callback

# App
PORT=3000

# JWT
JWT_SECRET=your-jwt-secret
EXPIRESIN=300
ALGORITHM=HS256


4. Build the server:

npm run build


5. Run the development server:


node dist/app.js


Visit http://localhost:5000 to start interacting with the app.


## 🧪 API Testing

Use Postman or any REST client to test the API endpoints. All routes are defined in the /routes directory.


## 💼 Deployment

For deployment, you can use platforms like Render, Heroku, or Vercel. You can set up Continuous Integration (CI) to automatically deploy changes to your application.

## 🔨 Future Features

Add a recommendation engine for course suggestions

User role management (Admin, Student, etc.)

Enhanced analytics dashboard for instructors


---

👨‍💻 Author

Naseh Faraj
Backend Developer | GitHub: @NasehFaraj | Linkedin: https://linkedin.com/in/naseh-faraj-432b7b233