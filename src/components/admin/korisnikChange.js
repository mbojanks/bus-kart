import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KorisnikApi from "../../api/korisnikApi";
import KorisnikLogic from "./korisnikLogic";

import "./ListBus.css";

import { useTranslation, Trans } from 'react-i18next';    //prevodjenje
import '../../components/NavBar/links/i18n';
import '../../components/rezervacije/i18n';
import { ToastContainer } from "react-toastify";


const KorisnikChange = () => {
  const [korisnik, setKorisnik] = useState({});
  const { idKorisnik } = useParams();
  const [privremenaRola, setPrivremenaRola] = useState(false);

  useEffect(() => {
    getKorisnik();
  }, []);

  const korisnikLogic = KorisnikLogic();

  
  
  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      idKorisnik: idKorisnik,
      korisnickoIme: formData.get("korisnickoIme"),
      ime: formData.get("ime"),
      prezime: formData.get("prezime"),
      brojTelefona: formData.get("brojTelefona"),
      email: formData.get("email"),
      role: formData.get("role"), //mesto formdata stavljam userpars.rola
      vremeTrajanjaRole: formData.get("vremeTrajanjaRole"),
      privremenaRola,
    };
    korisnikLogic.editKorisnik(data);
  };

  const handleChange = () => {
    setPrivremenaRola((prev) => !prev);
  };

  const getKorisnik = async () => {
    const response = await KorisnikApi().filterKorisnikId(idKorisnik);
    const data = await response.data;

    setKorisnik(data.korisnik);
  };

  //prevodjenje start
  const lngs = {
      en: { nativeName: 'En' }, 
      sr: { nativeName: 'Sr' }
      };
  const { t, i18n } = useTranslation();
  // prevodjenje end

  return (
    <div>
      <header>
          <div className="jezici">
          {Object.keys(lngs).map((lng) => (
            <button key={lng} 
            className="jezici-dugme-promena"
            style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} 
            type="submit" onClick={() => i18n.changeLanguage(lng)} >
              {lngs[lng].nativeName}
            </button>
          ))}
          </div>
      </header> 

      <div className="red-1"></div>

    <form onSubmit={submitHandler}>
      <div className="stampajLiniju">
      <div className="rowTabela korisniciTabelaPromena">
      <div className="column-1 centar-1">
        <label ><Trans i18nKey="description.part44"> Korisničko ime </Trans>
        </label></div>
        <div className="column-1 centar-1 podaci"><input
          defaultValue={korisnik.korisnickoIme}
          type="text"
          required
          name="korisnickoIme"
          className="sirina-info-6"
          onChange={korisnikLogic.changeHandler}
        ></input></div>
        <div className="column-1 centar-1 ">
          <label><Trans i18nKey="description.part40">Ime</Trans></label>
        </div>
        <div className="column-1 centar-1 podaci">
		    <input
          defaultValue={korisnik.ime}
          type="text"
          required
          name="ime"
          
          className="inputVelicina sirina-info-6"
          onChange={korisnikLogic.changeHandler}>
		    </input></div>
        <div className="column-1 centar-1">
          <label><Trans i18nKey="description.part42">Prezime</Trans></label>
        </div>
        <div className="column-1 centar-1 podaci">
          <input
          defaultValue={korisnik.prezime}
          type="text"
          required
          name="prezime"
          className="sirina-info-6"
          onChange={korisnikLogic.changeHandler}>
          </input></div>
        <div className="column-1 centar-1">
          <label><Trans i18nKey="description.part48">Broj telefona</Trans></label>
        </div>
        <div className="column-1 centar-1 podaci">
          <input
          defaultValue={korisnik.brojTelefona}
          type="text"
          required
          name="brojTelefona"
          className="sirina-info-6"
          onChange={korisnikLogic.changeHandler}>
          </input></div>
        <div className="column-1 centar-1"><label>Email</label></div>
        <div className="column-1 centar-1 podaci">
          <input
          defaultValue={korisnik.email}
          type="text"
          required
          name="email"
          className="sirina-info-10"
          onChange={korisnikLogic.changeHandler}>
          </input></div>
        <div className="column-1 centar-1 "><label>
        <Trans i18nKey="description.part157">Privremena rola </Trans>
        </label></div>
        <div className="column-1 centar-1 podaci">
        <input type="checkbox" onChange={handleChange} value={privremenaRola} />
        {privremenaRola && (
          <>
            &ensp;  <label>
            <Trans i18nKey="description.part158">Vreme trajanja role  </Trans>
            </label> &ensp;
            <input
              type="number"
              name="vremeTrajanjaRole"
              onChange={korisnikLogic.changeHandler}
            />
          </>
        )}
        </div>
        <div className="column-1 centar-1 "><label>Role</label></div>
        <div className="column-1 centar-1 podaci">
        <select
          defaultValue={korisnik.role}
          type="text"
          required
          name="role"
          onChange={korisnikLogic.changeHandler}
        >
          <option value="korisnik"><Trans i18nKey="description.part159">Korisnik</Trans></option>
          <option value="menadzer"><Trans i18nKey="description.part160">Menadžer</Trans></option>
          <option value="admin">Admin</option>
          <option value="stjuardesa"><Trans i18nKey="description.part161">Stjuardesa</Trans></option>
          <option value="biletar"><Trans i18nKey="description.part162">Biletar</Trans></option>
          <option value="vozac"><Trans i18nKey="description.part163">Vozač</Trans></option>
        </select>
        </div>
        <div className="column-1"><button  type="submit" className="buttonSwitch">   {/* bila je klasa dugme */}
          {" "}
          <Trans i18nKey="description.part129">Sačuvaj  </Trans>
        </button></div>
      </div>
      </div>
    </form>
    <ToastContainer/>
    </div>
  );
};
export default KorisnikChange;
