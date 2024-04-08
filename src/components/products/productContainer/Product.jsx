import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button, Modal, Form } from "react-bootstrap";
import "./ProductsContainer.css";
import axios from "axios";
import Swal from "sweetalert2";

import { useSelector, useDispatch } from 'react-redux'

import { setImage } from "../../../features/product/ProductSlice.jsx";

//
import ImageModal from "./ImageModal.jsx"

//firebase
import { useAuth } from "../../../context/AuthContext.jsx";
import AddProducts from "./AddProducts.jsx";


const Product = ({ product }) => {

  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)
  const [modalShow2, setModalShow2] = useState(false)

  const imgurl = "https://drive.google.com/uc?export=download&id=";
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [image2, setImage2] = useState("");

  const [modalInsertar, setModalInsertar] = useState(false);

  const abrirModalInsertar = () => {
    setModalInsertar(true);
    setTitle(product.title);
    setDescription(product.description);
    setCode(product.code);
    setPrice(product.price);
    setStatus(product.status);
    setStock(product.stock);
    setCategory(product.category);
    setSubCategory(product.subCategory);
    setImage2(product.image);
  };

  const uptadeProduct = async (id) => {
    try {
      const changes = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        subCategory: subCategory,
        
      };
      axios
        .put(`${apiURL}/api/products/${id}/${user.uid}`, changes)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto actualizado",
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

    setTitle("");
    setDescription("");
    setCode("");
    setPrice();
    setStatus();
    setStock();
    setCategory("");
    setSubCategory("");
    setImage2("");
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
                    abrirModalInsertar();
                  }}
                >
                  Actualizar producto
                </Button>
                <br />
                <br />
                
                  <Button
                    variant="success"
                  >
                    Agregar producto
                  </Button>
                
                 <AddProducts/>

              </>
            )}
          </Card.Body>
        </Card>
      </Col>

      <Modal show={modalInsertar} onHide={() => setModalInsertar(false)}>
        <Modal.Header>
          <Modal.Title>Actualizar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Titulo</label>
            <input
              className="form-control"
              placeholder="Titulo"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              placeholder="Descripción"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />

            <label>Código</label>
            <input
              className="form-control"
              placeholder="Código"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <br />

            <label>Precio</label>
            <textarea
              className="form-control"
              placeholder="Precio"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <label>Disponible</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={true}>Stock</option>
              <option value={false}>Sin stock</option>
            </select>
            <br />
            <br />

            <label>Stock</label>
            <textarea
              className="form-control"
              placeholder="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <br />

            <label>Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Sillines">Sillines</option>
              <option value="Cadenas">Cadenas</option>
              <option value="Cadenillas">Cadenillas</option>
              <option value="Pachas">Pachas</option>
              <option value="Llantas">Llantas</option>
              <option value="Rines">Rines</option>
            </select>

            <br />

            <label>Subcategoria</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="SillinesResortes">Sillines con resortes</option>
              <option value="SillinesSinResortes">Sillines sin resortes</option>
            </select>
            <br />

            <label>Imagen</label>
            <img src={image2}
              alt="profile"
              onClick={() => setModalShow(true)}
              style={{
                width: "18rem",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
            
            <br />
          </div>

          <Modal.Footer>
            <Button
              type="button"
              variant="success"
              onClick={() => {
                uptadeProduct(product._id);
                setModalInsertar(false);
              }}
            >
              Actualizar
            </Button>
            <Button variant="danger" onClick={() => setModalInsertar(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Product;
