import React, { useEffect, useState } from "react";
import axios from "axios";


const DashboardCliente = () => {
    const [servicios, setServicios] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);
    const [mostrarSolicitudes, setMostrarSolicitudes] = useState(false);
    const [nuevaSolicitud, setNuevaSolicitud] = useState({ fecha: "", franja_horaria: "", servicio_id: "" });
    const [estadoFiltro, setEstadoFiltro] = useState("todos");

    const nombreUsuario = localStorage.getItem("nombre");  
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/servicios`);
                setServicios(response.data);
            } catch (error) {
                console.error("Error al obtener servicios:", error);
            }
        };

        fetchServicios();
    }, []);

    const fetchSolicitudes = async () => {
        try {
            const token = localStorage.getItem("token"); 

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/solicitudes/${userId}`, {
                headers: {
                    Authorization:  `Bearer ${token} `
                }
            });

            setSolicitudes(response.data);
            setMostrarSolicitudes(true);
        } catch (error) {
            console.error("Error al obtener solicitudes:", error);

            if (error.response && error.response.status === 404) {
            setSolicitudes([]);
            setMostrarSolicitudes(true);
            }
        }
    };

    useEffect (() =>{
        fetchSolicitudes();
    })

    const handleCreateSolicitud = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/solicitudes`, {
                usuario_id: userId, 
                fecha: nuevaSolicitud.fecha, 
                franja_horaria: nuevaSolicitud.franja_horaria,
                servicio_id: nuevaSolicitud.servicio_id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Solicitud creada con éxito!");
            setNuevaSolicitud({ fecha: "", franja_horaria: "", servicio_id: "" });
            fetchSolicitudes(); 
        } catch (error) {
            console.error("Error al crear solicitud:", error);
        }
    };

    const solicitudesFiltradas = estadoFiltro === "todos"
        ? solicitudes
        : solicitudes.filter(s => s.estado === estadoFiltro);

    return (
        <div className="position-relative d-flex flex-column w-100 min-vh-100 " style={{backgroundColor:"#faf7f9"}}>
            <div className="container-fluid d-flex flex-column h-100 container">
                <div className="sidebar-left"></div>
                <div class="py-5 m-1 mt-4" >
                    <h2>Hola, {nombreUsuario}!</h2>  
                    <p>Revisa el estado de tus solicitudes o realiza una, el estado cambiará a aceptado una vez el personal confirme tu solicitud</p>
                    <div className="row" style={{width:"1100px"}}>
                        <div className="col-md-7  border rounded shadow-sm"style={{backgroundColor:"#faf0f5"}}>
                            <div className="mt-4 border rounded p-3" style={{backgroundColor:"#edd8e2"}}>
                                <h3>Mis Solicitudes</h3>

                                <select className="form-select" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
                                    <option value="todos">Todos</option>
                                    <option value="pendiente">Pendientes</option>
                                    <option value="aceptada">Aceptadas</option>
                                    <option value="rechazada">Rechazadas</option>
                                </select>

                                {solicitudesFiltradas.length === 0 ? (
                                    <p className="text-muted">No tienes solicitudes registradas aún. 😊</p>
                                ) : (
                                    <div className="table-container">
                                        <div className="table-header">
                                            <div className="col-nombre">Fecha</div>
                                            <div className="col-precio">Servicio</div>
                                            <div className="col-duracion">Estado</div>
                                        </div>
                                        {solicitudesFiltradas.map(solicitud => (
                                            <div key={solicitud.id} className="table-row border round" style={{backgroundColor:"#faf0f5"}}>
                                                <div className="col-fecha">{solicitud.fecha}</div>
                                                <div className="col-servicio">{solicitud.servicio.nombre}</div>
                                                <div className="col-estado">{solicitud.estado}</div>
                                            </div>
                                        ))}
                                    </div>    
                                )}
                            </div>

                            <h3 className="mt-4">Crear nueva solicitud</h3>
                            <form className="mt-3 p-3 border rounded shadow-sm" style={{marginBottom:"15px",boxShadow:"2px 2px 10px rgba(0,0,0,0.1)", border:"1px solid #ddd",backgroundColor:"#edd8e2"}} onSubmit={handleCreateSolicitud}>
                                <div className="mb-3"> 
                                    <label className="form-label">Fecha:</label>
                                    <input type="date" style={{backgroundColor:"#f8f9fa"}} className="form-control" value={nuevaSolicitud.fecha} onChange={(e) => setNuevaSolicitud({ ...nuevaSolicitud, fecha: e.target.value })} required />
                                </div>  
                                
                                <div className="mb-3">
                                    <label className="form-label">Franja horaria:</label>
                                    <select style={{backgroundColor:"#f8f9fa"}} className="form-select" value={nuevaSolicitud.franja_horaria} onChange={(e) => setNuevaSolicitud({ ...nuevaSolicitud, franja_horaria: e.target.value })} required>
                                        <option value="">Selecciona</option>
                                        <option value="Mañana">Mañana</option>
                                        <option value="Tarde">Tarde</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Servicio:</label>
                                    <select style={{backgroundColor:"#f8f9fa"}} className="form-select" value={nuevaSolicitud.servicio_id} onChange={(e) => setNuevaSolicitud({ ...nuevaSolicitud, servicio_id: e.target.value })} required>
                                        <option value="">Selecciona un servicio</option>
                                        {servicios.map(servicio => (
                                            <option key={servicio.id} value={servicio.id}>{servicio.nombre}</option>
                                        ))}
                                    </select>
                                </div>    

                                <button type="submit" className="btn w-100 text-white" style={{backgroundColor:"#e89a8b"}}>Solicitar cita</button>
                            </form>
                        </div>

                        <div className="solicitudes-container col-md-5">
                            <h3 className="mt-4 text-center">Servicios disponibles</h3>
                            <div className="scrollable-services-box" style={{justifySelf:"center",backgroundColor:"#faf0f5"}}>
                                <div className="table-container">
                                    <div className="table-header">
                                        <div className="col-nombre">Nombre</div>
                                        <div className="col-precio">Precio</div>
                                        <div className="col-duracion">Duración</div>
                                    </div>
                                    {servicios.map(servicio => (
                                        <div key={servicio.id} className="table-row">
                                            <div className="col-nombre">{servicio.nombre}</div>
                                            <div className="col-precio"><strong>${servicio.precio}</strong></div>
                                            <div className="col-duracion">{servicio.duracion}m</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-right"></div>
            </div>
        </div>

    );
};

export default DashboardCliente;