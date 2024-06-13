# PERN Stack Auth Starter API

This repo should server as a starting point for a new PERN stack project. It offers a simple user registration and login system without any long-term authorization mechanism baked in.

## Dev Setup

To get the environment up and running, install the dependencies with `npm install`.

Next, make sure to create a `.env` file from the `.env.template` file by running:

```bash
cp .env.template .env
```

And modify any of the necessary environment variables.

Feel free to change the name of the SQL scripts and update the database name from `auth_starter` to whatever fits your application.

Then (as long as PostgreSQL is running on your machine) create the db and tables by running:

```bash
psql -f auth-starter.sql
# or if you renamed your file
psql -f your-new-file-name.sql
```

Finally, start up the application with `npm start`.
