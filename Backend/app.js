import bodyParser from "body-parser";
import express from "express";
import fs from "node:fs/promises";

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/patients", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const fileContent = await fs.readFile("./data/patient.json");

  const patientData = JSON.parse(fileContent);

  res.status(200).json({ patients: patientData });
});
app.get("/patient/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const fileContent = await fs.readFile("./data/patient.json");
  const patientData = JSON.parse(fileContent);
  const { id } = req.params;
  const patient = patientData.find((patient) => patient.id === id);
  if (!patient) {
    return res.status(404).json({ message: "Patient Not Found." });
  }
  res.status(200).json({ patient });
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
