from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Enum

db = SQLAlchemy()

class GoalStatusEnum(Enum):
    NOT_STARTED = "Not Started"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"

class Goal(db.Model, SerializerMixin): 
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    status = db.Column(Enum(GoalStatusEnum), nullable=False, default=GoalStatusEnum.NOT_STARTED)

    def __repr__(self):
        return f"<Goal {self.title} | Description: {self.description} | Status: {self.status}>"