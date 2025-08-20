import mongoose from "mongoose";

const esquemaCita = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente", required: true },
  fecha: { type: Date, required: true },
  especialidad: { type: String, required: true },
  medico: { type: String },
  ubicacion: { type: String },
  estado: {
    type: String,
    enum: ["programada","pendiente_confirmacion","confirmada","rechazada","reagendar","cancelada"],
    default: "programada"
  },
  idExterno: { type: String }
}, { timestamps: true });

esquemaCita.index({ paciente: 1, fecha: 1 });
esquemaCita.index({ estado: 1 });
esquemaCita.index({ fecha: 1 });

export default mongoose.model("Cita", esquemaCita);
