import React, {useState} from "react";
import { useModal } from "./ModalContext";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import LoginForm from "./Login_Form";
import RegisterForm from "./Register_Form";
import Loader from "../Loader";

const AuthModal=({setIsLoggedIn})=>{
    const { modal, hideModal } = useModal();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleClose =()=>{
        hideModal();
        setIsLogin(true);
    }

    const handleSubmit = (data) => {
        setLoading(true);
        hideModal();
    };
    return(
        <>
        {loading && <Loader />}
        <Modal show={modal === 'auth'} onHide={handleClose} >
            <Modal.Header closeButton style={{backgroundColor:"#a36a5f"}}>
                <Modal.Title className="w-100 text-center text-white">
                    {isLogin ? 'Ingresa para agendar tu cita!' : 'Registrate en la página'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#e3d1d8", paddingBottom:"20px"}}>
                {isLogin ? <LoginForm className="d-flex align-items-center" onSubmit={handleSubmit} setLoading={setLoading} setIsLoggedIn={setIsLoggedIn}/> : <RegisterForm onSubmit={handleSubmit}/>}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#a36a5f"}}>
                <Row className="mt-3" >
                    <Col>
                        <p className="text-white">{isLogin ? 'No tienes una cuenta?' : 'Ya tienes una cuenta?'} 
                            <Button variant="link" style={{ color: '#153c5e' }} onClick={handleToggle}>
                                {isLogin ? 'Crea tu cuenta' : 'Ingresa aquí!'}
                            </Button>
                        </p>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
        </>
    )
}
export default AuthModal;