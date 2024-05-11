import React, { useState, useEffect } from "react";
import ContentHeaderComp from "../../components/ContentHeaderComp";
import FooterComp from "../../components/FooterComp";
import NavbarComp from "../../components/NavbarComp";
import SidebarComp from "../../components/SidebarComp";
import APIInvoke from "../../configurations/APIInvoke";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";


const ModuleEditClients = () => {
    // Se crea la función componente, para editar los clientes
    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [idCard, setIdCard] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();


    // Se crea la función para Actualizar el elemento 
    const editClient = async (e) => {
        e.preventDefault();
        await APIInvoke.invokePUT(`/api/clients/${id}`, {
            name: name,
            lastName: lastName,
            idCard: idCard,
            email: email,
            phone: phone,
            adress: adress
        })

        if (id === '') {
            const msg = "Cliente no encontrado";
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

            const msg = "El cliente fue editado con éxito";
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
            })
        }
    };

    useEffect(() => {
        getClientsID()
    }, []);

    const getClientsID = async () => {
        const result = await APIInvoke.invokeGET(`/api/clients/${id}`)
        setName(result.name)
        setLastname(result.lastName)
        setIdCard(result.idCard)
        setEmail(result.email)
        setPhone(result.phone)
        setAdress(result.adress)
    }



    return (
        <div className="wrapper">
            <NavbarComp></NavbarComp>
            <SidebarComp></SidebarComp>

            <div className="content-wrapper">
                <ContentHeaderComp
                    title={"Editar Cliente"}
                    breadCrumb1={"Listado de Clientes"}
                    breadCrumb2={"Editar"}
                    route1={"/clients/edit"}>
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
                            <form onSubmit={editClient}>

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
                                                onChange={(e) => setName(e.target.value)}
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
                                                onChange={(e) => setLastname(e.target.value)}
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
                                                onChange={(e) => setIdCard(e.target.value)}
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
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                onChange={(e) => setPhone(e.target.value)}
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
                                                onChange={(e) => setAdress(e.target.value)}
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
                                        <i className="fa-solid fa-user-pen"></i>
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


export default ModuleEditClients;