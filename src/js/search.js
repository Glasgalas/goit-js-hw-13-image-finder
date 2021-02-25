import imageTmp from '../templates/img-temp.hbs';
import refs from './refs';
import LoadMoreBtn from './load-more';
import debounce from 'lodash.debounce';
import ApiService from './apiService';

const loadMoreBtn = new LoadMoreBtn('.js-loadMoreBtn');
const backToTopBtn = new LoadMoreBtn('.js-backToTop');
const apiFetch = new ApiService();

function onSearch(event) {
  event.preventDefault();

  apiFetch.query = event.target.value.trim();
  if (apiFetch.query === '') {
    loadMoreBtn.hide();
    backToTopBtn.hide();
    clearMakrup();
    return;
  }

  clearMakrup();
  apiFetch.resetPageNumber();
  fetchGallery();
}

function markupGallery(data) {
  refs.markup.insertAdjacentHTML('beforeend', imageTmp(data));
}

function clearMakrup() {
  refs.markup.innerHTML = '';
}

function fetchGallery() {
  apiFetch.fetchData().then(data => {
    markupGallery(data);
    if (data.length >= 12) {
      loadMoreBtn.show();
      backToTopBtn.show();
    }
    if (data.length === 0) {
      loadMoreBtn.hide();
      backToTopBtn.hide();
    }
  });
}

function backToTop() {
  window.scrollTo(0, 0);
}

function onScrollTo() {
  let value = document.body.scrollHeight;
  setTimeout(() => {
    window.scrollTo({
      top: value,
      left: 0,
      behavior: 'smooth',
    });
  }, 1000);
}

refs.input.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', fetchGallery);
refs.loadMoreBtn.addEventListener('click', onScrollTo);
refs.backToTop.addEventListener('click', backToTop);
