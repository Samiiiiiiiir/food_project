function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    showCurrentSlide = document.querySelector(currentCounter),
    showTotalSlides = document.querySelector(totalCounter),
    prevButton = document.querySelector(prevArrow),
    nextButton = document.querySelector(nextArrow),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    sliderWidth = slidesWrapper.offsetWidth;

  let currentSlide = 1,
    offset = 0;

  slidesField.style.width = `${100 * slides.length}%`;

  showTotalSlides.textContent = addZero(slides.length);
  showCurrentSlide.textContent = addZero(currentSlide);

  slides.forEach((slide) => {
    slide.style.width = `${sliderWidth}px`;
  });
  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);
    indicators.append(dot);
    dots.push(dot);
    dots[0].classList.add('dot--active');
  }

  indicators.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.matches('li.dot')) {
      offset = (target.getAttribute('data-slide-to') - 1) * sliderWidth;
      slidesField.style.transform = `translateX(-${offset}px)`;
      currentSlide = target.getAttribute('data-slide-to');
      showSliderIndicators(currentSlide);
    }
  });

  prevButton.addEventListener('click', () => {
    if (offset == 0) {
      offset = sliderWidth * (slides.length - 1);
    } else {
      offset -= sliderWidth;
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (currentSlide == 1) {
      currentSlide = slides.length;
    } else {
      currentSlide--;
    }
    showSliderIndicators(currentSlide);
  });

  nextButton.addEventListener('click', () => {
    if (offset >= sliderWidth * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += sliderWidth;
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (currentSlide >= slides.length) {
      currentSlide = 1;
    } else {
      currentSlide++;
    }
    showSliderIndicators(currentSlide);
  });

  function showSliderIndicators(slide) {
    showCurrentSlide.textContent = addZero(slide);
    dots.forEach((dot) => dot.classList.remove('dot--active'));
    dots[slide - 1].classList.add('dot--active');
  }

  function addZero(n) {
    return n < 10 ? `0${n}` : n;
  }
  /* - - - - - Простая реализация
 showSlide(currentSlide);
if (slides.length < 10) {
  showTotalSlides.textContent = `0${slides.length}`;
} else {
  showTotalSlides.textContent = `${slides.length}`;
}

function showSlide(index) {
  if (index < 1) {
    currentSlide = slides.length;
  }
  if (index > slides.length) {
    currentSlide = 1;
  }

  slides.forEach((item) => {
    item.classList.add('hidden');
  });

  showCurrentSlide.textContent = addZero(currentSlide);
  slides[currentSlide - 1].classList.remove('hidden');
}

prevButton.addEventListener('click', () => {
  showSlide(--currentSlide);
});
nextButton.addEventListener('click', () => {
  showSlide(++currentSlide);
});
 */
}

export default slider;
