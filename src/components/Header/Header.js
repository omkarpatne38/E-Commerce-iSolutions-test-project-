import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../../Context/Context";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/">E-commerce</Link>
          </Navbar.Brand>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge bg="success">{cart.length}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropDownMenu">
                {cart.length > 0 ? (
                  <>
                    {cart.map((prod) => (
                      <span className="cartitem" key={prod.id}>
                        <img
                          src={prod.image}
                          className="cartItemImg"
                          alt={prod.id}
                        />
                        <div className="cartItemDetail">
                          <span>{prod.title}</span>
                          <span>$ {prod.price}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod.id,
                            })
                          }
                        />
                      </span>
                    ))}
                    <Link to="/cart">
                      <Button className="cartButton">Go To Cart</Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}> cart is empty</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
