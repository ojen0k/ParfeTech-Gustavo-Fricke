import mongoose from "mongoose";

const esquemaRegistroMensaje = new mongoose.Schema({
  direccion: { type: String, enum: ["saliente","entrante"], required: true },
  para: String,
  desde: String,
  canal: { type: String, enum: ["whatsapp"], default: "whatsapp" },
  cargaUtil: { type: Object }, // payload crudo de wsp
  estadoEnvio: { type: String, enum: ["en_cola","enviado","entregado","leido","fallido"] },
  cita: { type: mongoose.Schema.Types.ObjectId, ref: "Cita" },
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
  tipo: { type: String, enum: ["plantilla","texto","interactivo","estado"], default: "texto" }
}, { timestamps: true });

esquemaRegistroMensaje.index({ paciente: 1, createdAt: -1 });
esquemaRegistroMensaje.index({ cita: 1 });
esquemaRegistroMensaje.index({ createdAt: -1 });

export default mongoose.model("RegistroMensaje", esquemaRegistroMensaje);
