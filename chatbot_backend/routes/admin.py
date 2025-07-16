from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User
from werkzeug.security import generate_password_hash

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

def is_admin(user_id):
    user = User.query.get(user_id)
    return user and user.role == "admin"


@admin_bp.route("/users", methods=["GET"])
@jwt_required()
def get_all_users():
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"msg": "Unauthorized"}), 403

    users = User.query.all()
    return jsonify([
        {
            "id": user.id,
            "name": user.username,
            "email": user.email,
            "role": user.role
        } for user in users
    ]), 200


@admin_bp.route("/users", methods=["POST"])
@jwt_required()
def create_user():
    user_id = get_jwt_identity()
    if not is_admin(user_id):
        return jsonify({"msg": "Unauthorized"}), 403

    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")

    if not all([name, email, password]):
        return jsonify({"msg": "Semua field wajib diisi"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email sudah terdaftar"}), 400

    new_user = User(
        username=name,
        email=email,
        password=generate_password_hash(password),
        role=role
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "name": new_user.username,
        "email": new_user.email,
        "role": new_user.role
    }), 201

@admin_bp.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    current_user = get_jwt_identity()
    if not is_admin(current_user):
        return jsonify({"msg": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User tidak ditemukan"}), 404

    data = request.get_json()
    user.username = data.get("name", user.username)
    user.email = data.get("email", user.email)
    user.role = data.get("role", user.role)

    if data.get("password"):
        user.password = generate_password_hash(data["password"])

    db.session.commit()

    return jsonify({
        "id": user.id,
        "name": user.username,
        "email": user.email,
        "role": user.role
    }), 200

@admin_bp.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    if not is_admin(current_user):
        return jsonify({"msg": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User tidak ditemukan"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User berhasil dihapus"}), 200
