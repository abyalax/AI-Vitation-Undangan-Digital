import "dotenv/config";
import express from "express";
import geminiRoute from "./api/gemini.js"

const app = express();
const PORT = process.env.PORT || 3000;

// Serve file statis (HTML, CSS, JS)
app.use(express.static("public"));

// Endpoint untuk membaca ENV
app.get("/config", (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

app.use("/api/gemini", geminiRoute);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
