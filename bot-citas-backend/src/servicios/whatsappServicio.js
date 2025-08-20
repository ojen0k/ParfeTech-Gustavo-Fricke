import axios from "axios";

const BASE = process.env.URL_API_WHATSAPP;
const TOKEN = process.env.TOKEN_WHATSAPP;
const ID_TEL = process.env.ID_TELEFONO_WHATSAPP;

export async function enviarPlantilla({ para, nombrePlantilla, idioma = "es", componentes = [] }) {
  const url = `${BASE}/${ID_TEL}/messages`;
  const payload = {
    messaging_product: "whatsapp",
    to: para,
    type: "template",
    template: {
      name: nombrePlantilla,
      language: { code: idioma },
      components: componentes
    }
  };

  const { data } = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  return data;
}
