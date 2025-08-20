import { Router } from "express";
import { crearCita, actualizarEstadoCita, listarCitas } from "../controladores/citaControlador.js";

const router = Router();
router.post("/", crearCita);
router.patch("/:id/estado", actualizarEstadoCita);
router.get("/", listarCitas);

export default router;
