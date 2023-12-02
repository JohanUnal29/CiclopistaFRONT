import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar3 from "../../subcomponents/navbar/Navbar3";
import OrderDetail from "./OrderDetail.jsx";

//firebase
import { useAuth } from "../../../context/AuthContext.jsx";
export default function OrderDetailContainer() {
    const [order, setOrder] = useState(null);
    const id = useParams().id;
    console.log(id);
    

    const apiURL = process.env.REACT_APP_API_URL;
    //firebase
    const { user, loading } = useAuth(); 

    console.log("usuario: "+user.uid);

    useEffect(() => {
        if (user) {
            axios.get(`${apiURL}/api/purchase/id/${id}/${user.uid}`).then(res => {
                setOrder(res.data.payload);
                console.log("Respuesta del servidor:", res.data.payload);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [id, user]);

    
    return (
        <div>
            <NavBar3></NavBar3>
            {order !== null && <OrderDetail order={order} />}
        </div>
    )
}