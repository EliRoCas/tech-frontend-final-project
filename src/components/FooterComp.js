import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <p className="footer-header">Eleglot SAS</p>
                <p className="footer-body">Talento Tech - Proyecto Final</p>
            </div>
            <p className="footer-copyright">
                <strong>Copyright 2024 <Link to={"#"}></Link></strong>
                All rights reserved
            </p>
        </footer>
    )
}

export default Footer; 