import React, {useState} from "react";
import { useModal } from "./ModalContext";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import LoginForm from "./Login_Form";
import RegisterForm from "./Register_Form";

const AuthModal=({setIsLoggedIn})=>{
    const { modal, hideModal } = useModal();
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleClose =()=>{
        hideModal();
        setIsLogin(true);
    }

    const handleSubmit = (data) => {
        console.log("For data: ",data);
        hideModal();
    };
    return(
        <>
        <Modal show={modal === 'auth'} onHide={handleClose} >
            <Modal.Header closeButton style={{backgroundColor:"#220d2e"}}>
                <Modal.Title className="w-100 text-center text-white">
                    {isLogin ? 'Login to manage your lists!' : 'Register on our website!'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#211e24", paddingBottom:"20px"}}>
                {isLogin ? <LoginForm className="d-flex align-items-center" onSubmit={handleSubmit} setIsLoggedIn={setIsLoggedIn}/> : <RegisterForm onSubmit={handleSubmit}/>}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor:"#220d2e"}}>
                <Row className="mt-3" >
                    <Col>
                        <p className="text-white">{isLogin ? 'Dont have an account?' : 'Already have an account?'} 
                            <Button variant="link" style={{ color: '#3080c7' }} onClick={handleToggle}>
                                {isLogin ? 'Create Account' : 'Login Here!'}
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