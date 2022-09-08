# Ruori-test

Käyttö:

Kloonaa repo ja terminaalissa komennot:

cd Ruori-test

docker compose up

Ja testaa selaimessa frontin toimivuus osoitteessa: http://localhost:3000/

Samassa terminaalissa ctrl-C pysäyttää containerit.


Koodaus:

Muuttele koodia client tai server kansiossa. Ja kyseisessä kansiossa komenna:docker compose up

npm run docker:build

Pysäytä containerit ja Ruori-test kansiossa taas:

docker compose up


Muutoksien pitäisi olla tapahtuneen...


