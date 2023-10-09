import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'sr',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Name and Familyname',
            part2: 'Enter Name and Familyname',
            part3: 'Place of departure',
            part4: 'Enter place of departure',
            part5: 'Place of arrival',
            part6: 'Enter place of arrival',
            part7: 'Date of departure',
            part8: 'Enter date of departure',
            part9: 'Date of arrival',
            part10: 'Enter date of arrival',
            part11: 'Time of departure',
            part12: 'Enter time of depature',
            part13: 'Time of arrival',
            part14: 'Enter time of arrival',
            part15: 'E-mail',
            part16: 'Enter E-mail',
            part17: 'Phone',
            part18: 'Enter phone',
            part19: 'Choose a drink',
            part20: 'Reservation ticket',
            part21: 'Coffe',
            part22: 'Tea',
            part23: 'Chose a ticket',
            part24: 'Single',
            part25: 'Return',
            part26: 'Free',
            part27: 'Students',
            part28: 'Weekend',
            part29: 'Weekly',




            part30: 'Find bus line',
            part31: 'Start bus station',
            part32: 'End bus station',
            part33: 'Date of departure',
            part34: 'Timetable',
            part35: 'Reservation',
            part36: 'Number of seats',
            part37: 'Add line',

            part40: 'Name',
            part41: 'Enter name',
            part42: 'Familyname',
            part43: 'Enter familyname',
            part44: 'Username',
            part45: 'Enter ussername',
            part46: 'Password',
            part47: 'Enter password',
            part48: 'Phone number',
            part49: 'Enter phone number',
            part50: 'E-mail',
            part51: 'Enter e-mail',
            part52: 'Register',
            


            part60: 'Price of ticket:',
            part61: ' dinars',
            part62: 'No. selectet seat:',
            part63: 'Total price:',
            part64: 'Currently reserved seat:',
            part65: 'None',
            part66: 'Selected',
            part67: 'Busy',
            part68: 'Selected seat',
            part69: 'Reservation seat',
            part70: 'Date of return',
            part71: 'Timetable of return line',
            part72: 'Select a ticket type',


            part110: 'Contact',
            part111: 'Address',
            part112: 'Phone',
            part113: 'Put Name and Familyname',
            part114: 'Put Phone',
            part115: 'Message',
            part116: 'Send mail',

            part120: 'Reset password',
            part121: 'Confirm',
            part122: 'New password',
            part123: 'Repeat password',
            part124: 'Login',
            part125: 'Forget pasword',
            part126: 'License plate',
            part127: 'Add bus',
            part128: 'Add',
            part129: 'Save',
            part130: 'New line',
            part131: 'Operater',
            part132: 'Select a operater',

            part133: 'Change',
            part134: 'Delite',
            part135: 'No line',

            part136: 'You will be notified if the reservation changes',
            part137: 'Valid for students up to 27 years old. with the index, otherwise the full price of the ticket is paid',
            part138: 'Buy a ticket',
            part139: 'Currently reserved seat:',

            part140: 'New station',
            part141: 'Change station',
            part142: 'Name',
            part143: 'Edit bus',
            part144: 'Bus sign',
            part145: 'Change',

            part150: 'Time of departure',
            part151: 'Add a stopover',
            part152: 'Add new station',
            part153: 'Yes',
            part154: 'No',
            part155: 'Are you sure that you want to delete this line?',
            part156: 'Search users ... ',
            part157: 'Temporary roll',
            part158: 'Duration of the roll',
            part159: 'User',
            part160: 'Menager',
            part161: 'Stewardess',
            part162: 'Billeter',
            part163: 'Driver',

            part164: 'Edit line',
            part165: 'Stopover',
            part166: 'Select bus',
            part167: 'Select flight attendants',
            part168: 'Select driver',
            part169: 'Price',
            part170: 'Mark',
            part171: 'License plate',
            part172: 'Are you sure that you want to delete this item?',

            part173: 'Stations',
            part174: 'Buses',
            part175: 'Users',
            part176: 'Line',

            part177: 'Appendices',
            part178: 'Passenger',
            part179: 'You chose',
            part180: 'Number of seats',
            part181: 'Make a reservation ticket',
            part182: 'Bay ticket',
            part183: 'In case of changing the bus type, it is possible to change the seat reservation, which you will be informed about.',
            part184: 'Number of reserved seats',
            part185: 'Checked',

            part186: 'My tickets',
            part187: 'Active tickets',
            part188: 'Inactive tickets',
            part189: 'Active lines',
            part190: 'Checking in',
            part191: 'Intermediate stations',

          }
        }
      },
      sr: {
        translation: {
          description: {
            part1: 'Ime i prezime',
            part2: 'Unestite ime i prezime',
            part3: 'Mesto polaska',
            part4: 'Unesite mesto polaska',
			      part5: 'Mesto dolaska',
            part6: 'Unesite mesto dolaska',
            part7: 'Datum polaska',
            part8: 'Unesite datum polaska',
            part9: 'Datum dolaska',
            part10: 'Unesite datum dolaska',
            part11: 'Vreme polaska',
            part12: 'Unesite vreme polaska',
            part13: 'Vreme dolaska',
            part14: 'Unesite vreme dolaska',
            part15: 'E-mail',
            part16: 'Unesite e-mail',
            part17: 'Telefon',
            part18: 'Unesite telefon',
            part19: 'Izaberite osveženje',
            part20: 'Rezerviši kartu',
            part21: 'Kafa',
            part22: 'Čaj',
            part23: 'Izaberite kartu',
            part24: 'Jednosmerna',
            part25: 'Povratna',
            part26: 'Besplatna',
            part27: 'Studentska',
            part28: 'Vikend',
            part29: 'Nedeljna',


            part30: 'Pronađite liniju',
            part31: 'Početna stanica',
            part32: 'Dolazna stanica',
            part33: 'Datum polaska',
            part34: 'Red vožnje',
            part35: 'Rezerviši',
            part36: 'Broj mesta',
            part37: 'Dodavanje linije',


            part40: 'Ime',
            part41: 'Unesite ime',
            part42: 'Prezime',
            part43: 'Unesite prezime',
            part44: 'Korisničko ime',
            part45: 'Uneite korisničko ime',
            part46: 'Lozinka',
            part47: 'Unesite lozinku',
            part48: 'Broj telefona',
            part49: 'Unesite broj telefona',
            part50: 'E-mail',
            part51: 'Unesite e-mail',
            part52: 'Registrujte se',
            

            part60: 'Cena karte:',
            part61: 'dinara',
            part62: 'Br. izabranih sedišta:',
            part63: 'Ukupna cena:',
            part64: 'Trenutno rezervisano mesto:',
            part65: 'Nijedno',
            part66: 'Izabrano',
            part67: 'Zauzeto',
            part68: 'Izaberite sedište',
            part69: 'Rezervišite mesto',
            part70: 'Datum povratka',
            part71: 'Red vožnje povratne linije',
            part72: 'Odaberite vrstu karte',


            part110: 'Kontakt',
            part111: 'Adresa',
            part112: 'Telefon',
            part113: 'Unesite ime i prezime',
            part114: 'Unesite telefon',
            part115: 'Poruka',
            part116: 'Pošalji mail',

            part120: 'Resetujte lozinku',
            part121: 'Potvrdite',
            part122: 'Nova lozinka',
            part123: 'Ponovi lozinku',
            part124: 'Logovanje',
            part125: 'Zaboravljena šifra',
            part126: 'Registarska tablica',
            part127: 'Dodajte autobus',
            part128: 'Dodaj',
            part129: 'Sačuvaj',
            part130: 'Nova linija',
            part131: 'Prevoznik',
            part132: 'Izaberite prevoznika',

            part133: 'Zameni',
            part134: 'Obriši',
            part135: 'Nema linije',

            part136: 'Bićete obavešteni, ako se izmeni rezervacija',
            part137: 'Važi za studente do 27 god. uz index u suprotnom plaća se puna cena karte',
            part138: 'Kupite kartu',
            part139: 'Trenutno rezervisano mesto:',

            part140: 'Nova stanica',
            part141: 'Izmena stanica',
            part142: 'Naziv',
            part143: 'Edituj autobus',
            part144: 'Oznaka autobusa',
            part145: 'Izmeni',

            part150: 'Vreme odlaska (polaska)',
            part151: 'Dodaj usputnu stanicu',
            part152: 'Dodaj novu stanicu',
            part153: 'Da',
            part154: 'Ne',
            part155: 'Da li ste sigurni da želite da obrišete ovu liniju?',
            part156: 'Pretražite korisnike ... ',
            part157: 'Privremena rola',
            part158: 'Vreme trajanja role',
            part159: 'Korisnik',
            part160: 'Menadžer',
            part161: 'Stjuardesa',
            part162: 'Biletar',
            part163: 'Vozač',

            part164: 'Edituj liniju',
            part165: 'Usputna stanica',
            part166: 'Izaberite autobus',
            part167: 'Izaberite stjuardesu',
            part168: 'Izaberite vozača',
            part169: 'Cena',
            part170: 'Oznaka',
            part171: 'Tablice',
            part172: 'Da li ste sigurni da želite da obrišete ovu stavku?',

            part173: 'Stanice',
            part174: 'Autobusi',
            part175: 'Korisnici',
            part176: 'Linija',

            part177: 'Dodaci',
            part178: 'Putnik',
            part179: 'Izabrali ste',
            part180: 'Broj sedišta',
            part181: 'Rezerviši kartu',
            part182: 'Kupi kartu',
            part183: 'U slučaju izmene tipa autobusa, moguće je doći do promene rezervacije sedišta, o čemu ćete biti obavešteni.',
            part184: 'Broj rezervisanih mesta',
            part185: 'Čekiran',

            part186: 'Moje karte',
            part187: 'Aktivne karte',
            part188: 'Neaktivne karte',
            part189: 'Aktivne linije',
            part190: 'Čekiranje',
            part191: 'Međustanice',


          }
        }
      },   

    }
  });

export default i18n;