import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateCartAPI, verifyCartAPI } from "../../apis/cart.api";
import { setCart, setCartId, setCartStatus } from "../slices/cart-slice";
import cogoToast from "cogo-toast";

export const verifyCart = createAsyncThunk(
  "cart/verifyCart",
  async (_, { dispatch, getState }) => {
    try {
      const cart = getState().cart;
      const response = await verifyCartAPI({ cartId: cart._id });
      if (response.data.cartVerified) {
        dispatch(setCart(response.data.cart));
      } else {
        dispatch(setCartStatus(response.data.cartVerified));
        if (!response.data.cartVerified) {
          cogoToast.error(response.data.error, {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      // Handle error...
    }
  },
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState().cart;
      const userId = getState().user.currentUser?._id;
      console.log("state", state, userId);
      let cart = {
        user: userId ? userId : null,
        session: localStorage.getItem("sessionId"),

        shipping: state.selectedShippingId,
        coupon: state.couponId,
        items: state.items.map((item) => {
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
      if (cart.user || cart.session) {
        const response = await updateCartAPI({ cart });
        console.log("response", response.data);
        if (!response.data.cartVerified) {
          cogoToast.error(response.data.error, {
            position: "top-center",
          });
        }
        dispatch(setCartStatus(response.data.cartVerified));
        dispatch(setCartId(response.data.cart._id));
      }
    } catch (error) {
      console.log(error);
      // Handle error...
    }
  },
);
