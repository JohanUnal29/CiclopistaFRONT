import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

import { useAuth } from "../../../context/AuthContext";

import { useSelector, useDispatch } from "react-redux";

import { setShow } from "../../../features/modal/ModalSlice";



export default function AddProducts() {

    const dispatch = useDispatch()

    const show = useSelector((state) => state.modal.value.show);

    const defaultValue = {
        title: '',
        description: '',
        code: '',
        price: '',
        stock: '',
        image: null,
        category: '',
        subCategory: ''
    }

    const apiURL = process.env.REACT_APP_API_URL;
    const { user, loading } = useAuth();
    const [form, setForm] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files ? e.target.files[0] : null
            setForm({ ...form, [e.target.name]: file })
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            console.log("ejecutando")

            const formData = new FormData()

            for (const [key, value] of Object.entries(form)) {
                formData.append(key, value)
            }

            axios
                .post(`${apiURL}/api/products/addproduct/${user.uid}`, formData)
                .then((res) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Producto agregado",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    dispatch(setShow(false));
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <>

            <Modal show={show} onHide={() => dispatch(setShow(false))}>
                <Modal.Header>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                required
                                name="title"
                                placeholder="title"
                                value={form.title}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                required
                                name="description"
                                placeholder="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                required
                                name="code"
                                placeholder="code"
                                value={form.code}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                required
                                name="price"
                                placeholder="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                required
                                name="stock"
                                placeholder="stock"
                                value={form.stock}
                                onChange={handleChange}
                            />
                            <select
                                required
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >
                                <option value="Repuestos">Selecciona la categoria</option>
                                <option value="Grupos">Grupos</option>
                                <option value="Marcos">Marcos</option>
                                <option value="Suspensiones/Tenedores">Suspensiones/Tenedores</option>
                                <option value="PosteSillin">Poste para sillín</option>
                                <option value="Sillines">Sillines</option>
                                <option value="AbrazaderaSillin">Abrazadera de sillin</option>
                                <option value="Cañas">Cañas</option>
                                <option value="Manubrios">Manubrios</option>
                                <option value="Mangos/Grips">Mangos/Grips</option>
                                <option value="Frenos">Frenos</option>
                                <option value="PastillasFreno">Pastillas de freno</option>
                                <option value="Platos/Relaciones">Platos/Relaciones</option>
                                <option value="Ejes/Cartuchos">Ejes/Cartuchos</option>
                                <option value="Bielas">Bielas</option>
                                <option value="Pedales">Pedales</option>
                                <option value="Cadenas">Cadenas</option>
                                <option value="Cadenillas">Cadenillas</option>
                                <option value="Pachas">Pachas</option>
                                <option value="Piñones">Piñones</option>
                                <option value="Radios">Radios</option>
                                <option value="Manzanas">Manzanas</option>
                                <option value="Rines">Rines</option>
                                <option value="ProtectorRin">Protector de rin</option>
                                <option value="Neumaticos">Neumaticos</option>
                                <option value="Llantas">Llantas</option>
                                <option value="Luces">Luces</option>
                                <option value="Cascos">Cascos</option>
                                <option value="Chaquetas">Chaquetas</option>
                                <option value="Balines/Cazuelas/Miples/Tornilleria">Balines/Cazuelas/Miples/Tornilleria</option>

                            </select>

                            <input
                                type="file"
                                name="image"
                                placeholder="image"
                                accept='image/png, image/jpeg'
                                onChange={handleChange}
                            />
                            
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => dispatch(setShow(false))}>
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>Crear Producto</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
