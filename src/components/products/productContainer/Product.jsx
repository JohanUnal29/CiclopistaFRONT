import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button, Modal, Form } from "react-bootstrap";
import "./ProductsContainer.css";
import axios from "axios";
import Swal from "sweetalert2";

import { useSelector, useDispatch } from 'react-redux'

import { setShow, setShow2 } from "../../../features/modal/ModalSlice.jsx";
import { setProduct } from "../../../features/product/ProductSlice.jsx";

//firebase
import { useAuth } from "../../../context/AuthContext.jsx";
import AddProducts from "./AddProducts.jsx";
import UpdateProducts from "./UpdateProducts.jsx";


const Product = ({ product }) => {

  const dispatch = useDispatch()
  
  const apiURL = process.env.REACT_APP_API_URL;

  const { user, loading } = useAuth();

  //sistema de imagenes

  const deleteProduct = async (id) => {
    try {
      axios
        .delete(`${apiURL}/api/products/${id}/${user.uid}`)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto Eliminado",
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
    <>
      <Col sm={6} md={4} lg={3} className="item-card">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.price}</Card.Text>
            <Button variant="primary" style={{ backgroundColor: "black" }}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                Ver más
              </Link>
            </Button>
            {user && user.rol == "admin" && (
              <>
                <br />
                <br />
                <Button
                  variant="danger"
                  onClick={() => deleteProduct(product._id)}
                >
                  Eliminar producto
                </Button>
                <br />
                <br />
                <Button
                  variant="success"
                  onClick={() => {
                    dispatch(setShow2(true));
                    dispatch(setProduct(product));
                  }}
                >
                  Actualizar producto
                </Button>
                <br />
                <br />

                <Button
                  variant="success"
                  onClick={() => dispatch(setShow(true))}
                >
                  Agregar producto
                </Button>

                <AddProducts />
                <UpdateProducts/>

              </>
            )}
          </Card.Body>
        </Card>
      </Col>

    </>
  );
};

export default Product;
