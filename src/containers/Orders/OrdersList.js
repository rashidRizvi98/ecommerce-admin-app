import React, { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderActions";
import Header from "../Includes/Header";

const OrdersList = () => {
  const orders = useSelector((state) => state.allOrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <div>
      <Header />
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Order</th>
            <th>Order Id</th>
            <th>Items</th>
            <th>User</th>
            <th>Address</th>
            <th>Total Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{order._id}</td>
              <td>
                {order.items.map((item, index) => (
                  <Col>
                    <Row>{index + 1}.</Row>
                    <Row>Product Id: {item.product._id}</Row>
                    <Row>Product Name: {item.product.productName}</Row>
                    <Row>Price: {item.product.price}</Row>
                    <Row>Ordered Quantity: {item.quantity}</Row>
                    <hr />
                  </Col>
                ))}
              </td>
              <td>{order.user.email}</td>
              <td>
                {order.address.name}&nbsp; {order.address.newAddress}&nbsp;
                {order.address.city}&nbsp;
                {order.address.postCode}&nbsp; {order.address.province}&nbsp;
                {order.address.country}&nbsp;
                {order.address.mobileNumber}&nbsp;
              </td>
              <td>{order.totalAmount}</td>
              <td>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersList;
