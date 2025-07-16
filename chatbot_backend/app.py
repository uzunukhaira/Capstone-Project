# app.py
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from routes import auth, chat, kereta, booking
from routes.profile import profile_bp

app = Flask(__name__)
app.config.from_object(Config)

app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"
app.config["UPLOAD_FOLDER"] = "static/uploads"

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth.bp)
app.register_blueprint(chat.chat_bp)
app.register_blueprint(kereta.bp)
app.register_blueprint(booking.bp)
app.register_blueprint(profile_bp)

if not os.path.exists("static/uploads"):
    os.makedirs("static/uploads")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
