// js.js COMPLETO ATUALIZADO

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// NOVA FUNCIONALIDADE
function mostrarProjeto(id) {
    document.getElementById('projetos-iniciais').style.display = 'none';
    document.getElementById('whatsapp').style.display = 'none';
    document.getElementById('expenses').style.display = 'none';

    document.getElementById(id).style.display = 'flex';
}

function voltarProjetos() {
    const projetos = document.getElementById('projetos-iniciais');
  
    // Força um "refresh" visual no layout
    projetos.style.display = 'none';
  
    // Espera um instante e reaplica a grid com estilo correto
    setTimeout(() => {
      projetos.style.display = 'grid';
      projetos.classList.remove('bug'); // caso alguma classe errada tenha sido aplicada
      projetos.classList.add('portfolio-container'); // garante que as propriedades de grid sejam reaplicadas
      projetos.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
      projetos.style.gap = '1rem';
      projetos.style.justifyItems = 'center';
    }, 10);
  
    // Oculta os projetos expandidos
    document.getElementById('whatsapp').style.display = 'none';
    document.getElementById('expenses').style.display = 'none';
  }