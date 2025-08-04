function calcularIMC(peso, altura) {
  if (typeof peso !== "number" || typeof altura !== "number") {
    throw new Error("Peso y altura deben ser números");
  }
  if (peso <= 0 || altura <= 0) {
    throw new Error("Peso y altura deben ser mayores que cero");
  }
  const imc = peso / (altura * altura);

  let categoria = "";
  if (imc < 18.5) {
    categoria = "Bajo peso";
  } else if (imc < 25) {
    categoria = "Normal";
  } else if (imc < 30) {
    categoria = "Sobrepeso";
  } else {
    categoria = "Obesidad";
  }

  return {
    imc: Number(imc.toFixed(2)),
    categoria
  };
}

module.exports = { calcularIMC };
