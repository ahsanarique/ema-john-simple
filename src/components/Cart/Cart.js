import React from "react";

const Cart = (props) => {
  const cart = props.cart;

  const total = cart.reduce(
    (total, product) => total + product.price * product.quantity || 1,
    0
  );

  let shipping = 0;

  total >= 15 && total < 35
    ? (shipping = 4.99)
    : total < 15 && total > 0
    ? (shipping = 12.99)
    : (shipping = 0);

  const tax = total / 10;
  const grandTotal = total + shipping + tax;

  const formatNumber = (number) => {
    return Number(number.toFixed(2));
  };

  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price: {formatNumber(total)}</p>
      <p>
        <small>Shipping Cost: {formatNumber(shipping)}</small>
      </p>
      <p>
        <small>Tax + VAT: {formatNumber(tax)}</small>
      </p>
      <p>Total Price: {formatNumber(grandTotal)}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
