import "dotenv/config";
import express from "express";
import geminiRoute from "./api/gemini.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve file statis (HTML, CSS, JS)
app.use(express.static("public"));

// Endpoint untuk membaca ENV
app.get("/config", (req, res) => {
    res.json({
        COUNTDOWN_YEAR: process.env.COUNTDOWN_YEAR,
        COUNTDOWN_MONTH: process.env.COUNTDOWN_MONTH,
        COUNTDOWN_DAY: process.env.COUNTDOWN_DAY,
        COUNTDOWN_HOURS: process.env.COUNTDOWN_HOURS,
    });
});

app.use("/api/gemini", geminiRoute);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
