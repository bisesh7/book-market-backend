import {
  SET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_BOOK_FROM_CART,
} from "../Actions/ActionTypes";

const initState = {
  cart: [],
};

const increaseBookQuantityToCart = (bookId, state) => {
  const updatedCart = [...state.cart];
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

  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  return { ...state, cart: updatedCart };
};

const decreaseBookQuantityFromCart = (bookId, state) => {
  const updatedCart = [...state.cart];
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

  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  return { ...state, cart: updatedCart };
};

const deleteBookFromCart = (bookId, state) => {
  let updatedCart = [...state.cart];

  updatedCart = updatedCart.filter((item) => item.bookId !== bookId);

  sessionStorage.setItem("cart", JSON.stringify(updatedCart));

  return { ...state, cart: updatedCart };
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return increaseBookQuantityToCart(action.bookId, state);
    case REMOVE_FROM_CART:
      return decreaseBookQuantityFromCart(action.bookId, state);
    case SET_CART:
      return { ...state, cart: action.cart };
    case DELETE_BOOK_FROM_CART:
      return deleteBookFromCart(action.bookId, state);
    default:
      return state;
  }
};

export default cartReducer;
