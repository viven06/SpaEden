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
  import Servicios from './components/Cliente/servicios';


  function App() {
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const [notification, setNotification] = useState(null);
    const [loading,setLoading]=useState(true);
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
      if (token) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
    },[]);

    useEffect(() => { console.log('Estado de isLoggedIn:', isLoggedIn); }, [isLoggedIn]);
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
            <Routes>
              <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}>
                <Route index element={<HomeBody/>}/>

                <Route path="/cliente/servicios" element={<Servicios/>}/>

                <Route path="*" element={<PageNotFound/>}/>

              </Route>
            </Routes>
          </BrowserRouter>
        </ModalProvider>        
    );
  }

  export default App;
