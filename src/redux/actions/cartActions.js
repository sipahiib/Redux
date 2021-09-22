import * as actionType from "./actionTypes";

export function addToCart(cartItem) {
  return { type: actionType.ADD_TO_CART, payload: cartItem };
}

export function removeFromCart(product) {
  return { type: actionType.REMOVE_FROM_CART, payload: product };
}
