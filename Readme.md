# 🚗 QR Navigated Parking System

## 📌 Overview

A smart parking management system built using the MERN stack that enables users to enter and exit parking areas using QR codes. The system follows a **metro-style flow**, where users can park first and pay later at exit based on the time spent.

Designed with **low infrastructure dependency**, this system eliminates the need for expensive hardware like RFID or sensors.

---

## 🚀 Features

### 🔹 User Flow

- 📲 QR-based entry system
- 🚗 Automatic slot allocation (no manual selection)
- ⛔ Real-time parking availability check
- 💳 Pay-on-exit billing system
- 📧 Email capture for user reference
- 🔐 Duplicate entry prevention (same car cannot enter twice)

---

### 🔹 Exit Flow (Metro-Style)

- Scan QR at exit
- Fetch active parking session
- Calculate parking fee dynamically
- Complete payment (cash/manual for now)
- Exit validation before leaving

---

### 🔹 Smart Billing Logic

- First **15 minutes FREE**
- After that: **₹10 per 30 minutes**
- Uses **ceil logic** (rounds up to next block)

---

### 🔹 System Design Highlights

- ⚡ Atomic slot allocation (prevents double booking)
- 🆔 Unique session tracking using UUID
- 📦 Modular backend architecture (scalable)
- 🔄 Separation of concerns (services, controllers, routes)

---

## 🧠 How It Works

### 🚪 Entry Flow

1. User scans QR at parking entrance
2. System checks availability
3. User confirms entry
4. Slot is auto-assigned
5. Parking session starts

---

### 🚗 Exit Flow

1. User scans QR at exit
2. Enters car number + phone
3. System fetches active session
4. Displays duration & amount
5. Payment is completed
6. Exit is validated and slot is freed

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Architecture:** Modular (Service-based)
- **ID System:** UUID for session tracking
- **API Testing:** Postman

---

## 📂 Project Structure

```
server/
│
├── src/
│   ├── config/              # Database connection
│   ├── models/              # Slot model
│   ├── modules/
│   │   └── parking/         # Parking feature module
│   │       ├── controller
│   │       ├── service
│   │       ├── routes
│   │       └── model
│   ├── utils/               # Helpers (ID, billing)
│   ├── middlewares/
│   ├── seed/                # Seeder scripts
│   ├── app.js
│   └── server.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd server
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### 4. Seed Parking Slots

```bash
node src/seed/seedSlots.js
```

---

### 5. Run the Server

```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔹 Availability

```
GET /api/parking/availability
```

### 🔹 Entry

```
POST /api/parking/entry
```

### 🔹 Find Active Session

```
POST /api/parking/find
```

### 🔹 Payment (Planned / Optional)

```
POST /api/parking/payment
```

### 🔹 Exit

```
POST /api/parking/exit
```

---

## 🧠 Key Design Decisions

- Used **UUID for sessionId** to avoid collisions and ensure security
- Used **atomic database operations** to prevent multiple users getting same slot
- Separated **payment and exit logic** for flexibility and scalability
- Chose **QR-based system** to eliminate hardware dependency

---

## 🔮 Future Enhancements

- 💳 Online payment integration (Stripe/Razorpay)
- 📊 Admin dashboard with analytics
- 📍 Parking navigation with maps
- 📱 PWA / mobile optimization
- 🔔 Notifications (Email/SMS)

---

## 🎯 Project Goal

To build a **real-world, scalable parking system** that can be deployed in:

- Apartments
- Small malls
- Offices
- Colleges

without requiring expensive infrastructure.

---

## 🤝 Contribution

Contributions, ideas, and improvements are welcome!

---

## 📄 License

This project is open-source and available under the MIT License.
