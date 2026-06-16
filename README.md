# CipherVault – Secure Text Encryption & Analysis Platform

**CipherVault** is a production-ready, feature-rich SaaS-style web application designed to allow users to encrypt, decrypt, analyze, and manage texts securely. Implementing a robust MERN Stack (MongoDB, Express, React, Node) architecture, the platform features a responsive glassmomorphic UI design, interactive Chart.js frequency histograms, secure JWT-based authentication, and transaction logging.

This project is built to standard specifications, serving as a professional placement, internship, and showcase-grade portfolio piece.

---

## 🚀 Key Features

* **Classical Cryptography Workshop**:
  * **Caesar Cipher**: Custom shift key offsets (0-25) with uppercase, lowercase, and special character isolation.
  * **ROT13 Cipher**: Classic symmetric 13-character rotation shift.
  * **Reverse Cipher**: Full text stream reversal.
* **Character Frequency Analysis**:
  * Case-insensitive density maps counting alphanumeric characters.
  * High-performance visual histograms using Chart.js.
  * Identification of most frequent characters and density percentage lists.
* **Secure History Log & Auditing**:
  * Local DB records capturing: Date/Time, Algorithm, Action, Key, original text, and ciphertext result.
  * Text searches and categorical filters based on algorithm types.
  * PDF report exports utilizing `jsPDF` autoTable layout formats.
  * Pure text `.txt` dump downloads.
* **Theme Preferences**:
  * Synced Light Mode & Dark Mode layouts with glassmorphic cards.
* **Session Integrity & Account Deletion**:
  * JWT-auth protected endpoints and front-end route guards.
  * Secure passwords hashed with `bcryptjs`.
  * Safe account purge erasing user details and associated transaction logs.

---

## 🛠️ Technology Stack

* **Frontend**:
  * React.js (Vite)
  * Tailwind CSS
  * React Router DOM v6
  * Axios (with global session interceptors)
  * Framer Motion (for dynamic page entries and sidebar slides)
  * Chart.js & React-Chartjs-2
  * React Hot Toast (modern alert feedback)
  * jsPDF & jsPDF-AutoTable
* **Backend**:
  * Node.js & Express.js
  * JWT (jsonwebtoken)
  * bcryptjs
  * Mongoose & MongoDB Atlas
  * Morgan (server logger)

---

## 📂 Project Structure

```text
newprojecteduskill/
├── server/                    # Backend Source Files
│   ├── config/                # DB Connections config
│   │   └── db.js
│   ├── controllers/           # MVC Controller handlers
│   │   ├── authController.js
│   │   ├── encryptionController.js
│   │   ├── analysisController.js
│   │   └── historyController.js
│   ├── middleware/            # JWT Auth & Global Error Handlers
│   │   ├── auth.js
│   │   └── error.js
│   ├── models/                # Mongoose Database Schemas
│   │   ├── User.js
│   │   └── EncryptionHistory.js
│   ├── routes/                # API router configuration mapping
│   │   ├── authRoutes.js
│   │   ├── encryptionRoutes.js
│   │   ├── analysisRoutes.js
│   │   └── historyRoutes.js
│   ├── utils/                 # Cryptography algorithms
│   │   └── ciphers.js
│   ├── app.js                 # Express server configuration
│   ├── server.js              # Entrypoint server script
│   └── .env                   # Environment configurations
│
├── src/                       # Frontend React Source Files
│   ├── assets/                # App asset attachments
│   ├── components/            # Reusable UI components
│   │   ├── ProtectedRoute.jsx
│   │   ├── StatCard.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/               # Auth and Theme state providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── layouts/               # Responsive dashboard layout
│   │   └── DashboardLayout.jsx
│   ├── pages/                 # Full dashboard pages
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CipherPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── SettingsPage.jsx
│   ├── routes/                # Client side navigation routes
│   │   └── AppRoutes.jsx
│   ├── services/              # Axios instance configuration
│   │   └── api.js
│   ├── App.jsx                # Layout contexts injection wrapper
│   ├── index.css              # Custom Tailwind directives & glass styles
│   └── main.jsx               # React DOM bootstrap mounting
│
├── package.json               # Root config for Vite & dependencies
├── vite.config.js             # Vite configuration with API Proxy setup
├── tailwind.config.js         # Custom theme configuration
├── postcss.config.js          # PostCSS processing config
└── index.html                 # Index markup with Google Fonts imports
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `/server` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ciphervault?retryWrites=true&w=majority
JWT_SECRET=cipher_vault_super_secure_jwt_secret_key_13579
NODE_ENV=development
```

