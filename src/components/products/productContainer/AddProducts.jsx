import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";

import { useAuth } from "../../../context/AuthContext";




export default function AddProducts() {


    const defaultValue = {
        title: '',
        description: '',
        code: '',
        price: '',
        stock: '',
        image: null
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
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()

        for (const [key, value] of Object.entries(form)) {
            formData.append(key, !value)
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
            })
            .catch((err) => {
                console.log(err);
            });

    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>Crear Producto</h2>
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
                {/* <input 
                    type="text"
                    required
                    name="category"
                    placeholder="category"
                    value={form.category}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    required
                    name="subCategory"
                    placeholder="subCategory"
                    value={form.subCategory}
                    onChange={handleChange}
                /> */}
                <input 
                    type="file"
                    name="image"
                    placeholder="image"
                    accept='image/png, image/jpeg'
                    onChange={handleChange}
                />
                <button type="submit">Crear Producto</button>
            </div>
        </form>
        </>
    )
}
