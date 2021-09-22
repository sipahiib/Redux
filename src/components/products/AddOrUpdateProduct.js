import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "../products/ProductDetail";

function AddOrUpdateProduct({
  products,
  categories,
  getProduct,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((preProduct) => ({
      ...preProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }
}

function validate(name, value) {
  if (name === "productName" && value === "") {
    setErrors((preError) => ({
      ...preError,
      productName: "Ürün ismi girilmeli",
    }));
  }
  else{
    setErrors((preError) => ({
      ...preError,
      productName: "",
    }));
  }
}

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    ></ProductDetail>
  );
}
const MapDispatchToProps = {
  getCategories,
  saveProduct,
};

function MapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.product.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};

  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}
export default connect(MapDispatchToProps)(AddOrUpdateProduct);
