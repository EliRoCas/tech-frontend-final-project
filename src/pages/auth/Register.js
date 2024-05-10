import swal from "sweetalert";
import APIInvoke from "../../configurations/APIInvoke";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {



    //Se define el estado inicial del componente
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmP: ''
    });

    const { name, email, password, confirmP } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])

    const accountRegister = async () => {
        if (password !== confirmP) {
            const msg = "Las contraseñas no coinciden.";
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
            });
        } else if (password.length < 8) {
            const msg = "La contraseña debe tener al menos 8 caracteres.";
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
            });
        } else {
            const data = {
                name: user.name,
                email: user.email,
                password: user.password
            }

            const response = await APIInvoke.invokePOST('/api/users', data);
            const messagge = response.msg;

            if (messagge === "El usuario ya existe") {
                const msg = "El usuario ya existe";
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
                });
            } else {
                const msg = "El usuario fue creado correctamente";
                swal({
                    title: "Información",
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

                setUser({
                    name: "",
                    email: "",
                    password: "",
                    confirmP: ""
                })
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        accountRegister();
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}> <b>Crear</b> Cuenta </Link>
                </div>


                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">
                            Ingrese los datos del nuevo usuario
                        </p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    id="confirmP"
                                    name="confirmP"
                                    value={confirmP}
                                    onChange={onChange}
                                    required

                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center mb-3">
                                <button type="submit" className="btn btn-block btn-primary">
                                    Crear cuenta
                                </button>
                                <Link to={"/"} className="btn btn-block btn-danger">
                                    Regresar al login
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}


export default Register; 