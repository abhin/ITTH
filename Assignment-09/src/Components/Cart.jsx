import CartItem from "./CartItem";

export default function Cart({ cart, total, increaseQty, decreaseQty }) {
  const cartItems = Object.entries(cart);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>Shopping Cart</h4>
        </div>
        <div className="card-body">
          {(cartItems?.length > 0 && (
            <ol className="list-group list-group-numbered">
              {cartItems.map(([index, item]) => (
                <CartItem
                  key={index}
                  pid={index}
                  productImage={item?.productImage}
                  productName={item?.productName}
                  productPrice={item?.productPrice}
                  qty={item?.qty}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                />
              ))}
            </ol>
          )) || <div className="text-center">Cart is empty</div>}
          {cartItems?.length > 0 && (
            <div className="mt-3">
              <h5>
                Total: $<span id="totalPrice">{total}</span>
              </h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
