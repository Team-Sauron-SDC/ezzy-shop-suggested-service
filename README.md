# Ezzy Shop

This component renders the current shop information and its products as well as suggest similar products for the Ezzy Shop website.

## Related Projects

  - https://github.com/Team-Sauron-SDC/shmetsy-reviews
  - https://github.com/Team-Sauron-SDC/shmetsy-suggested-service
  - https://github.com/Team-Sauron-SDC/Shmetsy-Info-Service
  - https://github.com/Team-Sauron-SDC/Shmetsy-carousel

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> This app contains unique pages from /1 to /10000000. Feel free to check out any pages between then. 

## Requirements

### Prerequisites

```
node 12.16.1
PostgreSQL 12
Redis 6.0
```

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing
From within the root directory:

```
npm install
```

To install PostgreSQL, please follow these [instructions](https://www.postgresql.org/download/linux/ubuntu/)

To intall Redis, please follow these [instructions](https://redis.io/download)

### Start Server

```
npm run ssr
```

### Start Webpack

```
npm run build
```

### Seeding the database

```sh
node scripts/dataGen.js
```
## Development

### CRUD Operations

| HTTP Verb |           Endpoint         |            Action            |
|-----------| -------------------------- | ---------------------------- |
| **POST**  |         /products/         |  CREATE a new item into DB   |
| **GET**   |       /newproducts/:id     |  READ data and return data   |
| **PATCH** |       /products/:id        |  UPDATE item with new image  |
| **DELETE**|       /products/:id        |  DELETE item based on ID     |


### Built With

* [node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)

### Deployment

This app was deployed using [Heroku](https://dashboard.heroku.com/)

## Authors

* **Hieu Ho** - *Initial work* - [AmiraVomir](https://github.com/AmiraVomir)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

This project would not have been possible without all the support and encouragement from:

* My family and friends
* HackReactor
