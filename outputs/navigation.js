// Keep the navigation highlight in sync with the section at the top of the page.
const sectionLinks = [...document.querySelectorAll('.site-nav a')];
const trackedSections = [
  { id: 'home', element: document.querySelector('#home') },
  { id: 'outcome-1', element: document.querySelector('#outcome-1') },
  { id: 'outcome-2', element: document.querySelector('#outcome-2') },
  { id: 'outcome-3', element: document.querySelector('#outcome-3') },
  { id: 'outcome-4', element: document.querySelector('#outcome-4') },
  { id: 'outcome-5', element: document.querySelector('#outcome-5') },
  { id: 'ai-collaboration', element: document.querySelector('#ai-collaboration') }
].filter((section) => section.element);

function updateCurrentLink() {
  const marker = document.querySelector('.site-header').getBoundingClientRect().bottom + 100;
  let currentId = 'home';
  let currentTop = -Infinity;

  for (const section of trackedSections) {
    const top = section.element.getBoundingClientRect().top;
    if (top <= marker && top > currentTop) {
      currentId = section.id;
      currentTop = top;
    }
  }

  for (const link of sectionLinks) {
    if (link.hash === `#${currentId}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

let updateQueued = false;
window.addEventListener('scroll', () => {
  if (updateQueued) return;
  updateQueued = true;
  window.requestAnimationFrame(() => {
    updateCurrentLink();
    updateQueued = false;
  });
}, { passive: true });

window.addEventListener('resize', updateCurrentLink);
window.addEventListener('hashchange', updateCurrentLink);
updateCurrentLink();
