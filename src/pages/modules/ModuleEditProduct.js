import React, { useState, useEffect } from "react";
import ContentHeaderComp from "../../components/ContentHeaderComp";
import FooterComp from "../../components/FooterComp";
import NavbarComp from "../../components/NavbarComp";
import SidebarComp from "../../components/SidebarComp";
import APIInvoke from "../../configurations/APIInvoke";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";


const ModuleEditProduct = () => {
    // Se crea la función componente, para editar los clientes
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [over18, setOver18] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    // Se crea la función para Actualizar el elemento 
    const editProduct = async (e) => {
        e.preventDefault();
        await APIInvoke.invokePUT(`/api/products/${id}`, {
            name: name,
            type: type,
            price: price,
            over18: over18
        })

        if (id === '') {
            const msg = "Producto no encontrado";
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

            const msg = "El producto fue editado con éxito";
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
        console.log('effect')
        getProductsID()
    }, []);

    const getProductsID = async () => {
        const result = await APIInvoke.invokeGET(`/api/products/${id}`)
        setName(result.name)
        setType(result.type)
        setPrice(result.price)
        setOver18(result.over18)
    }


    return (
        <div className="wrapper">
            <NavbarComp></NavbarComp>
            <SidebarComp></SidebarComp>

            <div className="content-wrapper">
                <ContentHeaderComp
                    title={"Editar Producto"}
                    breadCrumb1={"Listado de Productos"}
                    breadCrumb2={"Editar"}
                    route1={"/products/edit"}>
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
                            <form onSubmit={editProduct}>

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
                                        <label htmlFor="type">
                                            Tipo de producto
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="type"
                                                name="type"
                                                placeholder="Ingrese la categoría del producto"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                                required>
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-icons"></span>
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
                                                placeholder="Ingrese el precio por unidad"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required>
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-money-bill-wave"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body check">
                                    <div className="form-group">
                                        <label htmlFor="over18">
                                            Para mayores de edad
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="over18"
                                                name="over18"
                                                checked={over18}
                                                onChange={(e) => setOver18(e.target.checked)}
                                            >
                                            </input>

                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fa-solid fa-ghost"></span>
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


export default ModuleEditProduct;