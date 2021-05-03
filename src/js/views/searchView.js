class SearchView {
  _parenntEl = document.querySelector('.search');
  getQuery() {
    const query = this._parenntEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parenntEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parenntEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
