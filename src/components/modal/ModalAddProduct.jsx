import React, { useState } from "react";

const ModalAddProduct = ({
  showModalAddProducts,
  setshowModalAddProducts,
  getProducts,
}) => {
  const [productData, setProductData] = useState({
    name: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    category: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddProduct = () => {
    // You can access the form values (name, buying price, etc.) from productData
    const {
      name,
      buyingPrice,
      sellingPrice,
      quantity,
      category,
      description,
      image,
    } = productData;

    // Add your logic to handle adding a product here.
    // You can use the values from productData.
    // After adding the product, you can also close the modal.
    setshowModalAddProducts(false);

    // Reset the form fields for the next entry
    setProductData({
      name: "",
      buyingPrice: "",
      sellingPrice: "",
      quantity: "",
      category: "",
      description: "",
      image: "",
    });

    // You can also call getProducts to refresh the product list
    getProducts();
  };

  return (
    <div>
      <button
        onClick={() => {
          setshowModalAddProducts(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </button>
      {showModalAddProducts ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
          <div className="modal relative bg-slate-100 p-4  h-screen rounded-lg shadow-lg w-4/12 ">
            <span
              className="close absolute top-2 right-2 text-gray-500 cursor-pointer text-2xl"
              onClick={() => {
                setshowModalAddProducts(false);
              }}
            >
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form>
              <div className=" shadow-lg mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className=" form-input mt-1 block w-full"
                />
              </div>

              <div className="shadow-lg  mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Buying Price
                </label>
                <input
                  type="text"
                  name="buyingPrice"
                  value={productData.buyingPrice}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>

              <div className="shadow-lg mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Selling Price
                </label>
                <input
                  type="text"
                  name="sellingPrice"
                  value={productData.sellingPrice}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>

              <div className=" shadow-lg mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                />
              </div>

              <div className="shadow-lg mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="rounded form-input mt-1 block w-full"
                />
              </div>

              <div className="shadow-lg mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className=" rounded form-textarea mt-1 block w-full"
                />
              </div>

              <div className="shadow-lg mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  value={productData.image}
                  onChange={handleInputChange}
                  className=" form-input mt-1 block w-full"
                />
              </div>

              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModalAddProduct;
