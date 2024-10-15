import { useContext } from "react";
import Product from "./Product";
import GlobalContext from "../GlobalContext/GlobalContext";

export default function ProductListing() {
  const { catalog } = useContext(GlobalContext);
  
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="mb-3">Product Listing</h4>
        </div>
        <div className="card-body">
          <div className="row" id="productListing">
            {(catalog?.length > 0 &&
              catalog?.map((product, index) => (
                <Product
                  key={index}
                  productId={index}
                  productImage={product.productImage}
                  productName={product.productName}
                  productPrice={product.productPrice}
                />
              ))) || <div className="text-center">Catalog is empty</div>}
          </div>
        </div>
      </div>
    </>
  );
}
