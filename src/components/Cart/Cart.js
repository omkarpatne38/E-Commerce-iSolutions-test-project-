import React from "react";
import { useEffect, useState } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../../Context/Context";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const changeCartQuantity = (id, qty) => {
    dispatch({
      type: "CHANGE_CART_QUANTITY",
      payload: { id, qty },
    });
  };
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.title} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.title}</span>
                </Col>
                <Col md={2}>$ {prod.price}</Col>
                <Col md={2}></Col>
                <Col md={2}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Button
                      variant="info"
                      onClick={() => changeCartQuantity(prod.id, prod.qty - 1)}
                    >
                      -
                    </Button>
                    <span>{prod.qty}</span>
                    <Button
                      variant="info"
                      onClick={() => changeCartQuantity(prod.id, prod.qty + 1)}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod.id,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total}</span>
        <Button type="button" disabled={cart.length === 0} onClick={() => {}}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
