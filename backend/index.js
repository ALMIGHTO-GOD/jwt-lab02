// Licea Langarica Brian Eduardo
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // 🔥 reemplaza body-parser
app.use(cors());

const SECRET_KEY = "mi_clave_secreta";

// ===============================
// 🔐 Middleware: Verificar Token
// ===============================
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      message: "Token inválido - Brian Eduardo Licea Langarica",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token inválido o expirado - Brian Eduardo Licea Langarica",
      });
    }

    req.user = user;
    next();
  });
}

// ===============================
// 👤 Usuario de prueba
// ===============================
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
  },
];
// ===============================
// 🔑 LOGIN
// ===============================
app.post("/login", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "No se envió body",
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Faltan datos (username o password)",
    });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "5m" },
    );

    return res.json({ token });
  } else {
    return res.status(401).json({
      message: "Credenciales inválidas - Brian Eduardo Licea Langarica",
    });
  }
});

// ===============================
// 🔒 RUTA PROTEGIDA
// ===============================
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Bienvenido al dashboard - Brian Eduardo Licea Langarica",
    user: req.user,
  });
});

// ===============================
// 🌐 RUTA PÚBLICA
// ===============================
app.get("/public", (req, res) => {
  res.json({
    message: "Contenido público - Brian Eduardo Licea Langarica",
  });
});

// ===============================
// 🏠 HOME
// ===============================
app.get("/", (req, res) => {
  res.send("Hola Mundo Brian Eduardo Licea Langarica");
});

// ===============================
// 🚀 SERVER
// ===============================
app.get("/steal", (req, res) => {
  const stolenToken = req.query.token || "[sin token]";
  const notification = `Token robado: ${stolenToken} - Brian Eduardo Licea Langarica`;
  console.log("token robado", stolenToken);
  res.json({ notification });
});

app.listen(4000, () => {
  console.log(
    "Servidor corriendo - Brian Eduardo Licea Langarica - en http://localhost:4000",
  );
});
