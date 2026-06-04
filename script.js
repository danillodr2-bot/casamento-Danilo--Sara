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
const API_URL =
"https://script.google.com/macros/s/AKfycbzi5h4U6F3Q1ZlyOeVdQHpcaik4w_klMmQGOPhKOxromvkq10C510FOZWMy0DHMYZ2n/exec";

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
