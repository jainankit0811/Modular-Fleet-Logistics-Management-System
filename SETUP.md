# FleetFlow - Docker Setup Guide

Welcome to the FleetFlow project! This guide will help you get the entire application (Frontend, Backend, and Database) running using Docker.

## 🛠 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Modular-Fleet-Logistics-Management-System
```

### 2. Environment Variables
The `docker-compose.yml` comes with default values suited for local development. However, you can create a `.env` file in the root directory if you wish to override them:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_DB=fleetflow
JWT_SECRET=your_jwt_secret
```

### 3. Build and Run
Start the entire stack with a single command:

```bash
docker-compose up --build
```

### 4. Database Setup (Prisma)
Once the containers are running, you need to sync the database schema and seed the initial data.

Run the following command to sync the schema:
```bash
docker exec -it fleetflow_backend npx prisma db push
```

Then, seed the database with the admin account:
```bash
docker exec -it fleetflow_backend node seed.js
```

## 🌐 Accessing the App

- **Frontend**: [http://localhost](http://localhost) (Port 80)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)

### 🔑 Initial Login
- **Email**: `admin@fleet.com`
- **Password**: `password123`

## 🐳 Useful Docker Commands

- **Stop the app**: `docker-compose down`
- **View logs**: `docker-compose logs -f`
- **Restart a specific service**: `docker-compose restart backend`
- **Remove volumes (reset DB)**: `docker-compose down -v`

---

Happy coding! 🚛💨
