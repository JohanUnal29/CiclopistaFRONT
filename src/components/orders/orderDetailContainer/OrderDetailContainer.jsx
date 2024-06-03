import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar3 from "../../subcomponents/navbar/Navbar3";
import OrderDetail from "./OrderDetail.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function OrderDetailContainer() {
  const [order, setOrder] = useState(null);
  const code = useParams().code;
  console.log(code);

  const apiURL = process.env.REACT_APP_API_URL;

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      axios
        .get(`${apiURL}/api/purchase/code/${code}/${user.uid}`)
        .then((res) => {
          setOrder(res.data.payload);
          console.log("Respuesta del servidor:", res.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [code, user]);

  return (
    <div>
      <NavBar3></NavBar3>
      {order !== null && <OrderDetail order={order} user={user} />}
    </div>
  );
}
