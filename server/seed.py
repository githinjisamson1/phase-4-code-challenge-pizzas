from app import app
from config import db
from models import Restaurant, RestaurantPizza, Pizza
from faker import Faker
import random

fake = Faker()


def seed_database():
    # empty tables before seeding
    print("Deleting records...")
    Restaurant.query.delete()
    RestaurantPizza.query.delete()
    Pizza.query.delete()

    print("Inserting restaurants 🏨🏨🏨...")
    for _ in range(10):
        restaurant = Restaurant(
            name=fake.unique.name(),
            address=fake.address()
        )

        db.session.add(restaurant)
        db.session.commit()

    pizzas_list = ['Margherita', 'Supreme', 'Hawaiian', 'BBQ Chicken', 'Veggie',
                   'Meat Lovers', 'White Garlic', 'Pesto', 'Buffalo Chicken', 'Four Cheese']
    ingredients_list = ['Pepperoni', 'Mushroom', 'Spinach', 'Artichoke',
                        'Chicken', 'Olives', 'Pineapple', 'Bacon', 'Onion', 'Tomato']

    print("Inserting pizzas 🍕🍕🍕...")
    for _ in range(10):
        pizza = Pizza(
            name=random.choice(pizzas_list),
            ingredients=random.choice(ingredients_list),
        )

        db.session.add(pizza)
        db.session.commit()

    # extract ids since restaurant and pizzas IDs are already updated atp
    restaurant_ids = [restaurant.id for restaurant in Restaurant.query.all()]
    pizza_ids = [pizza.id for pizza in Pizza.query.all()]

    print("Inserting restaurant_pizzas 🏨 🍕...")
    for _ in range(10):
        restaurant_pizza = RestaurantPizza(
            price=round(random.uniform(500.00, 2000.00), 2),
            restaurant_id=random.choice(restaurant_ids),
            pizza_id=random.choice(pizza_ids)
        )

        db.session.add(restaurant_pizza)
        db.session.commit()
        
    print("Complete 🤝")


if __name__ == "__main__":
    with app.app_context():
        seed_database()
