# Project Name

> Project description

## Related Projects

  - https://github.com/u-demo/students-also-bought-service
  - https://github.com/u-demo/header-sidebar-service
  - https://github.com/u-demo/Student-Feedback

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

Before seeding the database:

mysql -u root -p [Enter password] create database inst;

To seed database: node database/seed.js

To start server: node server/index.js

To build: npm react-dev

To test: npm test


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

# API Routes
| Route/Endpoint                    | Description                            | Method  |
| --------------------------------- | -------------------------------------- | ------- |
| /courses/:id                      | Retrieve course by id                  | GET     |
| /:id/instructors                  | Retrieve instructors by course id      | GET     |
| /courses                          | Add new course                         | POST    |
| /courses/:id                      | Edit course hours by id                | PUT     |
| /courses/:id                      | Remove course by id                    | DELETE  |