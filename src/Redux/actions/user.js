
import axios from "axios";
import {
  REGISTER,
  LOGOUT,
  GET_USER
} from "../types/types";


//LOGOUT
export function logoutAction(valor) {
  return {
    type: LOGOUT,
    payload: valor
  };
}

//REGISTER Y LOGIN
export function postUser(payload) {
  return async function () {
    try {
      await axios.post("http://localhost:3001/user", payload);
    } catch (error) {
      console.log(error);
    }
  };
}
export function getUser(useremail){
    return async function(dispatch){
       try{
        let result = await axios.get(`http://localhost:3001/users?email=${useremail}`);
        console.log(result)
        return dispatch({
          type: GET_USER,
          payload: result.data
        });
       }catch(error){
        console.log(error);
       }
    }
}


// //REGISTER
// export function register(newUser) {
//   postUser(newUser);
//   getUser(newUser.useremail)
// }




