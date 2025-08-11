// Seletor dos elementos do menu
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle do menu mobile
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Seção e links do menu para scroll ativo
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  // Sticky header após 100px de scroll
  let header = document.querySelector('header');
  header.classList.toggle('sticky', top > 100);

  // Fechar menu mobile ao scroll
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// Mostrar projeto expandido pelo id
function mostrarProjeto(id) {
  // Esconder container geral e todos projetos expandidos
  document.getElementById('projetos-iniciais').style.display = 'none';

  // Assumindo que só tenha esses projetos expandidos, você pode adicionar mais se tiver
  const projetosExpandidos = ['whatsapp', 'expenses', 'beatTimer']; // adicione o id BeatTimer aqui se quiser
  projetosExpandidos.forEach(proj => {
    const el = document.getElementById(proj);
    if (el) el.style.display = 'none';
  });

  // Exibir só o projeto escolhido
  const projetoSelecionado = document.getElementById(id);
  if (projetoSelecionado) projetoSelecionado.style.display = 'flex';
}

// Voltar para lista de projetos
function voltarProjetos() {
  const projetos = document.getElementById('projetos-iniciais');

  // Oculta todos projetos expandidos
  const projetosExpandidos = ['whatsapp', 'expenses', 'beatTimer']; // idem, adicione ids aqui
  projetosExpandidos.forEach(proj => {
    const el = document.getElementById(proj);
    if (el) el.style.display = 'none';
  });

  // Força um "refresh" visual no container de projetos
  projetos.style.display = 'none';

  setTimeout(() => {
    projetos.style.display = 'grid';
    projetos.classList.remove('bug'); // se existir alguma classe bug
    projetos.classList.add('portfolio-container');
    projetos.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    projetos.style.gap = '1rem';
    projetos.style.justifyItems = 'center';
  }, 10);
}
