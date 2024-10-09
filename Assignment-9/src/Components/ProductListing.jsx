import ProductCard from "./ProductCard";

export default function ProductListing({ catalog }) {
  return (
    <>
      <h4 className="mb-3">Product Listing</h4>
      <div className="row" id="productListing">
        {catalog?.length}
        {catalog?.length > 0 &&
          catalog?.map((product, index) => (
            <ProductCard key={index}
              productImage={product.productImage}
              productName={product.productName}
              productPrice={product.productPrice}
            />
          ))}
      </div>
    </>
  );
}
