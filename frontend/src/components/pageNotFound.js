import React from "react";

const PageNotFound=()=>{
    return(
        <div className="position-relative d-flex flex-column w-100 min-vh-100 " style={{background: '#d4a39b', background: 'linear-gradient(90deg,rgba(212, 163, 155, 1) 0%, rgba(165, 224, 250, 1) 12%, rgba(207, 148, 136, 1) 47%, rgba(166, 235, 247, 1) 90%, rgba(212, 163, 155, 1) 100%)', overflowX: 'hidden', fontFamily: "'Be Vietnam Pro', 'Noto Sans', sans-serif"}}>
            <div className="container-fluid d-flex justify-content-center h-100">
                <div class="d-flex" style={{marginTop:'20rem',textAlign:'center'}}>
                    <h1 className="text-white">Error 404: <br/>Page Not Found</h1>
                </div>
            </div>
        </div>
    )
}
export default PageNotFound