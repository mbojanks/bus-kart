import "./App.css";
import LoginComponent from "./components/login/login.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar/navbar";
import Pocetna from "./components/NavBar/links/Pocetna";
/* import Rezervacija from './components/rezervacija/Rezervacija';
import UpisiRedVoznje from './components/prevoznik/UpisiRedVoznje'; */

import RezervacijaKarte from "./components/NavBar/links/RezervacijaKarte";
import Kontakt from "./components/NavBar/links/Kontakt";
import Footer from "./components/NavBar/Footer/footer";
import RegistrationComponent from "./components/registration/registration.component";
import ResetPassword from "./components/login/reset.password";
import AdminChangeLine from "./components/admin/admin.change.line";
import AdminComponent from "./components/admin/admin.component";
import AdminInitial from "./components/admin/admin.initial";
import BusInitional from "./components/admin/bus.initional";
import BusAdd from "./components/admin/bus.add";
import BusChangeLine from "./components/admin/bus.change.line";
import AdminPanel from "./components/admin/admin.panel";
import KorisniciInitial from "./components/admin/korisniciInitial";
import KorisnikChange from "./components/admin/korisnikChange";
import Korisnik from "./components/NavBar/links/korisnik/korisnik";
import Karta from "./components/NavBar/links/korisnik/karta";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Switch>
            <Route path="/adminpanel">
              <AdminPanel />
            </Route>
            <Route path="/pocetna">
              <Pocetna />
            </Route>
            <Route path="/login.component">
              <LoginComponent />
            </Route>
            <Route path="/rezervacijakarte">
              <RezervacijaKarte />
            </Route>
            <Route path="/:id/rezervacijakarte">
              <RezervacijaKarte />
            </Route>
            <Route path="/rezervacijakarte">
              <RezervacijaKarte />
            </Route>
            <Route path="/kontakt">
              <Kontakt />
            </Route>
            <Route path="/korisnik">
              <Korisnik />
            </Route>
            <Route path="/karta">
              <Karta />
            </Route>
          </Switch>

          <Route path="/registration.component">
            <RegistrationComponent />
          </Route>
          <Route path="/reset.password">
            <ResetPassword />
          </Route>
          <Route path="/:id/admin.change.line">
            <AdminChangeLine />
          </Route>
          <Route path="/admin.component">
            <AdminComponent />
          </Route>
          <Route path="/admin.initial">
            <AdminInitial />
          </Route>
          <Route path="/bus.initial">
            <BusInitional />
          </Route>
          <Route path="/bus.add">
            <BusAdd />
          </Route>
          <Route path="/:idAutobusa/bus.change.line">
            <BusChangeLine />
          </Route>
          <Route path="/korisniciInitial">
            <KorisniciInitial />
          </Route>
          <Route path="/:idKorisnik/korisnikChange">
            <KorisnikChange />
          </Route>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
