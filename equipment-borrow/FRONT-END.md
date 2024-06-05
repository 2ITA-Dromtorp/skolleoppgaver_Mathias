# Opprett et React-prosjekt med Bootstrap og Axios

Kodestruktur inspirert av <https://github.com/cybersamx/react-bootstrap>

## Steg 1: Opprett et nytt React-prosjekt

Åpne terminalen og kjør følgende kommando:

```ps
PS> npm create vite@latest ./src/front-end -- --template react
```

(godta spørsmål om installering av create-vite)

Kan være greit å åpne VS Code nå også med `code .`

⚠️ Alle kommandoer for front-end  skal nå skje fra mappen .\src\front-end så `cd src\front-end`

... og test at front-end virker før vi starter å legge til egen kode:

```ps
PS> cd src\front-end
PS> npm install
PS> npm run dev
```

## Steg 2: Installer Bootstrap og Axios

Installer React Router, Bootstrap og Axios ved å kjøre følgende kommando i terminalen:

```ps
PS> npm install react-bootstrap bootstrap axios react-router-dom react-router-bootstrap
```

## Steg 3: Fjern filer vi ikke bruker

I denne guiden kommer vi ikke til å bruke filene under og du kan trygt slette de for å rydde unna litt:

* .\public\vite.svg
* .\src\assets\react.svg
* .\src\App.css
* .\src\index.css

Husk å fjerne referansene til disse filene fra koden i `main.jsx` og `App.jsx`:

## Steg 4: Mappestruktur

For å lett kunne navigere til rett kode er det vanlig å organisere projektene på en måte tilsvarende dette:

```txt
front-end/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx     // Header-komponenten din
│   ├── layouts/
│   │   ├── MainLayout.jsx // Oppsett av siden (Header, Footer, etc)
│   ├── pages/
│   │   ├── HomePage.jsx   // HomePage-komponenten din
│   │   ├── AdminPage.jsx  // AdminPage-komponenten din
│   ├── services/
│   │   ├── api.js  // Axios-instansen din
│   ├── App.jsx
│   ├── index.js
├── package.json
└── ...
```

Lag de manglende mappene `components`, `pages` og `services`

## Steg 3: Opprett HomePage-komponenten

Opprett en ny fil `HomePage.jsx` i ./src/pages

```js
function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}

export default HomePage;
```

## Steg 3: Opprett AdminPage-komponenten

Opprett en ny fil `AdminPage.jsx` i ./src/pages

```js
function AdminPage() {
  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
    </div>
  );
}

export default AdminPage;
```

## Steg 4: Opprett Header-komponenten med meny

Opprett en ny fil `Header.js` i ./src/components/

```js
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Min App</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Hjem</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin">
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
```

> Oppdater tekstene `Min App`, `Hjem` og `Admin` men de navnene du vil ha og legg til flere `<LinkContainer>` for nye sider du vil navigere til (husk da å også legge til som nye `Route`s - se neste steg)

## Steg 5: Sett opp Router (og bootstrap CSS)

Nå har vi de mest grunnleggende komponentene på plass og kan sette de sammen til en første versjon av front-end.

I `main.jsx` legger du til Router som vil håndtere navigasjonen i appen:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom";      <!-- ⬅️ Legg til -->

import "bootstrap/dist/css/bootstrap.min.css";                   <!-- ⬅️ Legg til (⚠️før ./index.css) -->
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>                                                     <!-- ⬅️ Legg til -->
      <App />
    </Router>                                                    <!-- ⬅️ Legg til -->
  </React.StrictMode>
);
```

Bootstrap-CSS over setter standard styles på Bootstrap-komponentene sånn at diu får det meste "gratis".

> ⚠️ Viktig: Åpne filene `index.css` og `App.css` og slett alt innhold i disse. Her kan du legge til egen styling senere om det er behov for det.

I App.jsx, setter du opp en grunnleggende router med ruter til hovedsiden og admin-siden og med en header som lenker til disse sidene:

```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Header from './components/Header';

function App() {
  return (
    <Routes>
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/admin" component={AdminPage} />
    </Routes>
  );
}

export default App;
```

Her beskriver path hva du skal ha i URL for å komme til siden og component hvilken side som skal åpnes. HomePage er tagget med `exact` sånn at man ikke kommer til HomePage om man skriver noe etter `http://localhost:3000/`

## Steg x : Komponenter og Styling

Se [React Bootstrap](https://react-bootstrap.netlify.app/docs) for informasjon om aktuelle React komponenter (som [tabeller](https://react-bootstrap.netlify.app/docs/components/table), [kort](https://react-bootstrap.netlify.app/docs/components/cards), m.fl.).

#############################

Vi trenger en header med navigasjon mellom sidene. Vi legger komponenter som kan brukes på en side i `components`-mappen. Noen komponenter går over flere filer og det kan derfor være en god struktur å lagge undermapper for de forskjellige typene komponent.



## Steg 4: Opprett en Axios-instans

```js
Opprett en ny fil api.js i src-mappen og sett opp en Axios-instans med base URL til backenden din:

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

export default instance;
```

## Steg 5: Sett opp Axios Interceptor

Legg til en request interceptor for å legge til auth bearer token i hver forespørsel. Sjekk også om token er utløpt, og autentiser på nytt om nødvendig:

```js
instance.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  if (token && new Date().getTime() > tokenExpiration) {
    // Token er utløpt, autentiser på nytt
    // Anta at vi har en funksjon refreshToken() som autentiserer på nytt og returnerer en ny token
    const newToken = await refreshToken();
    localStorage.setItem('token', newToken);
    config.headers.Authorization = `Bearer ${newToken}`;
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

## Steg 8: Sett opp Header med Meny

Bruk react-bootstrap for å opprette en header med lenker til hovedsiden og admin-siden:

```js
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>My App</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin">
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Husk å legge til Header-komponenten i App-komponenten din.
```
