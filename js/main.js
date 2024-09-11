function Slider(containerId, config) {
    this.container = document.getElementById(containerId);
    this.slides = config.slides || [];
    this.intervalTime = config.intervalTime || 3000;
    this.currentSlide = 0;
    this.intervalId = null;
    this.isPlaying = true;

    this.init();
}

Slider.prototype.init = function () {
    this.createSliderElements();
    this.showSlide(this.currentSlide);
    this.startAutoPlay();
    this.addEventListeners();
};

Slider.prototype.createSliderElements = function () {
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'slider-wrapper';

    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slides';

    this.slides.forEach((slide) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        const img = document.createElement('img');
        img.src = slide;
        slideElement.appendChild(img);
        slidesContainer.appendChild(slideElement);
    });

    sliderWrapper.appendChild(slidesContainer);

    const prevButton = document.createElement('button');
    prevButton.className = 'control prev';
    prevButton.textContent = '‹';
    prevButton.addEventListener('click', () => {
        this.prevSlide();
        this.restartAutoPlay();
    });

    const nextButton = document.createElement('button');
    nextButton.className = 'control next';
    nextButton.textContent = '›';
    nextButton.addEventListener('click', () => {
        this.nextSlide();
        this.restartAutoPlay();
    });

    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'indicators';

    this.slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.dataset.slide = index;
        indicator.addEventListener('click', () => {
            this.goToSlide(index);
            this.restartAutoPlay();
        });
        indicatorsContainer.appendChild(indicator);
    });

    const pausePlayButton = document.createElement('button');
    pausePlayButton.className = 'pause-play';
    pausePlayButton.textContent = '❚❚';
    pausePlayButton.addEventListener('click', this.togglePlayPause.bind(this));

    sliderWrapper.appendChild(prevButton);
    sliderWrapper.appendChild(nextButton);
    sliderWrapper.appendChild(indicatorsContainer);
    sliderWrapper.appendChild(pausePlayButton);

    this.container.appendChild(sliderWrapper);
};

Slider.prototype.showSlide = function (index) {
    const slides = this.container.querySelectorAll('.slide');
    const indicators = this.container.querySelectorAll('.indicator');

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
};

Slider.prototype.nextSlide = function () {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
};

Slider.prototype.prevSlide = function () {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
};

Slider.prototype.goToSlide = function (index) {
    this.currentSlide = index;
    this.showSlide(index);
};

Slider.prototype.startAutoPlay = function () {
    this.intervalId = setInterval(this.nextSlide.bind(this), this.intervalTime);
};

Slider.prototype.stopAutoPlay = function () {
    clearInterval(this.intervalId);
};

Slider.prototype.togglePlayPause = function () {
    if (this.isPlaying) {
        this.stopAutoPlay();
        this.container.querySelector('.pause-play').textContent = '►';
    } else {
        this.startAutoPlay();
        this.container.querySelector('.pause-play').textContent = '❚❚';
    }
    this.isPlaying = !this.isPlaying;
};

Slider.prototype.addEventListeners = function () {
    const sliderWrapper = this.container.querySelector('.slider-wrapper');

    sliderWrapper.addEventListener('mouseenter', () => {
        this.stopAutoPlay();
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        if (this.isPlaying) {
            this.startAutoPlay();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            this.nextSlide();
            this.restartAutoPlay();
        } else if (event.key === 'ArrowLeft') {
            this.prevSlide();
            this.restartAutoPlay();
        }
    });
};

Slider.prototype.restartAutoPlay = function () {
    this.stopAutoPlay();
    if (this.isPlaying) {
        this.startAutoPlay();
    }
};

const slider = new Slider('slider-container', {
    slides: [
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png',
    ],
    intervalTime: 3000
});
