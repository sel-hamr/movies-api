# Movies API

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [Configuring](#configuring)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

A simple movies API built with Node.js, Express, and MongoDB. The API allows users to add, update, delete, likes and retrieve comment movies. It also includes user authentication and authorization, input validation, and error handling.

## Features

- Add, update, delete, and retrieve movies.
- User authentication and authorization.
- Input validation and error handling.
- User can add favorite movies.
- User can retrieve movies who have favorite by user.
- User can add comment to movie.
- User can retrieve comment by movie.
- User can like comment.
- User can retrieve comment who have like by user.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sel-hamr/movies-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd movies-api
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the necessary environment variables. For example:

   ```plaintext
    PORT=port
    MONGO_URI={port_MONGO}
    SALT_ROUNDS={salt}
    JWT_SECRET={secret}
    JWT_EXPIRES_IN={time}
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Endpoints

- GET api/movies - Retrieve all movies
- GET api/movies/favorite - Retrieve a movies who have favorite by user
- GET api/movies/:id - Retrieve a movie by ID
- POST api/movies/favorite/:id - add favorite movie by user
- POST api/auth/create-user - Create a new user
- POST api/auth/login - Authenticate a user
- POST api/comments/:id - Add comment to movie
- POST api/comments/like/:id - Like comment
- POST api/comments/dislike/:id - Dislike comment
- PUT api/comments/:id - Update comment
- DELETE api/comments/:id - Delete comment

## Configuring

- Update the database connection string in `./lib/db.js` to point to your MongoDB instance.
- Modify the routes as per your application's requirements.

## Contributing

We welcome contributions to improve movies api! To contribute, follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact:

- **Name:** Soufiane Elhamri
- **Email:** selhamr9@gmail.com
- **GitHub:** [sel-hamr](https://github.com/sel-hamr)
