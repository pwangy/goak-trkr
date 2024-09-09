#!/usr/bin/env python3
from faker import Faker
from config import app
from models import db, Goal

fake = Faker()

with app.app_context():
    print("Dropping tables...")
    try:
        Goal.query.delete()
        db.session.commit()
        print("tables dropped")
    except Exception as e:
        print(f"Error dropping tables: {e}")

    print("Starting seed...")
    try:
        for _ in range(15):
            goal = Goal(
                title=fake.text(max_nb_chars=25),
                description=fake.sentence(nb_words=10),
                status=fake.random_element(elements=("Not Started", "In Progress", "Completed"))
            )
            db.session.add(goal)
            db.session.commit()
            print("Goal made!")
    except Exception as e:
        print(f"Goals not created: {e}")
