import { v4 as uuidv4 } from "uuid";
import cogoToast from "cogo-toast";
import { updateCartAPI } from "../../apis/cart.api";
const { createSlice } = require("@reduxjs/toolkit");

const cartTotalPriceCalculator = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const variant = item.variant;

    return total + variant.price * item.quantity;
  }, 0);
};
const updateCart = async (state, { selectedShippingId, couponId }) => {
  let cart = {
    user: state.user ? state.user : null,
    session: localStorage.getItem("sessionId"),
    shipping: selectedShippingId,
    coupon: couponId,
    items: state.cartItems.map((item) => {
      return {
        variant: item.variant._id,
        quantity: item.quantity,
        size: item.size,
        cartItemId: item.cartItemId,
      };
    }),
    totalPrice: state.cartTotalPrice,
    shippingPrice: state.shippingPrice,
    discountPrice: state.discountPrice,
    finalPrice:
      state.cartTotalPrice + state.shippingPrice - state.discountPrice,
  };
  if (!selectedShippingId) {
    delete cart.shipping;
  }
  if (!couponId) {
    delete cart.coupon;
  }
  return await updateCartAPI({ cart });
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    user: {},
    cartItems: [],
    cartTotalPrice: 0,
    shippingPrice: 0,
    discountPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const variant = action.payload.variant;
      const quantity = action.payload.quantity;
      const size = action.payload.size;
      const cartItem = state.cartItems.find(
        (item) =>
          item.variant._id === variant._id &&
          variant.color._id === item.variant.color._id &&
          size === item.size,
      );
      console.log("cartItems", JSON.stringify(state.cartItems));
      if (!cartItem) {
        state.cartItems.push({
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
        state.cartItems = [
          ...state.cartItems,
          {
            variant: variant,
            quantity: quantity ? quantity : 1,
            size: size,
            cartItemId: uuidv4(),
          },
        ];
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.cartItemId === cartItem.cartItemId) {
            return {
              ...item,
              quantity: quantity ? item.quantity + quantity : item.quantity + 1,
              selectedProductColor: variant.color._id,
              selectedProductSize: size,
            };
          }
          return item;
        });
      }
      cogoToast.success("Added To Cart", { position: "bottom-left" });
      state.cartTotalPrice = cartTotalPriceCalculator(state.cartItems);
      state.user = action.payload.currentUser;
      if (!state.user) {
        if (!localStorage.getItem("sessionId"))
          localStorage.setItem("sessionId", uuidv4());
      }
      updateCart(state, {}).then((res) => {});
    },
    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.cartItemId !== action.payload.cartItemId,
      );
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
      state.cartTotalPrice = cartTotalPriceCalculator(state.cartItems);
      state.user = action.payload.currentUser;
      updateCart(state, {}).then((res) => {});
    },
    decreaseQuantity(state, action) {
      const product = action.payload;
      if (product.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== product.cartItemId,
        );
        cogoToast.error("Removed From Cart", { position: "bottom-left" });
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
        cogoToast.warn("Item Decremented From Cart", {
          position: "bottom-left",
        });
      }
      state.cartTotalPrice = cartTotalPriceCalculator(state.cartItems);
      state.user = action.payload.currentUser;
      console.log("state", JSON.stringify(state));
      updateCart(state, {}).then((res) => {});
    },
    deleteAllFromCart(state, action) {
      state.cartItems = [];
      state.cartTotalPrice = cartTotalPriceCalculator(state.cartItems);
      state.user = action.payload.currentUser;
      updateCart(state, {}).then((res) => {});
    },
    resetCart: (state) => {
      state.user = {};
      state.cartItems = [];
      state.cartTotalPrice = 0;
    },
    setCart: (state, action) => {
      state.user = action.payload.user;
      state.cartItems = action.payload.cartItems;

      state.cartTotalPrice = action.payload.cartTotalPrice;
    },
    updateShippingPrice: (state, action) => {
      state.shippingPrice = action.payload.shipping.price;
      updateCart(state, {
        selectedShippingId: action.payload.shipping._id,
      }).then((res) => {});
    },
    updateDiscountPrice: (state, action) => {
      state.discountPrice = action.payload.discountPrice;
      updateCart(state, { couponId: action.payload.coupon._id }).then(
        (res) => {},
      );
    },
    setUserInCart: (state, action) => {
      state.user = action.payload.user;
      updateCart(state, {}).then((res) => {});
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
} = cartSlice.actions;
export default cartSlice.reducer;
