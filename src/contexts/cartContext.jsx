import { createContext, useContext, useEffect, useReducer } from "react";
import {
  Clear_Cart,
  Decrease_Amount,
  DISPLAY_ITEMS,
  Increase_Amount,
  LOADING,
  Remove_Item,
} from "../actions/cartActions";
import reducer from "../reducers/cartReducers.js";

export const CartContext = new createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const initialValue = {
    isLoading: false,
    cart: [],
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(
      "https://www.course-api.com/react-useReducer-cart-project"
    );
    const result = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { result } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialValue);

  const clearItems = () => {
    dispatch({ type: Clear_Cart });
  };
  const removeItem = (id) => {
    dispatch({ type: Remove_Item, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: Increase_Amount, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: Decrease_Amount, payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{ ...state, clearItems, removeItem, increase, decrease }}
    >
      {children}
    </CartContext.Provider>
  );
};
