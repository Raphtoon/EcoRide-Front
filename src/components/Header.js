import React, { Fragment, useEffect } from "react";
import logo from "../images/voiture-familiale.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { loginFailure, loginStart, loginSuccess } from "../slices/authSlice";
import axios from "axios";
import ScrollNav from "../js/ScrollNav";

const Header = (isHome = false, isProtect = true, devMode = true) => {
  const actualUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserInfos = async () => {
    dispatch(loginStart());
    try {
      const res = await axios.get(
        `https://localhost:7019/api/Authentication/persistLogin`
      );
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFailure("Connectez-vous pour accéder à cette page", error));
    }
  };

  const getItem = (label, key, icon, children, type) => ({
    key,
    icon,
    children,
    label,
    type,
  });
  const disconnect = async () => {
    const res = await axios.delete(
      `https://localhost:7019/api/Authentication/disconnect`
    );
    dispatch(logout());
  };
  const itemsConnected = [
    getItem("Menu", "menu", <MenuOutlined />, [
      getItem("Home", "/"),
      getItem("Profil", `/profil/${actualUser?.user?.id}`),
      getItem("Créer un trajet", "/trajets/create"),
      getItem("Trajets", "/trajets"),
      getItem("Se déconnecter", "disconnect"),
    ]),
  ];
  const itemsDisconnected = [
    getItem("Menu", "sub4", <MenuOutlined />, [
      getItem("Home", "/"),
      getItem("Trajets", "/trajets"),
      getItem("Se connecter", "/login"),
      getItem(`S'enregistrer`, "/register"),
    ]),
  ];

  const logout = (e) => {
    if (e.key === "disconnect") {
      disconnect();
    } else {
      navigate(`${e.key}`);
    }
  };
  useEffect(() => {
    if (isProtect) {
      getUserInfos();
    }
  }, []);

  return (
    <Fragment>
      <div className="header_container">
        <ScrollNav />
        <div id="navChange">
          <div className="setHeader">
            <div className="leftHeader">
              <img onClick={() => navigate("/")} src={logo} alt="" />
            </div>
            <Menu
              onClick={logout}
              items={actualUser ? itemsConnected : itemsDisconnected}
            />
            {/* {devMode ? (
              <Fragment>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>register</button>
                <button onClick={() => navigate("/trajets")}>Trajets</button>
              </Fragment>
            ) : // <button onClick={() => navigate("/login")}>Login</button>
            // <button onClick={() => navigate("/login")}>Login</button>
            null} */}
            {/* {actualUser ? (
              <button onClick={() => disconnect()}>Logout</button>
            ) : (
              <p> Btn connected / register</p>
            )} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
