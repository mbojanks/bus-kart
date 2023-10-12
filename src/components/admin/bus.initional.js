import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BusApi from "../../api/bus.api";
import "./admin.css";

import "./ListBus.css";

import { useTranslation, Trans } from 'react-i18next';    //prevodjenje
import '../../components/NavBar/links/i18n';
import '../../components/rezervacije/i18n';

const BusInitional = () => {
  const [busevi, setBusevi] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [busToDelete, setBusToDelete] = useState(null);

  useEffect(() => {
    getBus();
  }, []);

  const getBus = async () => {
    const response = await fetch("http://localhost:5000/autobusi");
    const data = await response.json();
    setBusevi(data.autobusi);
  };

  const brisanjeBusa = (idAutobusa) => {
    setBusToDelete(idAutobusa);
    setIsConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (busToDelete !== null) {
      const response = await BusApi().brisanjeBus(busToDelete);
      setTimeout(() => {
        window.location.href = "/bus.initial";
      }, 2000);
    }
    setIsConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setBusToDelete(null);
    setIsConfirmationOpen(false);
  };

  //prevodjenje start
  const lngs = {
      en: { nativeName: 'Engleski' }, 
      de: { nativeName: 'Srpski' }
      };
  const { t, i18n } = useTranslation();
  // prevodjenje end

  return (
    <>

    <header>
        <div className="jezici">
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)} >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
    </header> 

    <div className="stampajLiniju">
      <div class="rowTabela  podesi-sirinu" >    {/* sirina-48  */}
        <ul>
          {" "}
          <div>
            {" "} 
            {busevi.map((bus) => {
              return (
                <li key={bus.idAutobusa}>  
                   <div className="jedan-red-prikaz">             
                   <div class="column centar"> 
                   <Trans i18nKey="description.part170">Oznaka  </Trans>
                   </div>
                   <div className="column podaci centar sirina-info-4" > {bus.oznakaBusa}</div>  {/*  style={{width: "4rem"}}  */}
                   <div className="column centar" style={{textAlign: "center"}}> 
                   <Trans i18nKey="description.part171">Tablice </Trans>
                   </div>
                   <div className="column podaci centar"> {bus.tablice} </div>
                   <div className="column centar"> 
                   <Trans i18nKey="description.part36">Broj mesta </Trans>
                   {" "} </div>
                   <div className="column podaci centar"> {bus.brojSedista} </div>
                   <div className="column"> <Link to={`${bus.idAutobusa}/bus.change.line`}>
                      <button className="buttonSwitch">
                      <Trans i18nKey="description.part145">Izmeni </Trans>
                      </button>  {/* dugme  */}
                    </Link></div>
                   <div className="column"> <button onClick={() => brisanjeBusa(bus.idAutobusa)} className="buttonSwitch ">  {/* dugme  */}
                   <Trans i18nKey="description.part134">Obriši  </Trans>
                    </button></div>
                   </div>
                </li> 
              );
      })} 
          </div>
        </ul>
      </div>
      </div>
      <div className="red-1"></div>
      <div>
      <Link to={"/bus.add"}>
        <button className="buttonSwitch">
        <Trans i18nKey="description.part127">Dodajte autobus  </Trans>
        </button>  {/* dugme veceDugme */}
      </Link>
      </div>

      <div className="confirm-dialog-container red-1">
        {isConfirmationOpen && (
          <div className="confirm-dialog-overlay">
          <div className="confirm-dialog-box">
            <div className="red-05" >
            <Trans i18nKey="description.part172">Da li ste sigurni da želite da obrišete ovu stavku?  </Trans>
            </div>
            <button className="confirm-dialog-yes" onClick={confirmDelete}>
            <Trans i18nKey="description.part153"> Da </Trans>
            </button>
            <button className="confirm-dialog-no" onClick={cancelDelete}>
            <Trans i18nKey="description.part154"> Ne  </Trans>
            </button>
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BusInitional;