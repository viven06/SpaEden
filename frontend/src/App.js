import React, { useEffect, useState } from 'react';
  import Layout from './components/CompsLayout/Layout';
  import HomeBody from './components/HomePage/homeBody';
  import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
  import './Estilos/Styles.css';
  import PageNotFound from './components/pageNotFound';
  import { ModalProvider } from './components/Login_Register/ModalContext';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  import Notification from './components/Notification';
  import Loader from './components/Loader'; 
  import DashboardCliente from './components/Cliente/dashboardCliente';
  import DashboardRecepcionista from './components/Recepcionista/dashboardRecepcionista';
  import estilosCLiente from "./Estilos/estilosCliente.css"


  function App() {
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const [notification, setNotification] = useState(null);
    const [loading,setLoading]=useState(true);
    const [userRole, setUserRole] = useState(null);

//------------------------------
    useEffect(()=>{
      const timer=setTimeout(()=>{
        setLoading(false);
      },1000);
      
      return ()=> clearTimeout(timer);
    },[]);
//--------------------------------------------
    useEffect(()=>{
      const token= localStorage.getItem('token');
      const role = localStorage.getItem("role");
      if (token) {
          setIsLoggedIn(true);
          setUserRole(role)
      } else {
          setIsLoggedIn(false);
          setUserRole(null);
      }
    },[]);

    useEffect(() => { console.log('Estado de isLoggedIn:', isLoggedIn); }, [isLoggedIn]);
    useEffect(() => { console.log("Rol del usuario:", userRole); }, [userRole]);
    useEffect(() => { 
      const userId=localStorage.getItem('userId');
      console.log('id usuario:', userId); 
      },[isLoggedIn]);

    useEffect(() => { 
      if (isLoggedIn) { 
        setNotification({ message: "Logged in Succesfully!", type: "success" }); 
        const timer = setTimeout(() => { 
          setNotification(null); 
        }, 3000); 
        return () => clearTimeout(timer); 
      } 
    }, [isLoggedIn]);

    return (
        
        <ModalProvider>  
          <BrowserRouter>
            {loading && <Loader/>} 
            {notification && ( <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} /> )}
            {!loading && (
              <Routes>
                <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}>
                  <Route index element={<HomeBody/>}/>
                  {isLoggedIn && userRole === "cliente" && <Route path="/dashboard_cliente" element={<DashboardCliente />} />}
                  {isLoggedIn && userRole === "recepcionista" && <Route path="/dashboard_recepcionista" element={<DashboardRecepcionista />} />}
                  
                  <Route path="*" element={<PageNotFound/>}/>

                </Route>
              </Routes>
            )}          
          </BrowserRouter>
        </ModalProvider>        
    );
  }

  export default App;
