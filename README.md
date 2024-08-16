# API DESIGN

## Commit 1: Server setup

- A simple server is created using `express.js`. The server is listening on port 3000.
- A route is created to handle GET requests to the root URL. The server sends a response with the message "Hello World!".

## Commit 2: ORM (Object Relational Mapping) setup

- I have chose `Prisma` as the ORM for this project.
- Prisma is a modern database toolkit that makes it easy to work with databases in Node.js and TypeScript, it makes database setup and management easy.
- Performed database migration using Prisma.
- `npx prisma migrate dev --name <migration_name>`

```text
What is database migration?

Database migration is the process of updating a database from one version to another. It is a way to keep the database schema in sync with the application code.
```

## Commit 3: TypeScript and Router setup

- Middleware is added to the server to parse incoming requests with JSON payloads.
