// ================= CARROSSEL ==================

// Todos os projetos que podem ser abertos ao clicar na capa
const projetosExpandido = ['beatTimer', 'whatsapp', 'expenses', 'chatTech'];

let indexAtual = 0; // índice do carrossel
const capasVisiveis = 3; // quantas capas aparecem de cada vez
let ultimaSeta = 'direita'; // seta que deve estar visível inicialmente

// Função para abrir o projeto expandido ao clicar na capa
function mostrarProjeto(id) {
  projetosExpandido.forEach(proj => {
    const el = document.getElementById(proj);
    if (el) el.style.display = 'none';
  });

  const projetoSelecionado = document.getElementById(id);
  if (projetoSelecionado) projetoSelecionado.style.display = 'flex';

  document.getElementById('projetos-iniciais').style.display = 'none';

  // esconde setas enquanto estamos no projeto expandido
  document.getElementById("seta-esquerda").style.display = "none";
  document.getElementById("seta-direita").style.display = "none";
}

// Função para voltar à grid inicial
function voltarProjetos() {
  projetosExpandido.forEach(proj => {
    const el = document.getElementById(proj);
    if (el) el.style.display = 'none';
  });

  const projetos = document.getElementById('projetos-iniciais');
  projetos.style.display = 'grid';

  // ajusta indexAtual caso esteja fora do limite
  const total = projetos.children.length;
  if (indexAtual + capasVisiveis > total) {
    indexAtual = Math.max(total - capasVisiveis, 0);
  }

  ultimaSeta = 'direita'; // seta direita visível inicialmente
  atualizarCarrossel();
}

// Atualiza as capas visíveis no carrossel e visibilidade das setas
function atualizarCarrossel() {
  const container = document.getElementById('projetos-iniciais');
  const cards = Array.from(container.children);
  const total = cards.length;

  // mostra apenas as capas do índice atual
  cards.forEach((card, i) => {
    card.style.display = (i >= indexAtual && i < indexAtual + capasVisiveis) ? 'block' : 'none';
  });

  const setaEsquerda = document.getElementById("seta-esquerda");
  const setaDireita = document.getElementById("seta-direita");

  // lógica ping-pong: apenas uma seta visível por vez
  if (indexAtual === 0) {
    setaEsquerda.style.display = "none";
    setaDireita.style.display = "block";
    ultimaSeta = 'direita';
  } else if (indexAtual >= total - capasVisiveis) {
    setaEsquerda.style.display = "block";
    setaDireita.style.display = "none";
    ultimaSeta = 'esquerda';
  } else {
    // alterna conforme última seta usada
    if (ultimaSeta === 'direita') {
      setaEsquerda.style.display = "block";
      setaDireita.style.display = "none";
    } else {
      setaEsquerda.style.display = "none";
      setaDireita.style.display = "block";
    }
  }
}

// Avança o carrossel →
document.getElementById("seta-direita").addEventListener("click", () => {
  const container = document.getElementById('projetos-iniciais');
  const total = container.children.length;

  if (indexAtual < total - capasVisiveis) {
    indexAtual++;
    ultimaSeta = 'direita';
    atualizarCarrossel();
  }
});

// Volta o carrossel ←
document.getElementById("seta-esquerda").addEventListener("click", () => {
  if (indexAtual > 0) {
    indexAtual--;
    ultimaSeta = 'esquerda';
    atualizarCarrossel();
  }
});

// Inicializa o carrossel mostrando as capas
document.addEventListener("DOMContentLoaded", () => {
  indexAtual = 0; // garante que começamos da esquerda
  ultimaSeta = 'direita';
  atualizarCarrossel();
});


// ================= FORMULÁRIO ==================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return; // caso a página não tenha o form
  
  const button = form.querySelector(".btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // não abre nova página

    button.disabled = true;
    button.value = "Enviando...";

    try {
      await fetch("https://formsubmit.co/ajax/pedro.santigosiqueira@gmail.com", {
        method: "POST",
        body: new FormData(form)
      });

      button.value = "Enviado ✅";

      setTimeout(() => {
        button.disabled = false;
        button.value = "Enviar Mensagem";
      }, 5000);

      form.reset(); // limpa os campos
    } catch (error) {
      button.value = "Erro ❌";
      setTimeout(() => {
        button.disabled = false;
        button.value = "Enviar Mensagem";
      }, 5000);
    }
  });
});
