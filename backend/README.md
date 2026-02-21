# FleetFlow Backend

FleetFlow is a production-level Fleet & Logistics Management System built using the PERN stack (PostgreSQL, Express, React, Node).

## Folder Structure

```
backend/
├── prisma/                # Prisma ORM configuration
│   └── schema.prisma      # Database schema
├── src/
│   ├── config/            # Configuration files (e.g., database, environment)
│   │   └── prisma.js      # Prisma client setup
│   ├── controllers/       # API controllers
│   │   ├── auth.controller.js
│   │   ├── vehicle.controller.js
│   │   ├── driver.controller.js
│   │   ├── trip.controller.js
│   │   ├── maintenance.controller.js
│   │   └── analytics.controller.js
│   ├── middleware/        # Middleware for authentication, error handling, etc.
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   ├── models/            # Database models (if not using Prisma directly)
│   ├── routes/            # API routes
│   │   ├── auth.routes.js
│   │   ├── vehicle.routes.js
│   │   ├── driver.routes.js
│   │   ├── trip.routes.js
│   │   ├── maintenance.routes.js
│   │   └── analytics.routes.js
│   ├── services/          # Business logic layer
│   │   ├── auth.service.js
│   │   ├── vehicle.service.js
│   │   ├── driver.service.js
│   │   ├── trip.service.js
│   │   ├── maintenance.service.js
│   │   └── analytics.service.js
│   ├── utils/             # Utility functions
│   │   ├── asyncHandler.js
│   │   └── validation.js
│   └── app.js             # Express app setup
├── .env                   # Environment variables
├── package.json           # Node.js dependencies
└── server.js              # Entry point
```

## Features
- JWT Authentication with bcrypt password hashing
- Role-Based Access Control (Manager, Dispatcher, Safety, Finance)
- Vehicle Management (CRUD)
- Driver Management
- Trip Dispatcher Module
- Maintenance Logs
- Fuel Logs
- Analytics APIs

## Technical Requirements
- Clean modular folder structure
- MVC or service-layer architecture
- PostgreSQL relational schema
- Foreign key relationships
- ENUM types for status fields
- Proper error middleware
- Async/await only
- Transaction handling where required
- Input validation
- Production-ready code