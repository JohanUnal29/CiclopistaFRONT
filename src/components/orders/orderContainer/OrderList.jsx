import React from 'react'
import Order from "./Order";
import "./Order.css";
import { Container, Row } from 'react-bootstrap';

const OrdeList = ( {orders} ) => {
  
  return (
    <Container>
      <Row className="justify-content-center">
        {orders.map((order) => (
          <Order key={order._id} order={order} />
        ))}
      </Row>
    </Container>
  )
}

export default OrdeList
