import fetchServ from "./js/fetchserv";
import galleryCreate from "./js/galery-markup"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";


// const btnSubmit = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more'); 
const searchForm = document.querySelector('#search-form')
const fetchServ = new Fetchserv();

searchForm.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();

    if(!btnLoadMore.hidden == true) {[
        btnLoadMore.hidden = false
    ]}

    Fetchserv.searchQuery = e.currentTarget.elements.searchQuery.value;
    Fetchserv.resetPage();

    try {
        if(Fetchserv.searchQuery === '') {
          clearList();
          Notiflix.Notify.failure('Please enter your search data.');
        }
        else {
        btnLoadMore.hidden = false;
        const response = await Fetchserv.makeRequest();
        const {
            data: { hits, totalHits },
                } = response;
                clearList();
                btnLoadMore.hidden = true;
        
      
        if (hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
        btnLoadMore.hidden = true;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        createGallery(hits);
        }
        btnLoadMore.hidden = false;
      }

      } catch (err) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      console.log(err.message);

      btnLoadMore.hidden = true;
}
}

async function onLoadMore() {
    const response = await Fetchserv.makeRequest();
    const {
      data: { hits },
    } = response;
    
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else galleryCreate(hits); 
};

function clearList() {
    gallery.innerHTML = "";
}