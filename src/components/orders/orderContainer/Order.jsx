import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Card, Button, Modal } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import "./Order.css";
import { useAuth } from '../../../context/AuthContext.jsx';

import axios from "axios";
import Swal from "sweetalert2";



const Order = ({ order }) => {

  const deleteTicket = async (id) => {

    const apiURL = process.env.REACT_APP_API_URL;
    const { user, loading } = useAuth();
  
    try {
      axios
        .delete(`${apiURL}/api/purchase/${id}/${user.uid}`)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Orden Eliminada",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <Col sm={6} md={4} lg={3} className="item-card">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text>Codigo: {order.code}</Card.Text>
          <Card.Text>Fecha: {order.purchase_datetime}</Card.Text>
          <Card.Title>Nombre: {order.name}</Card.Title>
          <Card.Text>Email: {order.purchaser}</Card.Text>
          <Card.Text>Teléfono: {order.phone}</Card.Text>
          <Card.Text>Departamento: {order.departamento}</Card.Text>
          <Card.Text>Total: {order.amount}</Card.Text>
          <Card.Text>Estado de la transacción: {order.statusPay}</Card.Text>
          <Card.Text><MdDelete onClick={() => deleteTicket(order._id) } /></Card.Text>
          <Button variant="primary" style={{ backgroundColor: 'black' }}>
            <Link to={`/orderr/${order._id}`} style={{ textDecoration: 'none', color: 'white' }}>Ver más</Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
//
export default Order
