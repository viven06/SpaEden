import React from "react";
import MainBody from "./homeBodyMain";

const HomeBody=()=>{
    return(
        <div className="position-relative d-flex flex-column w-100 min-vh-100 " style={{backgroundColor:"#faf7f9"}}>
            <div className="container-fluid d-flex flex-column h-100">
                <div className="sidebar-left"></div>
                <MainBody/>
                <div className="sidebar-right"></div>
            </div>
        </div>
    )
}

export default HomeBody;