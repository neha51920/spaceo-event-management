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

### API endpoints
**POST /auth/signup**
```
{
  "name": "yourname",
  "email": "youremail@example.com",
  "password": "yourpassword"
}
```

**POST /auth/login**
```
{
  "email": "youremail@example.com",
  "password": "yourpassword"
}
```

**GET /events/**
- Query Parameters<br />
  limit (optional): Number of events per page<br />
  skip (optional): Number of events to skip<br />
  sort (optional): Sort by startDate, name<br />
  filter (optional): Filter by event name, startDate range, category <br />

**POST /events/**<br />
form-data<br />
```
name: My Event
description: An awesome event!
startDate: 2025-05-01T00:00:00Z
endDate: 2025-05-02T00:00:00Z
location: New York
totalGuests: 50
category: Music
images: Choose a file from your computer (multipart upload).
```

**GET /events/:id** - Get specific event<br />
**PUT /events/:id** - Update specific event<br />
**DELETE /events/:id** - delete specific event<br />
