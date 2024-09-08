#!/usr/bin/env python3
from flask import request, make_response, jsonify
from flask_restful import Resource

from config import app, db, api
from models import Goal, GoalStatusEnum

# Views
@app.route("/")
def index():
    return "<h1>Goal TRKR Server</h1>"

class Goals(Resource):
    def get(self):
        try:
            goals = [goal.to_dict() for goal in Goal.query.all()]
            return make_response(jsonify(goals), 200)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)

    def post(self):
        try:
            data = request.get_json()
            new_goal = Goal(**data)
            db.session.add(new_goal)
            db.session.commit()
            return make_response(jsonify(new_goal.to_dict()), 201)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 400)

class GoalById(Resource):
    def get(self, id):
        try:
            goal = db.session.get(Goal, id)
            if goal:
                return make_response(jsonify(goal.to_dict()), 200)
            else:
                return make_response(jsonify({"error": "Goal not found"}), 404)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)

    def patch(self, id):
        try:
            goal = db.session.get(Goal, id)
            if goal:
                data = request.get_json()
                if "status" in data:
                    data["status"] = GoalStatusEnum[data["status"]]
                for attr, value in data.items():
                    setattr(goal, attr, value)
                db.session.commit()
                return make_response(jsonify(goal.to_dict()), 202)
            else:
                return make_response(jsonify({"error": "Goal not found"}), 404)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 400)

    def delete(self, id):
        try:
            goal = db.session.get(Goal, id)
            if goal:
                db.session.delete(goal)
                db.session.commit()
                return make_response(jsonify({}), 204)
            else:
                return make_response(jsonify({"error": "Goal not found"}), 404)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 400)

api.add_resource(Goals, "/goals")
api.add_resource(GoalById, "/goals/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)