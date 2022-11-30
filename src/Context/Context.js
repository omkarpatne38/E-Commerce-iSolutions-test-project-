import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { cartReducer } from "./Reducer";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
    singleProduct: {},
  });

  const getProductData = async () => {
    const {
      data: { products },
    } = await axios.get("https://dummyjson.com/products");
    dispatch({
      type: "ADD_PRODUCTS",
      payload: products,
    });
  };

  const getSingleProduct = async (id) => {
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    dispatch({
      type: "ADD_SINGLE_PRODUCT",
      payload: { data },
    });
    localStorage.setItem("singleProduct", JSON.stringify(data));
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Cart.Provider value={{ state, getSingleProduct, dispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
