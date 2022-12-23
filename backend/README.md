## Description
> A computer program that will allow you to save your favorite song lyrics. Below are the features implemented.
  > - Can create user.
  > - Can login user.
  > - Can protect the requests methods, if their is no access token.
  > - Can create song.
  > - Can update song.
  > - Can check details of the song.
  > - Can delete song.
  > - Can filter song by artist.
  > - Can filter song by title.

> **Link** : [Frontend Repository](https://github.com/kentlouisetonino/song-book-frontend)

<br />

## Technology Stack
> RestAPI • JWT • NestJS • TypesScript • NodeJS • TypeORM • MySQL • Docker

<br />

## Setup
> - Create a `.env` file in the root directory and put the key value pair.
```bash
AUTH_JWT_SECRET=’jwtTest123456’
AUTH_PASSWORD_SECRET=’passwordTest123456’
DB_HOST=’localhost’
DB_PORT=3310
DB_NAME=’songbook’
DB_USER=’root’
DB_ROOT_PASSWORD=’root’
PORT=11000
```

> - Run the following commands.
```bash
npm install or npm install –force
docker-compose up --build -d
npm run migration:run
npm run start:dev
npm run test:watch # For unit tests.
```

> - Connecting dockerize database to a database client (Workbench, DBeaver).
```bash
Server Host: localhost
Port: 3310
Database: songbook
Username: root
Password: root
```

<br />

## Recording
https://user-images.githubusercontent.com/69438999/191708231-3f320a6d-9383-4e68-866f-d508c1356da4.mp4


