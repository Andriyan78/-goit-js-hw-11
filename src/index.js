import FetchServ from "./JS/fetchserv";
import galleryCreate from "./JS/galery-markup";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";


// const btnSubmit = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more'); 
const searchForm = document.querySelector('#search-form')
const newFetch = new FetchServ();

searchForm.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();

    // if(!btnLoadMore.hidden == true) {[
    //     btnLoadMore.hidden = false
    // ]}

    newFetch.searchQuery = e.currentTarget.elements.searchQuery.value;
    newFetch.resetPage();

    try {
        if(newFetch.searchQuery === '') {
          clearList();
          Notiflix.Notify.failure('Please enter your search data.');
        }
        else {
        btnLoadMore.hidden = false;
        const response = await newFetch.fetchArticles();
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
        galleryCreate(hits);
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
    const response = await newFetch.fetchArticles();
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