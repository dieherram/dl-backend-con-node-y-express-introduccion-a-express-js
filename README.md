# Desafío - Mi Repertorio

En este desafío, he desarrollado una aplicación backend con Node.js y Express que gestiona el repertorio de canciones para una escuela de música.

## Descripción 📋

La escuela de música "E-Sueño" motiva a sus estudiantes de canto a presentarse en vivo y ha organizado un calendario de presentaciones. Para gestionar las canciones que cantarán sus estudiantes, se ha creado una aplicación tipo CRUD que permite agregar, modificar, eliminar y listar canciones almacenadas en un archivo JSON local.

### Archivos del Proyecto 📂

- **index.js**: Archivo principal del servidor que gestiona las rutas y las operaciones CRUD.
- **index.html**: Interfaz de usuario para interactuar con la aplicación.
- **repertorio.json**: Archivo JSON que almacena el repertorio de canciones.
- **package.json**: Archivo que define las dependencias del proyecto.

### Funcionalidades 🔧

- **Agregar Canción**: Permite agregar una nueva canción al repertorio.
- **Listar Canciones**: Muestra todas las canciones registradas en el repertorio.
- **Modificar Canción**: Permite editar los detalles de una canción existente.
- **Eliminar Canción**: Elimina una canción del repertorio.

## Requerimientos del Desafío 🎯

1. Levantar un servidor local usando Express Js (2 Puntos).
2. Devolver una página web como respuesta a una consulta GET (2 Puntos).
3. Ofrecer diferentes rutas con diferentes métodos HTTP que permitan las operaciones CRUD de datos alojados en un archivo JSON local (3 Puntos).
4. Manipular los parámetros obtenidos en la URL (1 Punto).
5. Manipular el payload de una consulta HTTP al servidor (2 Puntos).

## Uso de la Aplicación 🚀

### Instalación

Para instalar las dependencias y ejecutar la aplicación, utiliza los siguientes comandos:

```bash
npm install
npm run dev
```

### Endpoints

- POST /canciones: Recibe los datos de una canción y la agrega al repertorio.
- GET /canciones: Devuelve un JSON con las canciones registradas.
- PUT /canciones/
: Recibe los datos de una canción para actualizarla.
- DELETE /canciones/
: Elimina una canción del repertorio por su ID.

## Código 🧩
```javascript
const express = require("express");
const app = express();
const fs = require("fs");

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/canciones", (req, res) => {
    const { id, titulo, artista, tono } = req.body;
    if (!id || !titulo || !artista || !tono) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
        canciones.push({ id, titulo, artista, tono });
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(201).json({ message: "Canción agregada" });
    } catch (error) {
        res.status(500).json({ error: `Error al guardar la canción ${error}` });
    }
});

app.get("/canciones", (req, res) => {
    try {
        const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
        res.status(200).json(repertorio);
    } catch (error) {
        res.status(500).json({ error: `Error: ${error}` });
    }
});

app.put("/canciones/:id", (req, res) => {
    const { titulo, artista, tono } = req.body;
    if (!titulo || !artista || !tono) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const { id } = req.params;
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
        const index = canciones.findIndex(c => c.id == id);
        canciones[index] = { id, titulo, artista, tono };
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(200).json({ message: "Canción modificada" });
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar información: ${error}` });
    }
});

app.delete("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
        const index = canciones.findIndex((p) => p.id == id);
        canciones.splice(index, 1);
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(200).json({ message: "Canción eliminada" });
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar la canción: ${error}` });
    }
});
```

## Tecnologías Utilizadas 💻

- Node.js
- Express.js
- File System (fs)
- Bootstrap (para el frontend)

## Mejoras Futuras 🚀

Para futuras iteraciones, planeo:

- Implementar autenticación y autorización.
- Mejorar la interfaz de usuario.
- Añadir validaciones más robustas para los datos de entrada.