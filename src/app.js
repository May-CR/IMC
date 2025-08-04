import express from 'express';
import { calcularIMC } from './imc.js';

const app = express();
app.use(express.json());

app.post('/imc', (req, res) => {
  const { peso, altura } = req.body;
  if (!peso || !altura) return res.status(400).json({ error: 'Peso y altura requeridos' });

  const resultado = calcularIMC(peso, altura);
  res.json(resultado);
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

export default app;
