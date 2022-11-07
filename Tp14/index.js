mostrarNombres();

function addName() {
  let nombre = document.getElementById("nombre").value;
  let legajo = parseInt(document.getElementById("legajo").value);

  if (localStorage.length === 0) {
    localStorage.setItem(legajo, nombre);
  } else {
    for (i = 0; i < localStorage.length; i++) {
      let leg = parseInt(localStorage.key(i));
      console.log(leg);
      console.log(legajo);
      if (leg === legajo) {
        console.log("legajo repetido");
      } else {
        localStorage.setItem(legajo, nombre);
      }
    }
  }
}

function mostrarNombres() {
  for (i = 0; i < localStorage.length; i++) {
    let legajo = localStorage.key(i);
    let nombre = localStorage.getItem(legajo);
    document.getElementById(
      "lista"
    ).innerHTML += `<div> ${legajo} - ${nombre} <button class="deletebutton" onclick="clearone(${legajo});">X</button> </div>`;
  }
}

function clean() {
  localStorage.clear();
  document.getElementById(
    "lista"
  ).innerHTML = `<div> No hay datos cargados </div>`;
}

function clearone(legajo) {
  localStorage.removeItem(legajo);
}
