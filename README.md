### DESCRIPTION
##
https://github.com/kentlouisetonino/songbook/assets/69438999/d56c6bd2-fa43-40f4-a3ff-3d9f477f5563

<br />

> - A software that allows to save a song information.

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

<br />
<br />



### DEVELOPMENT
##
> - Go to the `client` directory and create a `.env.local` file.

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

> - Go to the `server` directory and create `.env` file.

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
