import {
  auth,
  createUserDocument,
  provider,
  getUsersId,
} from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  SET_USER,
  LOGIN_GOOGLE,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAIL,
  GET_PELUQUERIAS,
  POST_PELUQUERIA,
GET_USERMONGO 
} from "../types/types";
import Swal from "sweetalert2";


//REGISTER
export function register() {
  return {
    type: REGISTER,
  };
}

export function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
}

export function registerFail(error) {
  Swal.fire("Ups!", "Lo sentimos, no pudimos registrarte. Por favor revisa si ya estas registrado con este email", "error");
  return {
    type: REGISTER_FAIL,
    payload: error,
  };
}

export function registerInitiate(name, email, password) {
  return async function (dispatch) {
    dispatch(register());
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(registerSuccess(user));
      //   dispatch(postClient(name, email, password));
      console.log(user);
      await createUserDocument(user, name);
    } catch (error) {
      dispatch(registerFail(error));
      console.log(error.message);
    }
  };
}

//LOGOUT
export function logout() {
  return {
    type: LOGOUT,
  };
}
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function logoutFail(error) {
  return {
    type: LOGOUT_FAIL,
    payload: error,
  };
}
export function logoutInitiate() {
  return async function (dispatch) {
    dispatch(logout());
    try {
      const user = await signOut(auth);
      dispatch(logoutSuccess());
      console.log(user);
    } catch (error) {
      dispatch(logoutFail(error));
      console.log(error.message);
    }
  };
}

// USER
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}


export function getUserMongo(username){
    return function(dispatch){
        axios.get(`http://localhost:4000/clients/${username}`)
        .then((response) => {
            dispatch({
                type: GET_USERMONGO,
                payload: response.data
            })
        })
        .catch((e) => console.log(e))
    }
}



