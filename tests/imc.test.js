const request = require("supertest");
const app = require("../src/index");
const { calcularIMC } = require("../src/imc");

describe("Función calcularIMC", () => {
  test("Calcula correctamente el IMC y categoría", () => {
    expect(calcularIMC(70, 1.75)).toEqual({ imc: 22.86, categoria: "Normal" });
    expect(calcularIMC(50, 1.75).categoria).toBe("Bajo peso");
    expect(calcularIMC(80, 1.75).categoria).toBe("Sobrepeso");
    expect(calcularIMC(95, 1.75).categoria).toBe("Obesidad");
  });

  test("Lanza error si peso o altura no son números positivos", () => {
    expect(() => calcularIMC(-1, 1.7)).toThrow();
    expect(() => calcularIMC(70, 0)).toThrow();
    expect(() => calcularIMC("abc", 1.7)).toThrow();
  });
});

describe("POST /imc", () => {
  test("Devuelve IMC y categoría con datos válidos", async () => {
    const response = await request(app)
      .post("/imc")
      .send({ peso: 70, altura: 1.75 })
      .expect(200);
    
    expect(response.body).toHaveProperty("imc", 22.86);
    expect(response.body).toHaveProperty("categoria", "Normal");
  });

  test("Devuelve 400 si faltan parámetros", async () => {
    const res = await request(app).post("/imc").send({ peso: 70 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("Devuelve 400 si parámetros no son válidos", async () => {
    const res = await request(app).post("/imc").send({ peso: -5, altura: 1.7 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
