import "./sass/App.scss";
import { Fragment } from "react";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  const actualUser = useSelector((state) => state.auth.user);
  return (
    <Fragment>
      <Header devMode={true} />
      <div className="sizePage">
        <div className="containerItemHome">
          <div className="desc">
            <div className="topText">
              {actualUser ? <h2>bonjour {actualUser?.user.prenom}</h2> : null}
              <h2>
                EcoRide L'app qui vous fait économiser tout en rencontrant
                d'autres usagers
              </h2>
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </Fragment>
  );
}

export default App;
