import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import addRecipeView from './views/addRecipeView.js';
const { async } = require('q');

// https://forkify-api.herokuapp.com/v2
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    //update to mark selected
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    // controllServing();
    // updating bookmarks
  } catch (err) {
    recipeView.renderError();
  }
};

const constrolSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResult(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //render pagination
    paginationView.render(model.state.search);
    // console.log(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};
// constrolSearchResults();
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  //render pagination
  paginationView.render(model.state.search);
};

const controllServing = function (newServings) {
  //update the serving from the state
  model.updateServings(newServings);
  //update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const addBookmarkRecipe = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  console.log(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controllBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controllAddRecipe = function (newRecipe) {
  model.uploadRecipe(newRecipe);
};
const init = function () {
  bookmarksView.addHandlerRender(controllBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controllServing);
  recipeView.addHandlerAddBookmark(addBookmarkRecipe);
  searchView.addHandlerSearch(constrolSearchResults);
  paginationView.addHandler(controlPagination);
  addRecipeView._addHanderUpload(controllAddRecipe);
  console.log('Welcome');
};
init();
