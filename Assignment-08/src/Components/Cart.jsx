function Cart() {
  return (
    <>
      {/* Cart Section */}
      <aside className="cart">
        <h2>Your Cart (7)</h2>
        <ul>
          <li>
            classNameic Tiramisu
            <p>
              <span>x1</span>
              @$5.50 $5.50
            </p>
            <span className="close">
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </li>
          <li>
            Vanilla Bean Crème Brûlée x4
            <p>
              <span>x4</span>
              @$7.00 $28.00
            </p>
            <span className="close">
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </li>
          <li>
            Vanilla Panna Cotta
            <p>
              <span>x2</span>
              @$6.50 $13.00
            </p>
            <span className="close">
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </li>
        </ul>
        <div className="total">
          <p>
            Order Total: <span>$46.50</span>
          </p>
          <p className="carbon-neutral">
            <i className="fa-regular fa-tree" style={{ color: "#63E6BE" }}></i>
            This is a <b>carbon-neutral</b> delivery
          </p>
          <button className="confirm-order">Confirm Order</button>
        </div>
      </aside>
    </>
  );
}

export default Cart;
