const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const listadoAlumnos = document.getElementById("listadoAlumnos");
const listadoLibros = document.getElementById("listadoLibros");
const busqueda = document.getElementById("buscar");
const listar = document.getElementById("listar");
const nombre = document.getElementById("nombre");
const dni = document.getElementById("dni");
const direccion = document.getElementById("direccion");

listar.hidden = true;
let editLibroId = 0;
let editAlumnoId = 0;
let librosPrestados = [];
let librosNoDevueltos = [];

//json-server -w db.json

// ----------------------------------------- FUNCIONES LIBROS ------------------------------------

async function guardarLibros() {
  try {
    response = await axios.post("http://localhost:3000/libros", {
      titulo: titulo.value,
      autor: autor.value,
    });

    document.getElementById("autor").value = "";
    document.getElementById("titulo").value = "";
  } catch (error) {
    console.log(error);
  }
}

const listarLibros = async () => {
  let noPrestados = [];
  let prestados = [];

  try {
    listadoLibros.innerHTML = `<div></div>`;
    const response = await axios.get("http://localhost:3000/libros");
    let copiaresp = response.data;
    const prestamos = await axios.get("http://localhost:3000/prestamos");

    for (i = 0; i < prestamos.data.length; i++) {
      for (j = 0; j < response.data.length; j++) {
        if (prestamos.data[i].librosId === response.data[j].id) {
          console.log(prestamos.data[i].librosId);
          noPrestados = copiaresp.filter(
            (e) => e.id != prestamos.data[i].librosId
          );
          copiaresp = noPrestados;
          prestados.push(response.data[j]);
        }
      }
    }

    noPrestados.map(
      (e) =>
        (listadoLibros.innerHTML += `<div class="libro"> <p>${e.titulo} - ${e.autor}</p><button class="btn-delete" onclick="borrarLibro(${e.id});">X</button> <button onclick="mostrarLibro(${e.id});" class="button--libro">Edit</button></div>`)
    );
    prestados.map(
      (e) =>
        (listadoLibros.innerHTML += `<div class="libroPrestado"> <p>${e.titulo} - ${e.autor}</p> <p>Libro prestado</p>  <button onclick="mostrarLibro(${e.id});" class="button">Edit</button></div>`)
    );
  } catch (error) {
    console.log(error);
  }
};

const borrarLibro = async (id) => {
  try {
    await axios.delete("http://localhost:3000/libros/" + id);
    console.log("libro borrado");
  } catch (error) {
    console.log(error);
  }
};

const mostrarLibro = async (id) => {
  editLibroId = id;
  document.getElementById("listar").className = "container__edit2";
  document.getElementById("listadoLibros").className = "container__edit2";
  try {
    const response = await axios.get("http://localhost:3000/libros/" + id);
    listadoLibros.innerHTML = `<div class="libro2"><p>${response.data.titulo} - ${response.data.autor}</p></div>`;
    document.getElementById("tituloEdit").value = response.data.titulo;
    document.getElementById("autorEdit").value = response.data.autor;
  } catch (error) {}
};

const actualizarLibro = async () => {
  editTitulo = document.getElementById("tituloEdit").value;
  editAutor = document.getElementById("autorEdit").value;
  try {
    await axios.put("http://localhost:3000/libros/" + editLibroId, {
      titulo: editTitulo,
      autor: editAutor,
    });
  } catch (error) {}
};

// -------------------------------------------------FIN FUNCIONES LIBROS --------------------------
// ---------------------------------------------FUNCIONES ALUMNOS ---------------------------------

const cargarAlumno = async () => {
  try {
    await axios.post("http://localhost:3000/alumnos", {
      nombre: nombre.value,
      dni: dni.value,
      direccion: direccion.value,
    });

    nombre.value = "";
    dni.value = "";
    direccion.value = "";
  } catch (error) {
    console.log(error);
  }
};

