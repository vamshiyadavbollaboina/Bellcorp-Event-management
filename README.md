# Bellcorp Event Management System (MERN)

Developed by **Bollaboina Vamshi Yadav**, this is a full-stack MERN application designed for seamless event discovery and secure registration management.



## 🚀 Key Features

### **User Interface & Experience**
* **Dynamic Search:** Real-time event filtering by name and category (Tech, Workshop, Health, etc.).
* **Event Details:** Brief descriptions, location, date, and live seat availability for every event.
* **Management Dashboard:** A personalized hub to track "Upcoming" and "Past" registrations.
* **Interactive Alerts:** Comprehensive browser alerts for successful actions and validation errors.

### **Security & Validation Logic**
* **Guest Protection:** Alerts users to "Please login first" if they try to register while logged out.
* **JWT Auth:** Secure session management using JSON Web Tokens.
* **Smart Validation:** Alerts for "User already exists," "Invalid Credentials," "Already registered," and "Event is full."
* **Confirmation Guard:** "Are you sure?" prompts before deleting a registration to prevent accidental cancellations.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Context API, Axios, React Router.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Mongoose ODM).
* **Testing:** Postman API Suite.

---

## 📂 Architecture Overview

### **Backend (`/server`)**
* `server.js`: Server configuration and MongoDB connection.
* `Models/`: 
    * `User.js`: Schema for account credentials.
    * `Event.js`: Schema for event metadata and capacity.
    * `Registration.js`: Junction model linking Users to Events.
* `middleware/protect.js`: Custom JWT verification middleware.
* `routes/`: API endpoints for Auth, Events, and Registrations.



### **Frontend (`/client`)**
* `context/AuthContext.js`: Global state management for user sessions.
* `components/ProtectedRoute.js`: Higher-Order Component to guard private routes.
* `pages/`: 
    * `Home`: Event discovery with debounce search.
    * `EventDetails`: Briefing and registration logic.
    * `Dashboard`: Management hub for user events.



---

## 🧪 API Testing (Postman)

The system was verified using a 5-level testing strategy:
1.  **Auth Testing:** Verified Login/Register flows and JWT generation.
2.  **Contract Testing:** Ensured JSON responses match frontend requirements.
3.  **Integration Testing:** Tested the complete flow: `Login -> Auth Token -> Event Registration`.
4.  **Security Testing:** Confirmed `401 Unauthorized` responses when tokens are missing.
5.  **Performance Testing:** Used Postman Collection Runner to ensure stability under load.



---

## ⚙️ How to Run

1.  **Backend:**
    * Navigate to `/server` -> `npm install`.
    * Create `.env` (PORT, MONGO_URI, JWT_SECRET).
    * `npm start`.

2.  **Frontend:**
    * Navigate to `/client` -> `npm install`.
    * Create `.env` (REACT_APP_API_URL).
    * `npm start`.

---

## 👤 Author
**Bollaboina Vamshi Yadav** MERN Stack Developer

---
