import express from "express";
import About from "../pages/About";

const router = express.Router();

// Определяем маршрут для About
router.get("/about", (req, res) => {
    res.send("<h1>О нас</h1><p>Тут будет информация о проекте.</p>");
});

export default router;
