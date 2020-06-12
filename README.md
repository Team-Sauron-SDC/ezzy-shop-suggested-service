# Suggested Module
This component renders the current shop information and its products as well as suggest similar products

## Getting Started
```sh
npm install
```

## Running server and client locally

```sh
npm run ssr
npm run build
```

## Seeding the database

```sh
node scripts/dataGen.js
```

##CRUD Operations

| HTTP Verb |           Endpoint         |            Action            |
|-----------| -------------------------- | ---------------------------- |
| **POST**  |         /products/         |  CREATE a new item into DB   |
| **GET**   |       /newproducts/:id     |  READ data and return data   |
| **PATCH** |       /products/:id        |  UPDATE item with new image  |
| **DELETE**|       /products/:id        |  DELETE item based on ID     |
