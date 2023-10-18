const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const employeesRoutes = require("./routes/employees.routes");
const departmentsRoutes = require("./routes/departments.routes");
const productsRoutes = require("./routes/products.routes");

const url = "mongodb://localhost:27017";
const dbName = "companyDB";

async function startServer() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Successfully connected to the database");
    const db = client.db(dbName);

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use("/api", employeesRoutes);
    app.use("/api", departmentsRoutes);
    app.use("/api", productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: "Not found..." });
    });

    app.listen("8000", () => {
      console.log("Server is running on port: 8000");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    // После завершения работы с базой данных закрываем соединение
    await client.close();
  }
}

startServer();
