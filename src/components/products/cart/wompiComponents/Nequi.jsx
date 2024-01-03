import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useDispatch } from 'react-redux'
import { setEmailPay2, setNamePay2, setTransactionId } from '../../../../features/wompi/WompiSlice';

export default function Nequi({ token, name, amount, hash, referenciaDePago, setEsconder}) {

    const dispatch = useDispatch()

    const wompiURL = process.env.wompiURL;
    const llaveComercio = process.env.llaveComercio;

    const [namePay, setNamePay] = useState("");
    const [emailPay, setEmailPay] = useState("");
    const [phonePay, setPhonePay] = useState("");

    //vista confirma pago
    const [confirmaPago, setConfirmaPago] = useState(false)

    const EnvioTokenNequi = async () => {
        try {
            setConfirmaPago(true)
            axios.post(`${wompiURL}/transactions`, {
                // Datos que deseas enviar en el cuerpo
                acceptance_token: token,
                amount_in_cents: amount,
                currency: 'COP',
                signature: hash,
                customer_email: emailPay,
                reference: referenciaDePago,
                payment_method:
                {
                    type: "NEQUI",
                    phone_number: phonePay
                },
                customer_data: {
                    phone_number: phonePay,
                    full_name: namePay
                }
                // shipping_address:{
                //     address_line_1:"xd",
                //     country: "CO",
                //     city: "Soacha",
                //     phone_number: "3202420980",
                //     region: "Cundinamarca"
                // }
            }, {
                headers: {
                    "Authorization": `Bearer ${llaveComercio}`,
                }
            })
                .then((res) => {
                    alert("token enviado")
                    console.log(res)
                    console.log(res.data.data.id)
                    dispatch(setTransactionId(res.data.data.id))
                    setEsconder(true)
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container>
            <Col>
                {confirmaPago &&
                    (
                        <>
                            <Col><img src="../../../../Img/notificacion.png" alt='notificación nequi' /></Col>
                            <Col>Para terminar la transacción ve a tu aplicación Nequi y <b>
                                autoriza el pago desde el centro de notificaciones</b>
                            </Col></>
                    )
                }
                {!confirmaPago &&
                    (
                        <Row>
                            <Form>
                                <Form.Group controlId="namePay">
                                    <Form.Label>Nombre Pagador</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        value={namePay}
                                        onChange={(e) => {
                                            setNamePay(e.target.value);
                                            dispatch(setNamePay2(e.target.value));
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="emailPay">
                                    <Form.Label>Email Pagador</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        value={emailPay}
                                        onChange={(e) => {
                                            setEmailPay(e.target.value);
                                            dispatch(setEmailPay2(e.target.value));
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="phonePay">
                                    <Form.Label>Número Nequi Pagador</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone"
                                        value={phonePay}
                                        onChange={(e) => setPhonePay(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>

                            <Button
                                variant="success"
                                onClick={() => {
                                    EnvioTokenNequi();
                                }}
                            >
                                Pagar Con Nequi
                            </Button>

                            <Button variant="danger">
                                <Link className="Menu" to="/">
                                    Cancelar
                                </Link>
                            </Button>
                        </Row>
                    )
                }
            </Col>
        </Container>
    )
}
