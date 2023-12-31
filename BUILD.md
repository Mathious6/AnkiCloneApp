# Build instructions for the [@AnkiCloneApp](https://github.com/Mathious6/AnkiCloneApp) project

## 📚 Table Of Contents

- [Introduction](#-introduction)
- [Prerequisites](#-prerequisites)
- [Clone the repository](#-clone-the-repository)
- [Backend configuration (Node.js)](#-backend-configuration)
- [Frontend configuration (Angular)](#-frontend-configuration)
- [Database configuration (PostgreSQL)](#-database-configuration)
- [Configuration of the environment variables](#-configuration-of-the-environment-variables)
- [Start the application](#-start-the-application)
- [Contact](#-contact)

***

## 📖 Introduction

This project is a clone of the [Anki](https://apps.ankiweb.net/) application.
It is a flashcard application that uses a spaced repetition algorithm to determine when a card should be shown again.
The application is divided into two parts: the frontend and the backend.
The frontend is developed with [Angular](https://angular.io/) and the backend with [Node.js](https://nodejs.org/en/).
The database used is [PostgreSQL](https://www.postgresql.org/).

The goal of the `BUILD.md` file is to explain how to build the project and run it locally.

## 📋 Prerequisites

Before you start working on the project, make sure you have all the required software installed on your system.
The following instructions will help you verify the installation and, if needed, guide you through the process of installing the prerequisites.

### Node.js and npm (Node Package Manager)

Node.js is a runtime environment that allows you to run JavaScript on the server side. npm is the Node.js package manager, and it's used to install libraries and tools needed for our project.

To check if you have Node.js installed, run the following command in your terminal:

```bash
node --version
```

You should see the version number of Node.js if it's installed. For our project, ensure you have Node.js version **20.x.x** or higher.
If you get an error, you need to install Node.js. You can download it from the [official website](https://nodejs.org/en/).

To check if you have npm installed, run the following command in your terminal:

```bash
npm --version
```

Similar to Node.js, you should see the version number of npm if it's installed. For our project, ensure you have npm version **10.x.x** or higher.
If you get an error, you need to install npm. You can download it from the [official website](https://www.npmjs.com/get-npm).

### Angular CLI

Angular CLI is a command-line interface for Angular. It allows you to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

To check if you have Angular CLI installed, run the following command in your terminal:

```bash
ng version
```

If Angular CLI is installed, you should see the version number. If you need to install it, run the following command in your terminal:

```bash
sudo npm install -g @angular/cli
```

## 📂 Clone the repository

This will create a copy of the project on your local machine, in the current directory.
Choose a directory where you want to clone the project with the `cd` command and run the following command:

```bash
git clone https://github.com/Mathious6/AnkiCloneApp.git
```

The project is composed of two parts: the frontend and the backend.
For the next steps, you will have to stay in the root directory of the project.

## 📡 Backend configuration

The backend is developed with Node.js and uses the Express framework.
It uses several libraries and tools that need to be installed.
To install them, run the following command in your terminal:

```bash
npm install --prefix backend
```

## 🖥 Frontend configuration

The frontend is developed with Angular.
It uses several libraries and tools that need to be installed.
To install them, run the following command in your terminal:

```bash
npm install --prefix frontend
```

## 🗄 Database configuration

The database used is PostgreSQL. To simplify the configuration, we decided to host the database on a private server.
You will see in the next section how to configure the environment variables to connect to the database.

If you want to host the database on your local machine, you can follow the instructions below.

1. Install PostgreSQL on your machine. You can download it from the [official website](https://www.postgresql.org/download/).
2. Create a new database with the name of your choice.
3. Create a new user with the name of your choice and give it a password and the necessary permissions to access the database.

## 📝 Configuration of the environment variables

The application uses environment variables to store sensitive information such as the database connection information.
To configure the environment variables, you need to create a `.env` file in `backend/` and fill it with the information given by the project manager.

```env
PORT=3000

DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=...
```

## 🚀 Start the application

To start the application, you need to run the backend and the frontend.

### Backend

To start the backend, run the following command in your terminal:

```bash
npm start --prefix backend
```

If you want to seed the database with some data, you can run the following command in your terminal.
But be careful, this will delete all the data in the database and replace it with the data in the seed file.

```bash
npm run --prefix backend -- --seed
```

### Frontend

To start the frontend, run the following command in your terminal:

```bash
ng serve --prefix frontend
```

After starting the frontend and the backend, you can access the application at the following address: [http://localhost:4200](http://localhost:4200) and test the backend on the Swagger UI at the following address: [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## 📧 Contact

If you have any questions, you can contact the project manager directly by GitHub or open an issue on the project repository.