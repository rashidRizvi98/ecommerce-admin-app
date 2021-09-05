import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Header from "../Includes/Header";

const NewBrand = () => {
  const [brandName, setBrandName] = useState();
  const [brandImage, setBrandImage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brandName) {
      const form = new FormData();

      form.append("brandName", brandName);
      form.append("brandImage", brandImage);
      axios
        .post("http://localhost:2000/api/brand/create", form)
        .then((response) => {
          alert("Added new brand successfully");
        });
    } else {
      alert("empty values");
    }
  };

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

export default NewBrand;
