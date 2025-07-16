# models.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    bookings = db.relationship('Booking', backref='user', lazy=True)
    chat_history = db.relationship('ChatHistory', backref='user', lazy=True)
    profile_picture = db.Column(db.String(255), nullable=True)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Kereta(db.Model):
    __tablename__ = 'kereta'
    id = db.Column(db.Integer, primary_key=True)
    nama_kereta = db.Column(db.String(100), nullable=False)
    rute = db.Column(db.String(200), nullable=False)
    tanggal = db.Column(db.Date, nullable=False)
    keberangkatan = db.Column(db.Time, nullable=False)
    lama_perjalanan = db.Column(db.String(50), nullable=False) 
    kursi_tersedia = db.Column(db.Integer, nullable=False)
    bookings = db.relationship('Booking', backref='kereta', lazy=True)

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    kereta_id = db.Column(db.Integer, db.ForeignKey('kereta.id'), nullable=False)
    tanggal_booking = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class ChatHistory(db.Model):
    __tablename__ = 'chat_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)