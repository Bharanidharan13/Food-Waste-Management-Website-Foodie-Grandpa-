# 🍱 Food Waste Management Website (Foodie Grandpa)

> A Full Stack MERN Web Application to reduce food waste and fight hunger through real-time food sharing.

## 🌍 Project Overview

With the increasing concern over food wastage and hunger, **Foodie Grandpa** bridges the gap between food donors (restaurants, individuals) and recipients (NGOs, shelters, or people in need) through a centralized, intuitive platform. 

This system allows users to donate or request food with live availability, secure authentication, and location-based visibility—promoting sustainability and reducing food insecurity.

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ **React JS**
- 💨 **Tailwind CSS**
- 🌐 **Axios** for API calls
- 🔄 **React Router DOM**

### Backend:
- 🟢 **Node.js**
- 🚂 **Express.js**
- 🔐 **JWT Authentication**
- 🔐 **Bcrypt** for password hashing

### Database:
- 🍃 **MongoDB**
- 🔧 **Mongoose ODM**

---

## 🔐 Features

- ✅ **User Authentication** (Login, Register with JWT)
- 🍽️ **Donate Food**: Add details (type, quantity, expiry, location)
- 🔍 **Find Food**: Browse live food listings based on availability
- 📦 **Request Food**: Send requests for available donations
- 🧾 **User Dashboard**: Manage your donation/request history
- 🗺️ **Future Scope**: Geolocation-based matching, real-time notifications, mobile app

---

## 🚀 How It Works

1. **Donors** post details of surplus food.
2. **Recipients** browse available food and request what they need.
3. **Dashboard** helps users manage their donations and requests.
4. **Admin Panel (future)** for verifying, tracking trends, and content moderation.

---

## 🧪 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/auth/register` | Register new user |
| POST   | `/auth/login` | User login |
| GET    | `/food` | Get all available food |
| POST   | `/food/donate` | Add new donation |
| POST   | `/food/request` | Request for food |
| GET    | `/user/donations` | User donation history |
| GET    | `/user/requests` | User request history |

---

## 📸 UI Snapshots

- 🏠 Home Page
- 🔐 Login / Sign Up
- 🎁 Donate Food Page
- 📥 Find Food / Receive Page
- 📊 Dashboard

(*Screenshots available in `Screenshots/` folder*)

---

## 🎯 Scope for Future Enhancement

- 📍 **Geolocation Matching** – Auto-match donor/receiver by proximity
- 📲 **Mobile App (React Native / Flutter)** – On-the-go donations and requests
- 📡 **Real-Time Alerts** – Notify nearby users about food availability
- 🧑‍💻 **Admin Dashboard** – Manage user activity and generate reports
- ⭐ **Feedback System** – Rate quality of received food

---

## 📚 References

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT](https://jwt.io/)

---

## 👨‍💻 Developed By

**Bharanidharan G**  
B.Tech Artificial Intelligence and Data Science  
Nandha Engineering College  
GitHub: [@Bharanidharan13](https://github.com/Bharanidharan13)

---

> _“Share food, spread happiness.” – Foodie Grandpa_

