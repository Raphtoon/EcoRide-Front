import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Header";

const Profil = () => {
  const [profil, setProfil] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getRide = async (e) => {
    try {
      const res = await axios.get(
        `https://localhost:7019/api/utilisateurs/${id}`
      );
      setProfil(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log("erreur", error);
    }
  };
  useEffect(() => {
    getRide();
  }, []);

  const com = profil?.commentaires?.map((item) => {
    return (
      <Fragment key={item.id}>
        <p>{item.description}</p>
      </Fragment>
    );
  });
  return (
    <Fragment>
      <Header />
      <div className="sizePage">
        <div className="containerBaseUnderHeader">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Fragment>
              <h2>Profil de {profil.user.prenom}</h2>
              <p>Prénom : {profil.user.prenom}</p>
              <p>Age : {profil.user.age}</p>
              <p>Num de téléphone : {profil.user.telephone}</p>
              <p>Email : {profil.user.email}</p>
              <p>Score : {profil.user.score} / 5</p>
              <p>Commentaire récents : {com}</p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Profil;
