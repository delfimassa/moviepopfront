import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../Redux/actions/user";
import style from "./styles/Login.module.css";
// import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      console.log("currentUser en useEffect del Login:", currentUser)
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
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });


   function handleChange(e){
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
    if (!input.email) {
      errores.email = "Required email*";
    }
    if (!input.password) {
      errores.password = "Required passwords*";
    }
    return errores;
  };


  async function handleSubmit(e){
    e.preventDefault();
    console.log("input: ", input);
    if (
      errors.email ||
      errors.password 
    ) {
      alert(
        errors.username ||
          errors.password 
      );
    } else {
      try{
        let userLogging = {
          email: input.email,
          password: input.password,
        };
  
        console.log("userLogging: ", userLogging);
        let postResponse = await axios.post(`http://localhost:3001/user`, userLogging);
        console.log("postResponse.data:", postResponse.data);
        console.log("postResponse.status:", postResponse.status);
  
        if (postResponse.status === 200) {
          alert("Usuario logueado con exito! :)");
          setInput({
          email: "",
          password: ""
        });
        dispatch(getUser(userLogging.email));
        navigate("/home");
        // console.log("currentUser desde handleSubmit Login:", currentUser)
        } 
      }catch(err){alert(
        "Lo sentimos, por favor asegurate de probar con un email registrado y contraseña correctos"
      );
      setInput({
      email: "",
      password: ""
    });}

  }}


  return (
    <div className={style.allLogin}>
      <div className={style.contenedorFormulario}>
        <div>
          <h1>Hola de nuevo!</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
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
                  value={input.password}
                  onChange={handleChange}
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
                  value={input.password}
                  onChange={handleChange}
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
            {/* <button
              type="submit"
              value="Iniciar Sesión con Google"
              onClick={loginGoogle}
              className="btn btn-outline-primary"
            >
              Iniciar con Google
            </button> */}
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
