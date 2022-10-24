function gt() {
  const valor = parseInt(document.getElementById("valor").value);
  console.log(valor);
  for (i = 1; i <= valor; i++) {
    let res = i * valor;
    console.log(res);
    document.getElementById(
      "tabla"
    ).innerHTML += `<tr><td>${valor}x${i}=${res}</td></tr><br>`;
  }
}
