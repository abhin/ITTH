import React from 'react'

export default function ProductCard({productImage, productName, productPrice}) {
  return (
    <>
        <div className="card" style={{ width: "18rem" }}>
            <img src={productImage} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{productName}</h5>
                <p className="card-text">
                    {productPrice}
                </p>
                <a href="#" className="btn btn-primary">
                    Add to cart
                </a>
            </div>
        </div>
    </>
  )
}
