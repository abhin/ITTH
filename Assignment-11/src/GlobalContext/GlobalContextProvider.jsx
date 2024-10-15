import { useState } from "react";
import GlobalContext from "./GlobalContext";

export default function GlobalContextProvider({ children }) {
  const ADD = "+";
  const SUBSTRACT = "-";

  const [product, setProduct] = useState({});
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  const addToCart = (event, pId) => {
    event.preventDefault();
    let addToCartItem = catalog[pId];

    try {
      if (
        addToCartItem?.productName &&
        addToCartItem?.productPrice &&
        addToCartItem?.productImage
      ) {
        if (cart.hasOwnProperty(pId))
          updateCart(ADD, pId, addToCartItem?.productPrice);
        else
          setCart((prvCart) => {
            return { ...prvCart, [pId]: { ...addToCartItem, qty: 1 } };
          });
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  const updateCart = (addOrSub, pId) => {
    let tmpCart = cart;
    let cartItem = tmpCart[pId];
    const qty = cartItem.qty;

    if (addOrSub == ADD) {
      cartItem.qty = qty + 1;
      tmpCart[pId] = cartItem;
    } else if (addOrSub == SUBSTRACT && cartItem.qty > 1) {
      cartItem.qty = qty - 1;
      tmpCart[pId] = cartItem;
    } else if (
      addOrSub == SUBSTRACT &&
      qty <= 1 &&
      confirm("Do you want to remove the item")
    ) {
      delete tmpCart[pId];
    }
    setCart({ ...tmpCart });
  };

  const calculateCart = () => {
    let itemTotal = 0;
    let cartItems = Object.entries(cart);

    cartItems?.length > 0 &&
      cartItems?.map(([index, item]) => {
        itemTotal = itemTotal + item?.qty * item?.productPrice;
      });
    console.log(itemTotal);
    setTotal(itemTotal);
  };

  const increaseQty = (event, pId) => {
    event.preventDefault();
    updateCart(ADD, pId);
  };

  const decreaseQty = (event, pId) => {
    event.preventDefault();
    updateCart(SUBSTRACT, pId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let productName = event?.target?.productName;
    let productPrice = event?.target?.productPrice;
    let productImage = event?.target?.productImage;

    productName?.value &&
      productPrice?.value &&
      productImage?.value &&
      setProduct({
        productName: productName?.value,
        productPrice: parseFloat(productPrice?.value),
        productImage: productImage?.value,
      });

    productName.value = "";
    productPrice.value = "";
    productImage.value = "";
  };
  return (
    <GlobalContext.Provider
      value={{
        ADD,
        SUBSTRACT,
        product,
        setProduct,
        catalog,
        setCatalog,
        cart,
        setCart,
        total,
        setTotal,
        addToCart,
        updateCart,
        calculateCart,
        increaseQty,
        decreaseQty,
        handleSubmit
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
