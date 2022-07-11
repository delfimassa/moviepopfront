import React, { useState, useEffect }  from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faSearch,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { logoutAction } from "../../Redux/actions/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

 

  const logout = () => {
    if (currentUser) {
      dispatch(logoutAction());
      navigate("/");
    } else {
      alert("No estas logueado");
    }
    console.log("currentUser AL FINAL DE LOGOUT() EN NAVBAR", currentUser);
  };

  return (
    <div>
      <Navbar>
        <Container className="py-1 justify-content-end">
          <Nav>
            <NavLink exact to="/" className="nav-link"  >
              <FontAwesomeIcon
                className="mx-2 headericons"
                icon={faHouseChimney}
                color="#FFDD55"
              />
            </NavLink>
            <NavLink to="/home" className="nav-link" >
              <FontAwesomeIcon
                className="headericons"
                icon={faSearch}
                color="#FFDD55"
              />
            </NavLink>
            {currentUser?(<ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      to={`/favoritos`}
                      className="nav-link"
                      
                    >
                      <FontAwesomeIcon icon={faStar} className="headericons" color="#FFDD55"/>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn m-0 amarillo"
                      onClick={(e) => {
                        logout(e);
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>):(
                  <NavLink exact to="/login" className="nav-link"  >
                  <FontAwesomeIcon
                    className="mx-2 headericons"
                    icon={faUser}
                    color="#FFDD55"
                  />
                </NavLink>
                )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
