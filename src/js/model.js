import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    results: {},
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      image: recipe.image_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      sourceUrl: recipe.source_url,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        image: res.image_url,
        publisher: res.publisher,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  //Add bookmarks
  state.bookmarks.push(recipe);

  //mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(ind => ind.id === id);
  state.bookmarks.splice(index, 1);
  //mark current recipe as not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmark = function () {
  localStorage.removeItem('bookmarks');
};
// clearBookmark();
export const uploadRecipe = async function (newRecipe) {
  // console.log(Object.entries(newRecipe));
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const [quantity, unit, description] = ing[1]
        .replaceAll(' ', '')
        .split(',');
      return { quantity, unit, description };
    });
  console.log(ingredients);
};
