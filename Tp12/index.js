function imc() {
  let x = parseInt(document.getElementById("peso").value);
  let y = parseFloat(document.getElementById("altura").value);
  console.log(y);

  const altura = y * y;
  console.log(altura);

  let total = x / altura;

  if (total < 18.5) {
    return (document.getElementById("resultado").innerHTML = `
      <p>Su IMC es: <strong class="blue">${total.toFixed(2)}</strong></p>`);
  } else if (total >= 18.5 && total <= 24.9) {
    return (document.getElementById("resultado").innerHTML = `
      <p>Su IMC es: <strong class="green">${total.toFixed(2)}</strong></p>`);
  } else if (total >= 25 && total <= 29.9) {
    return (document.getElementById("resultado").innerHTML = `
      <p>Su IMC es: <strong class="orange">${total.toFixed(2)}</strong></p>`);
  } else if (total >= 30 && total <= 34.9) {
    return (document.getElementById("resultado").innerHTML = `
      <p>Su IMC es: <strong class="red">${total.toFixed(2)}</strong></p>`);
  } else if (total >= 35 && total <= 39.9) {
    return (document.getElementById("resultado").innerHTML = `
      <p>Su IMC es: <strong class="bordo">${total.toFixed(2)}</strong></p>`);
  } else
    return (document.getElementById("resultado").innerHTML = `
  <p>Su IMC es: <strong class="purple">${total.toFixed(2)}</strong></p>`);
}
