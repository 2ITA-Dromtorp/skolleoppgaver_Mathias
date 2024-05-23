### EER-diagram

#### Enheter og Attributter

1. **bruker**
   - **id**: int(11) - Primærnøkkel, AUTO_INCREMENT
   - **fornavn**: varchar(100)
   - **etternavn**: varchar(100)
   - **brukernavn**: varchar(50) - NOT NULL
   - **passord**: varchar(60) - NOT NULL
   - **brukerrolle**: varchar(50)
   - **telefonnummer**: varchar(20)

2. **mat**
   - **id**: int(11) - Primærnøkkel, AUTO_INCREMENT
   - **navn**: varchar(100)
   - **pris**: decimal(10,2)
   - **tilgjengelig**: int(11)

3. **bestillinger**
   - **id**: int(11) - Primærnøkkel, AUTO_INCREMENT
   - **brukerId**: int(11) - Fremmednøkkel som refererer til `bruker(id)`
   - **matId**: int(11) - Fremmednøkkel som refererer til `mat(id)`
   - **antall**: int(11)

#### Relasjoner

- **bruker** til **bestillinger**: Én-til-mange
  - En bruker kan ha flere bestillinger.
- **mat** til **bestillinger**: Én-til-mange
  - En matvare kan være en del av flere bestillinger.

### Forbedret EER-diagram

```text
    +-------------------+            +-------------------+            +-------------------+
    |      bruker       |            |    bestillinger   |            |       mat         |
    +-------------------+            +-------------------+            +-------------------+
    | id (PK)           |<--+     +--| id (PK)           |     +-->| id (PK)            |
    | fornavn           |   |     |  | brukerId (FK)     |     |   | navn               |
    | etternavn         |   +-----+  | matId (FK)        |     +---| pris               |
    | brukernavn        |            | antall            |         | tilgjengelig       |
    | passord           |            +-------------------+         +-------------------+
    | brukerrolle       |
    | telefonnummer     |
    +-------------------+
