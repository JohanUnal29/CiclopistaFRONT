import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Nequi({token, name, amount, hash, referenciaDePago}) {

    const wompiURL = "https://sandbox.wompi.co/v1";
    const llaveComercio = "pub_test_NWdg4THkkxq0UyrnBZVZDTSJa9LEIeA9";

    const [namePay, setNamePay] = useState("");
    const [emailPay, setEmailPay] = useState("");
    const [phonePay, setPhonePay] = useState("");

    const EnvioTokenNequi = async () => {
        try {

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
                customer_data:{
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
                <Row>
                    <Form>
                        <Form.Group controlId="namePay">
                            <Form.Label>Nombre Pagador</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={namePay}
                                onChange={(e) => setNamePay(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="emailPay">
                            <Form.Label>Email Pagador</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                value={emailPay}
                                onChange={(e) => setEmailPay(e.target.value)}
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
            </Col>
        </Container>
    )
}
