# Ruori-Docker

### Käyttö:

Kloonaa repo ja terminaalissa komennot:

$ cd Ruori-Docker

$ docker compose up

Ja testaa selaimessa frontin toimivuus osoitteessa: http://localhost:3000/
(Sivu on sikaruma, anteeksi.)

Samassa terminaalissa Ctrl-C pysäyttää containerit.


### Koodaus:

Muuttele koodia client tai server kansiossa. Ja kyseisessä kansiossa komenna:

$ npm run docker:build

Pysäytä containerit ja Ruori-test kansiossa:

$ docker compose up

Muutoksien pitäisi olla tapahtuneen...


