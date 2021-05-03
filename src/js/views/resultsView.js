import View from './View';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipe found for your query, please try again';
  _Message = '';
  _generateMarkup() {
    // return this._data.map(this._generateMarkupPreview).join('');
    const id = window.location.hash.slice(1);
    const result = this._data
      .map(resu => {
        return `<li class="preview">
        <a class="preview__link ${
          resu.id === id ? 'preview__link--active' : ''
        }" href="#${resu.id}">
          <figure class="preview__fig">
            <img src="${resu.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${resu.title}</h4>
            <p class="preview__publisher">${resu.publisher}</p>
        
          </div>
        </a>
      </li>`;
      })
      .join('');
    return result;
  }
}
export default new ResultsView();
