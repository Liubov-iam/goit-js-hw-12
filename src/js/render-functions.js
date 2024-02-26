import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const formElem = document.querySelector('.search-form');

const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animation: 250,
};

const lightbox = new SimpleLightbox('.gallery a', options);

export function renderImages(array) {
  const markup = array
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="gallery">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" title="${tags}" width="380" height="220" />
              <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${likes}</span></li>
                <li class="info-cards-elements">views<span>${views}</span></li>
                <li class="info-cards-elements">comments<span>${comments}</span></li>
                <li class="info-cards-elements">downloads<span>${downloads}</span></li>
              </ul>
            </a>
          </div>
        `;
      }
    )
    .join('');
  
  gallery.innerHTML = markup;
  lightbox.refresh();
  formElem.reset();
}

export function renderMoreImages(images) {
  const hitsArray = images['hits'];
  const markup = hitsArray
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="photo-card">
            <a href="${largeImageURL}" target="_blank">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
              <p><i class="img-text">Likes </i><span>${likes}</span></p>
              <p><i class="img-text">Views </i><span>${views}</span></p>
              <p><i class="img-text">Comments </i><span>${comments}</span></p>
              <p><i class="img-text">Downloads </i><span>${downloads}</span></p>
            </div>
          </div>
        `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
  formElem.reset();
}