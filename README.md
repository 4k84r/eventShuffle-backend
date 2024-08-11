# EventShuffle Backend

This backend is built with Node.js, Express, and MongoDB, providing RESTful API services for user authentication, event management, and voting functionalities.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Design Practices](#design-practices)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Authentication and Authorization](#authentication-and-authorization)
- [Controllers](#controllers)
- [Error Handling](#error-handling)
- [API Documentation](#api-documentation)
- [Future Improvements](#future-improvements)

---

## Project Overview

The backend of EventShuffle is responsible for handling user registration, login, event creation, voting, and more. It provides a secure API for the frontend to interact with, ensuring that only authenticated users can access certain features.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user data, events, and votes.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcrypt**: For hashing passwords securely.
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization.

## Design Practices

- **Microservices Architecture**: The backend is structured using microservices principles, allowing for scalability, maintainability, and easy deployment.
- **MVC Pattern**: The backend follows the Model-View-Controller pattern, which separates concerns and organizes the code logically.
- **JWT Authentication**: JSON Web Tokens are used for secure and stateless user authentication.
- **Error Handling Middleware**: Custom middleware is used to handle errors consistently across the application.

## Project Structure

```
backend/
│
├── src/
│ ├── controllers/ # Controllers for handling requests
│ ├── models/ # Mongoose models
│ ├── routes/ # Route definitions
│ ├── middleware/ # Custom middleware
│ ├── config/ # Configuration files
│ ├── app.ts # Express app setup
│ └── server.ts # Server initialization
│
├── tests/ # Test cases
├── package.json # Dependencies and scripts
└── README.md # Backend README
```

## Setup and Installation

### Installing Dependencies

To install the required dependencies, navigate to the root folder and run the below command.

```
npm install
```

Create and .env file with required values in it.

```
PORT=
MONGO_URI=
NODE_ENV=

```

Once the overall implementation is done, and to start the application run the below command.

```
npm run dev
```

## API Documentation

The swagger based API documentation in place and could be access using the authentication free route given below.

```
http://localhost:5000/api-docs/
```

## Database

MongoDB is used as the database for storing user details, events, and votes. Mongoose is used to interact with the MongoDB database using schemas and models.

## Authentication and Authorization

**JWT Authentication**: Users are authenticated using JSON Web Tokens (JWT). The token is generated upon successful login and is used to authorize access to protected routes.

## Controllers

- **authController.ts**: Handles user registration, login, and logout.
- **eventController.ts**: Manages CRUD operations for events and voting functionality.

## Error Handling

**Custom Error Middleware**: Handles and formats errors consistently across the application.

## API Documentation

### Base URL

`/api`

### Auth Routes

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and receive a JWT token.
- `POST /auth/logout`: Log out a user (client-side action).

### Event Routes

- `GET /events`: Retrieve all events.
- `POST /events`: Create a new event.
- `GET /events/:id`: Retrieve details of a specific event.
- `POST /events/:id/vote`: Vote on a specific event date.
