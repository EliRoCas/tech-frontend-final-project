import APIInvoke from "../../configurations/APIInvoke";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
const { Link, useNavigate } = require("react-router-dom");


const Login = () => {
    const navigate = useNavigate();

    //Se define el estado inicial del componente
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])

    const startSession = async () => {
        if (password.length < 8) {
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
                email: user.email,
                password: user.password
            }

            const response = await APIInvoke.invokePOST('/api/auth', data);
            const messagge = response.msg;

            if (messagge === "El usuario no está registrado" || messagge === "El usuario y/o la contraseña son incorrectos") {
                const msg = "No fue posible iniciar sesión, datos incorrectos";
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
                // Se obtiene el token si las validaciones son correctas 
                const jwt = response.token;

                // Se guarda el token en el "local storage"
                localStorage.setItem('token', jwt)

                // Después de hacerse el login, se ingresa al home de la página 
                navigate("/home");
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        startSession();
    }


    return (

        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}><b>Iniciar</b> Sesión</Link>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">
                            Inicie sesión para empezar.
                        </p>

                        <form onSubmit={onSubmit}>
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

                            <div className="social-auth-links text-center mb-3">
                                <button type="submit" className="btn btn-block btn-primary">
                                    Iniciar Sesión
                                </button>
                                <Link to={"/Register"} className="btn btn-block btn-danger">
                                    Registro
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Login; 