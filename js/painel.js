// Painel: carrega os dados do CSV e entrega para cada parte da página.
const Painel = {
  modulos: [],

  // Cada arquivo de funcionalidade chama esta função para se registrar
  registrar: function (modulo) {
    this.modulos.push(modulo);
  },

  // Cria um cartão (seção) na página e devolve o elemento criado
  criarCartao: function (titulo) {
    const secao = document.createElement("section");
    secao.className = "cartao";
    const h2 = document.createElement("h2");
    h2.textContent = titulo;
    secao.appendChild(h2);
    document.getElementById("conteudo").appendChild(secao);
    return secao;
  }
};

// Transforma o texto do CSV em uma lista de objetos
function lerCSV(texto) {
  const linhas = texto.trim().split(/\r?\n/);
  const colunas = linhas[0].split(",").map(function (c) { return c.trim(); });
  const registros = [];

  for (let i = 1; i < linhas.length; i++) {
    const valores = linhas[i].split(",");
    const registro = {};
    colunas.forEach(function (coluna, j) {
      // A última coluna junta o resto, caso o texto tenha vírgulas
      const valor = j === colunas.length - 1 ? valores.slice(j).join(",") : valores[j];
      registro[coluna] = (valor || "").trim();
    });
    registro.minutos = Number(registro.minutos);
    registros.push(registro);
  }
  return registros;
}

// Converte "2026-10-23" em "23/10/2026"
function formatarData(iso) {
  const partes = iso.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Quando a página termina de carregar, busca os dados e monta o painel
document.addEventListener("DOMContentLoaded", function () {
  fetch("dados/estudos.csv")
    .then(function (resposta) { return resposta.text(); })
    .then(function (texto) {
      const dados = lerCSV(texto);
      Painel.modulos.forEach(function (modulo) { modulo(dados); });
    })
    .catch(function () {
      const aviso = Painel.criarCartao("Ops!");
      const p = document.createElement("p");
      p.className = "aviso";
      p.textContent = "Não consegui carregar os dados. Abra a página pelo link do GitHub Pages.";
      aviso.appendChild(p);
    });
});
