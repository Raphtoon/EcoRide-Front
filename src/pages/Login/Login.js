import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header";
import FormBase from "../../components/FormBase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const actualUser = useSelector((state) => state.auth.user);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (actualUser) {
      navigate("/");
    }
  }, []);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const validateForm = () => {
    let newErrors = {};
    if (login.email.toLowerCase === "admin") {
      newErrors.username = "Le nom d'utilisateur 'admin' n'est pas autorisé";
    }
    if (login.email.username === "") {
      newErrors.username = "Le nom d'utilisateur est obligatoire";
    }
    if (login.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères 1 majuscule 1 chiffre et 1 caractère spécial";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const loginUser = async (e) => {
    if (validateForm()) {
      dispatch(loginStart());
      try {
        e.preventDefault();
        const res = await axios.post(
          `https://localhost:7019/api/Authentication/login-user`,
          login
        );
        dispatch(loginSuccess(res.data));
        navigate("/");
      } catch (error) {
        e.preventDefault();
        dispatch(loginFailure("Identifiants incorrect"));
      }
    }
    e.preventDefault();
  };

  const whenChanged = (e) => {
    setLogin({
      ...login,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Header isHome={false} isProtected={false} />
      <div className="formContainer">
        <div className="formStyle">
          <h1 className="title">Se connecter</h1>
          <form onSubmit={loginUser}>
            <FormBase
              isRegister={false}
              whenChanged={whenChanged}
              errors={errors}
            />
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
