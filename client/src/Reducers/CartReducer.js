import { ADD_TO_CART, REMOVE_FROM_CART } from "../Actions/ActionTypes";

const addBookToCart = (bookId, state) => {
  const updatedCart = [...state.books];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.bookId === bookId
  );

  //   If book is not in the list index will be less than 0
  if (updatedItemIndex < 0) {
    updatedCart.push({ bookId, quantity: 1 });
  } else {
    //   we update the quantity if the book is in the list
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, books: updatedCart };
};

const removeBookFromCart = (bookId, state) => {
  const updatedCart = [...state.books];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.bookId === bookId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, books: updatedCart };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addBookToCart(action.bookId, state);
    case REMOVE_FROM_CART:
      return removeBookFromCart(action.bookId, state);
    default:
      return state;
  }
};
