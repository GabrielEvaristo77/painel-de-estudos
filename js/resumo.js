// Números de destaque: total de horas, dias estudados e média por dia
Painel.registrar(function (dados) {
  const cartao = Painel.criarCartao("Resumo");

  let totalMinutos = 0;
  const diasUnicos = new Set(); // um Set não guarda valores repetidos
  dados.forEach(function (d) {
    totalMinutos += d.minutos;
    diasUnicos.add(d.data);
  });

  const horas = (totalMinutos / 60).toFixed(1).replace(".", ",");
  const media = diasUnicos.size ? Math.round(totalMinutos / diasUnicos.size) : 0;

  const grade = document.createElement("div");
  grade.className = "numeros";
  grade.innerHTML =
    numero(horas + " h", "estudadas no total") +
    numero(diasUnicos.size, "dias de estudo") +
    numero(media + " min", "média por dia");
  cartao.appendChild(grade);
});

// Monta o HTML de um número de destaque com legenda
function numero(valor, legenda) {
  return "<div class='numero'><strong>" + valor + "</strong><span>" + legenda + "</span></div>";
}
