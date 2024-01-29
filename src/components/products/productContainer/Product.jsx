import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button, Modal } from "react-bootstrap";
import "./ProductsContainer.css";
import axios from "axios";
import Swal from "sweetalert2";

import { useSelector, useDispatch } from 'react-redux'

import { setImage } from "../../../features/product/ProductSlice.jsx";

//
import ImageModal from "./ImageModal.jsx"

//firebase
import { useAuth } from "../../../context/AuthContext.jsx";


const Product = ({ product }) => {

  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)
  const [modalShow2, setModalShow2] = useState(false)

  const imgurl = "https://drive.google.com/uc?export=download&id=";
  const apiURL = process.env.REACT_APP_API_URL;

  const { user, loading } = useAuth();

  //sistema de imagenes
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [fileName, setFileName] = useState("Subir una imagen");
  const [selectedFile, setSelectedFile] = useState(null);
  const [file2, setFile2] = useState(null)

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    const SIZE_50MB = 50 * 1024 * 1024;
    const isValidSize = file.size < SIZE_50MB;
    // const isValidSize = file.size < 200 * 1024
    const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidSize)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Imagen muy pesada, excede los 50MB!",
        showConfirmButton: false,
        timer: 1500,
      });
    if (!isValidType)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Solo puedes subir imagenes!",
        showConfirmButton: false,
        timer: 1500,
      });

    setFileName(file.name);
    setFile2(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfilePic = () => {

    setSelectedFile2(file2)
    setModalShow2(false)

  };

  //acá termina sistema de imagenes

  const manejarCambioDeEstado = (nuevoValor) => {
    setSelectedFile2(nuevoValor);
  };

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

  const [title2, setTitle2] = useState("");
  const [description2, setDescription2] = useState("");
  const [code2, setCode2] = useState("");
  const [price2, setPrice2] = useState("");
  const [status2, setStatus2] = useState("");
  const [stock2, setStock2] = useState();
  const [category2, setCategory2] = useState("");
  const [subCategory2, setSubCategory2] = useState("");

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);

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

  const abrirModalAgregar = () => {
    setModalAgregar(true);
    setTitle2("");
    setDescription2("");
    setCode2("");
    setPrice2();
    setStatus2(true);
    setStock2();
    setCategory2("sillines");
    setSubCategory2("SillinesSinResortes");
  };

  const addProduct = async () => {
    try {
      const add = {
        title: title2,
        description: description2,
        code: code2,
        price: price2,
        status: status2,
        stock: stock2,
        category: category2,
        subCategory: subCategory2,
        image: selectedFile2,
      };
      console.log("producto agregado: " + JSON.stringify(add));
      axios
        .post(`${apiURL}/api/products/addproduct/${user.uid}`, add)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto agregado",
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

    setTitle2("");
    setDescription2("");
    setCode2("");
    setPrice2();
    setStatus2(true);
    setStock2();
    setCategory2("");
    setSubCategory2("");
    dispatch(setImage(""));
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
        image: selectedFile2,
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
                  onClick={() => {
                    abrirModalAgregar();
                  }}
                >
                  Agregar producto
                </Button>
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
            <ImageModal
              show={modalShow}
              setSelectedFile2={setSelectedFile2}
              onHide={() => setModalShow(false)}
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

      {/* Agregar producto */}
      <Modal show={modalAgregar} onHide={() => setModalAgregar(false)}>
        <Modal.Header>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Titulo</label>
            <input
              className="form-control"
              placeholder="Titulo"
              type="text"
              value={title2}
              onChange={(e) => setTitle2(e.target.value)}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              placeholder="Descripción"
              type="text"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
            />
            <br />

            <label>Código</label>
            <input
              className="form-control"
              placeholder="Código"
              type="text"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
            />
            <br />

            <label>Precio</label>
            <textarea
              className="form-control"
              placeholder="Precio"
              type="number"
              value={price2}
              onChange={(e) => setPrice2(e.target.value)}
            />
            <br />

            <label>Stock</label>
            <textarea
              className="form-control"
              placeholder="Stock"
              type="number"
              value={stock2}
              onChange={(e) => setStock2(e.target.value)}
            />
            <br />

            <label>Categoria</label>
            <select
              value={category2}
              onChange={(e) => setCategory2(e.target.value)}
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
              value={subCategory2}
              onChange={(e) => setSubCategory2(e.target.value)}
            >
              <option value="SillinesResortes">Sillines con resortes</option>
              <option value="SillinesSinResortes">Sillines sin resortes</option>
            </select>
            <br />

            <label>Imagen</label>
            <Modal show={modalShow2} aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Imagen</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Seleccionar imagen</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpg, .jpeg, .gif, .png"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <img
                  className="img-fluid mt-2"
                  src={selectedFile}
                  alt="profile-previw"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  onClick={() => {
                    setModalShow2(false);
                    setSelectedFile(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleUpdateProfilePic}>
                  Actualizar imagen
                </Button>
              </Modal.Footer>
            </Modal>
            <Button onClick={() => setModalShow2(true)} variant="Dark">Insetar Imagen</Button>
            <br />
          </div>

          <Modal.Footer>
            <Button
              type="button"
              variant="success"
              onClick={() => {
                addProduct();
                setModalAgregar(false);
              }}
            >
              Agregar
            </Button>
            <Button variant="danger" onClick={() => setModalAgregar(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Product;
