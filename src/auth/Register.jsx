import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//   registerInitiate,
//   loginGoogleInitiate,
//   postClient,
// } from "../Redux/actions/user";
import style from "./styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NuevaCuenta = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState("ocultar");
  function mostrarOcultar(flag, e) {
    e.preventDefault();
    setShowPassword(flag);
  }

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    pswdMatch: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const validate = (input) => {
    let errores = {};
    if (!input.username) {
      errores.name = "Required username*";
    }
    if (!input.email) {
      errores.email = "Required email*";
    }
    if (!input.password) {
      errores.password = "Required passwords*";
    }
    if (!input.passwordConfirm) {
      errores.passwordConfirm = "Please confirm password*";
    }
    if (input.password !== input.passwordConfirm) {
      errores.pswdMatch = "Passwords don't match*";
    }
    return errores;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("input: ", input);
    if (
      errors.username ||
      errors.password ||
      errors.passwordConfirm ||
      errors.pswdMatch
    ) {
      alert(
        errors.username ||
          errors.password ||
          errors.passwordConfirm ||
          errors.pswdMatch
      );
    } else {
      try{
        let newUser = {
        username: input.username,
        email: input.email,
        password: input.password,
      };

      console.log("newUser: ", newUser);
      let response = await axios.post("http://localhost:3001/users", newUser);
      console.log("response.data:", response.data);
      console.log("response.status:", response.status);

      if (response.status === 200) {
        alert("Usuario creado con exito! :)");
        setInput({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
      //login
      // navigate("/home");
      } 
      }catch(err){
        alert(
          "Lo sentimos, es  probable que ya exista una cuenta con ese usuario o email"
        );
        setInput({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
      }
    }
  }

  return (
    <div className={style.allLogin}>
      <div className={style.contenedorFormulario}>
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label mt-4">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Tu Nombre"
              value={input.username}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={input.email}
              onChange={handleChange}
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
                  value={input.password}
                  onChange={handleChange}
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
                    value={input.passwordConfirm}
                    onChange={handleChange}
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
                  value={input.password}
                  onChange={handleChange}
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
                    value={input.passwordConfirm}
                    onChange={handleChange}
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
              // onClick={loginGoogle}
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
