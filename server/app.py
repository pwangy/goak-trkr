#!/usr/bin/env python3
from flask import request, make_response, jsonify
from flask_restful import Resource
from config import app, api

ALLOWED_STATUSES = ["Not Started", "In Progress", "Completed"]

@app.route("/")
def index():
    return "<h1>Goal TRKR Server</h1>"

class Goals(Resource):
    def get(self):
        from models import Goal
        from config import db
        try:
            goals = [goal.to_dict() for goal in Goal.query.all()]
            return make_response(jsonify(goals), 200)
        except Exception as e:
             return make_response(jsonify({"error": str(e)}), 400)

    def post(self):
        from models import Goal
        from config import db
        try:
            data = request.get_json()
            if "status" in data and data["status"] not in ALLOWED_STATUSES:
                return make_response(jsonify({"error": "Invalid status value"}), 400)
            new_goal = Goal(**data)
            db.session.add(new_goal)
            db.session.commit()
            return make_response(jsonify(new_goal.to_dict()), 201)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 400)

class GoalById(Resource):
    def get(self, id):
        from models import Goal
        from config import db
        try:
           if goal := db.session.get(Goal, id):
                return make_response(jsonify(goal.to_dict()), 200)
           else:
                return make_response(jsonify({"error": "Goal not found"}), 404)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)

    def patch(self, id):
        from models import Goal
        from config import db
        if goal := db.session.get(Goal, id):
            try:
                data = request.json
                if "status" in data:
                    if data["status"] not in ALLOWED_STATUSES:
                        return make_response(jsonify({"error": "Invalid status value"}), 400)
                for attr, value in data.items():
                    setattr(goal, attr, value)
                db.session.commit()
                return make_response(jsonify(goal.to_dict()), 202)
            except Exception as e:
                db.session.rollback()
                return make_response(jsonify({"error": str(e)}), 400)
        else:
            return make_response(jsonify({"error": "Goal not found"}), 404)

    def delete(self, id):
        from models import Goal
        from config import db
        try:
            if goal := db.session.get(Goal, id):
                db.session.delete(goal)
                db.session.commit()
                return make_response(jsonify({}), 204)
            else:
                return make_response(jsonify({"error": "Goal not found"}), 404)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)

api.add_resource(Goals, "/goals")
api.add_resource(GoalById, "/goals/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)