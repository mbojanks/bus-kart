import React, { useEffect, useState } from "react";
import LinijeApi from "../../api/linije.api";
import AdminLogic from "./admin.logic";
import { Link } from "react-router-dom";
import "./admin.css";

import classes from "../registration/registration.module.css";
import "../login/loginStyle.css";

import "../NavBar/links/i18n"; // za prevodjenje
import "../rezervacije/i18n";
import { useTranslation, Trans } from "react-i18next"; //prevodjenje

import { useMediaQuery } from "react-responsive"; // responsive
import MediaQuery from "react-responsive";

const AdminInitial = () => {
  const [filteredLinije, setFilteredLinije] = useState([]);
  const [val1, setVal1] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [val2, setVal2] = useState("");
  const [polasci, setPolasci] = useState([]);
  const [dolasci, setDolasci] = useState([]);
  const [stanice, setStanice] = useState([]);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [lineToDelete, setLineToDelete] = useState(null);

  const getStanice = async () => {
    const response = await fetch("http://localhost:5000/stanica");
    const data = await response.json();

    const a1 = data.stanice.map((item) => {
      return { naziv: item.naziv, id: item.id };
    });
    setStanice(a1);
    setVal1(a1[0].naziv);
    setVal2(a1[1].naziv);
  };

  const filterLinija = async () => {
    if (!valueDate) return;
    const response = await LinijeApi().filterLinija(val1, val2, valueDate);
    const data = await response.json();
    console.log(data.rezultat);
    setFilteredLinije(data.rezultat);
  };

  const getLinije = async () => {
    const response = await fetch("http://localhost:5000/linija");
    const podaci = await response.json();
    const data = podaci.linija;
    console.log(data);
  };

  useEffect(() => {
    getStanice();
  }, [filteredLinije]);

  const adminLogic = AdminLogic();

  const [showClass, setShowClass] = useState(false);

  const changer = () => {
    setShowClass(!showClass);
  };

  const clickButton = async (event) => {
    await filterLinija(); // Dodao await ovde kako bi se prvo filtrirale linije pre nego što se promeni klasa.
    changer();
  };

  const brisanjeLinije = async (id) => {
    setLineToDelete(id);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (lineToDelete !== null) {
      await adminLogic.brisanjeLinije(lineToDelete);
      // Dodajte kod za osvežavanje prikaza linija nakon brisanja ako je brisanje uspešno.
      // Možete koristiti setState za osvežavanje filteredLinije stanja ili bilo koju drugu metodu koja osvežava prikaz.
      const updatedLinije = filteredLinije.filter((linija) => linija.id !== lineToDelete);
      setFilteredLinije(updatedLinije);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setLineToDelete(null);
    setIsDeleteConfirmationOpen(false);
  };

  //prevodjenje
  const lngs = {
    en: { nativeName: "Engleski" },
    de: { nativeName: "Srpski" },
  };
  const { t, i18n } = useTranslation();
  // prevodjenje

  return (
    <div>
      {/*  dodala klasu iz registration komponent*/}
      {/*  header je deo za prevodjenje*/}
      <header>
        <div className="jezici">
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
              type="submit"
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </header>
      <div className="admin-initial-polje">  {/* className={classes.form}  */}
        {/* className={classes.form}   className="home" */}
        <div className="admin-centar">
          {/* className="prvi"  */}
          <label className="admin-labela">
            <Trans i18nKey="description.part3">Mesto polaska:</Trans>
          </label>
          <br />
          <select
            className="position unos" //className="position" bilo je  className="unos"
            value={val1} //
            onChange={(e) => setVal1(e.target.value)} //
          >
            {stanice.map((stanice) => {
              // Za ispis iz baze filtrirano mesto polaska
              return (
                //
                <option key={stanice.id} value={stanice.naziv}>
                  {stanice.naziv}
                </option> //
              );
            })}
          </select>
        </div>
        
        <div className="admin-centar">
          {/* className="prvi"  */}
          <label className="admin-labela">
            <Trans i18nKey="description.part5">Mesto Dolaska:</Trans>
          </label>
          <br />
          <select
            className="position unos" // unos sam dopisala dodatno
            value={val2} //
            onChange={(e) => setVal2(e.target.value)} //
          >
            {stanice.map((stanice) => {
              // Za ispis iz baze filtrirano mesto polaska
              return (
                //
                <option key={stanice.id} value={stanice.naziv}>
                  {stanice.naziv}
                </option> //
              );
            })}
          </select>
        </div>
        <div className="admin-centar">
          <label className="admin-labela">
            <Trans i18nKey="description.part9">Datum polaska</Trans>
          </label>
          <br />
          <input
            type="date"
            className="position unos"
            value={valueDate}
            onChange={(e) => setValueDate(e.target.value)}
          />
        </div>{" "}
        <br />
        <button className={classes.submit} onClick={clickButton}>
        <p className="admin-slovaDugme"><Trans i18nKey="description.part34">Red vožnje</Trans></p>
        </button>
        <Link to="/admin.component"> {/* className="button-admin" */}
          <button className={classes.submit}> 
            <p className="admin-slovaDugme"> <Trans i18nKey="description.part37">Dododavanje linije</Trans></p>
          </button>
        </Link>
      </div>
      {filteredLinije.length > 0 ? (
        <div>
          <ul>  {/* admin-tebela je zamenila home1  */}
            <div className={`admin-tebela .admin-tebela ${showClass ? "show" : ""}`}>
              <style>{`
            .admin-tebela {
              display: none;
            }
            .show {
              display: block;
            }
          `}</style>
              {filteredLinije.map((linija) => {
                console.log(linija);
                return (
                  <li key={linija.id}>
                    <div className="admin-pod-tabela">   {/* bela pozadina */}
                      <div className="column centar"> <Trans i18nKey="description.part11">
                        Vreme polaska{" "} </Trans>{" "}</div>
                      <div className="column centar podaci">{linija.vremePolaska} </div>
                      <div className="column centar"><Trans i18nKey="description.part13">
                        Vreme dolaska</Trans>{" "}</div>
                      <div className="column centar podaci">{linija.vremeDolaska}</div>
                      <div className="column centar"><Trans i18nKey="description.part3">
                        Mesto polaska </Trans>{" "}</div>
                      <div className="column centar podaci">{linija.pocetnaStanica}</div>
                      <div className="column centar"><Trans i18nKey="description.part5">
                        Mesto dolaska </Trans>{" "}</div>
                      <div className="column centar podaci">{linija.krajnjaStanica}</div>
                     {/* &nbsp;&nbsp;   */}
                      
                      <Link
                        to={{
                          //? prosledjivanje id-a linije kroz url
                          pathname: `${linija.id}/admin.change.line`,
                          //? prosledjivanje podataka za rezervaciju
                          state: {
                            id: linija.id,
                            vremePolaska: linija.vremePolaska,
                            pocetnaStanica: linija.pocetnaStanica,
                            krajnjaStanica: linija.krajnjaStanica,
                            vremeDolaska: linija.vremeDolaska,
                            datumPolaska: linija.datumPolaska,
                            datumDolaska: linija.datumDolaska,
                            oznakaBusa: linija.oznakaBusa,
                          },
                        }}
                      >
                      {/*  <button
                          style={{
                            backgroundColor: "lightblue",
                            borderBlockColor: "blue",
                            marginBlock: "0.4rem",
                            borderColor: "blue",
                          }}
                        >
                      */}
                        <div className="column centar">
                        <button className={classes.submit}><p className="admin-dugme-slova">
                          <Trans i18nKey="description.part133">Zameni</Trans></p>
                        </button>
                        </div>
                      </Link>
                      {/*  {" "} &emsp;   */}
                      {/*
                      style={{
                          backgroundColor: "lightblue",
                          borderBlockColor: "blue",
                        }}
                      */}
                      <div className="column centar">
                      <button
                        onClick={() => brisanjeLinije(linija.id)}
                        className={classes.submit}
                      > <p className="admin-dugme-slova">
                        <Trans i18nKey="description.part134">Obriši</Trans></p>
                      </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </ul>
        </div>
      ) : (
        <p>
          <Trans i18nKey="description.part135">Nema Linije...</Trans>
        </p>
      )}
      {isDeleteConfirmationOpen && (            // izbacuje da pita korisnika da li je siguran da zeli da izbrise liniju
        <div className="confirm-dialog-container">
          <div className="confirm-dialog-box">
            <p>
              <Trans i18nKey="description.part136">
                Da li ste sigurni da želite da izbrišete liniju?
              </Trans>
            </p>
            <button
              className="confirm-dialog-yes"
              onClick={() => confirmDelete()}
            >
              <Trans i18nKey="description.part137">Da</Trans>
            </button>
            <button
              className="confirm-dialog-no"
              onClick={() => cancelDelete()}
            >
              <Trans i18nKey="description.part138">Ne</Trans>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInitial;