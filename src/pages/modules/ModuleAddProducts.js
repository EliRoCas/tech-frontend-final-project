import React, { useState, useEffect } from "react";
import ContentHeaderComp from "../../components/ContentHeaderComp";
import FooterComp from "../../components/FooterComp";
import NavbarComp from "../../components/NavbarComp";
import SidebarComp from "../../components/SidebarComp";
import APIInvoke from "../../configurations/APIInvoke";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const ModuleAddProducts = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState({
        name: '',
        type: '',
        price: '',
        over18: ''
    })

    const { name, type, price, over18 } = products;

    useEffect(() => {
        document.getElementById("name").focus();
    }, [])

    const onChange = (e) => {
        setProducts({
            ...products,
            [e.target.name]: e.target.value
        })
    }

    const addProducts = async () => {
        const data = {
            name: products.name,
            type: products.type,
            price: products.price,
            over18: products.over18,
        }

        const response = await APIInvoke.invokePOST('/api/products', data);
        const idProducts = response._id;

        if (idProducts === '') {
            const msg = "Hubo un error al agrear el producto";
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
            navigate("/products");

            const msg = "El producto fue agregado con éxito";
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

            setProducts({
                name: '',
                type: '',
                price: '',
                over18: ''
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addProducts();
    }


    return (
        <div className="wrapper">
            <NavbarComp></NavbarComp>
            <SidebarComp></SidebarComp>

            <div className="content-wrapper">
                <ContentHeaderComp
                    title={"Agregar Producto"}
                    breadCrumb1={"Listado de Productos"}
                    breadCrumb2={"agregar"}
                    route1={"/products/add"}>
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
                                            Nombre
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Ingrese el nombre del producto"
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
                                        <label htmlFor="type">
                                            Tipo
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="type"
                                                name="type"
                                                placeholder="Ingrese el tipo al que pertenece el producto"
                                                value={type}
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
                                        <label htmlFor="price">
                                            Precio
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                name="price"
                                                placeholder="Ingrese el precio del producto"
                                                value={price}
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
                                        <label htmlFor="over18">
                                            Para mayores de edad
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="over18"
                                                name="over18"
                                                placeholder="¿El producto es para mayores de 18?"
                                                value={over18}
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

export default ModuleAddProducts;