# PulseSound 🎧

Egy modern, reszponzív audio eszközök webáruháza, amely React és React Router segítségével készült. A PulseSound egy teljes körű e-commerce megoldás fülhallgatók, fejhallgatók, hangszórók és mikrofonok értékesítésére.

## ✨ Funkciók

### 🛒 E-commerce Alapfunkciók
- **Termék böngészés**: Kategóriák szerint rendezett termékek
- **Kosár kezelés**: Termékek hozzáadása, eltávolítása, mennyiség módosítása
- **Rendelés leadás**: Teljes rendelési folyamat szállítási adatokkal
- **Keresés**: Valós idejű termék keresés automatikus kiegészítéssel

### 🎨 Felhasználói Élmény
- **Reszponzív design**: Minden eszközön optimalizált megjelenés
- **Dinamikus termék galéria**: Több kép megtekintése termékenkénti
- **Részletes termékleírások**: Minden termékhez részletes információk
- **Intuitív navigáció**: Egyszerű és gyors böngészés

### 🔧 Technikai Jellemzők
- **React 18**: Modern hooks használata (useState, useContext, useEffect)
- **React Router**: Dinamikus routing kategóriákhoz és termékekhez
- **Context API**: Globális kosár állapot kezelés
- **Responsive CSS**: Mobile-first megközelítés
- **Optimalizált képkezelés**: Dinamikus képimportálás

## 🚀 Telepítés és Indítás

### Előfeltételek
- Node.js (v14 vagy újabb)
- npm vagy yarn

### Telepítés
```bash
# Repository klónozása
git clone [repository-url]
cd pulsesound

# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm start
```

Az alkalmazás elérhető lesz a `http://localhost:3000` címen.

### Build
```bash
# Produkciós build készítése
npm run build

# Tesztek futtatása
npm test
```

## 📁 Projekt Struktúra

```
src/
├── components/          # Újrafelhasználható komponensek
│   ├── CartContext.js   # Kosár állapot kezelés
│   ├── CategoryPage.js  # Kategória oldal komponens
│   ├── Footer.js        # Lábléc komponens
│   ├── NavFoot.js       # Layout wrapper
│   ├── Navbar.js        # Navigációs bar
│   └── ProductsData.js  # Termék adatok
├── pages/              # Oldal komponensek
│   ├── Cart.js         # Kosár oldal
│   ├── Home.js         # Főoldal
│   ├── ProductDetail.js # Termék részletek
│   └── ProductPage.js   # Termék lista oldal
├── images/             # Statikus képek
│   ├── earbuds/        # Fülhallgató képek
│   ├── headphones/     # Fejhallgató képek
│   ├── speakers/       # Hangszóró képek
│   └── microphones/    # Mikrofon képek
└── styles/             # CSS fájlok
```

## 🛍️ Termék Kategóriák

- **Fülhallgatók (Earbuds)**: Vezeték nélküli fülhallgatók
- **Fejhallgatók (Headphones)**: Over-ear és on-ear fejhallgatók  
- **Hangszórók (Speakers)**: Bluetooth és hordozható hangszórók
- **Mikrofonok (Microphones)**: Podcast és streaming mikrofonok

## 🔄 Kosár Funkciók

- Termékek hozzáadása egyedi mennyiséggel
- Mennyiség módosítása a kosárban
- Termékek eltávolítása
- Automatikus összeg számítás
- Rendelés leadás űrlappal
- Email és cím validáció

## 🎯 Főbb Komponensek

### CartContext
Globális állapot kezelő a kosár funkciókhoz:
- `addToCart()` - Termék hozzáadása
- `removeFromCart()` - Termék eltávolítása  
- `updateQuantity()` - Mennyiség frissítése
- `getCartTotal()` - Végösszeg számítása
- `getCartCount()` - Termékek száma

### Navbar
- Reszponzív navigáció
- Valós idejű keresés
- Kosár számláló
- Mobil menü

### ProductDetail
- Termék képek galériája
- Részletes leírások
- Kosárba helyezés funkció
- Mennyiség választó

## 🎨 Design Rendszer

- **Színpaletta**: Modern, minimalista design
- **Tipográfia**: Tiszta, olvasható betűtípusok
- **Képek**: Optimalizált termékfotók
- **Animációk**: Smooth hover effektek
- **Reszponzivitás**: Mobile-first megközelítés

## 🔧 Használt Technológiák

- **React 18** - UI komponens könyvtár
- **React Router v6** - Routing és navigáció
- **Context API** - Állapot kezelés
- **CSS3** - Styling és animációk
- **PropTypes** - Típus ellenőrzés
- **ES6+** - Modern JavaScript

## 📱 Reszponzív Design

Az alkalmazás teljes mértékben reszponzív és optimalizált:
- **Desktop**: Teljes funkciókészlet
- **Tablet**: Adaptált layout
- **Mobile**: Touch-optimalizált interfész

## 🤝 Közreműködés

1. Fork-old a projektet
2. Készíts egy feature branch-et (`git checkout -b feature/UjFunkció`)
3. Commitold a változásokat (`git commit -m 'Új funkció hozzáadása'`)
4. Push-old a branch-et (`git push origin feature/UjFunkció`)
5. Nyiss egy Pull Request-et

## 📄 Licenc

Ez a projekt MIT licenc alatt áll. További részletekért lásd a `LICENSE` fájlt.

## 👨‍💻 Szerző

**Geri** - PulseSound by Geri

---

⭐ Ha tetszik a projekt, adj neki egy csillagot a GitHubon!
