import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";

import { useAuth } from "../../../context/AuthContext";

import { useSelector, useDispatch } from 'react-redux'

import { setImage } from "../../../features/product/ProductSlice";

export default function AddProducts() {
    const apiURL = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch()
    const { user, loading } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [fileName, setFileName] = useState(null);

    const [title2, setTitle2] = useState("");
    const [description2, setDescription2] = useState("");
    const [code2, setCode2] = useState("");
    const [price2, setPrice2] = useState("");
    const [status2, setStatus2] = useState("");
    const [stock2, setStock2] = useState();
    const [category2, setCategory2] = useState("");
    const [subCategory2, setSubCategory2] = useState("");

    const print = () => {
        console.log(selectedFile2)
        console.log(fileName)
    }

    const handleFileChange = (e) => {
        setSelectedFile2(e.target.files[0])
        const file = e.target.files[0];
        

        dispatch(setImage(file))

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
        console.log(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
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
            console.log("producto agregado: " + JSON.stringify(selectedFile2));
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
    };

    return (
        <><Form.Group controlId="formFile" className="mb-3">

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

            <Form.Label>Seleccionar imagen</Form.Label>
            <Form.Control
                type="file"
                accept=".jpg, .jpeg, .gif, .png"
                onChange={handleFileChange} />
        </Form.Group>
            <img
                className="img-fluid mt-2"
                src={selectedFile}
                alt="profile-previw" />

            <Button
                type="button"
                variant="success"
                onClick={() => {
                    print();
                }}
            >
                Agregar
            </Button>

        </>
    )
}
