import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Button } from "antd";

const Reservation = () => {
  const actualUser = useSelector((state) => state.auth.user);
  const [trajet, setTrajet] = useState({});
  const [resar, setresar] = useState({});
  const [loading, setLoading] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [resa, setResa] = useState({
    trajetId: id,
    utilisateurId: actualUser?.user.id,
  });

  const getResa = async () => {
    try {
      const res = await axios.get(`https://localhost:7019/api/reservations/1`);
      setresar(res.data);
      setLoading(false);
      console.log(resar);
    } catch (error) {
      console.log("erreur", error);
    }
  };
  const getRide = async (e) => {
    try {
      const res = await axios.get(`https://localhost:7019/api/trajets/${id}`);
      setTrajet(res.data);
      setLoading(false);
    } catch (error) {
      console.log("erreur", error);
    }
  };
  const postRide = async (e) => {
    try {
      await axios.post(`https://localhost:7019/api/reservations`, resa);
      navigate("/");
    } catch (error) {
      console.log("erreur", error);
    }
  };
  useEffect(() => {
    getRide();
    getResa();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="sizePage">
        <div className="containerBaseUnderHeader">
          <div>Récap de la réservation</div>
          {loading ? (
            <iframe src="https://giphy.com/embed/5hhLy44Eepsac" alt="" />
          ) : (
            <Fragment>
              <p>Vous voyagerez avec {trajet.utilisateur.prenom}</p>
              <p>
                Trajet : {trajet.villeDepart} - {trajet.villeArrivee}
              </p>
              <p>prix : {trajet.prix}€</p>
              <Button onClick={() => postRide()}>
                Confirmer la réservation
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Reservation;
