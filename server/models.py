from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

# instantiate SQLAlchemy
db = SQLAlchemy()


# !MODELS

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = "restaurants"

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)

    # one to many r/ship
    restaurant_pizzas = db.relationship(
        "RestaurantPizza", backref="restaurant")

    # many to many via association table restaurant_pizzas
    # pizzas = db.relationship(
    #     "RestaurantPizza", back_populates="restaurants")

    # serialize to prevent recursion
    serialize_rules = ("-restaurant_pizzas.restaurant",)

    def __repr__(self):
        return f'''Restaurant {self.name} {self.address}'''


# Association table
class RestaurantPizza(db.Model, SerializerMixin):
    __tablename__ = "restaurant_pizzas"

    # columns
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    pizza_id = db.Column(db.Integer, db.ForeignKey("pizzas.id"))

    # relationships
    # restaurants = db.relationship("Restaurant", back_populates="pizzas")
    # pizzas = db.relationship("Pizza", back_populates="restaurants")

    # serialize to prevent recursion
    serialize_rules = ("-restaurant.restaurant_pizzas",
                       "-pizza.restaurant_pizzas",)

    # validation
    @validates("price")
    def validate_price(self, key, price):
        if price not in range(1, 30):
            raise ValueError("Price must be between 1 and 30")
        return price

    def __repr__(self):
        return f'''RestaurantPizza {self.price}'''


class Pizza(db.Model, SerializerMixin):
    __tablename__ = "pizzas"

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ingredients = db.Column(db.String)

    # one to many r/ship
    restaurant_pizzas = db.relationship(
        "RestaurantPizza", backref="pizza")

    # many to many via association table restaurant_pizzas
    # restaurants = db.relationship(
    #     "RestaurantPizza", back_populates="pizzas")

    # serialize to prevent recursion
    serialize_rules = ("-restaurant_pizzas.pizza",)

    def __repr__(self):
        return f'''Pizza {self.name} {self.ingredients}'''
