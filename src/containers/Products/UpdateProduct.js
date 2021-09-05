import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBrands } from "../../redux/actions/brandActions";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../../redux/actions/productActions";
import Header from "../Includes/Header";

const UpdateProduct = () => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [productImage, setProductImage] = useState();
  const [brandId, setBrandId] = useState();

  const brands = useSelector((state) => state.allBrands.brands);
  const product = useSelector((state) => state.selectedProduct);

  const brand = brands.filter((brand) => brand._id === product.brandId);
  let brandName = brand[0] && brand[0].brandName;
  const [dropDownToggle, setDropDownToggle] = useState(brandName);
  console.log("From product update", dropDownToggle);

  const dispatch = useDispatch();
  const { productId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    /*  if (productName || price || quantity || description || brandId) { */
    const form = new FormData();

    form.append("_id", productId);
    form.append("productName", productName ? productName : product.productName);
    form.append("price", price ? price : product.price);
    form.append("quantity", quantity ? quantity : product.quantity);
    form.append("description", description ? description : product.description);
    form.append("productImage", productImage);
    form.append("brandId", brandId ? brandId : product.brandId);

    axios
      .put("http://localhost:2000/api/product/updateproduct", form)
      .then((response) => {
        alert("Updated product successfully");
      });
    /*   } else {
          alert("empty values");
        } */
  };

  useEffect(() => {
    dispatch(getBrands());

    dispatch(selectedProduct(productId));

    return () => {
      dispatch(removeSelectedProduct());
    };
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
              defaultValue={product.productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="text"
              placeholder="Price"
              defaultValue={product.price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="quantity"
              type="text"
              placeholder="Quantity"
              defaultValue={product.quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Description"
              defaultValue={product.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Dropdown>
            <Dropdown.Toggle
              defaultValue={brandName}
              variant="success"
              id="dropdown-basic"
            >
              {dropDownToggle ? dropDownToggle : brandName}
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

export default UpdateProduct;
