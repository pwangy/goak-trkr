#!/usr/bin/env python3
from flask import request, make_response, jsonify
from flask_restful import Resource

from config import app, db, api
from models import Goal

# Views
@app.route("/")
def index():
    return "<h1>Goal TRKR Server</h1>"

class Goals(Resource):
    def get(self):
        try:
            goals = Goal.query.all()
            return make_response(jsonify(goals), 200)
        except Exception as e:
             return {"error": str(e)}, 400

    def post(self):
        data = request.get_json()
        goal = Goal(title=data["title"], description=data["description"])
        db.session.add(goal)
        db.session.commit()
        return make_response(jsonify(goal), 201)

api.add_resource(Goals, "/goals")

class GoalByID()

@app.route("/goals", methods=["GET"])
def goals():
    response_dict = {
        "text": "Goal goes here" 
    }
    
    return make_response(jsonify(response_dict), 200)

if __name__ == "__main__":
    app.run(port=5555, debug=True)
    
    # CRUD: Create, Read, Update, Delete