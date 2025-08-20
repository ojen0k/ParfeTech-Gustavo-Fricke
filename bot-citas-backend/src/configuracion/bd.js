import mongoose from "mongoose";

export async function conectarBD(uri) {
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
}
