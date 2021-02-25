const keyAPI = '20402396-fe73999763fab4baba9c844c1';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  fetchData() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${keyAPI}`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        this.pageNumber += 1;
        return data.hits;
      });
  }

  resetPageNumber() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
