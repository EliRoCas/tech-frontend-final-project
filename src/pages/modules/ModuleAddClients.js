import React, { useState, useEffect } from "react";
import ContentHeaderComp from "../../components/ContentHeaderComp";
import FooterComp from "../../components/FooterComp";
import NavbarComp from "../../components/NavbarComp";
import SidebarComp from "../../components/SidebarComp";
import APIInvoke from "../../configurations/APIInvoke";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const ModuleAddClients = () => {

    const navigate = useNavigate();

    const [clients, setClients] = useState({
        name: '',
        lastName: '',
        idCard: '',
        email: '',
        phone: '',
        adress: ''
    })

    const { name, lastName, idCard, email, phone, adress } = clients;

    useEffect(() => {
        document.getElementById("name").focus();
    }, [])

    const onChange = (e) => {
        setClients({
            ...clients,
            [e.target.name]: e.target.value
        })
    }

    const addClients = async () => {
        const data = {
            name: clients.name,
            lastName: clients.lastName,
            idCard: clients.idCard,
            email: clients.email,
            phone: clients.phone,
            adress: clients.adress,

        }

        const response = await APIInvoke.invokePOST('/api/clients', data);
        const idClients = response._id;

        if (idClients === '') {
            const msg = "Hubo un error al agrear el cliente";
            swal({
                title: "Error",
                text: msg,
                icon: "error",
                buttons: {
                    confirm: {
                        text: "Ok",
                        value: true,
                        visible: true,
                        className: "btn btn-danger",
                        closeModal: true
                    }
                }
            });
        } else {
            navigate("/clients");

            const msg = "El cliente fue agregado con éxito";
            swal({
                title: "Information",
                text: msg,
                icon: "success",
                buttons: {
                    confirm: {
                        text: "Ok",
                        value: true,
                        visible: true,
                        className: "btn btn-primary",
                        closeModal: true
                    }
                }
            });

            setClients({
                name: '',
                lastName: '',
                idCard: '',
                email: '',
                phone: '',
                adress: ''
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addClients();
    }


    return (
        <div className="wrapper">
            <NavbarComp></NavbarComp>
            <SidebarComp></SidebarComp>

            <div className="content-wrapper">
                <ContentHeaderComp
                    title={"Agregar Cliente"}
                    breadCrumb1={"Listado de Clientes"}
                    breadCrumb2={"agregar"}
                    route1={"/clients/add"}>
                </ContentHeaderComp>

                <section className="content">
                    <div className="card">
                        <div className="card-header">

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
                            <form onSubmit={onSubmit}>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Nombres
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Ingrese los nombres del cliente"
                                                value={name}
                                                onChange={onChange}
                                                required>
                                            </input>

                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-signature"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="lastName">
                                            Apellidos
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Ingrese los apellidos del cliente"
                                                value={lastName}
                                                onChange={onChange}
                                                required>
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-signature"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="idCard">
                                            Documento
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="idCard"
                                                name="idCard"
                                                placeholder="Ingrese la cédula del Cliente"
                                                value={idCard}
                                                onChange={onChange}
                                                required>
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-id-card"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Correo
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Ingrese el correo del cliente"
                                                value={email}
                                                onChange={onChange}
                                                required>
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-envelope"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            Teléfono
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                placeholder="Ingrese el teléfono del cliente"
                                                value={phone}
                                                onChange={onChange}
                                                required>
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-mobile-retro"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="adress">
                                            Dirección
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="adress"
                                                name="adress"
                                                placeholder="Ingrese la dirección del cliente"
                                                value={adress}
                                                onChange={onChange}
                                                required>
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-map-location-dot"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fa-solid fa-floppy-disk"></i>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </section>
                <FooterComp></FooterComp>
            </div>
        </div>
    )
}

export default ModuleAddClients;