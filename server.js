import "dotenv/config";
import express from "express";
import geminiRoute from "./api/gemini.js";
import configRoute from "./api/config.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve file statis (HTML, CSS, JS)
app.use(express.static("public"));

app.use("/api/gemini", geminiRoute);
app.use("/api/config", configRoute);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
