'use strict';

const allSections = document.querySelectorAll('.section');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const dotContainer = document.querySelector('.dots');
const header = document.querySelector('.header');
// selects images which have an attr of data-src
const imageTargets = document.querySelectorAll('img[data-src]');
const modal = document.querySelector('.modal');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const section1 = document.getElementById('section--1');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// add event listener to common parent elemnt
// determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // use e.target to get the target of the event
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// passing 'an argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// sticky navigation
// event happens every time the window is scrolled on the page
//(inefficient)
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// intersection observer api
// const observerCallback = function (entries, observer) {
//   // entries is an array of threshold entries
//   entries.forEach(entry => console.log(entry));
// };

// const observerOpts = {
//   // element the target is intersecting
//   // null is viewport
//   root: null,
//   // the percentage of intersection of which the callback will be called
//   threshold: [0, 0.2, 0.6],
// };
// const observer = new IntersectionObserver(observerCallback, observerOpts);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect();
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // box of pixels that is applied outside the target
  rootMargin: `-${navHeight.height}px`,
});
headerObserver.observe(header);

// reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // once its already been observed we don't need to watch it anymore
  // better for performance
  section.classList.add('section--hidden');
});

// lazy loading images
const imagesStarter = function() {
  const loadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
  };
  const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  });
  imageTargets.forEach(img => imageObserver.observe(img));
}
imagesStarter();

// slider functionality
const sliderStarter = function() {
  let currentSlide = 0;
  const maxSlide = slides.length;
  const minSlide = 0;

  const createSliderDots = function () {
    slides.forEach((_, i) => {
      // creates an HTML element
      // "before the end"
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // remove class from all dots
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    // you can search for specific attributes using brackets
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const moveThroughSlides = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    moveThroughSlides(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === minSlide) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    moveThroughSlides(currentSlide);
    activateDot(currentSlide);
  };

  const init = function() {
    moveThroughSlides(minSlide);
    createSliderDots();
    activateDot(0);
  }
  init();
  // slider event handlers
  btnSliderRight.addEventListener('click', nextSlide);
  btnSliderLeft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', event => {
    console.log(event);
    // short circuiting
    event.key === 'ArrowRight' && nextSlide();
    event.key === 'ArrowLeft' && previousSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log(e.target);
      // gets the "slide dot clicked"
      // the dataset returns an object so we can use destructuring to make a variable
      const { slide } = e.target.dataset;
      moveThroughSlides(slide);
      activateDot(slide);
    }
  });
}
sliderStarter();

document.addEventListener('DOMContentLoaded', function(e) {
  // code that executes only after the DOM is ready
})
window.addEventListener('load', function(e) {
  // when all images and everything has been loaded and fired 
})
window.addEventListener('beforeunload', function(e) {
  // before the browser closes - shows a pop which asks if you want to leave the site
  e.preventDefault();
  e.returnValue = '';
})