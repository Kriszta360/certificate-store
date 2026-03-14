# Certificate Store – Application Development Project

## Project Overview

The **Certificate Store** is a full-stack web application developed as part of a university **Application Development** course.

The purpose of the application is to manage certificates through a web interface.
Users can create, edit, delete, and view certificates stored in a database.

The system follows a **client–server architecture**, where the frontend communicates with a backend API that handles data processing and database operations.

---

# System Architecture

The application consists of three main components:

### Frontend

The frontend is developed using **Angular** and provides the user interface for interacting with the system.

Main responsibilities:

* displaying stored certificates
* creating new certificates
* editing existing certificates
* deleting certificates

---

### Backend

The backend is implemented as an **ASP.NET Core Web API**.

Main responsibilities:

* providing REST API endpoints
* handling business logic
* communicating with the database

---

### Database

The application uses **MongoDB** as the database system to store certificate data.

---

# Technologies Used

### Frontend

* Angular
* TypeScript
* Node.js
* HTML / CSS

### Backend

* ASP.NET Core Web API
* C#

### Database

* MongoDB

### Development Tools

* Docker
* Docker Compose
* Git
* GitHub

---

# Project Structure

```
certificate-store
│
├── backend
│   └── certificate-api
│
├── certificate-frontend
│
├── .github
│   └── workflows
│
├── docker-compose.yml
├── certificate-store.sln
└── README.md
```

---

# Running the Application

The application can be started using Docker.

Run the following command in the project root directory:

```
docker-compose up --build
```

This will start:

* the Angular frontend
* the ASP.NET backend API
* the MongoDB database

---

# Main Features

The application provides the following functionality:

* list stored certificates
* add new certificates
* edit certificate information
* delete certificates

---

# Author

Krisztina Szécsényi
Nándor Polyák

Engineering Informatics
University Project – Application Development Course
