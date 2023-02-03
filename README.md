# Commerce Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Description

This is node based ecommerce backend that provides full CRUD access to a mySQL database via RESTful urls. This api can store the price and stock of multiple products, along with their category and tags.

## Table of Contents

- [Description](#description)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  - [Categories](#categories)
  - [Tags](#tags)
  - [Products](#products)
- [License](#license)
- [Questions](#questions)

## Demo

Watch the [demonstration video]() hosted on google drive.

## Installation

1. Clone the repository to your local machine and run `npm install`.
2. Have a mySQL server running.
3. Add the server's host url and credentials to a `.env` file in the root directory (see [`.env.EXAMPLE`](./.env.EXAMPLE).)
4. Execute [`schema.sql`](./db/schema.sql) via the mysql CLI.

## Usage

Run `npm run seed` and then run `npm start`. The server will begin listening on port `3001`. You may then use a tool like Insomnia or Postman to send requests to the server.

### Categories
___
#### `GET /api/categories`
Returns a Json format containing every category, along with each product in that category.
#### Example response:
```
[
	{
		"id": 1,
		"name": "Shirts",
		"products": [
			{
				"id": 1,
				"name": "Plain T-Shirt",
				"price": 14.99,
				"stock": 14,
				"categoryId": 1
			}
		]
	},
	{
		"id": 2,
		"name": "Shorts",
		"products": [
			{
				"id": 5,
				"name": "Cargo Shorts",
				"price": 29.99,
				"stock": 22,
				"categoryId": 2
			}
		]
	}
]
```
___
#### `GET /api/categories/id`
Returns a Json format containing one category, specified via `id`, along with each product in that category.
#### Example request:
Path: `GET /api/categories/4`
#### Example response:
```
{
	"id": 4,
	"name": "Hats",
	"products": [
		{
			"id": 3,
			"name": "Branded Baseball Hat",
			"price": 22.99,
			"stock": 12,
			"categoryId": 4
		}
	]
}
```
___
#### `POST /api/categories`
Creates a new row in the database given a json formatted body.
#### Parameters:
`name`: (required) The name of the new category.
#### Example request:
Path: `POST /api/categories`

Body:
```
{
  "name": "Games"
}
```
#### Example response:
```
{
	"id": 6,
	"name": "Games"
}
```
___
#### `PUT /api/categories/id`
Updates the entries of the category specified by `id` given in a json formatted body.
#### Parameters:
`name`: (optional) The new name of the category.
#### Response:
The number of rows affected
#### Example request:
Path: `PUT /api/categories/2`

Body:
```
{
  "name": "Fishing"
}
```

#### Example response:

```
[
	1
]
```
___
#### `DELETE /api/categories/id`
Deletes the category by specified `id`.
#### Response:
The number of rows deleted.
#### Example response:
```
1
```
___
### Tags
___
#### `GET /api/tags`
Fetches all the tags in the database, as well as whatever products they are given to.
#### Example response:
```
[
	{
		"id": 1,
		"name": "rock music",
		"products": []
	},
	{
		"id": 2,
		"name": "pop music",
		"products": [
			{
				"id": 4,
				"name": "Top 40 Music Compilation Vinyl Record",
				"price": 12.99,
				"stock": 50,
				"categoryId": 3,
				"product_tags": {
					"id": 10,
					"productId": 4,
					"tagId": 2
				}
			}
		]
	}
]
```
___
#### `GET /api/tags/id`
Gets a single tag specified by `id`.

#### Example request:
Path: `GET /api/tags/5`
#### Example response:
```
{
	"id": 5,
	"name": "green",
	"products": [
		{
			"id": 3,
			"name": "Branded Baseball Hat",
			"price": 22.99,
			"stock": 12,
			"categoryId": 4,
			"product_tags": {
				"id": 8,
				"productId": 3,
				"tagId": 5
			}
		}
	]
}
```
___
#### `POST /api/tags`
Creates a new row in the database given a json formatted body.
#### Parameters:
`name`: (required) The name of the new tag.
#### Example request:
Path: `POST /api/tags`

Body:
```
{
	"name": "Sturdy"
}
```
#### Example response:
```
{
	"id": 9,
	"name": "Sturdy"
}
```
___
#### `PUT /api/tags/id`
Updates a tag specified by `id` with new data outlined below.
#### Parameters:
`name`: (required) The new name of the tag.
#### Response:
The number of row affected.
#### Example request:
Path: `PUT /api/tags/4`

Body:
```
{
	"name": "Round"
}
```
#### Example response:
```
1
```
___
#### `DELETE /api/tags/id`
Deletes a tag specified via `id`.
#### Response:
The number of tags deleted.
#### Example request:
Path: `POST /api/tags/8`
#### Example response:
```
1
```
___
### Products
___
#### `GET /api/products`
Gets all the products in a json format.
#### Example response:
```
[
	{
		"id": 1,
		"name": "Plain T-Shirt",
		"price": 14.99,
		"stock": 14,
		"categoryId": 1,
		"category": {},
		"tags": [
			{
				"id": 6,
				"name": "white",
				"product_tags": {
					"id": 1,
					"productId": 1,
					"tagId": 6
				}
			}
		]
	},
	{
		"id": 2,
		"name": "Running Sneakers",
		"price": 90,
		"stock": 25,
		"categoryId": 5,
		"category": {
			"id": 5,
			"name": "Shoes"
		},
		"tags": []
	}
]
```
___
#### `GET /api/products/id`
Gets one product specified by `id` in a json format.
#### Example request:
Path: `GET /api/products/3`
#### Example response:
```
{
	"id": 3,
	"name": "Branded Baseball Hat",
	"price": 22.99,
	"stock": 12,
	"categoryId": 4,
	"category": {
		"id": 4,
		"name": "Hats"
	},
	"tags": [
		{
			"id": 3,
			"name": "blue",
			"product_tags": {
				"id": 6,
				"productId": 3,
				"tagId": 3
			}
		},
		{
			"id": 4,
			"name": "Round",
			"product_tags": {
				"id": 7,
				"productId": 3,
				"tagId": 4
			}
		}
	]
}
```
___
#### `POST /api/products`
Creates a new product.
#### Parameters:
`name`: (required) The name of the product.

`price`: (required) The price of the product.

`stock`: (required) How many of the product is in stock.

`tagIds`: (optional) An array of tag ids.
#### Example request:
Path: `POST /api/products`

Body:
```
{
	"name": "Basketball",
	"price": 200.00,
	"stock": 3,
	"tagIds":[1,2,3,4]
}
```
#### Example response:
```
{
	"id": 6,
	"name": "Basketball",
	"price": 200,
	"stock": 3
}
```
___
#### `PUT /api/products/id`
Updates any of the fields of a product specified by `id`.
#### Parameters:
`name`: (optional) The new name of the product.

`price`: (optional) The new price of the product.

`stock`: (optional) The new stock of the product.

`tagIds`: (optional) What tags this product should have. Will remove any tags not included unless `tagIds` is omited.
#### Response:
The tags on the product after the operation.
#### Example request:
Path: `PUT /api/products/2`

Body:
```
{
	"name": "Running Sneakers",
	"price": 67.00,
	"stock": 9,
	"tagIds":[2,4]
}
```
#### Example response:
```
[
	1,
	[
		{
			"id": 13,
			"productId": "2",
			"tagId": 2
		},
		{
			"id": 14,
			"productId": "2",
			"tagId": 4
		}
	]
]
```
___
#### `DELETE /api/products/id`
Deletes a product specified by `id`.
#### Example request:
Path: `DELETE /api/products/4`

## License

This project is licensed under The MIT License

## Questions

My github: [SprocketCreations](https://github.com/SprocketCreations)



