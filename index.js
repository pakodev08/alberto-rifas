const express = require("express");
require("dotenv").config();
const { check } = require("express-validator");
const { model, Schema, mongoose } = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const { validarCampos } = require("./middlewares/validar-campos.js");

const PORT = process.env.PORT || 4005;

const app = express();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BD_CNN, {});

    console.log(`DB Online`);
  } catch (error) {
    console.log(error);
  }
};

dbConnection();
console.log(`DB Online`);
app.use(express.json());
app.use(cors());

// const corsOptions = {
//   origin: "tests-production-151a.up.railway.app/", // Cambia esto por tu dominio
//   methods: "GET,POST,PUT,DELETE,OPTIONS",
//   allowedHeaders: "Content-Type,Authorization",
// };

// app.use(cors(corsOptions));

const Usuarios = Schema({
  name: {
    type: String,
    required: true,
    // minlength: 3,
    // maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    // minlength: 10,
  },
  amount: {
    type: String,
    required: true,
    // min: 0,
    // max: 1000,
  },
  tickets: {
    type: Array,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
});
const Users = model("Users", Usuarios);

//* GENERANDO TICKETS DESDE LA BASE DE DATOS
const itemSchema = Schema({
  id: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});

const Item = model("Item", itemSchema);

const numerosInitialValue = 10000;

// Endpoint para generar y guardar los elementos
app.get("/items", async (req, res) => {
  try {
    console.log(`Entro en el try`);

    const existingItems = await Item.find();

    if (existingItems.length > 0) {
      return res.status(200).json(existingItems);
    }

    const generateItems = () => {
      const newItems = [];
      for (let i = 1; i <= numerosInitialValue; i++) {
        newItems.push({
          id: crypto.randomUUID(),
          value: String(i).padStart(4, "0"),
          cantidad: 1,
          precio: 20,
        });
      }
      return newItems;
    };
    const numeross = generateItems();
    await Item.insertMany(numeross);
    res.status(200).json({
        message: `Server funcionando`,
        numeross
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al procesar la solicitud" });
  }
});

app.post(
  "/alo",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("phone", "El numero de telefono es obligatorio").not().isEmpty(),
    check("amount", "El monto es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  async (req, res) => {
    try {
      const { name, phone, amount, tickets, reference } = req.body; // Extrae 'selectedTicket' del cuerpo de la solicitud

      // 1. Crear el usuario
      const usuario = new Users({ name, phone, amount, tickets, reference });
      await usuario.save();

      const idsToDelete = tickets.map((ticket) => ticket.id); // Asumiendo que cada ticket tiene un campo 'id'
      await Item.deleteMany({ id: { $in: idsToDelete } }); // Eliminar los elementos de Item

      res.status(201).json({
        ok: true,
        message: "Usuario creado correctamente y tickets eliminados de Item",
      });

      console.log(`Usuario creado y tickets eliminados:`);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({
        ok: false,
        message: "Hable con el administrador",
      });
    }
  }
);

app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(201).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

app.get("/ticketselected", async (req, res) => {
  try {
    const users = await Users.find(); // Obtiene todos los usuarios
    res.status(200).json(users); // Devuelve los usuarios en formato JSON
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
