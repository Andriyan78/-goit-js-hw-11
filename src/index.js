import NewAskServer from "./JS/fetchserv";
export { renderImgGallery };
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";


const btnSubmit = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more'); 

const newAskServer = new NewAskServer();


btnSubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  btnLoadMore.classList.replace('is-visible', 'is-hidden');
  clearArticlesContainer();
 
  try {
    newAskServer.resetPage();
    const data = await newAskServer.fetchArticles();

    const hits = await data.data.hits;
    const totalHits = await data.data.totalHits;

    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

    renderImgGallery(hits);
     btnLoadMore.classList.replace('is-hidden', 'is-visible');
    let galleryOpenModal = new SimpleLightbox('.gallery a');
      galleryOpenModal.on('show.simplelightbox', function () {
});
  } catch (error) {
    console.log(error.message);
  }
});


function renderImgGallery(hits) {
  if (hits.length === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    btnLoadMore.classList.replace('is-visible', 'is-hidden');
    return;
  }
 
  const markup = hits
    .map(
        (({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card gallery__item">
        <a class="gallery__link" href="${largeImageURL}" style ="display:inline-block; text-decoration:none; color:black;">
   <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div></a>
      </div> `;
      }))
 
    .join(" ");
  gallery.insertAdjacentHTML('beforeend', markup);

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 0.25,
  behavior: "smooth",
});
}


btnLoadMore.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const data = await newAskServer.fetchArticles();
    const hits = await data.data.hits;
     
    renderImgGallery(hits);
 

    let galleryOpenModal = new SimpleLightbox('.gallery a');
    galleryOpenModal.on('show.simplelightbox', function () {
    });

   
    galleryOpenModal.refresh();
  } catch (error) {
    console.log(error.message);
  }
});


function clearArticlesContainer() {
  gallery.innerHTML = " ";
}