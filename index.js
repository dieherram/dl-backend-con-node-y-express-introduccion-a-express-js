const express = require("express");
const app = express();
const fs = require("fs");

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// ● POST /canciones : Recibe los datos correspondientes a una canción y la agrega al repertorio.
app.post("/canciones", (req, res) => {
    const { id, titulo, artista, tono } = req.body;
    if (!id || !titulo || !artista || !tono) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
        canciones.push({ id, titulo, artista, tono });
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(201).json({ message: "Canción agregada" })
    } catch (error) {
        res.status(500).json({ error: `Error al guardar la canción ${error}` });
    }
});

// ● GET /canciones : Devuelve un JSON con las canciones registradas en el repertorio
app.get("/canciones", (req, res) => {
    try {
        const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
        res.status(200).json(repertorio);
    } catch (error) {
        res.status(500).json({ error: `Error: ${error}` });
    }
});

// ● PUT /canciones/:id : Recibe los datos de una canción que se desea editar y la actualiza manipulando el JSON local.
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
        res.status(200).json({ message: "Canción modificada" })
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar información: ${eror}` })
    }

});

// ● DELETE /canciones/:id : Recibe por queryString el id de una canción y la elimina del repertorio.
app.delete("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
        const index = canciones.findIndex((p) => p.id == id);
        canciones.splice(index, 1);
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(200).json({ message: "Canción eliminada" })
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar la canción: ${eror}` })
    }

});
