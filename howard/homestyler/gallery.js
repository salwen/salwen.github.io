const screens = chapters.flatMap(chapter => chapter.items);
const navigation = document.querySelector('#screens');
const chapterList = document.querySelector('#chapters');
const viewer = document.querySelector('dialog');
const stage = document.querySelector('.stage');
const full = document.querySelector('#full');
const label = document.querySelector('#image-label');
const strip = document.querySelector('.strip');
let current = 0;
let opener;

function thumbnail(screen, caption) {
  const index = screens.indexOf(screen);
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', '查看' + screen.label);
  const image = new Image();
  image.src = screen.src;
  image.alt = '';
  image.loading = 'lazy';
  button.append(image);
  if (caption) {
    const title = document.createElement('span');
    title.textContent = screen.label + ' ↗';
    button.append(title);
  }
  button.addEventListener('click', () => {
    if (!viewer.open) {
      opener = button;
      viewer.showModal();
    }
    showScreen(index);
  });
  return button;
}

chapters.forEach((chapter, index) => {
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = 'chapter-' + (index + 1);
  const link = document.createElement('a');
  link.href = '#' + section.id;
  const preview = new Image();
  preview.src = chapter.items[0].src;
  preview.alt = '';
  const caption = document.createElement('span');
  caption.textContent = String(index + 1).padStart(2, '0') + '　' + chapter.title;
  link.append(preview, caption);
  navigation.append(link);
  const title = document.createElement('h2');
  title.textContent = chapter.title;
  const text = document.createElement('p');
  text.textContent = chapter.body;
  const gallery = document.createElement('div');
  gallery.className = 'gallery';
  gallery.append(...chapter.items.map(screen => thumbnail(screen, true)));
  section.append(title, text, gallery);
  chapterList.append(section);
});

document.querySelectorAll('[data-slide]').forEach(button => {
  button.onclick = () => navigation.scrollBy({left: Number(button.dataset.slide) * navigation.firstElementChild.offsetWidth});
});

const selectors = screens.map(screen => thumbnail(screen, false));
strip.append(...selectors);

function showScreen(index) {
  current = (index + screens.length) % screens.length;
  const screen = screens[current];
  full.alt = screen.label;
  full.src = screen.src;
  stage.scrollTop = 0;
  label.textContent = (current + 1) + ' / ' + screens.length + ' · ' + screen.label;
  selectors.forEach((button, position) => button.setAttribute('aria-current', String(position === current)));
  const selected = selectors[current];
  strip.scrollLeft += selected.getBoundingClientRect().left - strip.getBoundingClientRect().left -
    (strip.clientWidth - selected.offsetWidth) / 2;
}

full.addEventListener('load', () => {
  full.classList.toggle('fit', full.naturalHeight <= full.naturalWidth);
  stage.scrollTop = 0;
});
document.querySelector('#prev').onclick = () => showScreen(current - 1);
document.querySelector('#next').onclick = () => showScreen(current + 1);
document.querySelector('#close').onclick = () => viewer.close();
viewer.addEventListener('close', () => opener?.focus());
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showScreen(current + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
