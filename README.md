# Deprecated
this repo is not used anymore and used newer version for this app

# BackEnd Sumber Bening
This project is API for TB. Sumber Bening Desktop App and Web App

# Boilerplate
this project is based on the Boilerplate from [node-express-boilerplate by Hagop Jamkojian](https://github.com/hagopj13/node-express-boilerplate) see [Boilerplate LICENSE](boilerplate.LICENSE) for details.

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# run all tests
npm run test

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run coverage
```

Docker:

```bash
# run docker container in development mode
npm run docker:dev

# run docker container in production mode
npm run docker:prod

# run all tests in a docker container
npm run docker:test
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. you can se the example on the `.env.example` file or see below:

```bash
# General Settings
PORT = your_API_port

# Basic Auth
BASIC_AUTH_USERNAME = your_basic_auth_username
BASIC_AUTH_PASSWORD = your_basic_auth_password

#  jwt
JWT_SECRET = your_jwt_secret_key
JWT_ACCESS_EXPIRATION_MINUTES = your_token_expiration_minutes

#  User
ACCESS_USERNAME = your_username
ACCESS_PASSWORD = your_password

```

## Inspirations

- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)
- [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)
- [madhums/node-express-mongoose](https://github.com/madhums/node-express-mongoose)
- [kunalkapadia/express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## License

[MIT](LICENSE)
