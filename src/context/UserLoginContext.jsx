import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

export const UserLoginContext = createContext();

const userInicial = JSON.parse(localStorage.getItem("user")) || [];

export const CartProvider = ({ children }) => {

    const [user, setUser] = useState(userInicial);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])


    return (
        <UserLoginContext.Provider value={{
            user
        }}>
            {children}
        </UserLoginContext.Provider>
    )



}