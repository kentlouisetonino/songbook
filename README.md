## Description
> - A web application that will allow the to save a song description and lyrics.

> - Below are the features implemented.

```plaintext
- Can create user.
- Can login user.
- Can protect the request methods, if their is no access token.
- Can create song.
- Can update song.
- Can check details of the song.
- Can delete song.
- Can filter song by artist.
- Can filter song by title.
```


> - The technology stack are:

```plaintext
Client-Side
    - Bootstrap
    - ReactJS
    - NextJS
    - TypeScript

Server-Side
    - REST APIs
    - TypeORM
    - JWT
    - NestJS
    - MySQL
    - TypeScript
    - NodeJS
    - Docker
```

<br />
<br />



## Client-Side Development Guide
> - Go to the `client` directory.

> - Create a `.env.local` file in the root directory and put the key value pair.

```bash
NEXT_PUBLIC_BACKEND_API_ENDPOINT='http://localhost:11000'
NEXT_PUBLIC_AUTH_JWT_SECRET='jwtTest123456'
```

> - Run the following commands.

```bash
yarn install
yarn build
yarn dev
```

<br />
<br />



## Server-Side Development Guide
> - Go to the `server` directory.

> - Create a `.env` file in the root directory and put the key value pair.

```bash
# * This is needed for authentication.
AUTH_JWT_SECRET=jwtTest123456
AUTH_PASSWORD_SECRET=passwordTest123456

# * Connecting with MySQL database.
DB_HOST=localhost
DB_PORT=3310
DB_NAME=songbook
DB_USER=root
DB_ROOT_PASSWORD=root

# * For server port.
PORT=11000
```

> - Run the following commands.

```bash
# * Run first the dockerize MySQL engine.
docker-compose up --build

# * Run the installation of packages and dependency.
yarn install

# * For table migration in MySQL database.
yarn migration:run

# * Start server for development.
yarn start:dev
```

> - Connecting dockerize database to a database client (Workbench, DBeaver).
```bash
Host: localhost
Port: 3310
Database: songbook
Username: root
Password: root
```
