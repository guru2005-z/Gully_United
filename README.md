# Gully United 🏏

Gully United is a full-stack Box Cricket Turf Booking & Management Platform designed for seamless slot reservation, live occupancy tracking, digital match passes, and turf management.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS (Neon theme & dark glassmorphic UI design)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: Java 21 / Spring Boot 3
- **Security**: Spring Security + JWT Authentication + BCrypt Password Hashing
- **Database**: Supabase PostgreSQL (via JPA / Hibernate)
- **Payment Gateway**: Razorpay Integration Ready

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Java 17/21
- Maven 3.9+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```
Runs at `http://localhost:8080/api/v1`.

---

## 🔒 Environment Variables

Make sure to configure `.env` files in both frontend and backend directories (refer to `.env.example` templates).

---

## 📄 License
MIT License
