# 🚀 Zaroorathai E-commerce Backend

Welcome to the powerhouse behind Zaroorathai - the backend that keeps our e-commerce platform running smoothly! 🛍️🥕🍎

## 🌟 Features

- 🔐 Robust user authentication (local, JWT, and Google OAuth)
- 📦 Comprehensive product management
- 🛒 Efficient order processing
- 💳 Secure payment integration with Stripe
- 👑 Advanced admin panel functionalities
- 🔒 Data protection and user privacy

## 🛠️ Tech Stack

- 🟢 Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine
- 🚂 Express - Fast, unopinionated, minimalist web framework for Node.js
- 🍃 MongoDB - The application data platform for NoSQL databases
- 🔑 Passport - Simple, unobtrusive authentication for Node.js
- 💰 Stripe - Online payment processing for internet businesses
- 🔁 Nodemon - Utility that monitors for any changes in your source and automatically restarts your server

## 🚀 Getting Started

1. **Clone the repo**
   ```
   git clone https://github.com/chhavi6V/ZaroortHai-Backend.git
   ```
2. **Install dependencies**
   ```
   cd zaroorathai-backend
    npm install
   ```
3. **Set up environment variables**
    Create a `.env` file in the root directory:
   ```
    PORT=5000
    MONGODB_URL=your_mongodb_connection_string
    SECRET_KEY=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    STRIPE_KEY=your_stripe_secret_key
    END_POINT_SECRET=your_end_point_secret
    CORS_ORIGIN=your_frontend_url
    SESSION_KEY=your_session_key
   ```
4. **Start the server**
   ```
   npm run dev
   ```
The server will start running on [http://localhost:8080](http://localhost:8080)

## 📜 Available Scripts

- 🏭 `npm start` - Starts the server
- 🔧 `npm run dev` - Starts the server with nodemon for development
