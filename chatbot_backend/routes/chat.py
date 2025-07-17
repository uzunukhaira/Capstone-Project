# routes/chat.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required, verify_jwt_in_request
from models import ChatHistory, db
from chatbot import get_bot_response

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')

@chat_bp.route("", methods=["POST"])
def chat():
    verify_jwt_in_request(optional=True)
    user_id = get_jwt_identity()
    print("✅ [Chat Route] user_id dari JWT:", user_id)

    message = request.json.get("message", "").strip()
    if not message:
        return jsonify({"error": "Pesan tidak boleh kosong"}), 400

    bot_response = get_bot_response(message)

    if user_id:
        try:
            chat_entry = ChatHistory(
                user_id=int(user_id),
                message=message,
                response=bot_response
            )
            db.session.add(chat_entry)
            db.session.commit()
            print("✅ Chat berhasil disimpan ke database")
        except Exception as e:
            print("❌ Gagal menyimpan chat:", e)
    else:
        print("⚠️ Tidak ada user_id, chat tidak disimpan ke database")

    return jsonify({"response": bot_response}), 200

@chat_bp.route("/history", methods=["GET"])
@jwt_required()
def get_chat_history():
    user_id = get_jwt_identity()

    if not user_id:
        return jsonify({"msg": "User tidak ditemukan"}), 401

    chat_history = ChatHistory.query.filter_by(user_id=user_id).order_by(ChatHistory.timestamp.desc()).all()
    result = [
        {
            "id": chat.id,
            "message": chat.message,
            "response": chat.response,
            "timestamp": chat.timestamp.isoformat()
        }
        for chat in chat_history
    ]

    return jsonify(result), 200