import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartState } from "../../Context/Context";
import "./SingleProduct.css";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="products">
      <Card>
        <Link to={`/products/${prod.id}`}>
          <Card.Img
            variant="top"
            src={prod.thumbnail}
            alt={prod.id}
            className="product_image"
          />
        </Link>
        <Card.Body>
          <Card.Title>
            <h6>{prod.title} </h6>
          </Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>$ {prod.price}</span>
          </Card.Subtitle>
          {cart.some((c) => c.id === prod.id) ? (
            <Button
              variant="danger"
              style={{ height: 38 }}
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod.id,
                });
              }}
            >
              Remove
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    id: prod.id,
                    title: prod.title,
                    image: prod.thumbnail,
                    price: prod.price,
                    rating: prod.rating,
                    qty: 1,
                  },
                });
              }}
            >
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
