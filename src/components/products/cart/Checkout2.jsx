import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../../../context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wompi from "./Wompi.jsx";

import { useDispatch } from 'react-redux'
import { setAddressOrder, setNameOrder, setPhoneOrder, setRegionOrder, setCityOrder, setEmailBuyer } from "../../../features/wompi/WompiSlice.jsx";

export default function Checkout2() {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const [name, setName] = useState("");
  const [documentType, setDocumentType] = useState('CC: ');
  const [identification_document, setIdentification_document] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  //dirección
  const [departamento, setDepartamento] = useState("Bogotá D.C.");
  const [ciudad_o_municipio, setCiudad_o_municipio] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencias_entrega, setReferencias_entrega] = useState("");

  //pago
  const [ordenCompleta, setOrdenCompleta] = useState(false);
  const [referenciaDePago, setReferenciaDePago] = useState("");
  const [hash, setHash] = useState("");


  const [amount, setAmount] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {

      const TicketForm = {
        name: name,
        identification_document: documentType + identification_document,
        purchaser: email,
        phone: phone,
        message: message,
        departamento: departamento,
        ciudad_o_municipio: ciudad_o_municipio,
        barrio: barrio,
        direccion: direccion,
        referencias_entrega: referencias_entrega,
        statusPay: "PENDING",
        cart: carrito,
        amount: precioTotal(),
      };
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Alistando tu orden, solo queda pagar!! ❤️",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(TicketForm)
      axios
        .post(`${apiURL}/api/purchase/addticket`, TicketForm)
        .then((res) => {
          setReferenciaDePago(res.data.payload);
          console.log(res.data.payload)
          setHash(res.data.hashHex)
          console.log(res.data.hashHex)
          setAmount(res.data.amount)
          console.log(res.data.amount)
          setOrdenCompleta(true);

        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }

    setName("");
    setIdentification_document("");
    setEmail("");
    setPhone("");
    setMessage("");
    setDepartamento("");
    setCiudad_o_municipio("");
    setBarrio("");
    setDireccion("");
    setReferencias_entrega("");
    vaciarCarrito();
  };


  const handleSubmitUponDelivery = async () => {
    try {

      const TicketForm = {
        name: name,
        identification_document: documentType + identification_document,
        purchaser: email,
        phone: phone,
        message: message,
        departamento: departamento,
        ciudad_o_municipio: ciudad_o_municipio,
        barrio: barrio,
        direccion: direccion,
        referencias_entrega: referencias_entrega,
        statusPay: "CONTRAENTREGA",
        cart: carrito,
        amount: precioTotal(),
      };
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Espera un momento, estamos agendando tu pedido ❤️",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(TicketForm)
      axios
        .post(`${apiURL}/api/purchase/addticket`, TicketForm)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Listo!, un asesor se comunicará contigo para gestionar tu envío!! ❤️",
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

    setName("");
    setIdentification_document("");
    setEmail("");
    setPhone("");
    setMessage("");
    setDepartamento("");
    setCiudad_o_municipio("");
    setBarrio("");
    setDireccion("");
    setReferencias_entrega("");
    vaciarCarrito();
  };



  return (
    <>
      <Button variant="danger" style={{ marginTop: "10px" }}>
        <Link className="link" to="/">
          &lt; Inicio
        </Link>
      </Button>
      <br />

      <Container style={{ overflow: 'auto' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <h5>Orden</h5>
            {ordenCompleta ? (
              // Renderizar el formulario de pago cuando la orden está completa
              <Wompi referenciaDePago={referenciaDePago} hash={hash} amount={amount} />
            ) : (

              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      dispatch(setNameOrder(e.target.value));
                    }}
                  />
                </Form.Group>


                <Row className="align-items-end">
                  <Col md={3}>
                    <Form.Group controlId="document_type">
                      <Form.Label>Tipo de Documento</Form.Label>
                      <Form.Select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                      >
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                        <option value="TE">TE</option>
                        <option value="CE">CE</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="identification_document">
                      <Form.Label>Documento</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Documento"
                        value={identification_document}
                        onChange={(e) => {
                          setIdentification_document(e.target.value)
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      dispatch(setEmailBuyer(e.target.value));
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      dispatch(setPhoneOrder(e.target.value));
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="message">
                  <Form.Label>Sugerencias</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="departamento">
                  <Form.Label>Departamento</Form.Label>
                  <select
                    value={departamento}
                    onChange={(e) => {
                      setDepartamento(e.target.value);
                      dispatch(setRegionOrder(e.target.value));
                    }}
                  >
                    <option value="Amazonas">Amazonas</option>
                    <option value="Antioquía">Antioquía</option>
                    <option value="Arauca">Arauca</option>
                    <option value="Atlántico">Atlántico</option>
                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                    <option value="Bolivar">Bolivar</option>
                    <option value="Boyacá">Boyacá</option>
                    <option value="Caldas">Caldas</option>
                    <option value="Caquetá">Caquetá</option>
                    <option value="Casanare">Casanare</option>
                    <option value="Cauca">Cauca</option>
                    <option value="Cesar">Cesar</option>
                    <option value="Chocó">Chocó</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Guainía">Guainía</option>
                    <option value="Guaviare">Guaviare</option>
                    <option value="Huila">Huila</option>
                    <option value="La Guajira">La Guajira</option>
                    <option value="Magdalena">Magdalena</option>
                    <option value="Meta">Meta</option>
                    <option value="Nariño">Nariño</option>
                    <option value="Norte de Santander">Norte de Santander</option>
                    <option value="Putumayo">Putumayo</option>
                    <option value="Quindio">Quindio</option>
                    <option value="Risaralda">Risaralda</option>
                    <option value="San Andrés y Providencia">
                      San Andrés y Providencia
                    </option>
                    <option value="Santander">Santander</option>
                    <option value="Sucre">Sucre</option>
                    <option value="Tolima">Tolima</option>
                    <option value="Valle del Cauca">Valle del Cauca</option>
                    <option value="Vaupés">Vaupés</option>
                    <option value="Vichada">Vichada</option>
                  </select>
                </Form.Group>

                <Form.Group controlId="ciudad_o_municipio">
                  {ciudad_o_municipio === "Bogotá D.C." && (
                    <Form.Label>Localidad</Form.Label>
                  )}

                  {ciudad_o_municipio !== "Bogotá D.C." && (
                    <Form.Label>Ciudad o Municipio</Form.Label>
                  )}

                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ciudad o Municipio"
                    value={ciudad_o_municipio}
                    onChange={(e) => {
                      setCiudad_o_municipio(e.target.value);
                      dispatch(setCityOrder(e.target.value));
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="barrio">
                  <Form.Label>Barrio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Barrio"
                    value={barrio}
                    onChange={(e) => setBarrio(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="direccion">
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Direccion"
                    value={direccion}
                    onChange={(e) => {
                      setDireccion(e.target.value);
                      dispatch(setAddressOrder(e.target.value));
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="referencias_entrega">
                  <Form.Label>referencias del lugar de entrega</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="referencias del lugar de entrega"
                    value={referencias_entrega}
                    onChange={(e) => setReferencias_entrega(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="success"
                  style={{ margin: '10px' }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Pagar con WOMPI
                </Button>

                <Button
                  variant="primary"
                  style={{ margin: '10px' }}
                  onClick={() => {
                    handleSubmitUponDelivery();
                  }}
                >
                  <Link className="Menu" to="/">
                    pagar CONTRA ENTREGA
                  </Link>
                </Button>

                <Button variant="danger" style={{ margin: '10px' }}>
                  <Link className="Menu" to="/">
                    Cancelar
                  </Link>
                </Button>

              </Form>

            )}

          </Col>
        </Row >
      </Container >
    </>
  );
}
