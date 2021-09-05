import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../redux/actions/brandActions";
import Header from "../Includes/Header";

const NewProduct = () => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [productImage, setProductImage] = useState();
  const [brandId, setBrandId] = useState();
  const [dropDownToggle, setDropDownToggle] = useState("Select a brand");

  const brands = useSelector((state) => state.allBrands.brands);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    /*  if (productName || price || quantity || description || brandId) { */
    const form = new FormData();

    form.append("productName", productName);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("productImage", productImage);
    form.append("brandId", brandId);

    axios
      .post("http://localhost:2000/api/product/create", form)
      .then((response) => {
        alert("Added new product successfully");
      });
    /*   } else {
      alert("empty values");
    } */
  };

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="productName"
              type="text"
              placeholder="Product Name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="quantity"
              type="text"
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {dropDownToggle}
            </Dropdown.Toggle>

            <Dropdown.Menu name="brandId">
              {brands.map((brand) => {
                return (
                  <Dropdown.Item
                    onSelect={(eventKey) => {
                      setBrandId(eventKey);
                      eventKey && setDropDownToggle(brand.brandName);
                    }}
                    key={brand._id}
                    eventKey={brand._id}
                  >
                    {brand.brandName}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Group>
            <Form.File
              name="productImage"
              label="Product Image"
              type="file"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewProduct;
