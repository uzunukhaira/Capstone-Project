from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, db

bp = Blueprint("auth", __name__, url_prefix="/auth")

# ✅ REGISTER
@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    if not all([username, email, password, confirm_password]):
        return jsonify({"msg": "Semua field wajib diisi"}), 400

    if password != confirm_password:
        return jsonify({"msg": "Password dan konfirmasi tidak cocok"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email sudah terdaftar"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username sudah terdaftar"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        role="user"
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Registrasi berhasil"}), 201

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email dan password wajib diisi"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Email atau password salah"}), 401

    # ✅ Kirim hanya user.id sebagai STRING
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }), 200


# ✅ GET CURRENT USER FROM TOKEN
@bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()

    try:
        user = User.query.get(int(user_id))
        if not user:
            return jsonify({"msg": "User tidak ditemukan"}), 404

        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "profile_picture": user.profile_picture,
        }), 200
    except Exception as e:
        return jsonify({"msg": f"Terjadi kesalahan: {str(e)}"}), 500
