// import {
//   CALCULATE_ITEMS,
//   Clear_Cart,
//   Decrease_Amount,
//   DISPLAY_ITEMS,
//   Increase_Amount,
//   LOADING,
//   Remove_Item,
// } from "../actions/cartActions"

import {
  Clear_Cart,
  Decrease_Amount,
  DISPLAY_ITEMS,
  Increase_Amount,
  LOADING,
  Remove_Item,
} from "../actions/cartActions";

const reducer = (state, action) => {
  if (action.type === LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === DISPLAY_ITEMS) {
    return { ...state, isLoading: false, cart: action.payload.result };
  }
  if (action.type === Clear_Cart) {
    return { ...state, cart: [] };
  }
  if (action.type === Remove_Item) {
    const newCart = state.cart.filter((item) => item.id !== action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === Increase_Amount) {
    //const newItem = { ...state.cart };
    const updateItem = state.cart.map((item) => {
      if (item.id !== action.payload.id) {
        return item;
      } else {
        return { ...item, amount: item.amount + 1 };
      }
    });

    return { ...state, cart: updateItem };
  }

  if (action.type === Decrease_Amount) {
    //const newItem = { ...state.cart };
    if (
      state.cart.some(
        (item) => item.id === action.payload.id && item.amount === 1
      )
    ) {
      const newCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: newCart };
    }

    const updatedCart = state.cart.map((item) => {
      if (item.id !== action.payload.id) {
        return item;
      } else {
        return { ...item, amount: item.amount - 1 };
      }
    });
  }
};

export default reducer;
