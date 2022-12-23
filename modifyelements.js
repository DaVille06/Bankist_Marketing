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
