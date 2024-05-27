import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

import { useAuth } from "../../../context/AuthContext";

import { useSelector, useDispatch } from "react-redux";

import { setShow2 } from "../../../features/modal/ModalSlice";

import './FormStyles.css'

export default function UpdateProducts() {
    const dispatch = useDispatch();
    const show2 = useSelector((state) => state.modal.value.show2);
    const product = useSelector((state) => state.product.value.product);
    const { user } = useAuth();
    const apiURL = process.env.REACT_APP_API_URL;

    console.log(product)
    const [form, setForm] = useState({
        title: "",
        description: "",
        code: "",
        price: "",
        status: "",
        stock: "",
        category: "",
        subCategory: "",
        image: ""
    });

    useEffect(() => {
        if (product) {
            setForm({
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                stock: product.stock,
                category: product.category,
                subCategory: product.subCategory,
                image: product.image
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            setForm((prevForm) => ({ ...prevForm, [name]: files[0] }));
        } else {
            setForm((prevForm) => ({ ...prevForm, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const changes = new FormData();
            for (const [key, value] of Object.entries(form)) {
                changes.append(key, value);
            }

            await axios.put(`${apiURL}/api/products/${product._id}/${user.uid}`, changes);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto actualizado",
                showConfirmButton: false,
                timer: 1500,
            });
            dispatch(setShow2(false));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Modal show={show2} onHide={() => dispatch(setShow2(false))}>
                <Modal.Header>
                    <Modal.Title>Actualizar Producto</Modal.Title>
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
                                <option value="">Selecciona la categoria</option>
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
                                accept="image/png, image/jpeg"
                                onChange={handleChange}
                            />
                            {/* {product.image && (
                                <img
                                    src={product.image}
                                    alt="product"
                                    style={{
                                        width: "18rem",
                                        cursor: "pointer",
                                        objectFit: "cover",
                                    }}
                                />
                            )} */}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => dispatch(setShow2(false))}>
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>Actualizar Producto</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}