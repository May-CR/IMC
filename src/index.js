const express = require("express");
const { calcularIMC } = require("./imc");

const app = express();
app.use(express.json());

app.post("/imc", (req, res) => {
  try {
    const { peso, altura } = req.body;
    if (peso === undefined || altura === undefined) {
      return res.status(400).json({ error: "Debe enviar peso y altura" });
    }

    const resultado = calcularIMC(Number(peso), Number(altura));
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

module.exports = app;
