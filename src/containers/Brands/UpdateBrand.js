import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBrands } from "../../redux/actions/brandActions";
import Header from "../Includes/Header";

const UpdateBrand = () => {
  const brands = useSelector((state) => state.allBrands.brands);
  const dispatch = useDispatch();
  const { brandId } = useParams();
  const [brandName, setBrandName] = useState();
  const [brandImage, setBrandImage] = useState();

  const brand = brands.filter((brand) => brand._id === brandId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brandName) {
      const form = new FormData();

      form.append("_id", brandId);
      form.append("brandName", brandName);
      form.append("brandImage", brandImage);
      axios
        .put("http://localhost:2000/api/brand/updatebrand", form)
        .then((response) => {
          alert("Updated brand successfully");
        });
    } else {
      alert("empty values");
    }
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
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              name="brandName"
              type="text"
              placeholder="Brand Name"
              onChange={(e) => setBrandName(e.target.value)}
              defaultValue={brand[0] && brand[0].brandName}
            />
          </Form.Group>

          <Form.Group>
            <Form.File
              name="brandImage"
              label="Brand Image"
              type="file"
              onChange={(e) => setBrandImage(e.target.files[0])}
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

export default UpdateBrand;
