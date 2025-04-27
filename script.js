// Selecionar elementos do DOM
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('#modalImage');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');
const moneyButton = document.getElementById('moneyButton');
const moneyRainContainer = document.querySelector('.money-rain');
const audio = new Audio('https://github.com/Batata12111/Bounce/raw/main/Here%20comes%20the%20money%20-%20meme%20(1).mp3');
const grid = document.querySelector('.grid');

let currentImages = [];
let currentIndex = 0;
let rainInterval;

// Função para criar um elemento de "dinheiro"
function createMoney() {
  const money = document.createElement('div');
  money.classList.add('money');

  const emojis = ['💵', '💰', '💸', '🪙'];
  money.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  money.style.left = `${Math.random() * 100}vw`;
  money.style.animationDuration = `${Math.random() * 2 + 3}s`;
  money.style.fontSize = `${Math.random() * 10 + 20}px`;

  moneyRainContainer.appendChild(money);

  money.addEventListener('animationend', () => money.remove());
}

// Função para iniciar a chuva de dinheiro
function startMoneyRain() {
  return setInterval(createMoney, 300);
}

// Evento de clique no botão de dinheiro
moneyButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(error => console.error('Erro ao tentar tocar o áudio:', error));
  }

  if (rainInterval) {
    clearInterval(rainInterval);
  }
  rainInterval = startMoneyRain();

  setTimeout(() => {
    clearInterval(rainInterval);
    console.log("Chuva de dinheiro finalizada!");
  }, 10000);
});

// Função para abrir o modal
function openModal(images) {
  currentImages = images;
  currentIndex = 0;
  updateModalState(true);
  showImage(currentIndex);
}

// Atualizar o estado do modal
function updateModalState(isOpen) {
  modal.classList.toggle('open', isOpen);
  modal.setAttribute('aria-hidden', !isOpen);
  if (!isOpen) resetModal();
}

// Exibir a imagem atual no modal
function showImage(index) {
  modalImg.src = currentImages[index];
}

// Resetar o estado do modal
function resetModal() {
  modalImg.src = '';
  currentImages = [];
}

// Navegar entre imagens no modal
function navigateModal(direction) {
  currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
  showImage(currentIndex);
}

// Delegação de eventos para os cards
grid.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) {
    const images = JSON.parse(card.getAttribute('data-images') || '[]');
    if (images.length > 0) openModal(images);
  }
});

// Eventos de navegação do modal
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateModal(-1);
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateModal(1);
});

// Fechar o modal
closeBtn.addEventListener('click', () => updateModalState(false));

// Fechar o modal ao clicar fora da imagem
modal.addEventListener('click', (e) => {
  if (e.target === modal) updateModalState(false);
});

// Alternar o menu da navbar
navbarToggle.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

// Melhorias de acessibilidade
closeBtn.setAttribute('aria-label', 'Fechar modal');
prevBtn.setAttribute('aria-label', 'Imagem anterior');
nextBtn.setAttribute('aria-label', 'Próxima imagem');

// Impedir o scroll horizontal
window.addEventListener('scroll', () => {
  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY);
  }
});
