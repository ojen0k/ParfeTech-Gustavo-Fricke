import mongoose from "mongoose";

const esquemaPaciente = new mongoose.Schema({
  nombre: { type: String, required: true },
  rut: { type: String },
  telefono: { type: String, required: true }, // E.164: +569...
  correo: { type: String },
  metadatos: { type: Object }
}, { timestamps: true });

esquemaPaciente.index({ telefono: 1 }, { unique: true });
esquemaPaciente.index({ nombre: "text", rut: "text", correo: "text" });

export default mongoose.model("Paciente", esquemaPaciente);
