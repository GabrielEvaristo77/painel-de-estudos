// Mural: os últimos aprendizados em cartões, do mais recente para o mais antigo
Painel.registrar(function (dados) {
  const cartao = Painel.criarCartao("Últimos aprendizados");
  const QUANTIDADE = 3;

  // slice() sem argumentos faz uma cópia, para o sort não bagunçar a lista original
  const recentes = dados.slice().sort(function (a, b) {
    // Datas no formato "2026-11-05" podem ser comparadas como texto
    return a.data < b.data ? 1 : -1;
  }).slice(0, QUANTIDADE);

  const mural = document.createElement("div");
  mural.className = "mural";

  recentes.forEach(function (d) {
    const nota = document.createElement("article");
    nota.className = "nota";

    const topo = document.createElement("div");
    topo.className = "nota-topo";

    const tema = document.createElement("span");
    tema.className = "nota-tema";
    tema.textContent = d.tema;

    const data = document.createElement("time");
    data.dateTime = d.data;
    data.textContent = formatarData(d.data);

    topo.appendChild(tema);
    topo.appendChild(data);

    const texto = document.createElement("p");
    texto.textContent = d.aprendizado;

    nota.appendChild(topo);
    nota.appendChild(texto);
    mural.appendChild(nota);
  });

  cartao.appendChild(mural);
});
