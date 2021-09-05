import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBrands } from "../../DataOperations/GetAllBrands";

import { getBrands, getBrandss } from "../../redux/actions/brandActions";
import Header from "../Includes/Header";
import BrandComponent from "./BrandComponent";

const BrandList = () => {
  const brands = useSelector((state) => state.allBrands.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  console.log("Brands: ", brands);
  return (
    <div>
      <Header />
      <BrandComponent />
    </div>
  );
};

export default BrandList;
