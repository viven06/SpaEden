import React from "react";
import MainBody from "./homeBodyMain";

const HomeBody=()=>{
    return(
        <div className="position-relative d-flex flex-column w-100 min-vh-100 " style={{background: 'rgb(21,17,34)', background: 'linear-gradient(90deg,rgba(165, 224, 250, 1) 0%, rgba(207, 148, 136, 1) 47%, rgba(166, 235, 247, 1) 100%)', overflowX: 'hidden', fontFamily: "'Be Vietnam Pro', 'Noto Sans', sans-serif"}}>
            <div className="container-fluid d-flex flex-column h-100">
                
                <MainBody/>
                
            </div>
        </div>
    )
}

export default HomeBody;