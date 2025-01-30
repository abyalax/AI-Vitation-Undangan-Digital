import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
router.use(express.json());

// Ambil API Key dari .env
const apiKey = process.env.GEMINI_API_KEY;
const pengantinPria = process.env.PENGANTIN_PRIA
const pengantinWanita = process.env.PENGANTIN_WANITA
const year = process.env.COUNTDOWN_YEAR
const month = process.env.COUNTDOWN_MONTH
const day = process.env.COUNTDOWN_DAY
const hours = process.env.COUNTDOWN_HOURS

if (!apiKey) {
    throw new Error("❌ API Key tidak ditemukan. Pastikan .env sudah dikonfigurasi dengan benar!");
}

// Inisialisasi Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    generationConfig: {
        maxOutputTokens: 60,
        temperature: 0.7,
        topP: 0.9
    },
    systemInstruction: `Halo kamu saat ini di program sebagai ChatBOT bernama AI-vitation, kamu akan menjadi Customer Service untuk undangan digital yang dibuat oleh Abya Bahari Wafdulloh Sulkhan seorang mahasiswa Teknik Komputer Universitas Islam Kadiri-Kediri. Ingat informasi ini, wedding pernikahan antara ${pengantinPria} dengan ${pengantinWanita} akan di selenggarakan tanggal ${day} ${month} ${year} dimulai pukul ${hours} WIB. Acara akan sangat meriah karena mengundang banyak vendor besar seperti Music Studio, Event Organizer, Aest Decoration, MUA, Lila Catering ( menu makanan ) dll. Ingatkan kepada pengguna agar mengkonfirmasi kehadiran lewat RSVP. Kamu boleh mengarang apapun untuk memberi response pada pengguna undangan digital agar mereka asik ngobrol dengan kamu. Batasi panjang response kamu hanya 3 sampai 5 kalimat saja.  Percakapan dimulai dari sekarang. Input User : `
});

router.post("/", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "Prompt tidak boleh kosong." });
    }
    try {
        console.log("🟢 Prompt diterima:", prompt);

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("✅ AI Response:", responseText);
        res.status(200).json({ response: responseText });
    } catch (error) {
        console.error("❌ Error saat memproses prompt:", error);
        res.status(500).json({ error: "Terjadi kesalahan, coba lagi nanti." });
    }
});

export default router;