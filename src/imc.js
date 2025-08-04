export function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  let categoria;

  if (imc < 18.5) categoria = 'Bajo peso';
  else if (imc < 25) categoria = 'Normal';
  else if (imc < 30) categoria = 'Sobrepeso';
  else categoria = 'Obesidad';

  return { imc: parseFloat(imc.toFixed(2)), categoria };
}
