import * as actionType from "./actionTypes";

export function changeCategory(cat) {
  return { type: actionType.CHANGE_CATEGORY, payload: cat };
}

export function getCategoriesSuccess(categories) {
  return { type: actionType.GET_CATEGORIES_SUCCESS, payload: categories };
}

export function getCategories() {
  return function (dispatch) {
    let url = "http://localhost:3000/categories";
    return fetch(url)
      .then((respnose) => respnose.json())
      .then((result) => dispatch(getCategoriesSuccess(result)));
  };
}
