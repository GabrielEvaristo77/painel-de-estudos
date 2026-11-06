// Calendário: os dias do mês, com destaque nos dias em que estudei
Painel.registrar(function (dados) {
  const cartao = Painel.criarCartao("Calendário de estudos");
  const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

  // Soma os minutos de cada dia: { "2026-11-05": 40, ... }
  const porDia = {};
  dados.forEach(function (d) {
    if (!porDia[d.data]) porDia[d.data] = 0;
    porDia[d.data] += d.minutos;
  });

  // Mostra o mês do estudo mais recente (ou o mês atual, se ainda não houver dados)
  const datas = Object.keys(porDia).sort();
  const base = datas.length ? new Date(datas[datas.length - 1] + "T00:00:00") : new Date();
  const ano = base.getFullYear();
  const mes = base.getMonth(); // janeiro = 0, dezembro = 11

  // O dia 0 do mês seguinte é o último dia deste mês, então getDate() dá quantos dias ele tem
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  // getDay() diz em que dia da semana o mês começa (domingo = 0)
  const inicio = new Date(ano, mes, 1).getDay();

  const titulo = document.createElement("p");
  titulo.className = "calendario-mes";
  titulo.textContent = MESES[mes] + " de " + ano;
  cartao.appendChild(titulo);

  const grade = document.createElement("div");
  grade.className = "calendario";

  SEMANA.forEach(function (letra) {
    const cabeca = document.createElement("span");
    cabeca.className = "calendario-semana";
    cabeca.textContent = letra;
    grade.appendChild(cabeca);
  });

  // Espaços vazios até chegar no dia da semana em que o mês começa
  for (let i = 0; i < inicio; i++) {
    grade.appendChild(document.createElement("span"));
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    // padStart completa com zero à esquerda: 5 vira "05"
    const iso = ano + "-" + String(mes + 1).padStart(2, "0") + "-" + String(dia).padStart(2, "0");
    const celula = document.createElement("span");
    celula.className = "calendario-dia";
    celula.textContent = dia;

    if (porDia[iso]) {
      celula.classList.add("estudou");
      celula.title = formatarData(iso) + ": " + porDia[iso] + " min";
    }
    grade.appendChild(celula);
  }

  cartao.appendChild(grade);
});
