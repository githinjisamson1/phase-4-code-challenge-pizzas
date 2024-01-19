
from config import app, api
from models import db
from flask import make_response, jsonify, request
from flask_restful import Resource
from models import Restaurant, RestaurantPizza, Pizza


# resources
class Index(Resource):
    def get(self):
        response_body = {
            "success": True,
            "message": "Welcome to Pizzas!"
        }

        response = make_response(jsonify(response_body), 200)

        response.headers["Content-Type"] = "application/json"

        return response


class Restaurants(Resource):
    def get(self):
        restaurants_lc = [restaurant.to_dict()
                          for restaurant in Restaurant.query.all()]

        response = make_response(jsonify(restaurants_lc), 200)

        response.headers["Content-Type"] = "application/json"

        return response


class RestaurantById(Resource):
    def get(self, restaurant_id):
        restaurant = Restaurant.query.filter_by(id=restaurant_id).first()

        if not restaurant:
            return make_response(jsonify({"error": "Restaurant not found!"}), 400)

        response = make_response(jsonify(restaurant.to_dict()), 200)

        response.headers["Content-Type"] = "application/json"

        return response

    def delete(self, restaurant_id):
        restaurant = Restaurant.query.filter_by(id=restaurant_id).first()

        if not restaurant:
            return make_response(jsonify({"error": "Restaurant not found!"}), 400)

        return {}, 204


class Pizzas(Resource):
    def get(self):
        pizzas_lc = [pizza.to_dict() for pizza in Pizza.query.all()]

        response = make_response(jsonify(pizzas_lc), 200)

        response.headers["Content-Type"] = "application/json"

        return response


class RestaurantPizzas(Resource):
    def post(self):

        try:

            data = request.get_json()

            new_restaurant_pizza = RestaurantPizza(
                price=data.get("price"),
                restaurant_id=data.get("restaurant_id"),
                pizza_id=data.get("pizza_id")
            )

            db.session.add(new_restaurant_pizza)
            db.session.commit()

            response = make_response(
                jsonify(new_restaurant_pizza.to_dict()), 201)

            response.headers["Content-Type"] = "application/json"

            return response

        except ValueError as e:
            response = make_response(jsonify({
                "error": [str(e)]
            }), 422)
            
            return response


# routes
api.add_resource(Index, "/")
api.add_resource(Restaurants, "/restaurants")
api.add_resource(RestaurantById, "/restaurants/<int:restaurant_id>")
api.add_resource(Pizzas, "/pizzas")
api.add_resource(RestaurantPizzas, "/restaurant_pizzas")

if __name__ == "__main__":
    app.run(port=5050, debug=True)
