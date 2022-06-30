import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {loginGoogleInitiate , getUserMongo } from "../Redux/actions/user";
import style from "./styles/Login.module.css";
// import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState("ocultar");
  
  function mostrarOcultar(flag, e){
    e.preventDefault();
    setShowPassword(flag);
  }

  // State para iniciar sesión
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  //extraer de usario
  const { email, password } = state;

  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
      dispatch(getUserMongo(currentUser.email))
    }
  }, [currentUser, navigate]);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando usuario quiere iniciar sesión
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacíos
    if (!email || !password) {
      // Swal.fire(
      //   "Ups!",
      //   "Por favor completa todos los campos",
      //   "error"
      // );
      return;
    }
    //Pasarlo al reducer
    if (toggle) {
      // dispatch(loginAdminInitiate(email, password));
    } else {
      // dispatch(loginInitiate(email, password));
      dispatch(getUserMongo(email));
    }
    // dispatch(loginInitiate(email, password));
    setState({ email: "", password: "" });
  };

  const loginGoogle = () => {
    dispatch(loginGoogleInitiate());
    dispatch(getUserMongo(currentUser.email));
  };


  return (
    <div className={style.allLogin}>
      <div className={style.contenedorFormulario}>
        <div>
          <h1>Hola de nuevo!</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="ejemplo@hairup.com"
            />
            <small id="emailHelp" className="form-text text-muted">
              Nunca compartiremos su correo electrónico con nadie más.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">
              Contraseña
            </label>
            {showPassword === "mostrar" ? (
              <div>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Contraseña"
                />
               <button className={`btn m-0 px-1 ${style.botonMostrarPass}`} onClick={(e) => {mostrarOcultar("ocultar", e)}}> <small className="text-muted"><FontAwesomeIcon icon={faEyeSlash} className="mx-1" />Ocultar contraseña</small></button>
              </div>
            ) : (
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                  placeholder="********"
                />
                 <button className={`btn m-0 px-1 ${style.botonMostrarPass}`} onClick={(e) => {mostrarOcultar("mostrar", e)}}><small className=" text-muted"><FontAwesomeIcon icon={faEye} className="mx-1" />Mostrar contraseña</small></button>
              </div>
            )}
          </div>
          <div className={style.contenedorBotones}>
            <button type="submit" className="btn btn-outline-primary">
              Iniciar Sesion
            </button>
            <button
              type="submit"
              value="Iniciar Sesión con Google"
              onClick={loginGoogle}
              className="btn btn-outline-primary"
            >
              Iniciar con Google
            </button>
          </div>
        </form>
        <Link to={"/register"}>
          <p className={style.linkRegister}>
            ¿No tienes una cuenta? Registrarme
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
