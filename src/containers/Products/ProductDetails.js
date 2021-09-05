import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../../redux/actions/productActions";

const ProductDetails = () => {
  const product = useSelector((state) => state.selectedProduct);
  const { productName, price, quantity, description, productImage } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`http://localhost:2000/api/product/getbyId/${productId}`)
      .catch((err) => {
        console.log("Err ", err);
      });

    console.log(response.data.product);
  };

  useEffect(() => {
    if (productId && productId !== "") {
      dispatch(selectedProduct(productId));
    }

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  console.log("Product:   ", product);

  return (
    <div>
      <img src={productImage} alt="" width="300px" height="300px" />
      <h3>{productName}</h3>
      <h3>{price}</h3>
      <h3>{quantity}</h3>
      <h3>{description}</h3>
    </div>
  );
};

export default ProductDetails;
