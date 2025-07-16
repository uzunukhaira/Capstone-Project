from flask import Blueprint, jsonify
from models import Kereta

bp = Blueprint("kereta", __name__, url_prefix="/kereta")

@bp.route("", methods=["GET"])
def get_kereta():
    data = Kereta.query.all()
    return jsonify([
        {
            "id": k.id,
            "nama_kereta": k.nama_kereta,
            "rute": k.rute,
            "keberangkatan": k.keberangkatan.strftime("%H:%M"),
            "lama_perjalanan": k.lama_perjalanan,
            "kursi_tersedia": k.kursi_tersedia,
            "tanggal": k.tanggal.isoformat()
        }
        for k in data
    ])
