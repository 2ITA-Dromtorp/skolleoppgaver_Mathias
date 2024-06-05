# Opprett et Node-prosjekt

Kodestruktur av: <https://blog.logrocket.com/build-rest-api-node-express-mysql/>

## Steg 1: Opprett et nytt prosjekt

```ps
PS> mkdir ./src/back-end
PS> cd ./src/back-end
PS> npm init -y
```

### Dependencies

Så installer vi _dependencies_ vi trenger for å håndtere autentisering, kjøre server og koble til databasen. Vi tar også med en _devDependency_ for å lytte på endringer i koden og re-kompilere automatisk

```ps
PS> npm install express express-jwt jsonwebtoken bcrypt cors dotenv mysql2
PS> npm install nodemon --save-dev
```

### jsconfig.json

For å få bedre støtte fra VSCode intellisense oppretter vi en konfigfil (tilsvarende tsconfig om vi hadde programmert i Typescript). Lag ny fil `jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": "./src/",
    "checkJs": true,
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

# Steg 2: Teste at vi har en fungerende server

Lag mappen `src` og opprett filen `index.js` med innholdet:

```js
const express = require("express");
const app = express();
const port = 3000;

const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => { console.info(`API Server lytter på http://localhost:${port}`); });
```

I `package.json` legg til følgende 2 skript under `scripts` sånn vi kan starte serveren for utvikling eller produksjon:

```json
    "prod": "set NODE_ENV=production && cd ./src && nodemon ./app.js",
    "start": "set NODE_ENV=development && cd ./src && nodemon ./app.js",
```

En ferdig package.json bør da se ut som dette:

```json
{
  "name": "back-end",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "prod": "set NODE_ENV=production && cd ./src && nodemon ./app.js",
    "start": "set NODE_ENV=development && cd ./src && nodemon ./app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-jwt": "^8.4.1",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.2"
  }
}
```

Start serveren med `npm run start`

Vi bruker en extension til VS Code for å teste API'et (sørg for at `REST Client` er installert).

Opprett testfil som `.\tests\manual.http` og legg inn:

```http
@baseUrl = http://localhost:3000

###
GET {{baseUrl}}/
Content-Type: application/json
```

Trykk på `Send Request`. Du skal da få opp noe tilsvarende:

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-/VnJyQBB0+b7i4NY83P42KKVWsM"
Date: Sun, 02 Jun 2024 08:10:07 GMT
Connection: close

{
  "message": "ok"
}
```

## Steg 3: Mappestruktur

Som for Front-End så trenger vi en god struktur som gjør det lett å legge til ny funksjonalitet og navigere til rett kode. En mulig struktur for dette er:

```txt
back-end/
├── node_modules/
├── src/
│   ├── helpers/
│   │   └── ...
│   ├── routes/
│   │   └── ...
│   └── index.js
├── tests/
│   └── manual.http
├── package.json
└── ...
```

Opprett de manglende mappene `helpers` og `routes`.

## Steg 4: Miljøvariabler

Det må være lett å endre hvilken port en server kjører på. Andre verdier som lett skal kunne endres bør også ligge utenfor koden. Ofte settes disse verdiene som _Environment_ variabler på maskinen serveren kjører på. For å kunne sjekke inn verdiene og ikke måtte konfigurere dette på hver utviklingsmaskin bruker vi `dotenv` som kan lese `.env`-filer og laste innholdet inn som miljøvariabler på maskinen når vi starter serveren.

Vi oppretter 2 filer hvor en sjekkes inn i versjonskontroll og den andre ikke skal sjekkes inn. Den siste inneholder hemmelige nøkler og må settes til forskjellige verdier på de stedene der serveren kjører (utvikling, test, produksjon, etc.).

### .env

(fil som skal inn i versjonskontroll)

```bash
#
# Set the environment variables for the backend server
# Commented values are here for reference only. They should be set in the .env.local file or in the environment for production
# The .env.local file should not be committed to the repository
#

APP_PORT=3000

AUTH_SALT_ROUNDS=10
AUTH_TOKEN_EXPIRATION=15d
#AUTH_JWT_SECRET=<AUTH_JWT_SECRET>

#DB_HOST=
#DB_USER=
#DB_PASSWORD=
#DB_DATABASE=
DB_CONNECTION_TIMEOUT=60000
```

Det er en smakssak om _ubrukte_ variable skal være med i .env-filen eller ikke. De kan godt tas bort så filen blir mer lesbar (husk da å oppdatere kommentaren på toppen).

### .env.local

(denne filen skal **IKKE** inn i versjonskontroll)

```bash
AUTH_JWT_SECRET=<set>

DB_HOST=<set>
DB_USER=<set>
DB_PASSWORD=<set>
DB_DATABASE=<set>

```

### .env.local.example

For å hjelpe fremtidige utviklere på prosjektet kan det være smart å legge inn et eksempel på `.env.local` i versjonskontroll. Lag en kopi av filen over - kanskje med noe beskrivelse per variabel og kall filen `.env.local.example`. Sånn som dette:

