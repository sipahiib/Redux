import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Button, Table } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }

  addToCart = (product) => {
    this.props.actions.addToCart({ quantityPerUnit: 1, product });
    alertify.notify(product.productName + " added to cart");
  };

  render() {
    return (
      <div>
        <Badge color="success">{this.props.currentCategory.categoryName}</Badge>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>
                  <Link to={"/saveproduct/" + product.id}>
                    {product.productName}
                  </Link>
                </td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>
                  <Button onClick={() => this.addToCart(product)}>Add</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
