import propType from "prop-types";

function ProductCard({ product }) {
  return (
    <>
      <div className="product-card">
        <div className="img-container">
          <img src={`images/${product.image}`} alt="Waffle with Berries" />
          <button className="add-to-cart">Add to Cart</button>
        </div>
        <div className="product-info">
          <h4>{product.category}</h4>
          <p className="product-name">{product.name}</p>
          <p>$6.50</p>
        </div>
      </div>
    </>
  );
}

ProductCard.propTypes = {
  product: propType.object,
};

export default ProductCard;
