import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeaderComp from "../../components/ContentHeaderComp";
import FooterComp from "../../components/FooterComp";
import NavbarComp from "../../components/NavbarComp";
import SidebarComp from "../../components/SidebarComp";
import APIInvoke from "../../configurations/APIInvoke";
import swal from "sweetalert";


const ModuleShowProducts = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const response = await APIInvoke.invokeGET('/api/products');
        setProducts(response.products);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const deleteProducts = async (e, idProduct) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/products/${idProduct}`);

        if (response.msg === "El producto fue eliminado con éxito") {
            const msg = "El producto fue eliminado correctamente";
            swal({
                title: "Information",
                text: msg,
                icon: "success",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-primary",
                        closeModal: true
                    }
                }
            });

            getProducts();

        } else {
            const msg = "Hubo un error al eliminar el producto";
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
                    title={"Productos existentes"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Productos"}
                    route1={"/home"}>
                </ContentHeaderComp>

                <section className="content">

                    <div className="card-header">

                        <h3 className="card-title">
                            <Link to={"/products/add"}
                                className="btn btn-block btn-primary btn-sm">
                                <i className="fa-solid fa-circle-plus"></i>
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
                                    <th style={{ width: "3rem" }}>Nombre|</th>
                                    <th style={{ width: "3rem" }}>Tipo</th>
                                    <th style={{ width: "3rem" }}>Precio</th>
                                    <th style={{ width: "3rem" }}>Para mayores de edad</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.type}</td>
                                        <td>{product.price}</td>
                                        <td>{product.over18 ? "Sí" : "No"}</td>

                                        <td>

                                            <Link to={`/products/edit/${product._id}`}
                                                className="btn btn-sm btn-primary">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>

                                            <button onClick={(e) => deleteProducts(e, product._id)}
                                                className="btn btn-danger">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                </section>
                <FooterComp></FooterComp>
            </div>

        </div>
    )
}

export default ModuleShowProducts;

