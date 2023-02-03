import './App.css';
import LoginComponent from './components/login/login.component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/navbar';
import Pocetna from './components/NavBar/links/Pocetna';
import Rezervacija from './components/rezervacija/Rezervacija';
import UpisiRedVoznje from './components/prevoznik/UpisiRedVoznje';

import Informacije from './components/NavBar/links/Informacije';
import RezervacijaKarte from './components/NavBar/links/RezervacijaKarte';
import Kontakt from './components/NavBar/links/Kontakt';
import Footer from './components/NavBar/Footer/footer';
import RegistrationComponent from './components/registration/registration.component';



function App() {

  
  return (
  
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
           
            <Switch>
              
              <Route path ="/pocetna">
                  <Pocetna />
                  
              </Route>
              <Route path="/informacije">
                <Informacije />
              </Route>
              <Route path="/login.component">
                <LoginComponent />
              </Route>
              <Route path="/rezervacijakarte">
                <RezervacijaKarte />
              </Route>
              <Route path="/kontakt">
                <Kontakt />
              </Route>
            </Switch>
            
            <Route path="/registration.component">
              <RegistrationComponent />
            </Route>
          </div>
        
          <Footer />
          
        </div>

        </Router>
        
       
  
  );
}

export default App;
