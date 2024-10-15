import { useContext } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";

export default function CartItem({
  pid,
  productImage,
  productName,
  productPrice,
  qty,
}) {
  const { increaseQty, decreaseQty } = useContext(GlobalContext);
  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{productName}</div>
          <img
            src={productImage}
            className="me-3 mt-3 mb-3"
            style={{ width: "100px", height: "100px" }}
          />
          <span className="fw-bold">${productPrice}</span> X{" "}
          <span className="fw-bold">{qty}</span>
          <p className="fw-bold"> Sub Total: ${productPrice * qty}</p>
        </div>

        <button
          onClick={(e) => {
            decreaseQty(e, pid);
          }}
          title="Decrease Qty"
          className="btn btn-primary m-2"
          type="submit"
        >
          -
        </button>
        <button
          onClick={(e) => {
            increaseQty(e, pid);
          }}
          title="Increase Qty"
          className="btn btn-primary m-2"
          type="submit"
        >
          +
        </button>
      </li>
    </>
  );
}
