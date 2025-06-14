import React, { useState } from 'react';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import "../../Estilos/Styles.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn, onSubmit  }) => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validated, setValidated] = useState(false);
    const [message,SetMessage] = useState('');
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    
    const handleLogin = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();

            try {
                const response = await axios.post('http://localhost:8000/users/login',{
                    email,
                    contraseña
                });

                const {token, id_usuario, rol, nombre} = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('userId',id_usuario);
                localStorage.setItem('role', rol); 
                localStorage.setItem("nombre", nombre);

                setIsLoggedIn(true);
                setLoading(true);
                SetMessage('Inicio de Sesion exitoso!'); 
                onSubmit(response.data);

                setTimeout(() => {
                    if (rol === "cliente") {
                        navigate("/dashboard_cliente");
                    }
                    else if (rol === "recepcionista") {
                        navigate("/dashboard_recepcionista");
                    }
                    window.location.reload();
                }, 200);

            } catch (error) {
                console.error('Error', error);
                SetMessage('Usuario o contraseña incorrectos');
            }
        }
        setValidated(true);
        
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container style={{ maxWidth: '400px', marginTop: '10px', backgroundColor: '#a64721', padding: '20px', borderRadius: '10px', color: 'white' }}>
            <h2 className="text-center">Login</h2>
            <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder='Correo' style={{ backgroundColor: '#d6bfc8', color: 'black', border: 'none' }} value={email} onChange={(e)=> setEmail(e.target.value)}  />
                    <Form.Control.Feedback type="invalid">Please provide an email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup>
                        <Form.Control type={showPassword ? 'text': 'password'} placeholder='Contraseña' required style={{ backgroundColor: '#d6bfc8', color: 'black', border: 'none' }} value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                        <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer', backgroundColor: '#d6bfc8', border: 'none',color:"black",borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}>
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                </svg>
                            )}
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">Por favor ingresa una contraseña.</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" style={{marginLeft:"3rem", marginTop: '20px' , width: '75%', backgroundColor: '#cf6551', border: 'none' }}>
                    Ingresar
                </Button>
            </Form>
        </Container>
    );
};

export default LoginForm;
