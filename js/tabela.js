// Tabela com todos os registros de estudo, com filtro por tema e por palavra
Painel.registrar(function (dados) {
  const cartao = Painel.criarCartao("Registro de estudos");

  // Controles do filtro: uma lista de temas e um campo de busca
  const filtros = document.createElement("div");
  filtros.className = "filtros";

  const seletor = document.createElement("select");
  seletor.setAttribute("aria-label", "Filtrar por tema");
  const todos = document.createElement("option");
  todos.value = "";
  todos.textContent = "Todos os temas";
  seletor.appendChild(todos);

  // Temas sem repetição, em ordem alfabética
  const temas = Array.from(new Set(dados.map(function (d) { return d.tema; }))).sort();
  temas.forEach(function (tema) {
    const opcao = document.createElement("option");
    opcao.value = tema;
    opcao.textContent = tema;
    seletor.appendChild(opcao);
  });

  const busca = document.createElement("input");
  busca.type = "search";
  busca.placeholder = "Buscar no que aprendi...";
  busca.setAttribute("aria-label", "Buscar no que aprendi");

  const contador = document.createElement("span");
  contador.className = "filtros-contador";

  filtros.appendChild(seletor);
  filtros.appendChild(busca);
  filtros.appendChild(contador);
  cartao.appendChild(filtros);

  const tabela = document.createElement("table");
  tabela.innerHTML = "<thead><tr><th>Data</th><th>Tema</th><th>Minutos</th><th>O que aprendi</th></tr></thead>";
  const corpo = document.createElement("tbody");
  tabela.appendChild(corpo);
  cartao.appendChild(tabela);

  // Monta as linhas da tabela a partir de uma lista de registros
  function desenhar(lista) {
    corpo.innerHTML = "";

    if (lista.length === 0) {
      const linha = document.createElement("tr");
      const celula = document.createElement("td");
      celula.colSpan = 4;
      celula.className = "vazio";
      celula.textContent = "Nenhum registro encontrado.";
      linha.appendChild(celula);
      corpo.appendChild(linha);
    }

    lista.forEach(function (d) {
      const linha = document.createElement("tr");
      [formatarData(d.data), d.tema, d.minutos, d.aprendizado].forEach(function (valor) {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.appendChild(celula);
      });
      corpo.appendChild(linha);
    });

    contador.textContent = lista.length + " de " + dados.length + " registros";
  }

  // filter() devolve uma nova lista só com os registros que passam no teste
  function filtrar() {
    const tema = seletor.value;
    const termo = busca.value.trim().toLowerCase();

    const resultado = dados.filter(function (d) {
      const temaOk = tema === "" || d.tema === tema;
      const termoOk = termo === "" || d.aprendizado.toLowerCase().includes(termo);
      return temaOk && termoOk;
    });

    desenhar(resultado);
  }

  // addEventListener refaz o filtro sempre que algo muda nos controles
  seletor.addEventListener("change", filtrar);
  busca.addEventListener("input", filtrar);

  desenhar(dados);
});
