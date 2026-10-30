// Sequência de dias seguidos estudando: a atual e a maior de todas
Painel.registrar(function (dados) {
  const cartao = Painel.criarCartao("Sequência");
  const UM_DIA = 86400000; // milissegundos em um dia

  // Lista de datas sem repetição, em ordem
  const datas = Array.from(new Set(dados.map(function (d) { return d.data; }))).sort();

  let atual = 0;
  let recorde = 0;
  let anterior = null;

  datas.forEach(function (data) {
    const dia = new Date(data + "T00:00:00");
    // Se a diferença para o dia anterior é de 1 dia, a sequência continua
    if (anterior && Math.round((dia - anterior) / UM_DIA) === 1) {
      atual++;
    } else {
      atual = 1;
    }
    if (atual > recorde) recorde = atual;
    anterior = dia;
  });

  // Se o último estudo foi antes de ontem, a sequência atual foi quebrada
  if (anterior) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (Math.round((hoje - anterior) / UM_DIA) > 1) atual = 0;
  }

  const grade = document.createElement("div");
  grade.className = "numeros";
  grade.innerHTML =
    numero(atual + (atual === 1 ? " dia" : " dias"), "sequência atual") +
    numero(recorde + (recorde === 1 ? " dia" : " dias"), "maior sequência");
  cartao.appendChild(grade);
});
