import React from "react";

export default function Cart() {
  return (
    <>
      <h4>Shopping Cart</h4>
      <div className="card">
        <div className="card-body">
          <ul className="list-group" id="cartItems">
            {/* Cart items will be dynamically added here */}
          </ul>
          <div className="mt-3">
            <h5>
              Total: $<span id="totalPrice">0.00</span>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
