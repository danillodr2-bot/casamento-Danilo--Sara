// ===========================
// CONTAGEM REGRESSIVA
// ===========================

const dataCasamento = new Date("2027-01-16T18:30:00");

function atualizarContador() {

  const agora = new Date();

  const diferenca = dataCasamento - agora;

  if (diferenca <= 0) {
    document.getElementById("contador").innerHTML =
      "💍 Chegou o grande dia!";
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

  const horas = Math.floor(
    (diferenca % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutos = Math.floor(
    (diferenca % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const segundos = Math.floor(
    (diferenca % (1000 * 60))
    / 1000
  );

  document.getElementById("contador").innerHTML =
    `${dias} dias • ${horas}h • ${minutos}min • ${segundos}s`;
}

setInterval(atualizarContador, 1000);
atualizarContador();


// ===========================
// RSVP
// ===========================

// COLE AQUI SUA URL DO APPS SCRIPT
const API_URL = "https://script.google.com/macros/s/AKfycbyxHlSG26H6Vxw9d0MuSEKivg8nDyLAeIkc6tmmLSTKeLT7-VU64c4paFUmxMkpFuvU/exec";
const formulario =
document.getElementById("formPresenca");

if (formulario) {

  formulario.addEventListener(
    "submit",
    async function(e){

      e.preventDefault();

      const nome =
      document.getElementById("nome").value;

      const telefone =
      document.getElementById("telefone").value;

      const acompanhantes =
      document.getElementById("acompanhantes").value;

      const mensagem =
      document.getElementById("mensagem").value;

      try {

      await fetch(API_URL, {

  method: "POST",

  mode: "no-cors",

  body: JSON.stringify({

    tipo:"presenca",

    nome:nome,

    telefone:telefone,

    acompanhantes:acompanhantes,

    mensagem:mensagem

  })

});

        document.getElementById("resultado")
        .innerHTML =
        "✅ Presença confirmada com sucesso!";

        formulario.reset();

      } catch(erro){

        document.getElementById("resultado")
        .innerHTML =
        "❌ Erro ao enviar confirmação.";

        console.error(erro);

      }

    }
  );

}
// ===========================
// LISTA DINÂMICA DE PRESENTES
// ===========================

async function carregarPresentes() {

  try {

    const resposta = await fetch(
      API_URL + "?action=presentes"
    );

    const presentes = await resposta.json();

    const container =
      document.getElementById("listaPresentes");

    container.innerHTML = "";

    presentes.forEach(presente => {

      const card = document.createElement("div");

      card.className = "presente-card";

      let botao = "";

      if (presente.status === "Disponível") {

        botao = `
          <button onclick="reservarPresente('${presente.produto}')">
            Escolher Presente
          </button>
        `;

      } else {

        botao = `
          <button disabled>
            Já Escolhido
          </button>
        `;
      }

     card.innerHTML = `
  <h3>${presente.produto}</h3>

 <p class="${
  presente.status === "Disponível"
    ? "status-disponivel"
    : "status-reservado"
}">
  ${
    presente.status === "Disponível"
      ? "🟢 Disponível"
      : "🔴 Já Escolhido"
  }
</p>

  <a
    href="${presente.link}"
    target="_blank"
    class="btn-mercadolivre"
  >
    🛒 Comprar no Mercado Livre
  </a>

  ${botao}
`;
      container.appendChild(card);

    });

  } catch (erro) {

    console.error(erro);

  }

}

async function reservarPresente(produto) {

  const nome = prompt(
    "Digite seu nome para reservar este presente:"
  );

  if (!nome) return;

  try {

    await fetch(API_URL, {

      method: "POST",

      mode: "no-cors",

      body: JSON.stringify({

        tipo: "presente",

        produto: produto,

        nome: nome

      })

    });

    alert(
      "🎁 Presente reservado com sucesso!"
    );

    setTimeout(
      carregarPresentes,
      1500
    );

  } catch (erro) {

    alert(
      "Erro ao reservar presente."
    );

  }

}

carregarPresentes();
