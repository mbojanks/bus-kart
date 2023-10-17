import { useState, useEffect } from "react";
import "./sedista.css";

import { useTranslation, Trans } from "react-i18next"; //prevodjenje
import "../../NavBar/links/i18n";
import "../i18n";

function Autobus({
  autobusData,
  linijaId,
  pocetnaStanicaId,
  krajnjaStanicaId,
}) {
  const [sediste, setSediste] = useState([]);
  const [trenutnaRezervacija, setTrenutnaRezervacija] = useState([]);
  const [odabraniAutobus, setOdabraniAutobus] = useState(null);
  const [rezervacija, setRezervacija] = useState([]);
  const [pocetnaStanicaIdS, setPocetnaStanicaIdS] = useState();

  const getLinije = async () => {
    console.log(linijaId);
    const response = await fetch(
      `http://localhost:5000/rezervacije/linija/${linijaId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          pocetnaStanicaId,
          krajnjaStanicaId,
        }),
      }
    );
    const data = await response.json();
    setRezervacija(data.rezervacije);
  };

  useEffect(() => {
    if (autobusData) {
      // Postavljamo sediste kada se dobiju podaci o autobusu
      const brojSedista = autobusData.brojSedista;
      setSediste(Array(brojSedista).fill(false));
      setTrenutnaRezervacija([]);
      setOdabraniAutobus(autobusData.oznakaBusa);
    }
    if (pocetnaStanicaId != undefined) {
      getLinije();
      setPocetnaStanicaIdS(pocetnaStanicaId);
    }
  }, [autobusData]);

  function handleClick(index) {
    const noviNiz = [...sediste];
    noviNiz[index] = !noviNiz[index];

    if (noviNiz[index]) {
      setTrenutnaRezervacija([...trenutnaRezervacija, index + 1]);
    } else {
      setTrenutnaRezervacija(
        trenutnaRezervacija.filter((s) => s !== index + 1)
      );
    }

    setSediste(noviNiz);
  }

  function handlePotvrdi() {
    console.log("Izabrana sedišta:", trenutnaRezervacija);
    // Ovde dodajte svoju logiku za potvrdu ili slanje podataka
  }

  const isSeatReserved = (seatNumber) => {
    // Proverite da li rezervacija niz ima podatke
    return (
      rezervacija &&
      rezervacija.length > 0 &&
      rezervacija.some((r) => r.oznakaSedista == seatNumber)
    );
  };

  console.log(rezervacija);
  return (
    <div>
      <div className="autobus-stujardesa">
        {sediste.map((rezervisano, index) => (
          <div
            key={index}
            className={`sediste ${
              isSeatReserved(index) ? "rezervisano" : "unreserved"
            }`}
            onClick={() => handleClick(index)}
          >
            {isSeatReserved(index) ? (
              <p>
                osvezenje:{" "}
                {rezervacija.find((rez) => rez.oznakaSedista === index)
                  ?.osvezenje || "Bez osvezenja"}
              </p>
            ) : null}

            {index + 1}
          </div>
        ))}
        <div className="labela-stanica">
          <Trans i18nKey="description.part195">
            {" "}
            Trenutno rezervisano mesto broj:{" "}
          </Trans>{" "}
          &ensp;
          {trenutnaRezervacija.length > 0
            ? trenutnaRezervacija.join(", ")
            : "Nijedno"}
        </div>
        &emsp;&ensp;&emsp;&ensp;
        <button
          onClick={handlePotvrdi}
          disabled={trenutnaRezervacija.length === 0}
          className="buttonSwitch"
        >
          <Trans i18nKey="description.part121"> Potvrdite    </Trans>   {/* Potvrdi izbor   */}
        </button>
      </div>
    </div>
  );
}

export default Autobus;
