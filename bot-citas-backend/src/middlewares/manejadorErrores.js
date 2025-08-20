export function manejadorErrores(error, req, res, next) {
  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
}
