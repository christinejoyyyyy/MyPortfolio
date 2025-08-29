const cardList = document.querySelector(".card-list");
const cards = document.querySelectorAll(".card-item");
const pagination = document.querySelector(".slider-pagination");
const sliderWrapper = document.querySelector(".slider-wrapper");

let currentIndex = 0; 
const totalSlides = cards.length;

let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let isDragging = false;
let startTime = 0;
let hasScrolled = false;

let scrollTimeout = null;

for (let i = 0; i < totalSlides; i++) {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  if (i === currentIndex) bullet.classList.add("active");
  bullet.addEventListener("click", () => goToSlide(i));
  pagination.appendChild(bullet);
}

function updateActiveCard() {
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === currentIndex);
  });

  document.querySelectorAll(".bullet").forEach((b, i) => {
    b.classList.toggle("active", i === currentIndex);
  });

  const offset =
    -(currentIndex * (cards[0].offsetWidth + 24)) +
    (cardList.offsetWidth / 2 - cards[0].offsetWidth / 2);

  cardList.style.transform = `translateX(${offset}px)`;
}

function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;
  
  currentIndex = index;
  updateActiveCard();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function handleTouchStart(e) {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  startTime = Date.now();
  isDragging = true;
  hasScrolled = false;
  
  
  cardList.style.transition = 'none';
}

function handleTouchMove(e) {
  if (!isDragging) return;
  
  const touch = e.touches[0];
  currentX = touch.clientX;
  currentY = touch.clientY;
  
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        hasScrolled = true;
    }
  
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
    }
}

function handleTouchEnd(e) {
  if (!isDragging) return;
  
  isDragging = false;
  const endTime = Date.now();
  const deltaTime = endTime - startTime;
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  
  cardList.style.transition = 'transform 0.6s ease-in-out';
  
  const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
  const minSwipeDistance = 50;
  const maxSwipeTime = 300;
  
  if (isHorizontalSwipe && Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
  
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
}

function handleMouseDown(e) {
  startX = e.clientX;
  startY = e.clientY;
  startTime = Date.now();
  isDragging = true;
  hasScrolled = false;
  
  cardList.style.transition = 'none';
  cardList.style.cursor = 'grabbing';
  
  e.preventDefault();
}

function handleMouseMove(e) {
  if (!isDragging) return;
  
  currentX = e.clientX;
  currentY = e.clientY;
  
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  
  if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
    hasScrolled = true;
  }
}

function handleMouseUp(e) {
  if (!isDragging) return;
  
  isDragging = false;
  const deltaX = currentX - startX;
  const minSwipeDistance = 50;
  
  cardList.style.transition = 'transform 0.6s ease-in-out';
  cardList.style.cursor = 'grab';
  
  if (Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  } else {
    updateActiveCard();
  }
  
  startX = 0;
  currentX = 0;
}

function handleWheel(e) {
  if (!sliderWrapper.contains(e.target)) return;
  
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  scrollTimeout = setTimeout(() => {
    const deltaY = e.deltaY;
    const deltaX = e.deltaX;
    
    const scrollDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    
    if (scrollDelta > 0) {
      nextSlide();
    } else if (scrollDelta < 0) {
      prevSlide();
    }
  }, 50); 
  
  e.preventDefault();
}

function handleKeyDown(e) {
  if (!sliderWrapper.contains(document.activeElement) && 
      document.activeElement !== sliderWrapper) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      prevSlide();
      e.preventDefault();
      break;
    case 'ArrowRight':
      nextSlide();
      e.preventDefault();
      break;
  }
}

sliderWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
sliderWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
sliderWrapper.addEventListener('touchend', handleTouchEnd);

sliderWrapper.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

sliderWrapper.addEventListener('wheel', handleWheel, { passive: false });

document.addEventListener('keydown', handleKeyDown);
sliderWrapper.addEventListener('focus', () => sliderWrapper.style.outline = 'none');

sliderWrapper.setAttribute('tabindex', '0');
sliderWrapper.style.cursor = 'grab';

sliderWrapper.addEventListener('contextmenu', (e) => {
  if (isDragging) e.preventDefault();
});

sliderWrapper.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    cardList.style.transition = 'transform 0.6s ease-in-out';
    cardList.style.cursor = 'grab';
    updateActiveCard();
  }
});


function handleCardClick(e) {
  if (hasScrolled) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  
  const isArrowButton = e.target.closest('.card-btn');
  if (!isArrowButton) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

cards.forEach(card => {
  const cardLink = card.querySelector('.card-link');
  if (cardLink) {
    cardLink.addEventListener('click', handleCardClick);
  }
});

updateActiveCard();

window.addEventListener('resize', () => {
  updateActiveCard();
});