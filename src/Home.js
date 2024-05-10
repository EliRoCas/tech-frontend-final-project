import React from "react";
import { Link } from "react-router-dom";
import ContentHeader from "./components/ContentHeaderComp";
import Navbar from "./components/NavbarComp";
import Sidebar from "./components/SidebarComp";
import Footer from "./components/FooterComp";


const Home = () => {

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div className="content-wrapper">
                <ContentHeader
                    title={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    route1={"/home"}>
                </ContentHeader>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>Clientes</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa-solid fa-users"></i>
                                    </div>
                                    <Link to={"/clients"} className="small-box-footer">
                                        Ver clientes
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-dark">
                                    <div className="inner">
                                        <h3>Productos</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa-solid fa-shop"></i>
                                    </div>
                                    <Link to={"/products"} className="small-box-footer">
                                        Ver Productos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home; 