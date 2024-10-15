import { useContext, useEffect } from "react";
import AddProduct from "./Components/AddProduct";
import ProductListing from "./Components/ProductListing";
import Cart from "./Components/Cart";
import GlobalContext from "./GlobalContext/GlobalContext";

function App() {
  const { product, catalog, cart, setCatalog, calculateCart } =
    useContext(GlobalContext);

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
            <AddProduct />
          </div>
          <div className="col-md-8">
            <ProductListing />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5">
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
