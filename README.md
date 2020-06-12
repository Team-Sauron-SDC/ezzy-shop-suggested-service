# ShoppR

This component renders the current shop information and its products as well as suggest similar products for the ShoppR website.

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

### Running server and client locally

```sh
npm run ssr
npm run build
```

### Seeding the database

```sh
node scripts/dataGen.js
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```


## CRUD Operations

| HTTP Verb |           Endpoint         |            Action            |
|-----------| -------------------------- | ---------------------------- |
| **POST**  |         /products/         |  CREATE a new item into DB   |
| **GET**   |       /newproducts/:id     |  READ data and return data   |
| **PATCH** |       /products/:id        |  UPDATE item with new image  |
| **DELETE**|       /products/:id        |  DELETE item based on ID     |
