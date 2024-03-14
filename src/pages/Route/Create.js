import React, { Fragment, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router";
const Create = () => {
  const navigate = useNavigate();
  const [trajet, setTrajet] = useState({
    utilisateurId: 4,
    villeDepart: "Marseille",
    villeArrivee: "Lille",
    prix: 90,
    nombrePlace: 1,
    heureDepart: "2024-03-06T14:13:59.735Z",
    heureArrivee: "2024-03-06T14:55:59.735Z",
    reservations: [],
  });
  const loginUser = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`https://localhost:7019/api/trajets`, trajet);
      navigate("/trajets");
    } catch (error) {
      console.log("erreur lors de la création du trajet", error);
      e.preventDefault();
    }
  };
  const whenChanged = (e) => {
    setTrajet({
      ...trajet,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <Fragment>
      <Header />
      <div className="sizePage">
        <div className="containerBaseUnderHeader">
          <form onSubmit={loginUser}>
            <div className="form-group">
              <input
                type="text"
                id="villeDepart"
                name="villeDepart"
                placeholder="Ville de départ"
                onChange={whenChanged}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="villeArrivee"
                name="villeArrivee"
                placeholder="Ville d'arrivée"
                onChange={whenChanged}
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                id="prix"
                name="prix"
                placeholder="Prix"
                onChange={whenChanged}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="nombrePlace"
                name="nombrePlace"
                placeholder="Nombre de places"
                onChange={whenChanged}
              />
            </div>
            <div className="form-group">
              <label htmlFor="heureDepart">Heure de départ :</label>
              <input
                type="datetime-local"
                id="heureDepart"
                name="heureDepart"
                onChange={whenChanged}
              />
            </div>
            <div className="form-group">
              <label htmlFor="heureArrivee">Heure d'arrivée :</label>
              <input
                type="datetime-local"
                id="heureArrivee"
                name="heureArrivee"
                onChange={whenChanged}
              />
            </div>
            <button type="submit">Créer le trajet</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
