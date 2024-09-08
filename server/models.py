from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Goal(db.Model, SerializerMixin): 
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    status = db.Column(db.String(50), nullable=False, default="Not Started")

    __table_args__ = (
        CheckConstraint(
            status.in_(['Not Started', 'In Progress', 'Completed']),
            name='check_status_valid'
        ),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status
        }

    def __repr__(self):
        return f"<Goal {self.title} | Description: {self.description} | Status: {self.status}>"