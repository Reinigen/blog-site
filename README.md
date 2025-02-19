# Blog Site

A full-stack blog application built with Express.js, MongoDB and React, providing users with the ability to create, read, update, and delete blog posts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Create, read, update, and delete blog posts
- Comment on posts
- Responsive design for various devices

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Reinigen/blog-site.git
   cd blog-site
   ```

2. **Navigate to the server directory:**

   ```bash
   cd server
   ```

3. **Install server dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following content:

   ```env
   MONGODB_STRING=your_mongodb_connection_string
   PORT=5000
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

5. **Start the server:**

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

## Usage

Once the server is running, you can interact with the API using tools like [Postman](https://www.postman.com/) or through a frontend application. The available endpoints are described below.

## API Endpoints

### Posts

- **Get all posts**

  ```http
  GET /posts
  ```

- **Get a single post by ID**

  ```http
  GET /posts/:id
  ```

- **Create a new post**

  ```http
  POST /posts
  ```

  - Requires authentication
  - Request body should include `title` and `content`

- **Update a post by ID**

  ```http
  PUT /posts/:id
  ```

  - Requires authentication
  - Request body can include `title` and/or `content`

- **Delete a post by ID**

  ```http
  DELETE /posts/:id
  ```

  - Requires authentication

### Comments

- **Get comments for a post**

  ```http
  GET /posts/:id/comments
  ```

- **Add a comment to a post**

  ```http
  POST /posts/:id/comments
  ```

  - Requires authentication
  - Request body should include `text`

## Environment Variables

The application relies on the following environment variables:

- `MONGODB_STRING`: Your MongoDB connection string
- `PORT`: The port on which the server runs (default is 5000)

Ensure these are set in your `.env` file in the `server` directory.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
