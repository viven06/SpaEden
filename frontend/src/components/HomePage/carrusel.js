import React from "react";
import foto1 from "../../Imagenes/foto_carrusel_1.jpg";
import foto2 from "../../Imagenes/foto_carrusel_2.jpg";
import foto3 from "../../Imagenes/foto_carrusel_3.jpg";


const Carrusel=()=>{

    return(
        <div className="container">
                    <div id="caja_primera" className="p-4 p-md-3 position-relative">
    
                        <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="carousel" style={{minWidth: '350px'}}>
                            <div className="carousel-indicators" style={{marginBottom: '0.2rem'}}>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner" style={{borderRadius: '1rem'}}>
                                <div className="carousel-item active">
                                <img src={foto1} className="d-block w-100" alt="..." style={{ transform: "scaleX(-1)" }}/>
                                </div>
                                <div className="carousel-item">
                                <img src={foto2} className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <img src={foto3} className="d-block w-100" alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style={{width:'3rem'}}>
                                <span className="carousel-control-prev-icon" aria-hidden="true" style={{marginLeft: '-30px'}}></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style={{width:'3rem'}}>
                                <span className="carousel-control-next-icon" aria-hidden="true" style={{marginLeft: '-30px'}}></span>
                                <span className="visually-hidden">Next</span>
                            </button>

                            <div className="d-flex flex-column align-items-start justify-content-end p-4 pb-10 position-absolute w-100 h-100" style={{overflow:'auto', textWrap: 'balance', top: 0, left: 0}} >
                                <div id="caja_titulo" className="d-flex flex-column text-start" style={{gap: '0.5rem'}}>
                                        <h1 className="text-white display-4 font-weight-bolder responsive_text text-shadow">
                                        Bienvenidos a Spa Eden <br/> Relajante y Acogedor
                                        </h1>
                                        <h2 className="text-white custom-h2 text-shadow">
                                        Sumérgete en una experiencia de relajación única
                                        </h2>
                                </div>
                                
                            </div>
                        </div>
                    </div>
        </div>
    )
}
export default Carrusel