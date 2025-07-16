from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
import os
from werkzeug.utils import secure_filename

profile_bp = Blueprint("profile", __name__, url_prefix="/profile")

UPLOAD_FOLDER = "static/uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@profile_bp.route("/update", methods=["POST"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User tidak ditemukan"}), 404

    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
    image = request.files.get("image")

    if username:
        user.username = username
    if email:
        user.email = email
    if password:
        user.password = generate_password_hash(password)

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        image.save(filepath)
        user.profile_image = f"/{filepath}"

    db.session.commit()

    return jsonify({
        "msg": "Profil berhasil diperbarui",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "profile_image": user.profile_image,
            "role": user.role
        }
    }), 200



@profile_bp.route("/edit", methods=["PUT"])
@jwt_required()
def edit_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User tidak ditemukan"}), 404

    data = request.form
    username = data.get("username")
    email = data.get("email")
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if username:
        user.username = username
    if email:
        user.email = email

    if old_password and new_password:
        if not check_password_hash(user.password, old_password):
            return jsonify({"msg": "Password lama salah"}), 400
        user.password = generate_password_hash(new_password)


    if "profile_image" in request.files:
        image = request.files["profile_image"]
        if image:
            filename = secure_filename(image.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            image.save(filepath)
            user.profile_image = filepath

    db.session.commit()

    return jsonify({
        "msg": "Profil berhasil diperbarui",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "profile_image": user.profile_image,
        }
    }), 200