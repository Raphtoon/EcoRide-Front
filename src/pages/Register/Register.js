import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header";
import FormBase from "../../components/FormBase";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
const Register = () => {
  const actualUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    prenom: "",
    nom: "",
    age: 0,
    photoProfil: "",
    telephone: "",
    email: "",
    password: "",
    vehicule: "",
    score: 0,
    reservations: [],
  });
  const [errors, setErrors] = useState({
    prenom: "",
    nom: "",
    age: "",
    photoProfil: "",
    telephone: "",
    password: "",
    passwordConfirm: "",
    email: "",
    vehicule: "",
    score: 0,
    reservations: [],
  });

  const validateForm = () => {
    const newErrors = {};

    // Validation du prénom
    if (user.prenom === "") {
      newErrors.prenom = "Le prénom est obligatoire";
    } else if (user.prenom.length > 50) {
      newErrors.prenom = "Le prénom ne doit pas dépasser 50 caractères";
    }

    if (user.nom === "") {
      newErrors.nom = "Le nom est obligatoire";
    } else if (user.nom.length > 50) {
      newErrors.nom = "Le nom ne doit pas dépasser 50 caractères";
    }

    if (user.age <= 0) {
      newErrors.age = "L'âge doit être supérieur à zéro";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (actualUser) {
      navigate("/");
    }
  }, []);

  const whenChanged = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  console.log(user);
  const registerUser = async (e) => {
    if (validateForm()) {
      try {
        e.preventDefault();
        const res = await axios.post(
          `https://localhost:7019/api/utilisateurs`,
          user
        );
        navigate("/");
      } catch (error) {
        e.preventDefault();
      }
    }
    e.preventDefault();
  };
  return (
    <Fragment>
      <Header isHome={false} isProtected={false} />
      <div className="formContainer">
        <div className="formStyle">
          <h1 className="title">S'enregister</h1>
          <form onSubmit={registerUser}>
            <FormBase
              isRegister={true}
              whenChanged={whenChanged}
              errors={errors}
            />
            <button type="submit">S'enregister</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
