import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

console.log("🟣 Paso 1: Cargando dotenv...");
dotenv.config();

console.log("🟢 Paso 2: Verificando clave...");
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ No se encontró la clave OPENAI_API_KEY");
  process.exit(1);
}

console.log("🟢 Paso 3: Inicializando OpenAI...");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log("🟢 Paso 4: Configurando servidor...");
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

console.log("🟢 Paso 5: Listo para recibir POST en /api/chat");
app.post("/api/chat", async (req, res) => {
  console.log("📨 POST recibido en /api/chat");
  const { message } = req.body;
  console.log("📝 Mensaje recibido:", message);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    const reply = completion.choices[0].message.content;
    console.log("✅ Respuesta de GPT:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("❌ Error llamando a OpenAI:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Error al contactar con OpenAI" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://127.0.0.1:${PORT}`);
});

import path from "path";
import { fileURLToPath } from "url";

// Estas dos líneas son NECESARIAS para usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Ruta para el index.html si alguien entra directo a localhost:3000/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
