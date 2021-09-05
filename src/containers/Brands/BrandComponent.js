import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands, getBrandss } from "../../redux/actions/brandActions";
import "./style.css";

const BrandComponent = () => {
  const brands = useSelector((state) => state.allBrands.brands);
  console.log(brands);
  const dispatch = useDispatch();

  const renderList = brands.map((brand) => {
    const { _id, brandName, brandImage } = brand;

    const deleteBrand = async () => {
      const response = await axios
        .delete("http://localhost:2000/api/brand/deletebrand", {
          data: { id: _id },
        })
        .catch((err) => {
          console.log("Err ", err);
        });
      dispatch(getBrands());
      console.log("Deleted :", response);
    };

    return (
      <div>
        <Link to={`/bybrand/${_id}`}>
          <div key={_id}>
            <img src={brandImage} alt="" width="200px" height="200px" />
            <h3>{brandName}</h3>
          </div>
        </Link>
        <Link className="btn btn-primary" to={`/updatebrand/${_id}`}>
          Update Brand
        </Link>
        <br />
        <br />
        <Button onClick={deleteBrand}>Delete</Button>
      </div>
    );
  });

  return <div className="alignCards">{renderList}</div>;
};

export default BrandComponent;
