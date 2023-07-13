import { v4 as uuidv4 } from "uuid";
import cogoToast from "cogo-toast";
import { updateCartAPI, verifyCartAPI } from "../../apis/cart.api";
import { updateCart } from "../actions/cart-action";
const { createSlice } = require("@reduxjs/toolkit");

const cartTotalPriceCalculator = (items) => {
  return items.reduce((total, item) => {
    const variant = item.variant;

    return total + variant.price * item.quantity;
  }, 0);
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    _id: null,
    user: {},
    items: [],
    validCart: true,
    cartTotalPrice: 0,
    shippingPrice: 0,
    discountPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const variant = action.payload.variant;
      const quantity = action.payload.quantity;
      const size = action.payload.size;
      const cartItem = state.items.find(
        (item) =>
          item.variant._id === variant._id &&
          variant.color._id === item.variant.color._id &&
          size === item.size,
      );
      if (!cartItem) {
        state.items.push({
          variant: variant,
          quantity: quantity ? quantity : 1,
          size: size,
          cartItemId: uuidv4(),
        });
      } else if (
        cartItem !== undefined &&
        (cartItem.variant.color._id !== variant.color._id ||
          cartItem.size !== size)
      ) {
        state.items = [
          ...state.items,
          {
            variant: variant,
            quantity: quantity ? quantity : 1,
            size: size,
            cartItemId: uuidv4(),
          },
        ];
      } else {
        state.items = state.items.map((item) => {
          if (item.cartItemId === cartItem.cartItemId) {
            let minQuantity = Math.min(
              quantity ? item.quantity + quantity : item.quantity + 1,
              variant.sizes.find((s) => s.sizeOption === size).inventory,
            );
            console.log(
              "minQuantity",
              variant.sizes.find((s) => s.sizeOption === size).inventory,
            );
            return {
              ...item,
              quantity: minQuantity,
              selectedProductColor: variant.color._id,
              selectedProductSize: size,
            };
          }
          return item;
        });
      }
      cogoToast.success("Added To Cart", { position: "top-center" });
      state.cartTotalPrice = cartTotalPriceCalculator(state.items);
      state.user = action.payload.currentUser;
      if (!state.user) {
        if (!localStorage.getItem("sessionId"))
          localStorage.setItem("sessionId", uuidv4());
      }
      updateCart();
    },
    deleteFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload.cartItemId,
      );
      cogoToast.error("Removed From Cart", { position: "top-center" });
      state.cartTotalPrice = cartTotalPriceCalculator(state.items);
      state.user = action.payload.currentUser;
      updateCart();
    },
    decreaseQuantity(state, action) {
      const product = action.payload;
      if (product.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.cartItemId !== product.cartItemId,
        );
        cogoToast.error("Removed From Cart", { position: "top-center" });
      } else {
        state.items = state.items.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
        cogoToast.warn("Item Decremented From Cart", {
          position: "top-center",
        });
      }
      state.cartTotalPrice = cartTotalPriceCalculator(state.items);
      state.user = action.payload.currentUser;
      console.log("state", JSON.stringify(state));
      updateCart();
    },
    deleteAllFromCart(state, action) {
      state.items = [];
      state.cartTotalPrice = cartTotalPriceCalculator(state.items);
      state.user = action.payload.currentUser;
      updateCart();
    },
    resetCart: (state) => {
      state.user = {};
      state.items = [];
      state.cartTotalPrice = 0;
      updateCart();
    },
    setCart: (state, action) => {
      state.user = action.payload.user;
      state.items = action.payload.items;
      state.cartTotalPrice = action.payload.cartTotalPrice;
    },
    updateShippingPrice: (state, action) => {
      state.shippingPrice = action.payload.shipping.price;
      state.selectedShippingId = action.payload.shipping._id;
      updateCart();
    },
    updateDiscountPrice: (state, action) => {
      state.discountPrice = action.payload.discountPrice;
      state.couponId = action.payload.coupon._id;
      updateCart();
    },
    setUserInCart: (state, action) => {
      state.user = action.payload.user._id;
      updateCart();
    },
    setCartStatus: (state, action) => {
      state.validCart = action.payload;
    },
    setCartId: (state, action) => {
      state._id = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  deleteAllFromCart,
  cartTotalPrice,
  resetCart,
  setCart,
  setUserInCart,
  updateShippingPrice,
  updateDiscountPrice,
  setCartStatus,
  setCartId,
} = cartSlice.actions;
export default cartSlice.reducer;
