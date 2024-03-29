
from config import app, api
from models import db
from flask import make_response, jsonify, request
from flask_restful import Resource
from models import Restaurant, RestaurantPizza, Pizza


# !RESOURCES
class Index(Resource):
    # !GET
    def get(self):
        response = make_response(jsonify({
            "success": True,
            "message": "Welcome to Pizzas!"
        }), 200)

        response.headers["Content-Type"] = "application/json"

        return response


class Restaurants(Resource):
    # !GET restaurants 
    def get(self):
        restaurants_lc = [restaurant.to_dict()
                          for restaurant in Restaurant.query.all()]

        response = make_response(jsonify(restaurants_lc), 200)

        response.headers["Content-Type"] = "application/json"

        return response

    # !POST new_restaurant
    def post(self):
        data = request.get_json()

        new_restaurant = Restaurant(
            name=data.get("name"),
            address=data.get("address")
        )

        db.session.add(new_restaurant)
        db.session.commit()

        response = make_response(jsonify(new_restaurant.to_dict()), 201)

        response.headers["Content-Type"] = "application/json"

        return response


class RestaurantById(Resource):
    # !GET restaurant
    def get(self, restaurant_id):
        restaurant = Restaurant.query.filter_by(id=restaurant_id).first()

        if not restaurant:
            return make_response(jsonify({"error": "Restaurant not found!"}), 400)

        response = make_response(jsonify(restaurant.to_dict()), 200)

        response.headers["Content-Type"] = "application/json"

        return response

    # !PATCH restaurant
    def patch(self, restaurant_id):
        data = request.get_json()

        restaurant = Restaurant.query.filter_by(id=restaurant_id).first()

        if not restaurant:
            return make_response(jsonify({"error": "Restaurant not found!"}), 400)

        for attr in data:
            setattr(restaurant, attr, data.get(attr))

        db.session.commit()

        response = make_response(jsonify(restaurant.to_dict()), 200)

        response.headers["Content-Type"] = "application/json"

        return response

    # !DELETE restaurant
    def delete(self, restaurant_id):
        restaurant = Restaurant.query.filter_by(id=restaurant_id).first()

        if not restaurant:
            return make_response(jsonify({"error": "Restaurant not found!"}), 400)

        db.session.delete(restaurant)
        db.session.commit()

        response = make_response(
            jsonify({"success": True, "message": "Restaurant deleted"}), 200)

        response.headers["Content-Type"] = "application/json"

        return response


class Pizzas(Resource):
    # !GET pizzas
    def get(self):
        pizzas_lc = [pizza.to_dict() for pizza in Pizza.query.all()]

        response = make_response(jsonify(pizzas_lc), 200)

        response.headers["Content-Type"] = "application/json"

        return response


class PizzaById(Resource):
    # !GET pizza
    def get(self, pizza_id):
        pizza = Pizza.query.filter_by(id=pizza_id).first()

        if not pizza:
            return make_response(jsonify({"error": "Pizza not found!"}), 400)

        response = make_response(jsonify(pizza.to_dict()), 200)

        response.headers["Content-Type"] = "application/json"

        return response

    # !PATCH pizza
    def patch(self, pizza_id):
        data = request.get_json()

        pizza = Pizza.query.filter_by(id=pizza_id).first()

        if not pizza:
            return make_response(jsonify({"error": "Pizza not found!"}), 400)

        for attr in data:
            setattr(pizza, attr, data.get(attr))

        db.session.commit()

        response = make_response(jsonify(pizza.to_dict()), 200)

        response.headers["Content-Type"] = "application/json"

        return response

    # !DELETE pizza
    def delete(self, pizza_id):
        pizza = Pizza.query.filter_by(id=pizza_id).first()

        if not pizza:
            return make_response(jsonify({"error": "Pizza not found!"}), 400)

        db.session.delete(pizza)
        db.session.commit()

        response = make_response(
            jsonify({"success": True, "message": "Pizza deleted"}), 200)

        response.headers["Content-Type"] = "application/json"

        return response

class RestaurantPizzas(Resource):
    # !POST new_restaurant_pizza
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


# !ROUTES
api.add_resource(Index, "/")
api.add_resource(Restaurants, "/restaurants")
api.add_resource(RestaurantById, "/restaurants/<int:restaurant_id>")
api.add_resource(Pizzas, "/pizzas")
api.add_resource(PizzaById, "/pizzas/<int:pizza_id>")
api.add_resource(RestaurantPizzas, "/restaurant_pizzas")

# executed only if run/not if imported
if __name__ == "__main__":
    app.run(port=5050, debug=True)
