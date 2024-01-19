from config import db


class Restaurant(db.Model):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)

    # one to many
    restaurant_pizzas = db.relationship(
        "RestaurantPizza", backref="restaurant")

    # many to many via association table restaurant_pizzas
    pizzas = db.relationship(
        "RestaurantPizza", back_populates="restaurants")

    def __repr__(self):
        return f'''Restaurant {self.name} {self.address}'''


class RestaurantPizza(db.Model):
    __tablename__ = "restaurant_pizzas"

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    restaurant_id = db.Column(db.Integer, db.ForeignKey())
    pizza_id = db.Column(db.Integer, db.ForeignKey())

    
    restaurants = db.relationship("Restaurant", back_populates="pizzas")
    pizzas = db.relationship("Pizza", back_populates="restaurants")

    def __repr__(self):
        return f'''RestaurantPizza {self.price}'''


class Pizza(db.Model):
    __tablename__ = "pizzas"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ingredients = db.Column(db.String)

    # one to many
    restaurant_pizzas = db.relationship(
        "RestaurantPizza", backref="pizza")
    
    # many to many via association table restaurant_pizzas
    restaurants = db.relationship(
        "RestaurantPizza", back_populates="pizzas")

    def __repr__(self):
        return f'''Pizza {self.name} {self.ingredients}'''
