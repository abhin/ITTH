export default function AddProduct({handleSubmit}) {
  return (
    <>
        <div className="card-header">
            <h4>Add Product</h4>
        </div>
        <div className="card-body">
            <form id="productForm" onSubmit={(e) => {handleSubmit(e)}}>
                <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                    Product Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                />
                </div>
                <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                    Price
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="productPrice"
                    placeholder="Enter product price"
                />
                </div>
                <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                    Image URL
                </label>
                <input
                    type="url"
                    className="form-control"
                    id="productImage"
                    placeholder="Enter image URL"
                />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Add Product
                </button>
            </form>
        </div>
    </>
  );
}
