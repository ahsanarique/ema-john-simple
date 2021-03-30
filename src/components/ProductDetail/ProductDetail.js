import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://tranquil-wave-75137.herokuapp.com/products/${productKey}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [productKey]);

  return (
    <div>
      <h1>Product Detail</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
