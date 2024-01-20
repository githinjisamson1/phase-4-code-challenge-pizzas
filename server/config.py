import os
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from models import db
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

# instantiate Flask app
app = Flask(__name__)

# configure Flask with SQLAlchemy settings
app.secret_key = os.environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pizzas.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

# prevent cross origin isssues
CORS(app)

# instantiations
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
