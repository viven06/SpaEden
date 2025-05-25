import React from "react";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import Modal from "../Login_Register/AuthModal";
import { useNavigate } from "react-router-dom";

const Layout=({setIsLoggedIn,isLoggedIn})=>{
    const navigate = useNavigate();

    const logout= ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem("role");
        localStorage.removeItem("nombre");

        setIsLoggedIn(false);
        navigate("/");
    };

    return(
        <>
            <Head/>
            <Header isLoggedIn={isLoggedIn} logout={logout}/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
            <Modal setIsLoggedIn={setIsLoggedIn}/>
        </>
    )
}
export default Layout;  