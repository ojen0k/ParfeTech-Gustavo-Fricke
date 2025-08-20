import { Router } from "express";
import { verificarWebhook, recibirWebhook } from "../controladores/webhookControlador.js";

const router = Router();
router.get("/whatsapp", verificarWebhook);
router.post("/whatsapp", recibirWebhook);

export default router;
