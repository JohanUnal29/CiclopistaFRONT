import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from './ProductDetail.jsx';
import NavBar2 from '../../subcomponents/navbar/Navbar2.jsx';

export default function ProductDetailContainer() {
    const [product, setProduct] = useState([]);
    const id = useParams().id;
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {

        axios.get(`${apiURL}/api/products/id/${id}`).then(res => {
            setProduct(res.data.payload);
        }).catch(err => {
            console.log(err);
        })

    }, [id])

    console.log(product);
    return (
        <div>
            <NavBar2></NavBar2>
            <ProductDetail product={product} />
        </div>
    )
}
