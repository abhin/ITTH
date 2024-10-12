import { useEffect, useState } from "react";
import AddProduct from "./Components/AddProduct";
import ProductListing from "./Components/ProductListing";
import Cart from "./Components/Cart";

function App() {
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

  useEffect(() => {
    try {
      product?.productName &&
        product?.productPrice &&
        // product?.productImage &&
        setCatalog([...catalog, product]);
    } catch (e) {
      console.log("Error", e);
    }
  }, [product]);

  useEffect(() => {
    calculateCart();
  }, [cart]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <AddProduct handleSubmit={handleSubmit} />
          </div>
          <div className="col-md-8">
            <ProductListing catalog={catalog} addToCart={addToCart} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5">
            <Cart
              cart={cart}
              total={total}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
