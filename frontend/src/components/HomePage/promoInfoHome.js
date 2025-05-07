import React from "react";
import foto1 from "../../Imagenes/foto_home_1.jpg"
import foto2 from "../../Imagenes/foto_home_2.jpg"
import foto3 from "../../Imagenes/foto_home_3.jpg"

const PromoInfoHome=()=>{
    return(
        <div className="d-flex flex-column @container" style={{gap: '2.5rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '2.5rem', paddingBottom: '2.5rem'}}>
            <div className="d-grid" style={{gridTemplateColumns: 'repeat(1, minmax(158px, 1fr))', gap: '1rem'}}>
                <div className="container-fluid gradient_background" style={{padding: '30px', backgroundColor: '#1c1e29', color: 'white', borderRadius: '10px', maxWidth: '100%'}}>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h2 className="ml-6" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Ten el Día que Mereces</h2>
                            <p className="ml-6" style={{fontSize: '0.9rem', marginTop: '10px'}}>Disfruta de experiencias diseñadas para revitalizar cuerpo y mente. Déjate envolver por una atmósfera de paz y armonía."</p>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center" >
                            <img src={foto1} alt="Spa Relaxing" className="img-fluid img_responsive" style={{borderRadius: '10px', boxShadow: '0 0 40px rgb(173, 94, 78)', maxHeight: '300px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '1rem'}}/>
                        </div>
                    </div>
                </div>

                <div className="container-fluid gradient_background" style={{padding: '30px', backgroundColor: '#1c1e29', color: 'white', borderRadius: '10px', maxWidth: '100%'}}>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h2 className="ml-6" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Explora Nuestros Tratamientos</h2>
                            <p className="ml-6" style={{fontSize: '0.9rem', marginTop: '10px'}}>Incluyen: masajes terapéuticos, faciales rejuvenecedores, aromaterapia y sesiones de hidroterapia. Encuentra el equilibrio perfecto entre salud y relajación."</p>
                        </div>
                        <div className="col-md-6">
                            <img src={foto2} alt="Spa Massage" className="img-fluid img_responsive" style={{borderRadius: '10px', boxShadow: '0 0 40px rgb(171, 89, 72)', maxHeight: '300px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '1rem'}}/>
                        </div>
                    </div>
                </div>

                <div className="container-fluid gradient_background" style={{padding: '30px', backgroundColor: '#1c1e29', color: 'white', borderRadius: '10px', maxWidth: '100%'}}>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h2 className="ml-6" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Reserva tu Experiencia Personalizada</h2>
                            <p className="ml-6" style={{fontSize: '0.9rem', marginTop: '10px'}}>Tu bienestar es nuestra prioridad. Reserva tu cita hoy y disfruta de una experiencia diseñada a tu medida. Relájate, respira y deja que el estrés desaparezca."</p>
                        </div>
                        <div className="col-md-6">
                            <img src={foto3} alt="Spa Couple Massage" className="img-fluid img_responsive" style={{borderRadius: '10px', boxShadow: '0 0 40px rgb(179, 93, 76)', maxHeight: '300px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '1rem'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PromoInfoHome