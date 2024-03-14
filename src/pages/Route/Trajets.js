import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button, Card, Space } from "antd";

const Trajets = () => {
  const navigate = useNavigate();
  const [allTrajet, setallTrajet] = useState([]);
  const [trajet, setTrajet] = useState({
    utilisateurId: 1,
    villeDeDepart: "",
    villeArrive: "",
    prix: "",
    places: "",
    heureDepart: "",
    heureArrive: "",
    Reservation: [],
  });
  useEffect(() => {
    getAllRide();
  }, []);
  const whenChanged = (e) => {
    setTrajet({
      ...trajet,
      [e.target.id]: e.target.value,
    });
  };
  const getAllRide = async (e) => {
    try {
      const res = await axios.get(`https://localhost:7019/api/Trajets`);
      setallTrajet(res.data);
    } catch (error) {
      console.log("erreur", error);
    }
  };

  const trajets = allTrajet.map((item) => {
    return (
      <Fragment key={item.id}>
        <Space direction="horizontal" size={16}>
          <Card
            title={`${item.villeDepart} - ${item.villeArrivee}`}
            extra={<a href={`detail/${item.id}`}>Détails du trajet</a>}
            style={{
              width: 300,
            }}
          >
            <p> Départ : {item.villeDepart} </p>
            <p> arrivé : {item.villeArrivee} </p>
            <p> Prix : {item.prix}€/ personne</p>
            <p> Nombres de places : {item.nombrePlace} </p>
            {item.nombrePlace > 0 ? (
              <Button onClick={() => navigate(`/reservation/${item.id}`)}>
                Reserver !
              </Button>
            ) : (
              <p>Complet</p>
            )}
          </Card>
        </Space>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Header />
      <div className="sizePage">
        <div className="containerItemRide">
          <h1>Reserver un trajet</h1>
        </div>
        <div className="displayTrajets">{trajets}</div>
      </div>
    </Fragment>
  );
};

export default Trajets;
