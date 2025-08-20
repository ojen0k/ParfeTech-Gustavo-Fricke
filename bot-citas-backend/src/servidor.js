import "dotenv/config";
import { conectarBD } from "./configuracion/bd.js";
import app from "./app.js";

const PUERTO = process.env.PUERTO || 4000;

await conectarBD(process.env.MONGO_URI);
app.listen(PUERTO, () => console.log(`🚀 Servidor listo en http://localhost:${PUERTO}`));
