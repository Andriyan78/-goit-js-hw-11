import axios from "axios";
// import Notiflix from "notiflix";

const input = document.querySelector('input');
const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.hidden = true;

const KEY = '32999305-dd322609f910976659da09787';

export default class FetchServ  {
  constructor(){
    this.page = 1;
    this.name = " ";
  }

  async fetchArticles() {
    this.BASEURL = 'https://pixabay.com/api/';
    this.name = input.value.trim();
    this.per_page = 40;
    this.numberCard = this.per_page;

  if (this.name.length === 0) {
    return;
  }
  try {
    const response = await axios.get(`${this.BASEURL}?key=${KEY}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`);
    const totalHits = await response.data.totalHits;
    console.log(totalHits);
    this.incrementPage();
      return response;
  } catch (error) {
    console.log(error);
  }
  }

  incrementPage() {
    this.numberCard *=this.page;
    console.log(this.numberCard);
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

}