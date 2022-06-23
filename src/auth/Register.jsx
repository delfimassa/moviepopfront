import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerInitiate,
  loginGoogleInitiate,
  postClient,
} from "../Redux/actions/user";
import style from "./styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const NuevaCuenta = () => {
  const [showPassword, setShowPassword] = useState("ocultar");

  function mostrarOcultar(flag, e) {
    e.preventDefault();
    setShowPassword(flag);
  }

  // State para iniciar sesión
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  //extraer de usario

  const { name, username, password, passwordConfirm } = user;
  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginGoogle = () => {
    dispatch(loginGoogleInitiate());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar que no haya campos vacíos
    if (!name || !username || !password || !passwordConfirm) {
      // Swal.fire(
      //   "Ups!",
      //   "Por favor completa todos los campos",
      //   "error"
      // );
    }
    //Contraseñas iguales
    if (password !== passwordConfirm) {
      // Swal.fire(
      //   "Ups!",
      //   "La contraseña no coincide",
      //   "error"
      // );
    }
    //Pasarlo al reducer
    dispatch(postClient(user));
    dispatch(registerInitiate(name, username, password));
    setUser({ name: "", username: "", password: "", passwordConfirm: "" });
  };
  return (
    <div className={style.allLogin}>
      <div className={style.contenedorFormulario}>
        <h1>Registrarse</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label mt-4">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu Nombre"
              value={name}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label mt-4">
              Email
            </label>
            <input
              type="email"
              id="username"
              name="username"
              placeholder="Tu email"
              value={username}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label mt-4">
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
                  placeholder="Tu contraseña"
                />
                <div className="form-group">
                  <label htmlFor="passwordConfirm" className="form-label mt-4">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="text"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Repite tu contraseña"
                    value={passwordConfirm}
                    onChange={onChange}
                    required
                    className="form-control"
                  />
                </div>

                <button
                  className={`btn m-0 px-1 ${style.botonMostrarPass}`}
                  onClick={(e) => {
                    mostrarOcultar("ocultar", e);
                  }}
                >
                  {" "}
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faEyeSlash} className="mx-1" />
                    Ocultar contraseña
                  </small>
                </button>
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
                  placeholder="**********"
                />

                <div className="form-group">
                  <label htmlFor="passwordConfirm" className="form-label mt-4">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="**********"
                    value={passwordConfirm}
                    onChange={onChange}
                    required
                    className="form-control"
                  />
                </div>
                <button
                  className={`btn m-0 px-1 ${style.botonMostrarPass}`}
                  onClick={(e) => {
                    mostrarOcultar("mostrar", e);
                  }}
                >
                  <small className=" text-muted">
                    <FontAwesomeIcon icon={faEye} className="mx-1" />
                    Mostrar contraseña
                  </small>
                </button>
              </div>
            )}
          </div>

          <div className={style.contenedorBotones}>
            <button type="submit" className="btn btn-outline-primary">
              Registrar Cuenta
            </button>

            <button
              type="submit"
              value="Iniciar Sesión con Google"
              onClick={loginGoogle}
              className="btn btn-outline-primary"
            >
              {" "}
              Iniciar con Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaCuenta;
