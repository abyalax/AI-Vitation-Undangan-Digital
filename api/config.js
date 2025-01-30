import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
    res.json({
        COUNTDOWN_YEAR: process.env.COUNTDOWN_YEAR,
        COUNTDOWN_MONTH: process.env.COUNTDOWN_MONTH,
        COUNTDOWN_DAY: process.env.COUNTDOWN_DAY,
        COUNTDOWN_HOURS: process.env.COUNTDOWN_HOURS,
        PENGANTIN_PRIA: process.env.PENGANTIN_PRIA,
        PENGANTIN_WANITA: process.env.PENGANTIN_WANITA
    });
});

export default router;