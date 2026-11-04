// Tempo por tema: quantos minutos estudei de cada assunto, em barras
Painel.registrar(function (dados) {
  const cartao = Painel.criarCartao("Tempo por tema");

  // Um objeto funciona como uma "caixa" para cada tema: { Git: 40, JavaScript: 95 }
  const porTema = {};
  dados.forEach(function (d) {
    if (!porTema[d.tema]) porTema[d.tema] = 0;
    porTema[d.tema] += d.minutos;
  });

  // Object.keys devolve a lista de temas; ordeno do mais estudado para o menos
  const temas = Object.keys(porTema).sort(function (a, b) {
    return porTema[b] - porTema[a];
  });

  // O tema com mais minutos vira a barra cheia (100%)
  const maior = temas.length ? porTema[temas[0]] : 0;

  const lista = document.createElement("div");
  lista.className = "temas";

  temas.forEach(function (tema) {
    const minutos = porTema[tema];
    const largura = maior ? Math.round((minutos / maior) * 100) : 0;

    const linha = document.createElement("div");
    linha.className = "tema";

    const nome = document.createElement("span");
    nome.className = "tema-nome";
    nome.textContent = tema;

    const trilho = document.createElement("div");
    trilho.className = "tema-trilho";
    const barra = document.createElement("div");
    barra.className = "tema-barra";
    barra.style.width = largura + "%";
    trilho.appendChild(barra);

    const valor = document.createElement("span");
    valor.className = "tema-valor";
    valor.textContent = minutos + " min";

    linha.appendChild(nome);
    linha.appendChild(trilho);
    linha.appendChild(valor);
    lista.appendChild(linha);
  });

  cartao.appendChild(lista);
});
