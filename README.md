# 🎧 PulseSound – Interaktív zene webshop Reacttel

## 🧠 Projekt célja

A PulseSound egy modern, reszponzív webalkalmazás, amely zeneipari termékek (fülhallgatók, fejhallgatók, hangszórók, mikrofonok) bemutatására és értékesítésére szolgál. A cél egy olyan felhasználóbarát platform létrehozása, amely nemcsak vizuálisan vonzó, hanem technikailag is stabil, gyors és könnyen bővíthető.

A projekt ideális példa frontend fejlesztők számára, akik szeretnék gyakorolni:

    komponensalapú fejlesztést,

    állapotkezelést Context API-val,

    dinamikus routingot React Routerrel,

    Tailwind CSS-sel történő reszponzív dizájn kialakítását,

    és egy valós webshop logikájának megvalósítását.

🧩 Főbb modulok és funkciók
🏠 Főoldal (Home.js)

    Videós hero szekció, amely azonnal megragadja a látogatók figyelmét

    Kategóriaalapú termékkártyák, kiemelt ajánlatokkal

    Navigációs gombok, amelyek átirányítanak a részletes termékoldalakra

🗂️ Kategóriaoldal (ProductPage.js)

    Termékek listázása adott kategóriában

    Rendezési lehetőségek: név szerint (A-Z, Z-A), ár szerint (növekvő, csökkenő)

    Reszponzív grid elrendezés, mobilon 1 oszlop, desktopon akár 4

📄 Termékoldal (ProductDetail.js)

    Dinamikus betöltés URL paraméter alapján

    Képgaléria: fő kép + választható előnézeti képek

    Részletes leírások, képekkel és szöveges tulajdonságokkal

    Kosárba helyezés mennyiségválasztással

🛒 Kosár oldal (Cart.js)

    Kosár tartalmának megjelenítése, módosítása, törlése

    Teljes összeg kiszámítása és formázása

    Rendelési űrlap validációval (név, e-mail, cím)

    Rendelés visszaigazolása és kosár ürítése

🔄 Állapotkezelés (CartContext.js)

    Kosár adatok globális kezelése Context API-val

    LocalStorage integráció: adatok megőrzése újratöltés után

    Kosár műveletek: hozzáadás, eltávolítás, frissítés, ürítés

    Számítási függvények: összeg, darabszám, üresség

🧭 Navigáció (Navbar.js, NavFoot.js)

    Mobilbarát hamburger menü

    Keresőmező élő javaslatokkal

    Dinamikus kosár ikon termékszámlálóval

    Kategóriaalapú navigáció

📦 Lábléc (Footer.js)

    Logó megjelenítése

    Információs linkek: Kapcsolat, Garancia, Szállítás, ÁSZF, Rólunk

    Közösségi média ikonok (Facebook, Instagram)

    Jogi nyilatkozat


https://pulsesound.netlify.app/
    