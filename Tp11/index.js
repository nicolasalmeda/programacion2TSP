function comprobar() {
  let x = parseInt(document.getElementById("valor1").value);
  let y = parseInt(document.getElementById("valor2").value);
  if (isNaN(x) && typeof isNaN(y)) {
    alert("Debe escribir un Número");
  }
}

function sumar() {
  let x = parseInt(document.getElementById("valor1").value);
  let y = parseInt(document.getElementById("valor2").value);
  comprobar();
  return (document.getElementById("resultado").innerHTML = x + y);
}

function restar() {
  let x = parseInt(document.getElementById("valor1").value);
  let y = parseInt(document.getElementById("valor2").value);
  comprobar();
  document.getElementById("resultado").innerHTML = x - y;
}

function multiplicar() {
  let x = parseInt(document.getElementById("valor1").value);
  let y = parseInt(document.getElementById("valor2").value);
  comprobar();
  return (document.getElementById("resultado").innerHTML = x * y);
}
function dividir() {
  let x = parseInt(document.getElementById("valor1").value);
  let y = parseInt(document.getElementById("valor2").value);
  comprobar();
  return (document.getElementById("resultado").innerHTML = x / y);
}
