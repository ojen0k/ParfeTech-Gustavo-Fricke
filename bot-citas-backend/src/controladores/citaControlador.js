import Cita from "../modelos/Cita.js";
import Paciente from "../modelos/Paciente.js";
import Joi from "joi";

const esquemaCrear = Joi.object({
  idPaciente: Joi.string().required(),
  fecha: Joi.date().required(),
  especialidad: Joi.string().required(),
  medico: Joi.string().allow("", null),
  ubicacion: Joi.string().allow("", null),
  idExterno: Joi.string().allow("", null)
});

export async function crearCita(req, res, next) {
  try {
    const { error, value } = esquemaCrear.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const paciente = await Paciente.findById(value.idPaciente);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });

    const cita = await Cita.create({
      paciente: paciente._id,
      fecha: value.fecha,
      especialidad: value.especialidad,
      medico: value.medico,
      ubicacion: value.ubicacion,
      idExterno: value.idExterno,
      estado: "pendiente_confirmacion"
    });

    res.status(201).json(cita);
  } catch (e) { next(e); }
}

export async function actualizarEstadoCita(req, res, next) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const validos = ["programada","pendiente_confirmacion","confirmada","rechazada","reagendar","cancelada"];
    if (!validos.includes(estado)) return res.status(400).json({ error: "Estado inválido" });

    const actualizada = await Cita.findByIdAndUpdate(id, { estado }, { new: true });
    if (!actualizada) return res.status(404).json({ error: "Cita no encontrada" });
    res.json(actualizada);
  } catch (e) { next(e); }
}

export async function listarCitas(req, res, next) {
  try {
    const { desde, hasta, estado } = req.query;
    const filtro = {};
    if (estado) filtro.estado = estado;
    if (desde || hasta) {
      filtro.fecha = {};
      if (desde) filtro.fecha.$gte = new Date(desde);
      if (hasta) filtro.fecha.$lte = new Date(hasta);
    }
    const citas = await Cita.find(filtro).populate("paciente").sort({ fecha: 1 });
    res.json(citas);
  } catch (e) { next(e); }
}
