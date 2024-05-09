import React from "react";
import { Link } from "react-router-dom";

const ContentHeader = ({ title, breadCrumb1, breadCrumb2, route1 }) => {

    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col sm-6">
                        <h1>{title}</h1>
                    </div>
                    <div className="col sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to={route1}>{breadCrumb1}</Link></li>
                            <li className="breadcrumb-item active">{breadCrumb2}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentHeader; 