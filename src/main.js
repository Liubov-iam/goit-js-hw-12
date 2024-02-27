import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { renderImages, renderMoreImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');
const gallery = document.querySelector('.gallery');
let currentPage = 1;

function showLoadBtn() {
    loadMoreBtn.style.display = 'block';
}

function hideLoadBtn() {
    loadMoreBtn.style.display = 'none';
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

async function handleLoadMoreClick() {
    try {
        showLoader();
       
        const query = input.value.trim();
        const moreImages = await fetchImages(query, currentPage);

        if (moreImages.hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: 'No more images to load.',
            });
        } else {
            renderMoreImages(moreImages);
             currentPage++;
        }
    } catch (error) {
        console.error('Error fetching more images:', error);
        iziToast.error({
            title: 'Error',
            message: 'Failed to load more images. Please try again later.',
        });
    } finally {
        hideLoader();
    }
}

loadMoreBtn.addEventListener('click', handleLoadMoreClick);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query',
        });
        return;
    }

    try {
        showLoader();
        const images = await fetchImages(query, currentPage);

        if (images.hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        } else {
            updateGallery(images);

            const totalPages = Math.ceil(images.totalHits / 15);

            if (currentPage < totalPages) {
                showLoadBtn();
            } else {
                hideLoadBtn();
                endMessage.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        hideLoader();
    }
});

function updateGallery(images, isLoadMore = false) {
    gallery.innerHTML = isLoadMore ? gallery.innerHTML : '';
    renderImages(images.hits);
    if (!isLoadMore) {
        showLoadBtn();
        endMessage.style.display = 'none';
    }
}

const options = {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    animation: 250,
};

export function createGalleryMarkup(images) {
    const gallery = document.querySelector('.gallery'); 

    gallery.innerHTML = images
        .map(
            (image) => `
            <div class="photo-card">
                <a href="${image.largeImageURL}" target="_blank">
                    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p><i class="img-text">Likes </i><span>${image.likes}</span></p>
                    <p><i class="img-text">Views </i><span>${image.views}</span></p>
                    <p><i class="img-text">Comments </i><span>${image.comments}</span></p>
                    <p><i class="img-text">Downloads </i><span>${image.downloads}</span></p>
                </div>
            </div>
        `
        )
        .join('');
    const lightbox = new SimpleLightbox('.gallery a', options);
    lightbox.refresh();
}

window.addEventListener('load', () => {
    const cardHeight = document.querySelector('.photo-card').getBoundingClientRect().height;
    const cardsToScroll = Math.ceil(window.innerHeight / cardHeight) * 2;
    window.scrollBy({
        behavior: 'smooth',
        top: cardHeight * cardsToScroll,
    });
});