import React from "react";
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
import { logoutInitiate } from "../../Redux/actions/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const currentUser = useSelector((state) => state.user);
  const currentUser = true;

  const logout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
      navigate("/");
    } else {
      alert("No estas logueado");
    }
    console.log(currentUser);
  };

  return (
    <div>
      <Navbar>
        <Container className="py-1 justify-content-end">
          <Nav>
            <NavLink exact to="/" className="nav-link"  activeClassName="selected">
              <FontAwesomeIcon
                className="mx-2 headericons"
                icon={faHouseChimney}
                color="#C48900"
              />
            </NavLink>
            <NavLink to="/home" className="nav-link"  activeClassName="selected">
              <FontAwesomeIcon
                className="headericons"
                icon={faSearch}
                color="#C48900"
              />
            </NavLink>
            {currentUser?(<ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      to={`/favoritos`}
                      className="nav-link"
                      activeClassName="selected"
                    >
                      <FontAwesomeIcon icon={faStar} className="headericons" color="#C48900"/>
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
                  <NavLink exact to="/login" className="nav-link"  activeClassName="selected">
                  <FontAwesomeIcon
                    className="mx-2 headericons"
                    icon={faUser}
                    color="#C48900"
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
