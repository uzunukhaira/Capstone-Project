import os

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:12345678@localhost:5432/kereta_chatbot"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "super-secret"

