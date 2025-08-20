import { Router } from "express";
import { crearPaciente, listarPacientes } from "../controladores/pacienteControlador.js";

const router = Router();
router.post("/", crearPaciente);
router.get("/", listarPacientes);

export default router;
