import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CartState } from "../../Context/Context";
import "./ProductDetail.css";

const ProductDetail = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const { getSingleProduct } = CartState();
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(id);
  }, [id, getSingleProduct]);

  const prod = localStorage.getItem("singleProduct");
  const singleProd = JSON.parse(prod);
  console.log(singleProd);

  return (
    <div className="ProductDetail">
      <div>
        <img
          src={singleProd.images[0]}
          alt={singleProd.id}
          className="prodImg"
        />
      </div>
      <div>
        <div className="detailsBlock-1">
          <h2>{singleProd.title}</h2>
          <p>Product # {singleProd.id}</p>
        </div>
        <div className="detailsBlock-2">
          <span>RATING : {singleProd.rating}</span>
        </div>

        <div className="detailsBlock-3">
          <h1>{`$ ${singleProd.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1"></div>
            {cart.some((c) => c.id === singleProd.id) ? (
              <Button
                variant="danger"
                style={{ height: 38 }}
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: singleProd.id,
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
                      id: singleProd.id,
                      title: singleProd.title,
                      image: singleProd.thumbnail,
                      price: singleProd.price,
                      rating: singleProd.rating,
                      qty: 1,
                    },
                  });
                }}
              >
                Add to Cart
              </Button>
            )}
          </div>
          <p>
            Status:
            <b className={singleProd.stock < 1 ? "redColor" : "greenColor"}>
              {singleProd.stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
          <div className="detailsBlock-4">
            Description : <p>{singleProd.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