---

## 🏃 Step-by-Step Local Setup Guide

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) and [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on your system.

### 2. Clone and Setup Dependencies
First, open your terminal inside the project directory:

```bash
# Install root (Frontend Client) dependencies
npm install

# Navigate to server folder and install Backend dependencies
cd server
npm install
```

### 3. Run the Development Servers
Open two terminal instances to run both servers concurrently:

#### Terminal 1 (Run Backend Express Server)
```bash
cd server
npm run dev
# The backend will start on http://localhost:5000
```

#### Terminal 2 (Run Frontend Vite React Server)
```bash
# Run from the workspace root directory
npm run dev
# The frontend will start on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with CipherVault.

---

## 🛰️ Backend API Endpoints

### Authentication
* `POST /api/auth/register` - Create user session
* `POST /api/auth/login` - Verify user credentials and fetch token
* `GET /api/auth/profile` - Retrieve active profile metadata & statistics (Protected)
* `PUT /api/auth/profile` - Update profile details / Change password (Protected)
* `DELETE /api/auth/profile` - Permanently purge account and history logs (Protected)

### Encryption
* `POST /api/encrypt/caesar` - Encrypt text with Caesar shift key (Protected)
* `POST /api/decrypt/caesar` - Decrypt text with Caesar shift key (Protected)
* `POST /api/encrypt/rot13` - Encrypt text using ROT13 shift (Protected)
* `POST /api/decrypt/rot13` - Decrypt text using ROT13 shift (Protected)
* `POST /api/encrypt/reverse` - Encrypt text by reversing stream (Protected)
* `POST /api/decrypt/reverse` - Decrypt text by reversing stream (Protected)

### Letter Frequency Analysis
* `POST /api/analysis/frequency` - Generate alphanumeric counts and percentages (Protected)

### History Management
* `GET /api/history` - Retrieve audit logs (supports optional search and category filters) (Protected)
* `POST /api/history` - Manually post record entries (Protected)
* `DELETE /api/history/:id` - Erase individual transaction record from vault logs (Protected)

---

## 🌐 Production Deployment Guide

### 1. Database Setup (MongoDB Atlas)
1. Register/Login on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster.
3. Under Database Access, create a user with read/write access.
4. Under Network Access, whitelist `0.0.0.0/empty` (all IPs) to accept requests from Render.
5. Copy the connection string and replace the database username and password in your server `.env` configuration.

### 2. Backend Hosting (Render)
1. Create a free account on [Render](https://render.com/).
2. Click **New +** > **Web Service**.
3. Link your Github Repository.
4. Set the following fields:
   * **Root Directory**: `server`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
5. In **Environment Variables**, add:
   * `PORT` = `5000`
   * `MONGO_URI` = `YOUR_MONGODB_ATLAS_CONNECTION_STRING`
   * `JWT_SECRET` = `YOUR_SECRET_KEY`
   * `NODE_ENV` = `production`
6. Deploy the service. Take note of the backend URL (e.g. `https://ciphervault-api.onrender.com`).

### 3. Frontend Hosting (Vercel)
1. Create an account on [Vercel](https://vercel.com/).
2. Click **Add New** > **Project** and connect your repository.
3. In configuration settings:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Set up request proxying for production. Since Vercel hosts static files, create a `vercel.json` file in the root of the project to route `/api` requests to Render:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-render-backend-url.onrender.com/api/:path*"
    },
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```
5. Click **Deploy**. Your SaaS is online!
#   t e x t - e n c r y p t - d e c r y p t  
 