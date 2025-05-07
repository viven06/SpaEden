import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from "../Login_Register/ModalContext";
import LogoSpa from "../../Imagenes/Logo_Spa.svg"


const Header=({isLoggedIn, logout})=>{
    const { showModal } = useModal();
    const navigate= useNavigate();

    const handleMyListsClick = () => { 
        if (isLoggedIn) { 
            navigate('/mylists'); // Redirigir a My Lists si está autenticado 
        } 
        else { showModal('auth'); // Mostrar modal de autenticación si no está autenticado 
        }
    };

    return(
        <header className="navbar fixed-top d-flex justify-content-between align-items-center border-bottom border-dark px-3 py-2" style={{backgroundColor: 'rgba(67, 99, 99, 0.5)', backdropFilter: 'blur(10px)'}}>
            <div id="header-home" className="d-flex align-items-center text-white" style={{gap: '1rem' }}>
                <div style={{height: '1rem'}}>
                    <img src={LogoSpa} width={24} height={24} fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16" description="Logo"/>
                </div>
                <Link to="/" className="text-decoration-none">
                    <h1 onMouseOver={(e) => e.currentTarget.style.color = 'lightgray'} onMouseOut={(e) => e.currentTarget.style.color = 'white'} className="h5 fw-bolder mt-2" style={{ color: 'white', letterSpacing: '-0.015em' }}> Spa Eden</h1>
                </Link>
            </div>
            
            <div id="header-buttons" className="d-flex flex-grow-1" style={{ gap: '0.5rem' }}>

                <div className="d-flex" style={{ gap: '0.5rem' }}>
                    {isLoggedIn ? (
                        <button className="btn d-flex align-items-center overflow-hidden text-white" style={{borderRadius:'50%', width: '40px', height: '40px', backgroundColor: '#e89a8b'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a0d64'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6116a8'} onClick={logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                            </svg>
                        </button>
                    ) : (
                        <button className="btn d-flex align-items-center justify-content-evenly overflow-hidden text-white" style={{borderRadius:'20px', width: '200px', height: '40px', backgroundColor: '#e89a8b'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b07064'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e89a8b'} onClick={() => showModal('auth')}>
                            <h4 className="mx-2" style={{marginRight:'1vw'}}>Ingresar</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;