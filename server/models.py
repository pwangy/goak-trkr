import sqlalchemy as sa
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.declarative import declarative_base

# from sqlalchemy import Enum

# db = SQLAlchemy()
Base = declarative_base()

class StatusEnum(sa.Enum):
    NOT_STARTED = "Not Started"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"

class Goal(Base, SerializerMixin): 
    __tablename__ = "goals"

    id = sa.Column(db.Integer, primary_key=True)
    title = sa.Column(db.String(100), nullable=False)
    description = sa.Column(db.String(200))
    status = sa.Column(Enum(StatusEnum), nullable=False, default=StatusEnum.NOT_STARTED)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status.value
        }

    def __repr__(self):
        return f"<Goal {self.title} | Description: {self.description} | Status: {self.status.value}>"