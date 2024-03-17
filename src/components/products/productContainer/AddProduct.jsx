import React, { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("");

    const submit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description);

        try {
            const result = await axios.post('/api/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setImageName(result.data.imageName);
        } catch (error) {
            console.error("Error al enviar la imagen:", error);
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input
                    onChange={e => setFile(e.target.files[0])}
                    type="file"
                    accept="image/*"
                />
                <input
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                />
                <button type="submit">Submit</button>
            </form>
            {imageName && <img src={`/api/images/${imageName}`} alt="Uploaded" />}
        </div>
    );
}
