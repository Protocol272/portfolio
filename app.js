'use strict';

const lightbox = document.querySelector('.lightbox');
const expandedImage = document.querySelector('#lightbox-image');
const caption = document.querySelector('#lightbox-caption');
const closeButton = lightbox.querySelector('.close-button');
let lastImageButton = null;

document.querySelectorAll('[data-image]').forEach((button) => {
  button.addEventListener('click', () => {
    lastImageButton = button;
    expandedImage.src = button.dataset.image;
    expandedImage.alt = button.querySelector('img').alt;
    caption.textContent = button.dataset.caption;
    lightbox.showModal();
    closeButton.focus();
  });
});

lightbox.addEventListener('click', (event) => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
    lightbox.close();
  }
});

lightbox.addEventListener('close', () => {
  expandedImage.removeAttribute('src');
  lastImageButton?.focus();
});

document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});

document.querySelectorAll('details').forEach((archive) => {
  archive.addEventListener('toggle', () => {
    if (!archive.open) archive.querySelectorAll('video').forEach((video) => video.pause());
  });
});