const listarAlumnos = async () => {
  const prestamo = [];
  const deudores = [];
  const fechaHoy = new Date();
  try {
    listadoAlumnos.innerHTML = `<div></div>`;
    const response = await axios.get("http://localhost:3000/alumnos");
    const prestamos = await axios.get("http://localhost:3000/prestamos");
    let copia = response.data;
    let libres = [];
    let liberado = [];

    for (i = 0; i < prestamos.data.length; i++) {
      for (j = 0; j < response.data.length; j++) {
        const fechaDevolucion = new Date(prestamos.data[i].fechadevolucion);
        if (prestamos.data[i].alumnosId == response.data[j].id) {
          liberado = copia.filter((e) => e.id != prestamos.data[i].alumnosId);
          copia = liberado;
          libres.push(prestamos.data[i].alumnosId);
          if (fechaHoy.getTime() > fechaDevolucion.getTime()) {
            deudores.push(response.data[j]);
            librosNoDevueltos.push(prestamos.data[i].librosId);
          } else {
            prestamo.push(response.data[j]);
            librosPrestados.push(prestamos.data[i].librosId);
          }
        }
      }
    }

    console.log("prestamo", prestamo);
    console.log("deudores", deudores);
    console.log("libres", liberado);

    liberado.map(
      (e) =>
        (listadoAlumnos.innerHTML += `<div class="alumnoLibre">${e.nombre} - ${e.dni} - ${e.direccion}<button class="btn-delete" onclick="eliminarAlumno(${e.id});">X</button> <button class="button--alumno" onclick="mostrarAlumno(${e.id});" class="button">Edit</button></div> `)
    );
    prestamo.map(
      (e) =>
        (listadoAlumnos.innerHTML += `<div class="alumnoPrestamo">${e.nombre} - ${e.dni} - ${e.direccion} <p>Libro Prestado</p><button onclick="mostrarAlumno(${e.id});" class="button">Edit</button></div>`)
    );
    deudores.map(
      (e) =>
        (listadoAlumnos.innerHTML += `<div class="alumnoDeudor">${e.nombre} - ${e.dni} - ${e.direccion} <p>Libro en Deuda</p> <button onclick="mostrarAlumno(${e.id});" class="button">Edit</button></div>`)
    );
  } catch (error) {
    console.log(error);
  }
};

const mostrarAlumno = async (id) => {
  editAlumnoId = id;
  document.getElementById("listadoAlumnos").className = "container__edit2";
  document.getElementById("alumnoEditar").className = "container__edit2";
  try {
    const response = await axios.get("http://localhost:3000/alumnos/" + id);
    document.getElementById("alumnoEditar").className =
      "container__alumno__edit2";
    listadoAlumnos.innerHTML = `<div class="alumno">${response.data.nombre} - ${response.data.dni} - ${response.data.direccion} </div>`;
    document.getElementById("nombreEditAlumno").value = response.data.nombre;
    document.getElementById("DNIEditAlumno").value = response.data.dni;
    document.getElementById("direccionEditAlumno").value =
      response.data.direccion;
  } catch (error) {
    console.log(error);
  }
};

const eliminarAlumno = async (id) => {
  try {
    await axios.delete("http://localhost:3000/alumnos/" + id);
  } catch (error) {
    console.log(error);
  }
};

