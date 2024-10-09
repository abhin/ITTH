import { useEffect, useState } from "react";
import AddProduct from "./Components/AddProduct";
import ProductListing from "./Components/ProductListing";
import Cart from "./Components/Cart";

function App() {
  const [product, setProduct] = useState({});
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);

  console.log(catalog);

  const handleSubmit = (event) => {
    event.preventDefault();
    const productName = event?.target?.productName?.value;
    const productPrice = event?.target?.productPrice?.value;
    const productImage = event?.target?.productImage?.value;

    productName &&
      productPrice &&
      productImage &&
      setProduct({
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
      });

    event.target.productName.value = "";
    event.target.productPrice.value = "";
    event.target.productImage.value = "";
  };

  useEffect(() => {
    setCatalog([...catalog, product]);
    console.log(catalog);
  }, [product]);

  useEffect(() => {
    setCart([...catalog]);
    console.log(cart);
  }, [catalog]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <AddProduct handleSubmit={handleSubmit} />
            </div>
          </div>
          <div className="col-md-8">
            <ProductListing catalog={catalog} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5">
            <Cart catalog={cart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
