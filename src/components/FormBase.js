import React, { Fragment } from "react";

const FormBase = ({ isRegister = false, whenChanged, errors }) => {
  return (
    <Fragment>
      <div className="form-group">
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Adresse e-mail"
          onChange={whenChanged}
        />
      </div>
      {errors.email && <span className="error">{errors.email}</span>}
      <div className="form-group">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          onChange={whenChanged}
        />
      </div>
      {errors.password && <span className="error">{errors.password}</span>}

      {isRegister ? (
        <Fragment>
          <div className="form-group">
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Mot de passe"
              onChange={whenChanged}
            />
          </div>
          {errors.passwordConfirm && (
            <span className="error">{errors.passwordConfirm}</span>
          )}
          <div className="form-group">
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prénom"
              onChange={whenChanged}
            />
          </div>
          {errors.prenom && <span className="error">{errors.prenom}</span>}
          <div className="form-group">
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom de famille"
              onChange={whenChanged}
            />
          </div>
          {errors.nom && <span className="error">{errors.nom}</span>}
          <div className="form-group">
            <input
              type="text"
              id="telephone"
              name="telephone"
              placeholder="Numéro de téléphone"
              onChange={whenChanged}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Entrez votre age"
              onChange={whenChanged}
            />
          </div>
          {errors.age && <span className="error">{errors.age}</span>}
          <div className="form-group">
            <input
              type="text"
              id="photoProfil"
              name="photoProfil"
              placeholder="URL de votre avatar"
              onChange={whenChanged}
            />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default FormBase;
