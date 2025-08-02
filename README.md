# 📚 Online Education System

A scalable **RESTful API** built with **TypeScript**, **Node.js**, **Express.js**, and **MongoDB**. It provides a robust backend for managing courses, quizzes, user authentication, and favorite lists. JWT is used for authentication and role-based access control.

---

## 🚀 Features

- **User Authentication** with JWT (Login & Register)
- **Course Management**: Create, edit, delete, and view educational courses
- **Quiz System**: Attach quizzes to courses and allow users to take them
- **Favorites**: Save and retrieve favorite courses per user
- **Modular Structure**: Organized codebase with controllers, services, models, and routes
- **Scalable Setup** with clear separation of concerns and environment variables

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, OAuth2
- **Email Service**: Nodemailer with Gmail OAuth2
- **Environment**: Configurable via `.env` file

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NasehFaraj/Online-education-system
   cd Online-education-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root with the following content:
   ```env
   DATABASE_URL=your_mongodb_uri
   EMAIL_SERVICE=Gmail
   MAIL_USERNAME=your_email
   MAIL_PASSWORD=your_password_or_app_token
   MAIL_CLIENT_ID=your_client_id
   MAIL_CLIENT_SECRET=your_client_secret
   MAIL_REFRESH_TOKEN=your_refresh_token
   MAIL_REDIRECT_URL=http://localhost/callback
   PORT=3000
   JWT_SECRET=your_jwt_secret
   EXPIRESIN=300
   ALGORITHM=HS256
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   node dist/app.js
   ```

6. **Explore the API**
   Visit `http://localhost:3000` using Postman or any API client.

---

## 🧪 Testing

You can test all routes using:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- Any REST client of your choice

---

## 📁 Project Structure

```
src/
├── config/
├── controllers/
├── enums/
├── interface/
├── middleware/
├── models/
├── routes/
├── services/
└── app.ts
```

---

## 👨‍💻 Author

**Naseh Faraj**  
Backend Developer | Full-stack Enthusiast  
- GitHub: [@NasehFaraj](https://github.com/NasehFaraj)  
- LinkedIn: [linkedin.com/in/naseh-faraj-432b7b233](https://linkedin.com/in/naseh-faraj-432b7b233)  
- Telegram: [@NasehFaraj](https://t.me/NasehFaraj)



