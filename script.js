const quoteForm = document.querySelector('#quote-form');
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#service').value = link.dataset.service;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const fields = new FormData(quoteForm);
  const message = `Hello! I'd like a quote.\n\nName: ${fields.get('name').trim()}\nPhone: ${fields.get('phone').trim()}\nService: ${fields.get('service')}\nLocation: ${fields.get('location').trim()}\nProject: ${fields.get('details').trim()}`;
  document.querySelector('#message-preview').value = message;
  document.querySelector('#quote-result').hidden = false;
  document.querySelector('#copy-status').textContent = '';
  const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
  window.location.href = `sms:+17723063020${separator}body=${encodeURIComponent(message)}`;
});
document.querySelector('#copy-request').addEventListener('click', async () => {
  const preview = document.querySelector('#message-preview');
  try {
    await navigator.clipboard.writeText(preview.value);
    document.querySelector('#copy-status').textContent = 'Copied. Paste this into a text to (772) 306-3020.';
  } catch {
    preview.focus();
    preview.select();
    document.querySelector('#copy-status').textContent = 'Select and copy the request above, then text it to (772) 306-3020.';
  }
});

const projectPhotos = [[1,"Screened porch","A view of the screened porch and exterior surfaces."],[2,"Shower tile · side wall","Marble-look wall tiles with leveling clips still in place."],[3,"Shower tile · full view","Wall tile and a herringbone shower floor during installation."],[4,"Shower tile · fixture wall","Tile layout around the shower valve during installation."],[5,"Shower tile · floor detail","A closer look at the herringbone mosaic floor and drain."],[6,"Shower tile · wall detail","Another view of the marble-look wall tile layout."],[7,"Flooring · installation","Gray wood-look planks being fitted across the room."],[8,"Flooring · room view","A wider view of the plank flooring, with project materials visible."],[9,"Flooring · bathroom","Plank flooring around the bathroom fixtures during the project."],[10,"Flooring · wider space","Gray wood-look flooring across the larger room."],[11,"Screened porch · front view","Front view of the screened porch, white screen door, and contrasting dark steps."]];
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});
const viewer = document.querySelector('#photo-viewer');
let currentPhoto = 0;
function displayPhoto(index) {
  currentPhoto = (index + projectPhotos.length) % projectPhotos.length;
  const [id, title, description] = projectPhotos[currentPhoto];
  document.querySelector('#viewer-image').src = `images/project-${id}.jpg`;
  document.querySelector('#viewer-image').alt = description;
  document.querySelector('#photo-title').textContent = title;
  document.querySelector('#photo-description').textContent = description;
  document.querySelector('#photo-count').textContent = `${currentPhoto + 1} / ${projectPhotos.length}`;
}
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  displayPhoto(projectPhotos.findIndex(photo => photo[0] === Number(button.dataset.photo)));
  viewer.showModal();
  document.body.classList.add('viewer-open');
}));
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => document.body.classList.remove('viewer-open'));
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
document.querySelector('#previous-photo').addEventListener('click', () => displayPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => displayPhoto(currentPhoto + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); displayPhoto(currentPhoto - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); displayPhoto(currentPhoto + 1); }
});