const actualizarAlumno = async () => {
  const nombre = document.getElementById("nombreEditAlumno").value;
  const dni = document.getElementById("DNIEditAlumno").value;
  const direccion = document.getElementById("direccionEditAlumno").value;
  try {
    await axios.put("http://localhost:3000/alumnos/" + editAlumnoId, {
      nombre: nombre,
      dni: dni,
      direccion: direccion,
    });
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------FIN FUNCIONES ALUMNOS --------------------------------

// ------------------------------------ FUNCIONES PRESTRAMOS --------------------------------

const registroPrestamo = async () => {
  console.log(librosNoDevueltos, "librosnoDEVUELTOS");
  console.log(librosPrestados, "librosPRESTADOS");
  try {
    const response = await axios.get("http://localhost:3000/prestamos");
    console.log(response.data);
    response.data.map(
      (e) =>
        (document.getElementById(
          "registroPrestamos"
        ).innerHTML += `<div class="registro">   Prestamo n°: ${e.id} fecha de entrega: ${e.fecha} fecha de devolucion:${e.fechadevolucion} <button class="button" onclick="devolucionLibro(${e.id});">Entrega</button> </div>`)
    );
  } catch (error) {}
};

const guardarPrestamo = async () => {
  const fecha = document.getElementById("fechaEntrega").value;
  const fechaDev = document.getElementById("fechaDev").value;
  const idAlum = document.getElementById("idAlum").value;
  const idLib = document.getElementById("idLib").value;
  try {
    await axios.post("http://localhost:3000/prestamos", {
      fecha: fecha,
      fechadevolucion: fechaDev,
      librosId: idLib,
      alumnosId: idAlum,
    });

    document.getElementById("fechaEntrega").value = "";
    document.getElementById("fechaDev").value = "";
    document.getElementById("idAlum").value = "";
    document.getElementById("idLib").value = "";
  } catch (error) {
    console.log(error);
  }
};

const devolucionLibro = async (id) => {
  try {
    const response = await axios.get("http://localhost:3000/prestamos/" + id);
    localStorage.setItem(response.data.id, JSON.stringify(response.data));
    await axios.delete("http://localhost:3000/prestamos/" + id);
  } catch (error) {}
};

const listarLibrosDevueltos = async () => {
  try {
    document.getElementById("devolucionLibros").innerHTML += `<div></div>`;
    if (localStorage.length == 0) {
      document.getElementById(
        "devolucionLibros"
      ).innerHTML = `<div>NO hay libros devueltos</div>`;
    }

    for (i = 0; i < localStorage.length; i++) {
      let id = localStorage.key(i);
      let response = JSON.parse(localStorage.getItem(id));

      let libroId = response.librosId;

      const libro = await axios.get("http://localhost:3000/libros/" + libroId);
      document.getElementById(
        "devolucionLibros"
      ).innerHTML += `<div class="registro--devolucion">${libro.data.titulo} - ${libro.data.autor} - Del pedido N°: ${id}</div>`;
    }
  } catch (error) {
    console.log(error);
  }
};

const librosPrestadosActivos = async () => {
  try {
    const response = await axios.get("http://localhost:3000/libros");

    for (i = 0; i < response.data.length; i++) {
      for (j = 0; j < librosPrestados.length; j++) {
        console.log(response.data[i].id);
        console.log(librosPrestados[j]);
        if (response.data[i].id == librosPrestados[j]) {
          document.getElementById(
            "librosPrestados"
          ).innerHTML += `<div class="registro--prestado">${response.data[i].titulo} - ${response.data[i].autor} </div>`;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const librosNoDevueltosActivos = async () => {
  try {
    const response = await axios.get("http://localhost:3000/libros");

    for (i = 0; i < response.data.length; i++) {
      for (j = 0; j < librosNoDevueltos.length; j++) {
        if (response.data[i].id == librosNoDevueltos[j]) {
          document.getElementById(
            "librosNoDevueltos"
          ).innerHTML += `<div class="registro--nodevueltos">${response.data[i].titulo} - ${response.data[i].autor} </div>`;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------FIN FUNCIONES PRESTRAMOS --------------------------------

// -------------------------------------Fin Funciones ---------------------------------------

const buscar = async () => {
  const responseLibros = await axios.get("http://localhost:3000/libros");
  const responseAlumnos = await axios.get("http://localhost:3000/alumnos");
  const libros = await responseLibros.data.filter((e) => {
    const regex = new RegExp(busqueda.value, "gi");
    return e.titulo.match(regex);
  });

  document.getElementById("busquedaL").innerHTML = `<div></div>`;
  document.getElementById("busquedaA").innerHTML = `<div></div>`;

  libros.map(
    (e) =>
      (document.getElementById(
        "busquedaL"
      ).innerHTML += `<div>${e.titulo}</div>`)
  );

  const alumnos = await responseAlumnos.data.filter((e) => {
    const regex = new RegExp(busqueda.value, "gi");
    return e.nombre.match(regex);
  });

  alumnos.map(
    (e) =>
      (document.getElementById(
        "busquedaA"
      ).innerHTML += `<div>${e.nombre}</div>`)
  );
};
