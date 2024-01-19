
from config import app, api
from flask import make_response, jsonify
from flask_restful import Resource

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


# routes
api.add_resource(Index, "/")

if __name__ == "__main__":
    app.run(port=5050, debug=True)
