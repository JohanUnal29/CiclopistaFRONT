import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function AddProduct() {
    const { user, loading } = useAuth();
    const apiURL = process.env.REACT_APP_API_URL;

    const [files, setFiles] = useState([])

    async function handleSubmit(e) {
        e.preventDefault();
    }

    function onImageChange(e) {
        const selectedFiles = e.target.files;
        setFiles(selectedFiles)
    }

    async function fetchImages() {

    }

    return (
        <div>
            <form method='post' onSubmit={handleSubmit}>
                <input onChange={onImageChange} type='file' accept='image/*' alt='gg' name='image' multiple></input>
                <button type='submit'>Upload</button>
                <button type='button' onClick={fetchImages}>Fecth</button>
            </form>
            <div>
                
            </div>
        </div>
    );
}