```bash
# Description: Example of .env.local file

# Secret used to sign the JWT tokens
AUTH_JWT_SECRET=<set>

# MySQL database connection information
DB_HOST=<set>
DB_USER=<set>
DB_PASSWORD=<set>
DB_DATABASE=<set>
```

### Hjelper: env-file-loader.js

For å laste inn innholdet i disse filene lager vi en hjelper-fil. Den sjekker om filene finnes og laster inn riktige filer basert på hvilket miljø vi kjører i (dev, test, prod). Lag filen i mappen `helpers`:

```js
const fs = require('fs');
const dotenv = require('dotenv');

const commonEnvFile = '.env';

// Get the current environment, defaulting to 'production' if not set
const environment = process.env.NODE_ENV || 'production';

/**
 * Load environment variables from a .env file if it exists.
 *
 * @param {string} path - The path to the .env file.
 */
const loadIfFound = (path) => {
  if (fs.existsSync(path)) {
    dotenv.config({ path });
  }
};

// Load environment variables from the common .env file
loadIfFound(commonEnvFile);

// Load environment variables from the .env.local file
loadIfFound(`${commonEnvFile}.local`);

// Load environment variables from the .env file for the current environment
loadIfFound(`${commonEnvFile}.${environment}`);

// Load environment variables from the .env.local file for the current environment
loadIfFound(`${commonEnvFile}.${environment}.local`);
```

### config.js

Vi sprer ikke bruk av miljøvariabler rundt i koden. For å få hjelp av intellisense lager vi en `config.js` som et lag mellom variablene og koden. Da kan vi også lett validere verdiene og varsle feil ved oppstart. Vi kan også sette _defaults_ om verdier mangler. Filen ser sånn ut:

```js
// Load .env-files into runtime environment
require("./helpers/env-file-loader");

/**
 * Throws an error if a required environment variable is missing.
 *
 * @param {string} name - The name of the environment variable.
*/
function throwOnMissingEnv(name) {
  throw new Error(`${name} is undefined`);
}

/**
 * Retrieves the value of an environment variable or throws an error if it is not defined.
 * @param {string} name - The name of the environment variable.
 * @returns {string} - The value of the environment variable.
 * @throws {Error} - If the environment variable is not defined.
 */
function getFromEnvOrThrow(name) {
  const value = process.env[name];

  if (value === undefined) {
    throwOnMissingEnv(name);
  }

  return value;
}

/**
 * Retrieves the value of an environment variable or returns a default value if the variable is not set.
 *
 * @param {string} name - The name of the environment variable.
 * @param {any} defaultValue - The default value to return if the environment variable is not set.
 * @returns {any} The value of the environment variable if it is set, otherwise the default value.
 */
function getFromEnvOrDefault(name, defaultValue ) {
  return process.env[name] ?? defaultValue;
}

const config = {

  // Database configuration
  db: {
    host: getFromEnvOrThrow("DB_HOST"),
    user: getFromEnvOrThrow("DB_USER"),
    password: getFromEnvOrThrow("DB_PASSWORD"),
    database: getFromEnvOrThrow("DB_DATABASE"),
    connectionTimeout: getFromEnvOrDefault("DB_CONNECTION_TIMEOUT", 10),
  },

  // Server configuration
  server: {
    port: getFromEnvOrDefault("APP_PORT", 3000),
  },

  // Authentication configuration
  auth: {
    saltRounds: getFromEnvOrDefault("AUTH_SALT_ROUNDS", 10),
    tokenExpiration: getFromEnvOrDefault("AUTH_TOKEN_EXPIRATION", "14d"),
    jwtSecret: getFromEnvOrThrow("AUTH_JWT_SECRET"),
  }
}

module.exports = config;
```

### index.js

Vi oppdaterer serveren til å lese port fra config. Endre `index.js`:

```js
const config = require("./config");    // ⬅️ Legg til
const express = require("express");
const app = express();
const port = config.server.port;       // ⬅️ Endre til
...
...
```

## Steg 5: .gitignore

Før første `commit` bør .gitignore på plass. Legg denne inn i rot på back-end-mappen:

```bash
# Logs
logs
*.log
npm-debug.log*

# dotenv environment variable files
.env.development.local
.env.test.local
.env.production.local
.env.local

# Dependency directories
node_modules/
```

## Steg 6: Endelig Mappe- og filstruktur


## Steg 4: Endelig Mappe- og filstruktur

Når du ferdig bør det se ut som dette:

```txt
back-end/
├── node_modules/
├── src/
│   ├── helpers/
│   │   ├── api-access-validation.js
│   │   └── env-file-loader.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── .env
│   ├── .env.local
│   ├── .env.local.example
│   ├── config.js
│   └── index.js
├── tests/
│   └── manual.http
├── .gitignore
├── package-lock.json
└── package.json
```
