import React from "react";

const PageNotFound=()=>{
    return(
        <div className="position-relative d-flex flex-column w-100 min-vh-100 " style={{background: '#faf7f9', overflowX: 'hidden', fontFamily: "'Be Vietnam Pro', 'Noto Sans', sans-serif"}}>
            <div className="container-fluid d-flex justify-content-center h-100">
                <div className="sidebar-left"></div>
                <div class="d-flex" style={{marginTop:'20rem',textAlign:'center'}}>
                    <h1 className="text-black">Error 404: <br/>Page Not Found</h1>
                </div>
                <div className="sidebar-right"></div>
            </div>
        </div>
    )
}
export default PageNotFound