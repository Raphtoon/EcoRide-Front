import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../../components/Header";
import axios from "axios";

const Detail = () => {
  const [trajet, setTrajet] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const getRide = async (e) => {
    try {
      const res = await axios.get(`https://localhost:7019/api/Trajets/${id}`);
      setTrajet(res.data);
      setLoading(false);
    } catch (error) {
      console.log("erreur", error);
    }
  };
  useEffect(() => {
    getRide();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="sizePage">
        <div className="containerBaseUnderHeader">
          {loading ? null : (
            <Fragment>
              <p> Trajet posté par : {trajet?.utilisateur.prenom}</p>
              <p> temps de trajets : {trajet.tempsTrajet} minutes</p>
              <p> Note de l'utilisateur : {trajet?.utilisateur.score} / 5 </p>
              <p onClick={() => navigate(`/profil/${trajet.utilisateurId}`)}>
                profil de {trajet?.utilisateur.prenom}
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Detail;
