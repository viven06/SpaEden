import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardRecepcionista = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const nombreRecepcionista = localStorage.getItem("nombre"); 
    const [estadoFiltro, setEstadoFiltro] = useState("pendiente");
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const [empleadoAsignado, setEmpleadoAsignado] = useState("");
    const [horaAsignada, setHoraAsignada] = useState("");
    const [empleados, setEmpleados] = useState([]);
    const [citas, setCitas] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");

    const token = localStorage.getItem("token");

    const fetchSolicitudes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/solicitudes`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSolicitudes(response.data);
            } catch (error) {
                console.error("Error al obtener solicitudes:", error);
            }
    };

    const fetchCitas = async (empleadoId) => {
        if (!empleadoId) {
            alert("Por favor, selecciona un empleado antes de ver sus citas.");
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/citas/${empleadoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCitas(response.data);
        } catch (error) {
            console.error("Error al obtener citas:", error);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/empleados`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const empleadosFiltrados = response.data.filter(empleado => empleado.especialidad !== "Recepcionista");
                setEmpleados(empleadosFiltrados);
            } catch (error) {
                console.error("Error al obtener empleados:", error);
            }
        };
        fetchEmpleados();
    }, []);

    useEffect(() => {
        if (empleadoSeleccionado) {
            fetchCitas(empleadoSeleccionado);
        } else {
            setCitas([]);
        }
    }, [empleadoSeleccionado]);

    const aceptarSolicitud = async () => {
        if (!empleadoAsignado || !horaAsignada) {
            alert("Por favor, asigna un empleado y una hora antes de confirmar.");
            return;
        }

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/solicitudes/${solicitudSeleccionada.id}`, {
                estado: "aceptada",
                empleado_id: empleadoAsignado,
                hora: horaAsignada
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Solicitud aceptada con éxito!");
            fetchSolicitudes();
            setSolicitudSeleccionada(null);
            setEmpleadoAsignado("");
            setHoraAsignada("");
        } catch (error) {
            console.error("Error al aceptar solicitud:", error);
        }
    };

    const rechazarSolicitud = async (solicitudId) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/solicitudes/${solicitudId}`, {
                estado: "rechazada"
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Solicitud rechazada.");
            fetchSolicitudes();
            setSolicitudSeleccionada(null);
            setEmpleadoAsignado("");
            setHoraAsignada("");
        } catch (error) {
            console.error("Error al rechazar solicitud:", error);
        }
    };

    const solicitudesFiltradas = estadoFiltro === "todos"
        ? solicitudes
        : solicitudes.filter(s => s.estado === estadoFiltro);

    return (
        <div className="position-relative d-flex flex-column w-100 min-vh-100 " style={{backgroundColor:"#faf7f9"}}>  
            <div className="container-fluid d-flex flex-column h-100 container">
                <div className="sidebar-left"></div>
                <div className="container mt-4 py-5 m-1">
                    <h1 className="text-center title">Gestión Spa EDEN</h1>
                    <h3 className="text-muted sub-title">Recepcionista: {nombreRecepcionista}</h3>


                    <div className="content-wrapper">

                        <div className="solicitudes-container border rounded shadow-sm p-2" style={{backgroundColor:"#faf0f5" }}>
                            <h3>Solicitudes de los clientes</h3>

                            <div className="filter-section">
                                <label className="form-label">Filtrar por estado:</label>
                                <select className="form-select" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
                                    <option value="todos">Todas</option>
                                    <option value="pendiente">Pendientes</option>
                                    <option value="aceptada">Aceptadas</option>
                                    <option value="rechazada">Rechazadas</option>
                                </select>
                            </div>

                            <div className="scrollable-box">
                                {solicitudesFiltradas.length === 0 ? (
                                    <p className="text-muted">No hay solicitudes registradas o de ese tipo.</p>
                                ) : (
                                    <div className="table-container">
                                        <div className="table-header">
                                            <div className="col-usuario">Usuario</div>
                                            <div className="col-fecha">Fecha</div>
                                            <div className="col-franja">Franja Horaria</div>
                                            <div className="col-nombre">Servicio</div>
                                            <div className="col-estado">Estado</div>
                                            <div className="col-acciones"></div>
                                        </div>
                                        {solicitudesFiltradas.map(solicitud => (
                                            <div key={solicitud.id} className="table-row">
                                                <div className="col-usuario">{solicitud.usuario.nombre} {solicitud.usuario.apellido}</div>
                                                <div className="col-fecha">{solicitud.fecha}</div>
                                                <div className="col-franja">{solicitud.franja_horaria}</div>
                                                <div className="col-nombre">{solicitud.servicio.nombre}</div>
                                                <div className="col-estado">{solicitud.estado}</div>
                                                <div className="col-acciones">
                                                    {solicitud.estado === "pendiente" && (
                                                        <button className="btnrc btn-info btn-sm" onClick={() => setSolicitudSeleccionada(solicitud)}>
                                                            Gestionar
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {solicitudSeleccionada && (
                                <div className="gestion-solicitud" style={{backgroundColor:"#EDD8E2"}}>
                                    <h4>Gestionar solicitud de <strong>{solicitudSeleccionada.usuario.nombre}</strong> para el <strong>{solicitudSeleccionada.fecha}</strong> en la <strong>{solicitudSeleccionada.franja_horaria}</strong></h4>

                                    <label>Seleccionar empleado:</label>
                                    <select className="form-select" value={empleadoAsignado} onChange={(e) => setEmpleadoAsignado(e.target.value)}>
                                        <option value="">Selecciona un empleado</option>
                                        {empleados.map(empleado => (
                                            <option key={empleado.id} value={empleado.id}>{empleado.nombre} | {empleado.especialidad}</option>
                                        ))}
                                    </select>

                                    <label>Seleccionar hora:</label>
                                    <input type="time" className="form-control" value={horaAsignada} onChange={(e) => setHoraAsignada(e.target.value)} />
                                    
                                    <div className="d-flex justify-content-evenly">
                                        <button className="btnrc btn-success mt-2" onClick={() => aceptarSolicitud()}>
                                            Aceptar
                                        </button>
                                        <button className="btnrc btn-danger mt-2" onClick={() => rechazarSolicitud(solicitudSeleccionada.id)}>
                                            Rechazar
                                        </button>
                                        <button className="btnrc btn-secondary mt-2" onClick={() => setSolicitudSeleccionada(null)}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="content-wrapper my-3 border rounded shadow-sm p-2" style={{backgroundColor:"#faf0f5" }}>
                            <div className="filter-section">
                                <h3>Citas Programadas</h3>
                                <label className="form-label">Seleccionar empleado:</label>
                                <select className="form-select mb-2" value={empleadoSeleccionado} onChange={(e) => setEmpleadoSeleccionado(e.target.value)}>
                                    <option value="">Selecciona un empleado</option>
                                    {empleados.map(empleado => (
                                        <option key={empleado.id} value={empleado.id}>{empleado.nombre} - {empleado.especialidad}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {empleadoSeleccionado ? (
                                citas.length > 0 ? (
                                    <div className="solicitudes-container">
                                        <div className="scrollable-box">
                                            <div className="table-container">
                                                <div className="table-header">
                                                    <div className="col-usuario">Usuario</div>
                                                    <div className="col-servicio">Servicio</div>
                                                    <div className="col-fecha">Fecha</div>
                                                    <div className="col-hora">Hora</div>
                                                </div>
                                                {citas.map(cita => (
                                                    <div key={cita.id} className="table-row">
                                                        <div className="col-usuario">{cita.solicitud.usuario.nombre}</div>
                                                        <div className="col-servicio">{cita.solicitud.servicio.nombre}</div>
                                                        <div className="col-fecha">{cita.fecha}</div>
                                                        <div className="col-hora">{cita.hora}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted">No hay citas asignadas a este empleado.</p>
                                )
                            ) : (
                                <p className="text-muted">Selecciona un empleado para ver sus citas.</p>
                            )} 
                        </div>

                    </div>
                </div>
                <div className="sidebar-right"></div>
            </div>
        </div>  
    );
};

export default DashboardRecepcionista;