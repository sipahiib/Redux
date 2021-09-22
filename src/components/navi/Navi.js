import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import CartSummary from "../cart/CartSummary";

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/saveproduct">Add Product</Link>
              </NavLink>
            </NavItem>
            <CartSummary></CartSummary>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
