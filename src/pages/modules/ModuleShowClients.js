import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeaderComp from "../../components/ContentHeaderComp";
import FooterComp from "../../components/FooterComp";
import NavbarComp from "../../components/NavbarComp";
import SidebarComp from "../../components/SidebarComp";
import APIInvoke from "../../configurations/APIInvoke";
import swal from "sweetalert";

const ModuleShowClients = () => {

    const [clients, setClients] = useState([]);

    const getClients = async () => {
        const response = await APIInvoke.invokeGET('/api/clients/');
        setClients(response.clients);
    }

    useEffect(() => {
        getClients();
    }, [])

    const deleteClients = async (e, idClient) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/clients/${idClient}`);

        if (response.msg === "El cliente fue eliminado con éxito") {
            const msg = "El cliente fue eliminado correctamente";
            swal({
                title: 'Information',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: "btn btn-primary",
                        closeModal: true
                    }
                }
            });
            getClients();

        } else {
            const msg = "El cliente no fue eliminado correctamente";
            swal({
                title: "Error",
                text: msg,
                icon: "error",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-danger",
                        closeModal: true
                    }
                }

            })

        }
    }
    return (
        <div className="wrapper">
            <NavbarComp></NavbarComp>
            <SidebarComp></SidebarComp>
            <div className="content-wrapper">

                <ContentHeaderComp
                    title={"Listado clientes"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Clientes"}
                    route1={"/home"}>
                </ContentHeaderComp>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"> <Link to={"/clients/add"}
                                className="btn btn-block btn-primary btn-sm">
                                <i className="fa-solid fa-user-plus"></i>
                            </Link>
                            </h3>

                            <div className="card-tools">

                                <button type="button" className="btn btn-tool"
                                    data-card-widget="remove" title="Remove">
                                    <i className="fas fa-items" />
                                </button>

                                <button type="button" className="btn btn-tool"
                                    data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-times" />
                                </button>

                            </div>
                        </div>

                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1rem" }}>Nombres</th>
                                        <th style={{ width: "1rem" }}>Apellidos</th>
                                        <th style={{ width: "1rem" }}>Documento</th>
                                        <th style={{ width: "1.3rem" }}>Correo</th>
                                        <th style={{ width: "0.8rem" }}>Teléfono</th>
                                        <th style={{ width: "1rem" }}>Dirección</th>
                                        <th style={{ width: "1rem" }}></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {clients.map((client, index) => (
                                        <tr key={index}>
                                            <td>{client.name}</td>
                                            <td>{client.lastName}</td>
                                            <td>{client.idCard}</td>
                                            <td>{client.email}</td>
                                            <td>{client.phone}</td>
                                            <td>{client.adress}</td>

                                            <td>

                                                <Link to={`/clients/edit/${client._id}`}
                                                    className="btn btn-sm btn-primary">
                                                    <i className="fa-solid fa-user-pen"></i>
                                                </Link>

                                                <button onClick={(e) => deleteClients(e, client._id)}
                                                    className="btn btn-danger">
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </section>
                <FooterComp></FooterComp>
            </div>
        </div>
    )
}

export default ModuleShowClients;