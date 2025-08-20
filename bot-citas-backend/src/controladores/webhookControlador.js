export async function verificarWebhook(req, res) {
  const modo = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const reto = req.query["hub.challenge"];

  if (modo === "subscribe" && token === process.env.TOKEN_VERIFICACION_WEBHOOK) {
    return res.status(200).send(reto);
  }
  return res.sendStatus(403);
}

export async function recibirWebhook(req, res, next) {
  try {
    // Seccion de wsp:
    // - Guardará el mensaje entrante en RegistroMensaje
    // - Detectar si el texto es “1” (confirmar) o “2” (rechazar) y actualizar la Cita
    res.sendStatus(200);
  } catch (e) { next(e); }
}
