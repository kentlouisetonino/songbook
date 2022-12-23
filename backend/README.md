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
