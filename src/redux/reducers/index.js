import { combineReducers } from "redux";
import { brandReducer, selectedBrandReducer } from "./brandReducer";
import { orderReducer } from "./orderReducer";
import { selectedProductReducer } from "./productReducer";
import { signinReducer } from "./signinReducer";
import { signupReducer } from "./signupReducer";

const reducers = combineReducers({
  allBrands: brandReducer,
  selectedBrand: selectedBrandReducer,
  selectedProduct: selectedProductReducer,
  signup: signupReducer,
  auth: signinReducer,
  allOrders: orderReducer,
});

export default reducers;
