// Tabela com todos os registros de estudo
Painel.registrar(function (dados) {
  const cartao = Painel.criarCartao("Registro de estudos");
  const tabela = document.createElement("table");
  tabela.innerHTML = "<thead><tr><th>Data</th><th>Tema</th><th>Minutos</th><th>O que aprendi</th></tr></thead>";
  const corpo = document.createElement("tbody");

  dados.forEach(function (d) {
    const linha = document.createElement("tr");
    [formatarData(d.data), d.tema, d.minutos, d.aprendizado].forEach(function (valor) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    });
    corpo.appendChild(linha);
  });

  tabela.appendChild(corpo);
  cartao.appendChild(tabela);
});
