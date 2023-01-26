
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');


export default async function galleryCreate(hits) {
    const markup = hits.map(
            (({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                return `
                <div class="photo-card gallery__item">
                <a class="gallery__link" href="${largeImageURL}" style ="display:inline-block; text-decoration:none; color:black;">
           <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  ${likes}
                </p>
                <p class="info-item">
                  <b>Views</b>
                  ${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${downloads}
                </p>
              </div></a>
              </div> `;
              }));
    
    gallery.insertAdjacentHTML('beforeend', markup);   

  
// function onGalleryClick(evt) {
//   evt.preventDefault();
//   const gallery = new SimpleLightbox('.gallery a', {
//     captionDelay: 250,
//   });
// }
    
     
};
