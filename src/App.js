import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./containers/Access/Signin";
import Signup from "./containers/Access/Signup";
import BrandList from "./containers/Brands/BrandList";
import NewBrand from "./containers/Brands/NewBrand";
import UpdateBrand from "./containers/Brands/UpdateBrand";
import OrdersList from "./containers/Orders/OrdersList";
import NewProduct from "./containers/Products/NewProduct";
import ProductDetails from "./containers/Products/ProductDetails";
import ProductsList from "./containers/Products/ProductsList";
import UpdateProduct from "./containers/Products/UpdateProduct";
import PrivateRoute from "./PrivateRoute";
import { isUserLoggedIn } from "./redux/actions/signinActions";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //component did mount or did update
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={BrandList} />
          <PrivateRoute path="/bybrand/:brandId" component={ProductsList} />
          <PrivateRoute
            path="/byproductid/:productId"
            component={ProductDetails}
          />
          <PrivateRoute path="/newbrand" component={NewBrand} />
          <PrivateRoute path="/updatebrand/:brandId" component={UpdateBrand} />
          <PrivateRoute path="/newproduct" component={NewProduct} />
          <PrivateRoute
            path="/updateproduct/:productId"
            component={UpdateProduct}
          />
          <PrivateRoute path="/orders" component={OrdersList} />

          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
