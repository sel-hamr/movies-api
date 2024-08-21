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

A simple movies API built with Node.js, Express, and MongoDB. The API allows users to add, update, delete, likes and retrieve comment movies. It also includes user authentication and authorization, input validation, and error handling. The API is secured using JWT tokens and includes middleware to restrict access to certain routes.
and also user can add favorite movies and retrieve movies who have favorite by user.
and user can add comment to movie and retrieve comment by movie and like comment and retrieve comment who have like by user. and user can dislike comment. and user can send friend request and retrieve friend request and accept friend request and retrieve friend and retrieve friend request by user. and send a message in real time and retrieve message by user and retrieve message by friend. and user can retrieve all message by user and friend. and user have notification when he receive a message or friend request. and user can retrieve all notification by user. and user can delete friend by user. and user can delete message by user. and user can delete friend request by user. and user can retrieve all friend by user. and user can retrieve all message by user. and user can retrieve all friend request

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
- User can dislike comment.
- User can send friend request.
- User can retrieve friend request.
- User can accept friend request.
- User can retrieve friend.
- User can retrieve friend request by user.
- User can send a message in real time.
- User can retrieve message by user.
- User can retrieve all message by user and friend.
- User have notification when he receive a message or friend request.
- User can retrieve all notification by user.
- User can delete friend by user.
- User can delete message by user.
- User can delete friend request by user.
- User can create a group.
- User can add friend to group.
- User can retrieve group by user.
- User can retrieve group by friend.
- User can retrieve all group by user.
- User can retrieve all group by friend.
- User can delete group by user.
- User can send message in group.

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
- POST api/friendship/request/:recipientId - Send friend request
- GET api/friendship - Retrieve friend request
- POST api/friendship/accept/:friendshipId - Accept friend request
- POST api/friendship/reject/:friendshipId - Accept friend request
- POST api/notification - Retrieve notification
- GET api/notification - Retrieve all notification
- PUT api/notification/:id/read - Delete friend

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
