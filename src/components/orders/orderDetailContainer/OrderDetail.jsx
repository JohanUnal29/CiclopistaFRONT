import React, { useState, useEffect } from 'react';
import { Modal, Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from "axios";
import Swal from "sweetalert2";
import './OrderDetail.css';
import { Link } from 'react-router-dom';

import { MdDelete } from "react-icons/md";

const OrderDetail = ({ order, user }) => {
  
  const cartItems = order.cart;

  const [status, setStatus] = useState();

  const apiURL = process.env.REACT_APP_API_URL;

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

  const uptadeOder = async (code) => {

    try {

      const changes = {
        status: status,
      };
      axios.put(`${apiURL}/api/purchase/${code}/${user.uid}`, changes).then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Orden Actualizada',
          showConfirmButton: false,
          timer: 1500,
        });
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      alert(error.message);
    }
    setStatus();

  };

  return (

    <Container>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Mensaje</th>
            <th>Total pedido</th>
            <th>Estado de la orden</th>
            <th>Estado de la transacción</th>
            <th>Eliminar orden</th>
          </tr>
        </thead>
        <tbody>
          <tr key={order.id}>
            <td>{order.purchase_datetime}</td>
            <td>{order.name}</td>
            <td>{order.purchaser}</td>
            <td>{order.phone}</td>
            <td>{order.message}</td>
            <td>${order.amount}</td>
            <td><select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En proceso</option>
              <option value="finalizada">Finalizada</option>
            </select>
              <Button variant="success" onClick={() => uptadeOder(order.code)}>Actualizar Estado</Button>
            </td>
            <td>{order.statusPay}</td>
            <td><Link to='/orders'><MdDelete style={iconStyle} onClick={() => deleteTicket(order._id)} /></Link></td>
          </tr>
        </tbody>
      </Table>
      
      
      <Table striped bordered hover>
        <thead>
          <tr>
            
            <th>Departamento</th>
            <th>Ciudad o Municipio o Localidad</th>
            <th>Barrio</th>
            <th>Dirección</th>
            <th>Referencias del lugar de entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.departamento}</td>
            <td>{order.ciudad_o_municipio}</td>
            <td>{order.barrio}</td>
            <td>{order.direccion}</td>
            <td>{order.referencias_entrega}</td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Foto</th>
            <th>Cant</th>
            <th>Precio.U</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.title}</td>
              <td><img src={prod.thumbnails} alt={prod.title} className="imagen-miniatura" /></td>
              <td>{prod.quantity}</td>
              <td>${prod.price}</td>
              <td>${prod.price * prod.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>


  )
}

export default OrderDetail
