import React from 'react';
import { useNavigate } from 'react-router-dom';

const Servicios = () => {
    const navigate = useNavigate();

  // Lista simulada de servicios
    const servicios = [
    { id: 1, nombre: 'Masaje relajante', duracion: '60 min', precio: '$500' },
    { id: 2, nombre: 'Facial hidratante', duracion: '45 min', precio: '$400' },
    { id: 3, nombre: 'Tratamiento corporal', duracion: '90 min', precio: '$800' },
    ];

    const handleSolicitar = (idServicio) => {
    // Navega a la pantalla de solicitud con el servicio seleccionado (opcional)
    navigate('/cliente/solicitar-cita', { state: { servicioId: idServicio } });
    };

    return (
    <div style={{ padding: '20px' }}>
        <h2>Servicios Disponibles</h2>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Duración</th>
                <th>Precio</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {servicios.map((servicio) => (
                <tr key={servicio.id}>
                    <td>{servicio.nombre}</td>
                    <td>{servicio.duracion}</td>
                    <td>{servicio.precio}</td>
                    <td>
                        <button onClick={() => handleSolicitar(servicio.id)}>Solicitar cita</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Servicios;
