import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rutaPacientes from "./rutas/pacientes.js";
import rutaCitas from "./rutas/citas.js";
import rutaWebhooks from "./rutas/webhooks.js";
import { manejadorErrores } from "./middlewares/manejadorErrores.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api/pacientes", rutaPacientes);
app.use("/api/citas", rutaCitas);
app.use("/webhooks", rutaWebhooks);

app.use(manejadorErrores);

export default app;
