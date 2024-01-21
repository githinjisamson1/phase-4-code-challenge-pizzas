
# Phase 4 Code Challenge: Pizzas

For this assessment, you'll be working with a Pizza Restaurant domain.
Note: You are required to come up with a fully built React frontend application, so you can test if your API is working. A fully functional front end will also be assessed for this code challenge.


## API Reference

#### Get all restaurants

```http
  GET /restaurants
```

#### Post restaurant

```http
  POST /restaurants
```

#### Get restaurant

```http
  GET /restaurants/${id}
```

#### Patch restaurant

```http
  PATCH /restaurants/${id}
```

#### Delete restaurant

```http
  DELETE /restaurants/${id}
```

#### Get all pizzas

```http
  GET /pizzas
```

#### Post pizza

```http
  POST /pizzas
```

#### Get pizza

```http
  GET /pizzas/${id}
```

#### Patch pizza

```http
  PATCH /pizzas/${id}
```

#### Delete pizza

```http
  DELETE /pizzas/${id}
```

#### Post restaurant_pizza

```http
  POST /restaurant_pizzas
```

## Authors

- [@githinjisamson1](https://www.github.com/githinjisamson1)

## Contributing

Contributions are always welcome!

## Environment Variables

To run this project, you will need to add the following environment variable to your .env file

`SECRET_KEY`

## Features

Models
- A `Restaurant` has many `Pizza`s through `RestaurantPizza`
- A `Pizza` has many `Restaurant`s through `RestaurantPizza`
- A `RestaurantPizza` belongs to a `Restaurant` and belongs to a `Pizza`

Validations for the `RestaurantPizza` model:
- must have a `price` between 1 and 30

## Feedback

If you have any feedback, please reach out to us at githinjisamson148@gmail.com

## Installation

Install my-project with npm

```bash
clone this repository
pipenv install && pipenv shell
cd server
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
export FLASK_DEBUG=1
flask db init
flask db upgrade head
flask run

navigate to root directory
cd client
npm install
npm start
```

## Lessons Learned

- Core Components of Python Web Applications
- Application Programming Interfaces (APIs)
- Retrieving Data from APIs
- Building APIs with Flask
- Representative State Transfer (REST)
- Forms and Validations
- Client-Server Communication
- Serialization
- Full-Stack Development with Flask and React

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Hooks applied

- useState: simple state management
- useEffect: side effects
- useCallback: optimization
- useReducer: complex state management
- useNavigate: navigation
- useContext: context API/avoid unecessary prop driling

## Support

For support, email githinjisamson148@gmail.com.


## Tech Stack

**Client:** ```HTML | CSS | JS | REACT```

**Server:** ```Python | Flask```

**Database:** ```SQLite```

**Version Control:** ```Git```

**Package Management:** ```npm```


## Used By

Full Stack Development practice :)

## File and Folder Structure Screenshots

https://github.com/githinjisamson1/phase-4-code-challenge-pizzas/issues/2#issue-2092593733

https://github.com/githinjisamson1/phase-4-code-challenge-pizzas/issues/1#issue-2092593444
