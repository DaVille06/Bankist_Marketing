// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

// this is an HTML Collection
// gets updated automatically if the dom changes
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
// .insertAdjacentHTML
// not yet placed into the DOM
const msg = document.createElement('div');
msg.classList.add('cookie-message');
msg.textContent = 'We use cookies for improved functionality and analytics.';
msg.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
// need to manually insert to see on page
//header.prepend(msg);
header.append(msg);
//header.append(msg.cloneNode(true));
// before the header
//header.before(msg);
// after the header
//header.after(msg);

// deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => msg.remove());

// styles - get set inline
msg.style.backgroundColor = '#37383d';
msg.style.width = '120%';

// only works on inline styles
// height has not been set as inline, was done through CSS or a class
console.log(msg.style.height);
console.log(getComputedStyle(msg).height);
// inline
console.log(msg.style.width);

msg.style.height =
  Number.parseFloat(getComputedStyle(msg).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector('.nav__logo');
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

console.log(logo.dataset.versionNumber);
