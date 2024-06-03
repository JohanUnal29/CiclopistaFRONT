import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Card, Button, Modal } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import "./Order.css";
import { useAuth } from '../../../context/AuthContext.jsx';

import axios from "axios";
import Swal from "sweetalert2";


const Order = ({ order }) => {

  const apiURL = process.env.REACT_APP_API_URL;
  const { user, loading } = useAuth();

  const iconStyle = {
    cursor: 'pointer',
  };


  const deleteTicket = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        // Si el usuario confirma, procede con la eliminación
        axios
          .delete(`${apiURL}/api/purchase/${id}/${user.uid}`)
          .then((res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Orden Eliminada',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // Si el usuario cancela, no haces nada
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
          <Card.Text><MdDelete style={iconStyle} onClick={() => deleteTicket(order._id)} /></Card.Text>
          <Button variant="primary" style={{ backgroundColor: 'black' }}>
            <Link to={`/orderr/${order.code}`} style={{ textDecoration: 'none', color: 'white' }}>Ver más</Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
//
export default Order
