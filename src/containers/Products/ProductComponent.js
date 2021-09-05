import axios from "axios";
import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectedBrand } from "../../redux/actions/brandActions";
import CurrencyFormat from "react-currency-format";

const ProductComponent = () => {
  const products = useSelector((state) => state.selectedBrand.products);
  const dispatch = useDispatch();
  const { brandId } = useParams();
  console.log("producrList", products);

  const renderList = products.map((product) => {
    const { _id, productName, price, quantity, description, productImage } =
      product;

    const deleteProduct = async () => {
      const response = await axios
        .delete("http://localhost:2000/api/product/deleteproduct", {
          data: { id: _id },
        })
        .catch((err) => {
          console.log("Err ", err);
        });
      dispatch(selectedBrand(brandId));
      console.log("Deleted :", response);
    };

    return (
      <Card style={{ width: "18rem" }} key={_id} className="mt-2">
        <Card.Img
          className="mx-auto mt-4"
          src={productImage}
          alt=""
          style={{
            width: "200px",
            height: "300px",
          }}
        />
        <Card.Body>
          <Card.Title>{productName}</Card.Title>

          <CurrencyFormat
            renderText={(value) => <Card.Text> Price: {value}</Card.Text>}
            decimalScale={2}
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Rs."}
          />

          <Card.Text>Available Qty: {quantity}</Card.Text>
          <Card.Text>{description}</Card.Text>

          <Link className="btn btn-primary" to={`/updateproduct/${_id}`}>
            Update Product
          </Link>

          <br />
          <br />
          <Button className="btn btn-danger" onClick={deleteProduct}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return <Container className="alignCards pt-4">{renderList}</Container>;
};

export default ProductComponent;
