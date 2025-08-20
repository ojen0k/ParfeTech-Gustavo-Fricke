import Paciente from "../modelos/Paciente.js";
import Joi from "joi";

const esquemaValidacion = Joi.object({
  nombre: Joi.string().required(),
  rut: Joi.string().allow("", null),
  telefono: Joi.string().pattern(/^\+\d{7,15}$/).required(),
  correo: Joi.string().email().allow("", null),
  metadatos: Joi.object().optional()
});

export async function crearPaciente(req, res, next) {
  try {
    const { error, value } = esquemaValidacion.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const paciente = await Paciente.create(value);
    res.status(201).json(paciente);
  } catch (e) { next(e); }
}

export async function listarPacientes(req, res, next) {
  try {
    const { buscar } = req.query;
    let filtro = {};
    if (buscar) filtro.$text = { $search: buscar };
    const pacientes = await Paciente.find(filtro).sort({ createdAt: -1 });
    res.json(pacientes);
  } catch (e) { next(e); }
}
