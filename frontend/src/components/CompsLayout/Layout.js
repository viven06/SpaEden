import React from "react";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import Modal from "../Login_Register/AuthModal";

const Layout=({setIsLoggedIn,isLoggedIn})=>{
    const logout= ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
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