# routes/booking.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Booking, Kereta, db
from datetime import datetime

bp = Blueprint("booking", __name__, url_prefix="/book")

@bp.route("", methods=["POST"])
@jwt_required()
def book_ticket():
    user_id = get_jwt_identity()
    data = request.get_json()
    kereta_id = data.get("kereta_id")

    if not kereta_id:
        return jsonify({"msg": "Harap sertakan 'kereta_id'"}), 400

    kereta = Kereta.query.get(kereta_id)

    if not kereta:
        return jsonify({"msg": "Kereta tidak ditemukan"}), 404

    if kereta.kursi_tersedia <= 0:
        return jsonify({"msg": "Maaf, tiket untuk kereta ini sudah habis"}), 400

    kereta.kursi_tersedia -= 1
    booking = Booking(user_id=user_id, kereta_id=kereta.id)
    db.session.add(booking)
    db.session.commit()

    return jsonify({
        "msg": "Berhasil memesan tiket",
        "detail": {
            "kereta": kereta.nama_kereta,
            "rute": kereta.rute,
            "tanggal": kereta.tanggal.strftime("%d-%m-%Y"),
            "keberangkatan": kereta.keberangkatan.strftime("%H:%M"),
            "lama_perjalanan": kereta.lama_perjalanan,  # Diperbaiki
        }
    }), 200

@bp.route("/history", methods=["GET"])
@jwt_required()
def history():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.tanggal_booking.desc()).all()
    results = [
        {
            "id": t.id,
            "kereta": t.kereta.nama_kereta,
            "rute": t.kereta.rute,
            "tanggal": t.kereta.tanggal.strftime("%d-%m-%Y"),
            "keberangkatan": t.kereta.keberangkatan.strftime("%H:%M"),
            "lama_perjalanan": t.kereta.lama_perjalanan, # Diperbaiki
            "waktu_pesan": t.tanggal_booking.strftime("%Y-%m-%d %H:%M:%S")
        }
        for t in bookings
    ]
    return jsonify(results), 200