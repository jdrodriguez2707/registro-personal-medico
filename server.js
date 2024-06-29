import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { createConnection } from "mysql2";
const app = express();
const port = 3000;

// Obtenemos la ruta absoluta de nuestro proyecto
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Servimos los archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Leer el body de las peticiones POST con formato JSON (o sea, la data que enviamos desde el frontend)
app.use(json());

// Conexión a la base de datos
const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "registro_personal_medico",
});

// Comprobamos que la conexión a la base de datos sea exitosa
connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos");
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

// Crear un endpoint para registrar un nuevo empleado en la base de datos
app.post("/addEmployee", (req, res) => {
  const { username, lastname, occupation } = req.body;

  // Validamos que los datos no estén vacíos
  if (!username || !lastname || !occupation) {
    return res.status(400).json({ message: "Los campos son requeridos" });
  }

  // Insertamos el nuevo empleado en la base de datos
  connection.query(
    "INSERT INTO personal_medico (nombre, apellido, cargo) VALUES (?, ?, ?)",
    [username, lastname, occupation],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al registrar el empleado" });
      }
      res.json({ success: true, message: "Registro exitoso" });
    }
  );
});

// Crear un endpoint para obtener los empleados de la base de datos
app.get("/getEmployees", (req, res) => {
  // Hacemos una consulta a la base de datos para obtener todos los empleados
  connection.query("SELECT * FROM personal_medico WHERE estado = 'activo'", (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener los empleados" });
    }
    res.send(results);
  });
});

// Crear un endpoint para eliminar un empleado de la base de datos por su id
app.delete("/deleteEmployee/:id", (req, res) => {
  const id = req.params.id;

  // Validamos que el id no esté vacío
  if (!id) {
    return res.status(400).json({ message: "El id es requerido" });
  }

  // Crea una consulta para actualizar el estado del empleado a inactivo
  connection.query(
    "UPDATE personal_medico SET estado = 'inactivo' WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al eliminar el empleado" });
      }
      res.json({ success: true, message: "Empleado eliminado exitosamente" });
    }
  );
});

// Crear un endpoint para registrar la fecha y hora de ingreso y salida de los empleados
app.post("/addDateTime", (req, res) => {
  const { employeeId, entry, exit } = req.body;

  // console.log("Datos recibidos:", employeeId, entry, exit);

  // Validamos que los datos no estén vacíos
  if (!employeeId || !entry || !exit) {
    return res.status(400).json({ message: "Los campos son requeridos" });
  }

  // Insertamos la fecha y hora en la base de datos para el empleado seleccionado en el frontend
  connection.query(
    "INSERT INTO registro_ingresos_salidas (id_empleado, fecha_hora_ingreso, fecha_hora_salida) VALUES (?, ?, ?)",
    [employeeId, entry, exit],
    (error, results) => {
      if (error) {
        console.error("Error en la base de datos:", error);
        return res
          .status(500)
          .json({ message: "Error al registrar la fecha y hora" });
      }
      res.json({ success: true, message: "Registro exitoso" });
    }
  );
});

// Crear un endpoint para obtener los registros de ingresos y salidas de los empleados
app.get("/getDateTime", (req, res) => {
  // Hacemos una consulta a la base de datos para obtener los registros de ingresos y salidas de los empleados con sus nombres
  const query = `
    SELECT 
      r.id_empleado,
      p.nombre,
      p.apellido,
      r.fecha_hora_ingreso,
      r.fecha_hora_salida
    FROM 
      registro_ingresos_salidas r
    JOIN 
      personal_medico p 
    ON 
      r.id_empleado = p.id
    ORDER BY 
      r.fecha_hora_ingreso DESC
  `;
  connection.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener los registros" });
    }
    res.send(results);
  });
});

// Ruta para servir el archivo index.html en la raíz del servidor
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Iniciamos el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
