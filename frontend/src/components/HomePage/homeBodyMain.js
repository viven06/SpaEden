import React from "react";
import Carrusel from './carrusel';
import PromoInfoHome from "./promoInfoHome";

const MainBody=()=>{
    return(
        <div class="d-flex justify-content-center p-5" style={{paddingLeft: '10rem', paddingRight: '10rem'}}>
            <div class="layout-content-container d-flex flex-column" style={{maxWidth: '960px', flex: 1}}>
                <Carrusel/>
                <PromoInfoHome/>
            </div>
        </div>
    )
}

export default MainBody;