import express from "express";
import Linija from "../Models/LinijaModels.js";
import Medjustanica from "../Models/MedjustanicaModels.js";
import Stanica from "../Models/StanicaModels.js";
import Rezervacija from "../Models/RezervacijaModels.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const linija = await Linija.findAll({ include: Stanica, Medjustanica });
    res.status(200).json({ message: "uspesno izvucena linija", linija });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Endpoint za kreiranje nove linije
// Kod za kreiranje nove linije
router.post("/", async (req, res) => {
  try {
    const {
      pocetnaStanica,
      medjustanice,
      krajnjaStanica,
      vremePolaska,
      vremeDolaska,
      datumPolaska,
      datumDolaska,
      brojSlobodnihMesta,
    } = req.body;

    // Kreiranje početne stanice
    const pocetna = await Stanica.findOne({
      where: {
        naziv: pocetnaStanica,
      },
    });

    // Kreiranje krajnje stanice
    const krajnja = await Stanica.findOne({
      where: {
        naziv: krajnjaStanica,
      },
    });

    // Kreiranje medjustanica sa vremenima
    const medjustaniceWithTimes = medjustanice.map((stanica) => ({
      naziv: stanica.stanica,
      vremePolaska: stanica.vremePolaskaM,
      vremeDolaska: stanica.vremeDolaskaM,
    }));

    // Kreiranje linije
    const novaLinija = await Linija.create({
      vremePolaska,
      vremeDolaska,
      datumPolaska,
      datumDolaska,
      brojSlobodnihMesta,
    });

    // Povezivanje početne stanice i krajnje stanice s linijom
    novaLinija.setPocetnaStanica(pocetna);
    novaLinija.setKrajnjaStanica(krajnja);

    // Povezivanje medjustanica sa vremenima s linijom
    await Promise.all(
      medjustaniceWithTimes.map(async (stanica, index) => {
        const foundStanica = await Stanica.findOne({
          where: {
            naziv: stanica.naziv,
          },
        });

        await novaLinija.addStanica(foundStanica, {
          through: {
            redosled: index + 1,
            vremePolaskaM: stanica.vremePolaska,
            vremeDolaskaM: stanica.vremeDolaska,
            brojSlobodnihMesta,
          },
        });
      })
    );

    return res.status(201).json({ message: "Uspesno dodata nova linija" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/rezervacija", async (req, res) => {
  try {
    const { brojMesta, linijaId, pocetnaStanicaId, krajnjaStanicaId } =
      req.body;

    let linija = await Linija.findByPk(linijaId, { include: Stanica });

    let stanicaP = await Stanica.findByPk(pocetnaStanicaId);
    let stanicaK = await Stanica.findByPk(krajnjaStanicaId);

    let postojiStanicaP = false;
    let postojiStanicaK = false;

    for (let i = 0; i < linija.Stanicas.length; i++) {
      const stanica = linija.Stanicas[i];

      if (
        stanicaP.id == stanica.id ||
        linija.pocetnaStanicaId == pocetnaStanicaId
      ) {
        postojiStanicaP = true;
      }

      if (
        stanicaK.id == stanica.id ||
        linija.krajnjaStanicaId == krajnjaStanicaId
      ) {
        postojiStanicaK = true;
      }
    }

    if (!postojiStanicaP) {
      res.status(404).json({
        message: "Nepostoji stanica pocetna ",
      });
    }

    if (!postojiStanicaK) {
      res.status(404).json({
        message: "Nepostoji stanica krajnja na ispisanoj liniji",
      });
    }

    if (!linija) {
      res.status(404).json({ message: "Linija nije pronadjena" });
    }

    if (!stanicaP || !stanicaK) {
      res.status(404).json({ message: "Stanica nije pronadjena" });
    }

    // Ažuriranje broja slobodnih mesta
    //?umanjuje ako je pocetna na liniji
    if (linija.pocetnaStanicaId == pocetnaStanicaId) {
      if (linija.brojSlobodnihMesta < brojMesta) {
        res.status(404).json({ message: "nema dovoljno mesta" });
      }
      linija.brojSlobodnihMesta -= brojMesta;
      await linija.save();
    }

    //? uslov da se umanje sedista na svim medjustanicama ako se izabere cela linija
    if (
      linija.pocetnaStanicaId == pocetnaStanicaId &&
      linija.krajnjaStanicaId == krajnjaStanicaId
    ) {
      const medjustanicaSve = await Medjustanica.findAll({ where: linijaId });
      for (let i = 0; i < medjustanicaSve.length; i++) {
        const element = medjustanicaSve[i];
        console.log(element);
        element.brojSlobodnihMesta -= brojMesta;
        element.save();
      }
    }

    //? ako je na pocetnoj i do neke medjusnice
    if (
      linija.pocetnaStanicaId == pocetnaStanicaId &&
      linija.krajnjaStanicaId != krajnjaStanicaId
    ) {
      const medjustanicaSve = await Medjustanica.findAll({ where: linijaId });
      const medjustanicaKrajnja = await Medjustanica.findOne({
        where: linijaId,
        stanicaId: krajnjaStanicaId,
      });
      for (let i = 0; i < medjustanicaSve.length; i++) {
        const element = medjustanicaSve[i];
        if (element.redosled <= medjustanicaKrajnja.redosled) {
          element.brojSlobodnihMesta -= brojMesta;
          element.save();
        }
      }
    }
    //? uslov da se umanje sedista u slucaju da ako umanjimo izemdju vise medjustanicastanica
    if (
      linija.pocetnaStanicaId != pocetnaStanicaId &&
      linija.krajnjaStanicaId != krajnjaStanicaId
    ) {
      const medjustanicaSve = await Medjustanica.findAll({ where: linijaId });

      const medjustanicaPocetna = await Medjustanica.findOne({
        where: linijaId,
        stanicaId: pocetnaStanicaId,
      });

      const medjustanicaKrajnja = await Medjustanica.findOne({
        where: linijaId,
        stanicaId: krajnjaStanicaId,
      });

      for (let i = 0; i < medjustanicaSve.length; i++) {
        const element = medjustanicaSve[i];

        if (
          element.redosled >= medjustanicaPocetna.redosled &&
          element.redosled <= medjustanicaKrajnja.redosled
        ) {
          element.brojSlobodnihMesta -= brojMesta;
          element.save();
        }
      }
    }
    //? ako ide od neke medjustanice do krajnje stanice na liniji
    else {
      const medjustanicaSve = await Medjustanica.findAll({ where: linijaId });
      const medjustanicaPocetna = await Medjustanica.findOne({
        where: linijaId,
        stanicaId: pocetnaStanicaId,
      });
      for (let i = 0; i < medjustanicaSve.length; i++) {
        const element = medjustanicaSve[i];
        if (element.redosled >= medjustanicaPocetna.redosled) {
          element.brojSlobodnihMesta -= brojMesta;
          element.save();
        }
      }
    }

    await Rezervacija.create({
      brojMesta,
      linijaId,
      pocetnaStanicaId,
      krajnjaStanicaId,
    });
    res.status(200).json({ message: "uspesno rezervisali" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/filterLinija", async (req, res) => {
  try {
    const { nazivPocetneStanice, nazivKrajnjeStanice, datumPolaska } = req.body;

    const rezultat = [];

    const izvuceneLinijeDatum = await Linija.findAll({
      where: {
        datumPolaska,
      },
      include: [
        {
          model: Stanica,
          as: "pocetnaStanica",
        },
        {
          model: Stanica,
          as: "krajnjaStanica",
        },
        Stanica,
      ],
    });

    //? prolazimo kroz liniju
    for (let index = 0; index < izvuceneLinijeDatum.length; index++) {
      const linija = izvuceneLinijeDatum[index];
      let brojMedjustanicaNaLiniji = 0;

      //? prolazimo kroz medjustanice
      for (let j = 0; j < linija.Stanicas.length; j++) {
        const medjustanica = linija.Stanicas[j];

        console.log(medjustanica);
        const element = medjustanica.Medjustanica;

        //?pitamo da li je na liniji ili medjustanici
        if (
          linija.pocetnaStanica.naziv == nazivPocetneStanice &&
          linija.krajnjaStanica.naziv == nazivKrajnjeStanice
        ) {
          rezultat.push({
            id: linija.id,
            pocetnaStanica: linija.pocetnaStanica.naziv,
            krajnjaStanica: linija.krajnjaStanica.naziv,
            datumPolaska: linija.datumPolaska,
            datumDolaska: linija.datumDolaska,
            vremePolaska: linija.vremePolaska.split(":").slice(0, 2).join(":"),
            vremeDolaska: linija.vremeDolaska.split(":").slice(0, 2).join(":"),
            brojSlobodnihMesta: linija.brojSlobodnihMesta,
          });
          console.log(
            "----------------------1-----------------------",
            rezultat
          );
          break;
        }
        if (
          linija.pocetnaStanica.naziv == nazivPocetneStanice &&
          medjustanica.naziv == nazivKrajnjeStanice
        ) {
          rezultat.push({
            id: linija.id,
            pocetnaStanica: linija.pocetnaStanica.naziv,
            krajnjaStanica: medjustanica.naziv,
            vremePolaska: linija.vremePolaska,
            vremeDolaska: element.vremeDolaskaM,
            brojSlobodnihMesta: linija.brojSlobodnihMesta,
          });
          console.log(
            "---------------2------------------------------",
            rezultat
          );
        }
        if (
          medjustanica.naziv == nazivPocetneStanice &&
          linija.krajnjaStanica.naziv == nazivKrajnjeStanice
        ) {
          rezultat.push({
            id: linija.id,
            pocetnaStanica: medjustanica.naziv,
            krajnjaStanica: linija.krajnjaStanica.naziv,
            vremePolaska: medjustanica.vremePolaskaM,
            vremeDolaska: linija.vremeDolaska,
            brojSlobodnihMesta: medjustanica.brojSlobodnihMesta,
          });
          console.log(
            "--------------3-------------------------------",
            rezultat
          );
          break;
        }

        if (
          medjustanica.naziv == nazivPocetneStanice ||
          medjustanica.naziv == nazivKrajnjeStanice
        ) {
          brojMedjustanicaNaLiniji += 1;
        }

        if (brojMedjustanicaNaLiniji == 2) {
          rezultat.push({
            id: linija.id,
            pocetnaStanica: nazivPocetneStanice,
            krajnjaStanica: nazivKrajnjeStanice,
            vremePolaska: element.vremePolaskaM,
            vremeDolaska: element.vremeDolaskaM,
            brojSlobodnihMesta: medjustanica.brojSlobodnihMesta,
          });
          console.log(rezultat);
          break;
        }
      }
    }

    /* const proba = await izvuceneLinijeDatum[0].getPocetnaStanica();
    const proba2 = await izvuceneLinijeDatum[0].getKrajnjaStanica(); */

    res.status(200).json({ message: "uspesno izvučena linija", rezultat });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "doslo je do greske pri filtriranju", error });
  }
});

export default router;
