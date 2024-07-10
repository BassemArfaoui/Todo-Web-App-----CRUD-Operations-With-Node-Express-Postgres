# Todo List Web App

A simple Todo List web application that allows users to read, add, edit, and delete todos. This app demonstrates how to perform CRUD (Create, Read, Update, Delete) operations and handle errors using Express.js, Node.js, and PostgreSQL as a database.

## Features

- View all todos
- Add a new todo
- Edit an existing todo
- Delete a todo

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, Bootstrap, JavaScript

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BassemArfaoui/Todo-Web-App-----CRUD-Operations-With-Node-Express-Postgres.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Todo-Web-App-----CRUD-Operations-With-Node-Express-Postgres
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up PostgreSQL:
   - Create a database named `todolist`.
   - Build the database with the SQL file in the repository.
   - Fill the database info in the index.js file with the name of the database and the postgres password .

5. (Optional) Install `nodemon` globally to automatically restart the server on file changes:
   ```bash
   npm install -g nodemon
   ```

## Running the Project

1. Start the server:
   ```bash
   node index.js
   ```

2. If using `nodemon`, start the server with:
   ```bash
   nodemon index.js
   ```
3. Open your web browser and go to http://localhost:3000/ to test the web app.
   
