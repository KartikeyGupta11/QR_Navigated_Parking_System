# 🚗 SPARK Navigated Parking System

## 🌐 Live Demo

🔗 https://qr-navigated-parking-system-l565cefln.vercel.app/

---

## 📌 Overview

A **full-stack smart parking management system** built using the MERN stack that allows users to enter and exit parking areas using QR codes.

The system follows a **metro-style flow**:
👉 Park first → Pay later → Exit smoothly

Designed with **low infrastructure dependency**, eliminating the need for RFID cards or physical sensors.

---

## 🚀 Features

### 🔹 Core Functionality

- 📲 QR-based Entry & Exit system
- 🚗 Automatic slot allocation (no manual selection)
- ⛔ Real-time parking availability check
- 💳 Pay-on-exit billing system
- 🔐 Duplicate entry prevention
- 📧 Optional email capture

---

### 🔹 Smart Billing Logic

- First **15 minutes FREE**
- After that: **₹10 per 30 minutes**
- Uses **ceil logic** (rounded billing blocks)

---

### 🔹 System Design Highlights

- ⚡ Atomic slot allocation (prevents double booking)
- 🆔 Unique session tracking (UUID)
- 📦 Modular backend architecture
- 🔄 Clean separation (controllers, services, routes)
- 🌍 Fully deployed (Frontend + Backend)

---

## 🧠 How It Works

### 🚪 Entry Flow

1. User scans Entry QR
2. Redirected to Entry page
3. Enters car details
4. Slot auto-assigned
5. Session starts

---

### 🚗 Exit Flow

1. User scans Exit QR
2. Enters details
3. System fetches active session
4. Displays amount
5. Payment completed
6. Slot released

---

## 🖼️ Screenshots

> _(Add screenshots here)_

- Home (QR screen)
- Entry page
- Exit page
- Payment flow

---

## 🛠 Tech Stack

### 🔹 Frontend

- React (Vite)
- Tailwind CSS
- Axios

### 🔹 Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 📂 Project Structure

```
QR_Navigated_Parking_System/
│
├── Backend/
│   ├── modules/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── layouts/
│   └── index.html
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone <your-repo-url>
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongo_uri
FRONTEND_URL=http://localhost:5173
```

Run:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint                         | Description             |
| ------ | -------------------------------- | ----------------------- |
| GET    | /api/parking/check-availability  | Check slot availability |
| POST   | /api/parking/entry               | Create entry session    |
| POST   | /api/parking/find-active-session | Find active session     |
| POST   | /api/parking/make-payment        | Complete payment        |
| POST   | /api/parking/exit                | Exit parking            |

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: Render

---

## 🧠 Key Design Decisions

- Used UUID for secure session tracking
- Atomic DB operations to avoid race conditions
- Separated payment & exit logic
- QR-based flow for low-cost deployment

---

## 🔮 Future Enhancements

- 📩 Email notifications (Entry + Receipt)
- 💳 Payment gateway integration
- 📊 Admin dashboard
- 📱 Mobile optimization
- 📍 Smart navigation

---

## 🎯 Goal

To build a **real-world deployable parking solution** usable in:

- Apartments
- Offices
- Colleges
- Small malls

---

## 📄 License

MIT License
