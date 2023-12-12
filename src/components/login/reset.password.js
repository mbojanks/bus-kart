import React, { useState, useEffect, useRef } from "react";
import "./reset.css";
import "./loginStyle.css"; //preuzimam stil iz login.component.js
import bus from "../images/bus.jpg";

import "../admin/admin.css";
import { useTranslation, Trans } from "react-i18next"; //prevodjenje
import "../NavBar/links/i18n";
import "../../components/NavBar/links/i18n";
import apiUrl from "../../apiConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const form = useRef();
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
  };

  const getResetPassword = async () => {
    const response = await fetch(`${apiUrl}/korisnik/zaboravljena-sifra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (response.ok) {
      if (response.status == 200) {
        toast.success(data.message, { onClose: () => window.location.href = "/pocetna" });
      }
    } else {
      if (response.status == 404) {
        toast.error(data.message);
      }
    }
  };

  //prevodjenje start
  const lngs = {
    en: { nativeName: "Engleski" },
    de: { nativeName: "Srpski" },
  };
  const { t, i18n } = useTranslation();
  // prevodjenje end

  return (
    <div style={{ backgroundColor: "#e1e3eb" }}>
      {/*  header je deo za prevodjenje*/}
      <header>
        <div style={{ textAlign: "right", marginRight: "3rem" }}>
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
      <form ref={form} onSubmit={submit}>
        <div className="main" style={{ paddingTop: "0.625rem" }}>
          <div className="sub-main">
            {" "}
            {/*  bilo je sub-main1 i daje plavu pozadinu    */}
            <div>
              <div className="imgs">
                <div className="container-image1">
                  <img src={bus} alt="bus" className="bus" />
                </div>
              </div>
              <br />
              <p className="naslov">
                <Trans i18nKey="description.part120">Promeni lozinku</Trans>
              </p>{" "}
              <br />
              <br />
              <div>
                {" "}
                <br />
                {/* bilo je  className="input1 name1"  zatim je bilo "input name1"  */}
                <input
                  type="email"
                  placeholder="Email"
                  className="input-new name1"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>{" "}
              <br />
              <br />
              <div className="login-button">
                <button className="button" onClick={getResetPassword}>
                  <Trans i18nKey="description.part121">Potvrdi</Trans>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*  </div>     */}
      </form>
    </div>
  );
};

export default ResetPassword;
