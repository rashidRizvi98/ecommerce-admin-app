import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";

/* export const getBrands = (brands) => {
  return {
    type: ActionTypes.GET_BRANDS,
    payload: brands,
  };
};
 */
export const getOrders = () => {
  return async (dispatch) => {
    const response = await axios
      .get("http://localhost:2000/api/getorders")
      .catch((err) => {
        console.log("Err ", err);
      });
    console.log(response);

    dispatch({
      type: ActionTypes.GET_ORDERS,
      payload: response.data.orders,
    });
  };
};
