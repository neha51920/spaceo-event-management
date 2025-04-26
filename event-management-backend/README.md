# Event Management System (Backend)

This is the backend for an Event Management System built with **Node.js**, **TypeScript**, **MongoDB (Mongoose)**, and **JWT Authentication**. It supports CRUD operations for events, user authentication, and paginated event listing with filtering and sorting.

## Tech Stack
- **Backend**: Node.js (TypeScript)
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer (multipart/form-data)

---

## Installation

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (local or Atlas)
- **Postman** or similar API testing tool

### Steps
1. Clone the repository:
```
   git clone <repo-url>
   cd <project-directory>
```
2. Install dependencies:
```
npm install
```
3. Create a .env file with:
```
PORT=5000
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
```
4.Start the server:
```
npm run dev
```
