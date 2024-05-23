# Utlånssystem for Drømtorp

Dette er en ny utlån av utstyr til elever og lærere ved Drømtorp.

**Løsningsoversikt**

"Systemet" består av både frontend og backend:

- **Frontend:** Utviklet med JavaScript og React.
- **Backend:** Skrevet i JavaScript med Node.js.
- **Database:** Bruker MySQL.

**Sikkerhet**

Brukerpålogging er sikret ved at backenden validerer brukernavn og passord mot hashed passord i databasen, med bcrypt for hashing. Et JWT (JSON Web Token) genereres av backenden og sendes til frontend for autentisering. All informasjon bortset fra passord er med i Token. Backenden sjekker token mot databasen.

**Utviklingsmiljø**

1. **Backend:**

   - Åpne en terminal og naviger til backend-serveren.
   - Kjør `npm install` første gang og hver gang `package.json` endres.
   - Sjekk innstillingene i `.env`-filene.
   - Start serveren ved å kjøre `npm start`. Den vil lytte på `localhost:3001`.

2. **Frontend:**
   - Åpne en terminal og naviger til frontend-serveren.
   - Kjør `npm install` første gang og hver gang `package.json` endres.
   - Sjekk innstillingene i `.env`-filene.
   - Start serveren ved å kjøre `npm start`. Den vil lytte på `localhost:3000`.
   - Åpne nettleseren og gå til `localhost:3000`.

**Fremtidige Forbedringer**

- Legg til muligheten til å låne X antall ganger.
- Legg til og fjern utstyr.
- Slett og oppdater brukere.