import pandas as pd
from datetime import datetime
import re

df = pd.read_excel("Jadwal KAI Maret 2025.xlsx")
df["tanggal"] = pd.to_datetime(df["tanggal"])

bulan_map = {
    "januari": "01", "februari": "02", "maret": "03",
    "april": "04", "mei": "05", "juni": "06",
    "juli": "07", "agustus": "08", "september": "09",
    "oktober": "10", "november": "11", "desember": "12"
}

def extract_date(text):
    match = re.search(r'(\d{1,2})\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)(\s+\d{4})?', text)
    if match:
        day = match.group(1)
        month = bulan_map[match.group(2)]
        year = match.group(3).strip() if match.group(3) else "2025"
        return datetime.strptime(f"{year}-{month}-{day}", "%Y-%m-%d").date()
    return None

def process_message(message):
    message = message.lower()
    tanggal_diminta = extract_date(message)

    filtered = df.copy()

    kereta_terdeteksi = [k for k in df["nama_kereta"].unique() if k.lower() in message]
    if kereta_terdeteksi:
        filtered = filtered[filtered["nama_kereta"].str.lower().isin([k.lower() for k in kereta_terdeteksi])]

    kata_kunci = message.split()
    rute_cocok = df["rute"].apply(lambda r: any(k in r.lower() for k in kata_kunci))
    if rute_cocok.any():
        filtered = filtered[rute_cocok]

    if tanggal_diminta:
        filtered = filtered[filtered["tanggal"] == pd.to_datetime(tanggal_diminta)]

    if "jadwal" in message:
        if filtered.empty:
            return "❌ Tidak ada jadwal ditemukan sesuai permintaan Anda."
        
        hasil = []
        for _, row in filtered.iterrows():
            hasil.append(
                f"🚆 {row['nama_kereta']} | Rute: {row['rute']} | Tgl: {row['tanggal'].strftime('%d-%m-%Y')} | "
                f"Berangkat: {row['keberangkatan']} | Durasi: {row['lama_perjalanan']} | "
                f"Kursi tersedia: {row['kursi_tersedia']}"
            )
        return "\n".join(hasil)

    elif "kursi" in message:
        kursi_filtered = df
        if tanggal_diminta:
            kursi_filtered = kursi_filtered[kursi_filtered["tanggal"] == pd.to_datetime(tanggal_diminta)]
        else:
            kursi_filtered = kursi_filtered[kursi_filtered["tanggal"] == pd.to_datetime(datetime.now().date())]

        if kursi_filtered.empty:
            return "❌ Tidak ada data kursi tersedia untuk tanggal tersebut."
        
        ringkas = kursi_filtered[['rute', 'kursi_tersedia']].drop_duplicates()
        return "\n".join([f"🪑 Rute {r['rute']}: {r['kursi_tersedia']} kursi tersedia" for _, r in ringkas.iterrows()])

    elif "kereta" in message:
        kereta_unik = df["nama_kereta"].unique()
        return "🚄 Kereta yang tersedia:\n" + "\n".join(kereta_unik)

    elif "lihat rute" in message or "daftar rute" in message:
        rute_unik = df["rute"].unique()
        return "🛤️ Rute yang tersedia:\n" + "\n".join(rute_unik)
    
    elif "lama perjalanan" in message or "durasi perjalanan" in message:
        durasi_unik = df[["rute", "lama_perjalanan"]].drop_duplicates()
        return "⏱️ Lama perjalanan per rute:\n" + "\n".join([f"{r['rute']}: {r['lama_perjalanan']}" for _, r in durasi_unik.iterrows()])

    return "🤖 Maaf, saya tidak mengerti maksud Anda. Gunakan kata kunci seperti: 'jadwal', 'lama perjalanan', 'kereta', atau 'lihat rute'."

if __name__ == "__main__":
    print("=== Chatbot Jadwal KAI 🚆 ===")
    print("Contoh: 'jadwal dari Padang', 'jadwal kereta Padang 10 Maret'")
    print("Ketik 'exit' untuk keluar.\n")

    while True:
        msg = input("Anda: ")
        if msg.lower() in ["exit", "quit"]:
            break
        response = process_message(msg)
        print("Bot :", response + "\n")

get_bot_response = process_message

