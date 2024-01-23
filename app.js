const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
  { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
  { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
  { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
  { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
  { id: 6, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
  { id: 7, nombre: 'Birdie', edad: 29, lugarProcedencia: 'Inglaterra' },
  { id: 8, nombre: 'Lee', edad: 35, lugarProcedencia: 'China' },
  { id: 9, nombre: 'Mike', edad: 45, lugarProcedencia: 'Estados Unidos' },
  { id: 10, nombre: 'Vega', edad: 26, lugarProcedencia: 'España' },
];

// READ
app.get('/', (req, res) => {
    res.send(`
      <h1>Lista de usuarios</h1>
      <ul>
        ${usuarios
          .map(
            (usuario) =>
              `<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Lugar de Procedencia: ${usuario.lugarProcedencia}
                <form action="/usuarios/${usuario.nombre}" method="post">
                  <input type="hidden" name="_method" value="DELETE">
                  <button type="submit">Eliminar usuario</button>
                </form>
              </li>`
          )
          .join('')}
      </ul>

    <form action="/usuarios" method="post">
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" name="nombre" required>
      <label for="edad">Edad</label>
      <input type="number" id="edad" name="edad" required>
      <label for="lugarProcedencia">Lugar de Procedencia</label>
      <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
      <button type="submit">Agregar usuario</button>
    </form>
    <a href="/usuarios">Usuarios JSON</a>
  `);
});

// CREATE
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    edad: req.body.edad,
    lugarProcedencia: req.body.lugarProcedencia,
  };
  usuarios.push(nuevoUsuario);
  res.redirect('/usuarios');
});

// GET 
app.get('/usuarios/:nombre', (req, res) => {
  const usuario = usuarios.find((u) => u.nombre === req.params.nombre);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});



// DELETE 
app.delete('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    usuarios = usuarios.filter((u) => u.nombre !== nombreUsuario);
    res.send(`Usuario ${nombreUsuario} eliminado exitosamente`);
  });



app.listen(3000, () => {
  console.log('Express está escuchando en el puerto 3000');
});


/*

app.put('/usuarios/:nombre', {req, res) => {
  const nombreUsuario = req.params.nombre;
  const index = usuarios.findIndex{usuario => usuario.nombre === nombreUsuario)

if(index !== -1) {
  usuarios[index] = {id: usuarios[index].id, ...req.body}
  res.json(usuarios)
} else{
  res.status(404).json({mensaje: "usuario no encontrado"})
}

})
*/

/*

const express = require('express')
const app = express()


let usuarios = [
  { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
  { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
  { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
  { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
  { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    edad: req.body.edad,
    lugarProcedencia: req.body.lugarProcedencia
  }
  usuarios.push(nuevoUsuario)
  res.redirect("/usuarios")
})

app.get('/usuarios/:nombre', (req, res) => {
  const nombre = req.params.nombre
  const usuario = usuarios.find(user => user.nombre === nombre)

  if(!usuario) {
    res.status(404).json({mensaje: "usuario no encontrado"})
  } else {
    res.json(usuario)
  }
})

app.put('/usuarios/:nombre', (req, res) => {
  const nombreUsuario = req.params.nombre;
  const index = usuarios.findIndex(usuario => usuario.nombre === nombreUsuario)

  if(index === -1) {
    res.status(404).json({mensaje: "usuario no encontrado"})
  } else {
    usuarios[index] = {id: usuarios[index].id, ...req.body}
    res.json(usuarios)
  }
})


app.delete('/usuarios/:nombre', (req, res) => {
  const nombre = req.params.nombre
  usuarios = usuarios.filter(usuario => usuario.nombre !== nombre)
  res.json({mensaje: 'Usuario eliminado'}) 
})


app.listen(3000, () => {
  console.log('Express está escuchando en el puerto http://localhost:3000')
})*/