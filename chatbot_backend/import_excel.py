import pandas as pd
from models import db, Kereta
from app import app
from datetime import datetime

# Load file Excel
df = pd.read_excel("Jadwal KAI Maret 2025.xlsx")

with app.app_context():
    for _, row in df.iterrows():
        kereta = Kereta(
            nama_kereta=row["nama_kereta"],
            rute=row["rute"],
            keberangkatan=datetime.strptime(str(row["keberangkatan"]), "%H:%M").time(),
            lama_perjalanan=datetime.strptime(str(row["lama_perjalanan"]), "%H:%M").time(),
            kursi_tersedia=row["kursi_tersedia"],
            tanggal=row["tanggal"] if isinstance(row["tanggal"], datetime) else datetime.strptime(str(row["tanggal"]), "%Y-%m-%d").date()
        )
        db.session.add(kereta)
    db.session.commit()
    print("Data kereta berhasil diimpor.")
