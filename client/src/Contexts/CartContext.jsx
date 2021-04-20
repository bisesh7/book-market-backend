import React, { createContext, useReducer } from "react";
import { CartReducer } from "../Reducers/CartReducer";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cart, cartDispatch] = useReducer(CartReducer, {
    books: [],
  });

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
