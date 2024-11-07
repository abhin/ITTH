import { useContext } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";

export default function Product({
  productId,
  productImage,
  productName,
  productPrice,
}) {
  const {addToCart} = useContext(GlobalContext);
  
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={productImage} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{productName}</h5>
          <p className="card-text">£{productPrice}</p>
          <a
            href="#"
            className="btn btn-primary"
            onClick={(e) => {
              addToCart(e, productId);
            }}
          >
            Add to cart
          </a>
        </div>
      </div>
    </>
  );
}
