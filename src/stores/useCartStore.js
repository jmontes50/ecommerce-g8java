import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getStorage, saveStorage } from "../utils/localStorage";

const NAMEKEY = "cart";

const useCartStore = create(devtools((set) => ({
  cart: getStorage(NAMEKEY) || [],
  //product aparte de sus propiedades, va a llegar con una propiedad qtyCart
  addProductToCart: (product) => {
    set((state) => {
      const index = state.cart.findIndex((item) => item.id === product.id)
      if(index === -1 ){
        const changeCart = [...state.cart, product];
        saveStorage(NAMEKEY, changeCart);
        return {
          cart: changeCart,
        };
      } else{
        const cartTemp = [...state.cart];
        cartTemp[index].qtyCart = product.qtyCart;
        saveStorage(NAMEKEY, cartTemp);
        return {
          cart: cartTemp
        }
      }
    }, false, "cart/addProductToCart");
  },
  changeQtyProduct: (product, newQty) => {
    set((state) => {
      const index = state.cart.findIndex((item) => item.id === product.id)
      if(index > -1){
        const cartTemp = [...state.cart];
        cartTemp[index].qtyCart = newQty;
        saveStorage(NAMEKEY, cartTemp);
        return {
          cart: cartTemp
        }
      } else {
        console.log("No se encontró el producto");
        return state
      }
    }, false, "cart/changeQtyProduct");
  }
})));

export default useCartStore;
