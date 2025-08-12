const importAll = (r) => {  // Függvény, amely importálja az összes képet a megadott kontextusból
    const images = {};
    r.keys().forEach((key) => {
        const fileName = key.replace('./', '').replace(/\.\w+$/, ''); // Kiterjesztés nélkül is használható
        const fullFileName = key.replace('./', ''); // Teljes fájlnévvel is elérhető
        images[fullFileName] = r(key);  // Teljes fájlnévvel is elérhető
        images[fileName] = r(key); // Mindkét változat elérhető
    });
    return images;
};

// Képek importálása kategóriánként
// Earbuds kategória képei
const earbudsImages = importAll(require.context('../images/earbuds', false, /\.(png|jpe?g|svg)$/));

// Fejhallgatók kategória képei
const headphonesImages = importAll(require.context('../images/headphones', false, /\.(png|jpe?g|svg)$/));

// Hangszórók kategória képei
const speakersImages = importAll(require.context('../images/speakers', false, /\.(png|jpe?g|svg)$/));

// Mikrofonok kategória képei
const microphonesImages = importAll(require.context('../images/microphones', false, /\.(png|jpe?g|svg)$/));

/**
 * Fő termék adatok tömb
 * Minden termék objektum tartalmazza a következő mezőket:
 * - id: egyedi azonosító
 * - name: termék neve
 * - price: ár forintban
 * - image: fő termék kép
 * - images: termék képek tömbje (galéria)
 * - dimages: részletes képek tömbje
 * - descriptions: termék leírások tömbje (cím és szöveg párokban)
 * - category: termék kategória
 */

const ProductsData = [
    // Earbuds kategória
    {
        id: 1,
        name: "Amazon Echo Buds",
        price: 9500,
        image: earbudsImages['pod1.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod1.jpg'], earbudsImages['pod1a.jpg'], earbudsImages['pod1b.jpg']], 
        dimages: [earbudsImages['pod1c.jpg'], earbudsImages['pod1d.jpg'], earbudsImages['pod1e.jpg']],  
        // Termék leírások tömb - minden elem tartalmaz egy címet és leírást
        descriptions: [
            { title: "Igazi vezeték nélküli fülhallgató", text: "Igazi vezeték nélküli fülhallgató gazdag, kiegyensúlyozott hangzással. Hallja hangosan és tisztán a 12 mm-es meghajtókkal, amelyek éles hangzást, kiegyensúlyozott basszust és teljes hangzást biztosítanak. Legyen hallható a 2 mikrofonnal és a hangérzékelő gyorsulásmérővel a kristálytiszta kommunikáció érdekében." },
            { title: "Félfüles kialakítás audio személyre szabással", text: "Az új Echo Buds félig fülbe helyezhető fülhallgatók, amelyeket úgy terveztek, hogy fülpárna használata nélkül a fülbe illeszkedjenek. Ez a kialakítás segít csökkenteni, de nem szünteti meg a külső zajokat, hogy ön kapcsolatban maradhasson a környezetével." },
            { title: "Zökkenőmentes kapcsolás", text: "Hallgasd meg az összes zenét, podcastot, hangoskönyvet, telefonhívást vagy bármit, amit csak szeretnél hallgatni, kötöttségek nélkül." },
        ],
        category: "Earbuds",
    },
    {
        id: 2,
        name: "JLab Go Sport+",
        price: 13500,
        image: earbudsImages['pod2.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod2.jpg'], earbudsImages['pod2a.jpg'], earbudsImages['pod2b.jpg']],
        dimages: [earbudsImages['pod2c.jpg'], earbudsImages['pod2d.jpg'], earbudsImages['pod2e.jpg']],
        descriptions: [
            { title: "Izzadságálló Sport Fit", text: "Az IP55 izzadság- és fröccsenésálló minősítés megvéd az izzadságtól és a szennyeződésektől, így ezek a fülhallgatók tökéletesek az edzőteremben. Az ergonomikus fülkampó kialakítása biztonságos és kényelmes illeszkedést biztosít még intenzív tevékenységek során is. Kísérletezzen a háromféle zselés fülhallgatóval, hogy megtalálja a tökéletes illeszkedést." },
            { title: "Hosszú akkumulátor élettartam", text: "Élvezze a több mint 9 órányi játékidőt egyetlen töltéssel minden fülhallgató esetében, és ha több energiára van szüksége, a vékony töltőtáska további több mint 26 órányi játékidőt biztosít. Ráadásul a tokot kényelmesen feltöltheted a beépített USB-C töltőkábellel, így mindössze 10 perc töltéssel egy órányi játékidőhöz juthatsz." },
            { title: "Tiszta hívások és Dual Connect", text: " Válassza ki, hogy bármelyik fülhallgatót külön-külön vagy együtt használja, miközben a beépített MEMS-mikrofonnak köszönhetően mindkét fülhallgatóban tiszta hívásokat biztosít." },
        ],
        category: "Earbuds"
    },
    {
        id: 3,
        name: "JBuds Mini",
        price: 9000,
        image: earbudsImages['pod3.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod3.jpg'], earbudsImages['pod3a.jpg'], earbudsImages['pod3b.jpg']],
        dimages: [earbudsImages['pod3c.jpg'], earbudsImages['pod3d.jpg'], earbudsImages['pod3f.jpg']],
        descriptions: [
            { title: "Mini fülhallgatók, amelyek nagyot ütnek.", text: "Köszöntse a JBuds Mini-t, a valaha volt legkisebb fülhallgatót, ahol a méret nem jelent kompromisszumot a teljesítményben. Ezek az apró titánok nagyot ütnek, és olyan funkciókkal rendelkeznek, amelyek feldobják a hallgatási élményt. Akár a kedvenc zenéit hallgatja az edzőteremben, akár egy lebilincselő podcastba merül el egy zsúfolt út során, készüljön fel arra, hogy lenyűgöző hangminőségben merüljön el, amely valóban dacol a méretével." },
            { title: "Kis méret. Nagy jellemzők", text: "Csatlakozás több eszközhöz. A Bluetooth Multipoint segítségével élvezheti a sokoldalúságot, és zökkenőmentesen válthat egyik eszközről a másikra. Ugorjon át a számítógépén lévő podcastról a mobilján lévő hívásra. Egyszerre két eszközhöz - mobilhoz, laptophoz és/vagy számítógéphez - is csatlakozhat." },
            { title: "IP55 vízállóság", text: "Olyan fülhallgatót szeretne, amely lépést tud tartani önnel. A JBuds Mini IP55-ös besorolással izzadság- és porálló, hogy útközben is használhasd. Ez tartósság az élet minden kalandjához." },
        ],
        category: "Earbuds"
    },
    {
        id: 4,
        name: "OnePlus Buds 3",
        price: 11000,
        image: earbudsImages['pod4.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod4.jpg'], earbudsImages['pod4a.jpg'], earbudsImages['pod4b.jpg']],
        dimages: [earbudsImages['pod4c.jpg'], earbudsImages['pod4d.jpg'], earbudsImages['pod4e.jpg']],
        descriptions: [
            { title: "Makulátlan hangzásvilág", text: "Ajándékozza meg fülét lenyűgöző énekharmóniákkal, amelyeket a nagy pontosságú koaxiális meghajtó kialakítás és a vastagabb hangszórók hoznak létre a tisztább, világosabb énekhangok érdekében." },
            { title: "Viselhető ergonómiai boldogság", text: "A OnePlus Buds 3 könnyű, 4,8 g-os ergonomikus kialakítású fülpárnájának megalkotásához több ezer fülpárnát szkenneltünk be, amely tökéletesen illeszkedik a fülébe, így órákon át kényelmesen hallgathatja, és három különböző méretű fülpárnát is tartalmaz, hogy a legjobb illeszkedést érje el." },
            { title: "Üdvözöljük a 3D Audio világában", text: "Merüljön el a OnePlus 3D Audio dinamikus, háromdimenziós hangzásvilágában. A többirányú hangzás olyan élményt nyújt, mint egy élő koncert." },
        ],
        category: "Earbuds"
    },
    {
        id: 5,
        name: "Honor Choice Earbuds X5",
        price: 22000,
        image: earbudsImages['pod5.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod5.jpg'], earbudsImages['pod5a.jpg'], earbudsImages['pod5b.jpg']],
        dimages: [earbudsImages['pod5c.jpg'], earbudsImages['pod5d.jpg'], earbudsImages['pod5e.jpg']],
        descriptions: [
            { title: "Gazdagabb szoprán, minden hang a szívhez", text: "A bőséges hangegység természetesen éles, tiszta magas hangokat hoz, gazdagabb hangélményt biztosítva." },
            { title: "Könnyű és kényelmes viselet", text: "Ergonómikus kialakítású a stabil és szoros illeszkedés érdekében. Gyengéd a fülekhez, varázslat a szívhez." },
            { title: "Mély, gazdag basszus, rezonál a lélekkel", text: "A rendkívül légmentes, független hangvezérlés és a szellőzőnyílás mély, gazdag basszust biztosít, így olyan rezonanciában merülhet el, mintha a tenger mélyén lenne." },
        ],
        category: "Earbuds"
    },
    {
        id: 6,
        name: "LAMAX Dots2 TWS",
        price: 13200,
        image: earbudsImages['pod6.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod6.jpg'], earbudsImages['pod6a.jpg'], earbudsImages['pod6b.jpg']],
        dimages: [earbudsImages['pod6c.jpg'], earbudsImages['pod6d.jpg'], earbudsImages['pod6e.jpg']],
        descriptions: [
            { title: "NEM HISZEL MAJD A SAJÁT FÜLEDNEK", text: "A dalok ugyanolyan robbanékonyak lesznek, mint a koncerteken. Kedveled az erős beateket? Figyeld csak meg, milyen gyorsan kezded el ütni a ritmust. Válassz egy műfajt, és biztos lehetsz benne, hogy a LAMAX Dots2 a csúcskategóriás konverterek és a chipsetnek köszönhetően megbirkózik vele. Vezetékek nélkül is minden egyes szám kiváló minőségben jut el a füledig - a fülhallgatók jól megértik magukat az AAC és SBC kodekekkel, a 15 méter hatótávú Bluetooth 5.0 pedig páratlan szabadságot biztosít a számodra." },
            { title: "FRISS ZENE A ZSEBBEN, 24/7", text: "Ha reggel még nem tudod, hogy mit hoz majd az este, a dokkoló a legjobb barátod. Rövid időre beleteszed a fülhallgatót, és már nyomhatod is a lejátszás gombot. Magán a dokkoló állomáson 4 LED mutatja, mennyi energiával rendelkezik még. Ha már konnektorra van szükség, választhatsz az USB-C és a vezeték nélküli töltés között." },
            { title: "READY AZ ÉLETMÓDODRA", text: "A Dots2 minden nappal veled együtt birkózik meg - akár az irodában, akár a városon kívül. A dokkolónak a keményebb bánásmód sem árt, és sportolás közben sem kell aggódnod a fülhallgatók miatt. Ezen kívül amikor a barátaid vagy a főnököd hív, egyszerűen csak a füldugókba továbbítod a hívásukat, és a kezeid szabadok maradnak." },
        ],
        category: "Earbuds"
    },
    {
        id: 7,
        name: "Wireless Earbuds, Bluetooth 5.3",
        price: 17000,
        image: earbudsImages['pod7.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod7.jpg'], earbudsImages['pod7a.jpg'], earbudsImages['pod7b.jpg']],
        dimages: [earbudsImages['pod7c.jpg'], earbudsImages['pod7d.jpg'], earbudsImages['pod7e.jpg']],
        descriptions: [
            { title: "Könnyen hordozható", text: "Kicsi és aranyos, zsebében vagy táskájában hordozható, így utazás közben bármikor és bárhol élvezheti a zenét." },
            { title: "IP7 vízálló", text: "A belső nanobevonat megvédi a vezeték nélküli fejhallgatót az esőtől vagy az izzadságtól az intenzív gyakorlatok során, csak élvezze az időt futás, kocogás, lovaglás, túrázás, fitness stb. közben." },
            { title: "Fantasztikus zenei utazást nyújt önnek", text: "A 13 mm-es meghajtók a mély, gazdag basszusoktól a pontos középhangokig és a tiszta, éles magas hangokig terjedő hangzásért dolgoznak." },
        ],
        category: "Earbuds"
    },
    {
        id: 8,
        name: "Go Pop+",
        price: 23000,
        image: earbudsImages['pod8.jpg'], // A fájl neve alapján keres
        images: [earbudsImages['pod8.jpg'], earbudsImages['pod8a.jpg'], earbudsImages['pod8b.jpg']],
        dimages: [earbudsImages['pod8c.jpg'], earbudsImages['pod8d.jpg'], earbudsImages['pod8e.jpg']],
        descriptions: [
            { title: "TÖBB ESZKÖZHÖZ CSATLAKOZTATHATÓ", text: "A Bluetooth Multipoint segítségével élvezheti a készülékről készülékre való zökkenőmentes átmenet sokoldalúságát. Ugráljon a számítógépén lévő podcastról a mobilján lévő hívásra. Egyszerre két eszközhöz - mobilhoz, laptophoz és/vagy számítógéphez - csatlakozhat." },
            { title: "Hosszú akkumulátor élettartam", text: "A belső nanobevonat megvédi a vezeték nélküli fejhallgatót az esőtől vagy az izzadságtól az intenzív gyakorlatok során, csak élvezze az időt futás, kocogás, lovaglás, túrázás, fitness stb. közben." },
            { title: "POP it. Play it.", text: "A GO POP+ tökéletesen zsebméretű. Most élvezze a JLab alkalmazást a hangzás testreszabásához, a Be Aware-t a külső zajok hallgatásához és a Google Fast Pair segítségével keresse meg készülékét." },
        ],
        category: "Earbuds"
    },

    // Headphones kategória
    {
        id: 9,
        name: "Soundcore Anker Life Q20",
        price: 23500,
        image: headphonesImages['hph1.jpg'], // A fájl neve alapján keres
        images: [headphonesImages['hph1.jpg'], headphonesImages['hph1a.jpg'], headphonesImages['hph1b.jpg']],
        dimages: [headphonesImages['hph1c.jpg'], headphonesImages['hph1d.jpg'], headphonesImages['hph1e.jpg']],
        descriptions: [
            { title: "BassUp technológia", text: " Egyedi algoritmusunk valós idejű zenei elemzést végez az azonnal felerősített basszus érdekében." },
            { title: "Hi-Res Audio", text: "Élvezze a Hi-Res Audio-t a 40 mm-es dinamikus meghajtókon keresztül, amelyek tiszta, részletgazdag hangzást biztosítanak." },
            { title: "Mi van a dobozban", text: "Life Q20 x1; USB-C kábel x1; AUX kábel x1; utazótáska x1." },
        ],
        category: "Headphones"
    },
    {
        id: 10,
        name: "JBuds Lux ANC",
        price: 25000,
        image: headphonesImages['hph2.jpg'], // A fájl neve alapján keres
        images: [headphonesImages['hph2.jpg'], headphonesImages['hph2a.jpg'], headphonesImages['hph2b.jpg']],
        dimages: [headphonesImages['hph2c.jpg'], headphonesImages['hph2d.jpg'], headphonesImages['hph2e.jpg']],
        descriptions: [
            { title: "Felejthetetlen hang. Páratlan luxus.", text: "Tapasztalja meg a prémium hangzást a JBuds Lux ANC fejhallgatóval, amely a JLab audio kiválóságának új öröksége. Az innováció és a Lab-minőségű hangzás ötvözésével ezek az elegáns fejhallgatók emelkedett hallgatási élményt nyújtanak. Élvezze a zavartalan zenét a hibrid aktív zajszűréssel és a személyre szabott hangzást a JLab App segítségével. A Cloud Foam™ fülkagylók és a fejpánt kényelmet és stílust biztosítanak a páratlan hangélmény érdekében." },
            { title: "BLUETOOTH MULTIPOINT", text: "Csatlakozás bármely két eszközhöz a Bluetooth® Multipoint + vezeték nélküli megosztási móddal." },
            { title: "elforgatható FÜLKAGYLÓK", text: "Összecsukható, forgatható fülkagylóval." },
        ],
        category: "Headphones"
    },
    {
        id: 11,
        name: "ATH-M20X Professional",
        price: 24500,
        image: headphonesImages['hph3.jpg'], // A fájl neve alapján keres
        images: [headphonesImages['hph3.jpg'], headphonesImages['hph3a.jpg'], headphonesImages['hph3b.jpg']],
        dimages: [headphonesImages['hph3c.jpg'], headphonesImages['hph3d.jpg'], headphonesImages['hph3e.jpg']],
        descriptions: [
            { title: "ATH-M20x", text: "A tökéletes belépő szintű stúdiófejhallgató, az ATH-M20x vezetékes fejhallgató minden szükséges funkciót tartalmaz. A nyomkövetésre és monitorozásra tervezett, 40 mm-es meghajtókkal és a fokozott mélyfrekvenciás teljesítményre hangolt, zárt hátú fejhallgató hihetetlen hangélményt nyújt." },
            { title: "Könnyű, mégis tartós", text: "A kiváló minőségű felépítésnek köszönhetően egy könnyű, mégis tartós vezetékes fejhallgatót kapunk nyomon követéshez és megfigyeléshez, megfizethető áron. Az ATH-M20x professzionális minőségű fülpárnával és fejhallgató anyaggal készült, így kényelmes illeszkedést biztosít a hosszabb viselethez." },
            { title: "Páratlan hangszigetelés", text: "Ezek az Audio-Technica vezetékes, fülre szerelhető fejhallgatók páratlan hangszigetelést biztosítanak minimális hangszivárgás mellett, hogy egy dal minden ütemét vagy egy videojáték minden lépését hallja. Ez a tulajdonság a fül körüli körkörös kialakításnak köszönhető, amely a fül köré simul." },
        ],
        category: "Headphones"
    },
    {
        id: 12,
        name: "Nightfall Wireless Gaming Headset",
        price: 21500,
        image: headphonesImages['hph4.jpg'], // A fájl neve alapján keres
        images: [headphonesImages['hph4.jpg'], headphonesImages['hph4a.jpg'], headphonesImages['hph4b.jpg']],
        dimages: [headphonesImages['hph4c.jpg'], headphonesImages['hph4d.jpg'], headphonesImages['hph4e.jpg']],
        descriptions: [
            { title: "Game On, nappal vagy éjszaka", text: "Hódítsd meg az éjszakát, és indulj el a következő epikus játék-odüsszeiára a JLab Nightfall Gaming Wireless Headset segítségével, amely a PC- és PlayStation-játékosok tökéletes kiegészítője. Az USB-n vagy Bluetooth-on keresztüli kettős vezeték nélküli csatlakozással ez a fejhallgató páratlan hangzást biztosít a robusztus 50 mm-es meghajtókon keresztül, és mindkét fülhallgatóban hangszigetelő belső polccal rendelkezik, így teljesen belemerülhetsz a játékba." },
            { title: "KETTŐS VEZETÉK NÉLKÜLI KAPCSOLAT", text: "Kettős vezeték nélküli kapcsolat Bluetooth-on vagy USB-C dongle-on keresztül." },
            { title: "IRÁNYÍTOTT MIKROFON", text: "A közel helyezett mikrofon rögzíti a hangját és kiküszöböli a háttérzajt." },
        ],
        category: "Headphones"
    },
    {
        id: 13,
        name: "Nightfall Wired Gaming Headset",
        price: 22500,
        image: headphonesImages['hph5.jpg'], // A fájl neve alapján keres
        images: [headphonesImages['hph5.jpg'], headphonesImages['hph5a.jpg'], headphonesImages['hph5b.jpg']],
        dimages: [headphonesImages['hph5c.jpg'], headphonesImages['hph5d.jpg'], headphonesImages['hph5e.jpg']],
        descriptions: [
            { title: "A KÖVETKEZŐ JÁTÉK ODÜSSZEIA VÁR RÁD", text: "Hódítsd meg az éjszakát, és indulj el a következő játék-odüsszeiádra a JLab Nightfall Gaming Headset segítségével. A lenyűgöző funkciókkal büszkélkedő Nightfall Gaming Headset erőteljes hangzást kínál 50 mm-es meghajtókkal és hangszigetelő belső polccal a fülhallgatóban. A kifordítható mikrofon kristálytiszta csapatkommunikációt biztosít, és a nem kívánt háttérzajok kiküszöbölésével pontosan rögzíti a hangját. Élvezze az egész napos (vagy egész éjszakai) kényelmet a szuper széles állítható fejpánttal és a Cloud Foam fülkagylóval." },
            { title: "ÁLLÍTHATÓ FEJPÁNT", text: "Szuperszéles, állítható fejpánt az egész napos kényelem érdekében." },
            { title: "ELNÉMÍTHATÓ MIKROFON", text: "Flip-To-Mute forgatható boom mikrofon a tiszta csapatkommunikációhoz." },
        ],
        category: "Headphones"
    },
    {
        id: 14,
        name: "LEVN Wireless Headphones",
        price: 23200,
        image: headphonesImages['hph6.jpg'], // A fájl neve alapján keres
        images: [headphonesImages['hph6.jpg'], headphonesImages['hph6a.jpg'], headphonesImages['hph6b.jpg']],
        dimages: [headphonesImages['hph6c.jpg'], headphonesImages['hph6d.jpg'], headphonesImages['hph6e.jpg']],
        descriptions: [
            { title: "Nyisson új hangzásvilágot", text: " A LEVN nem csak könnyen tölthető, de a fejhallgató tárolására is okos megoldást kínál. Fokozza a szórakozás élményét!" },
            { title: "Az Ön privát oázisa", text: "Használja a LEVN fejhallgatót vezeték nélkül, hogy élvezze az eredeti HD hangzást anélkül, hogy aggódnia kellene a családja zavarása miatt." },
            { title: "Korlátlan szabadság", text: "A 30M-es csatlakozási távolság biztosítja, hogy a hang mindig önnel legyen, és korlátok nélküli szabadságot biztosít." },
        ],
        category: "Headphones"
    },
    {
        id: 15,
        name: "JLab Audio Studio Pro Wireless",
        price: 26500,
        image: headphonesImages['hph7.jpg'], // A fájl neve alapján keres
        images: [headphonesImages['hph7.jpg'], headphonesImages['hph7a.jpg'], headphonesImages['hph7b.jpg']],
        dimages: [headphonesImages['hph7c.jpg'], headphonesImages['hph7d.jpg'], headphonesImages['hph7e.jpg']],
        descriptions: [
            { title: "ÉREZD JÓL MAGAD", text: "Élvezze a végső kényelmet a Form-Fit™ fülhallgatóval, az ultra-puha Cloud Foam párnákkal és az állítható fejpánttal. Dolgozzon vagy játsszon egész nap a leghosszabb, több mint 50 órás akkumulátor-üzemidővel." },
            { title: "EGYÉNI EQ3 HANG", text: "Egyedi EQ3 hangok" },
            { title: "Imádom őket!", text: "Imádom, hogy mennyire kényelmesek, és milyen hangosak." },
        ],
        category: "Headphones"
    },

    // Speakers kategória
    { 
        id: 16, 
        name: "Bluetooth Speaker with HD Sound", 
        price: 12500, 
        image: speakersImages['spe1.jpg'], // A fájl neve alapján keres
        images: [speakersImages['spe1.jpg'], speakersImages['spe1a.jpg'], speakersImages['spe1b.jpg']],
        dimages: [speakersImages['spe1c.jpg'], speakersImages['spe1d.jpg'], speakersImages['spe1e.jpg']],
        descriptions: [
            { title: "Kis hangszóró, nagy hang.", text: "Tapasztalja meg a páratlan hangminőséget a csúcsminőségű Bluetooth hangszóróval." },
            { title: "Akár 24 órás játékidő", text: "Ez az újratölthető akkumulátor akár 24 órányi lejátszást is biztosít 50%-os hangerővel és kikapcsolt fényekkel." },
            { title: "TWS párosítás", text: "Két hangszórót csatlakoztathat egy eszközhöz a jobb hangminőség érdekében, ami valódi sztereó kimenetet eredményez." },
        ],
        category: "Speakers" 
    },
    { 
        id: 17, 
        name: "Passau", 
        price: 18000, 
        image: speakersImages['spe2.jpg'], // A fájl neve alapján keres
        images: [speakersImages['spe2.jpg'], speakersImages['spe2a.jpg'], speakersImages['spe2b.jpg']],
        dimages: [speakersImages['spe2c.jpg'], speakersImages['spe2d.jpg'], speakersImages['spe2e.jpg']],
        descriptions: [
            { title: "40 wattos Bass Boost", text: "Erőteljes sztereó hangzás 2 teljes tartományú meghajtóval a hordozható bluetooth hangszóróban, kettős passzív sugárzóval, amely erősített basszust, erős közepes és kristálytiszta magas hangzást biztosít torzítás nélkül, bármilyen hangerőn." },
            { title: "Színes fénytánc a zenére", text: "Az RGB fény ciklikusan változtatja a színeket, és szükség esetén ki is kapcsolható, a ritmus érzete erősebb, és a radiátor erősebben ver. A beépített mikrofonos basszus hangszóró lehetővé teszi a telefonhívások kezelését anélkül, hogy a telefonért nyúlna." },
            { title: "Kéz nélkül hordozható", text: "Az állítható, szakadásálló vállpántos kültéri hangszóró a könnyű hordozhatóság érdekében, a könnyű méret pedig arra szolgál, hogy bárhová magával vihesse vagy felakaszthassa." },
        ],
        category: "Speakers" 
    },
    { 
        id: 18, 
        name: "DZ-018 Bluetooth Speaker", 
        price: 14500, 
        image: speakersImages['spe3.jpg'], // A fájl neve alapján keres
        images: [speakersImages['spe3.jpg'], speakersImages['spe3a.jpg'], speakersImages['spe3b.jpg']],
        dimages: [speakersImages['spe3c.jpg'], speakersImages['spe3d.jpg'], speakersImages['spe3e.jpg']],
        descriptions: [
            { title: "Cool Light Show", text: "A hordozható Bluetooth hangszórók 7 dinamikus színváltó üzemmóddal rendelkeznek, a fények a zene ütemével szinkronban pulzálnak, azonnal vibráló energiát adva a partinak." },
            { title: "Hosszú lejátszási idő", text: "A PRSCFUM vezeték nélküli Bluetooth hangszórót egy tartós 800mAh lítium akkumulátor táplálja, amely mindössze 1,5 órás töltéssel akár 4 órányi zenelejátszást biztosít (a tényleges játékidő a hangerő, a hangtartalom és a használat függvényében változhat)." },
            { title: "Ultra könnyű", text: "Kompakt és könnyű kialakításának (94*94*82mm) köszönhetően könnyen hordozható." },
        ],
        category: "Speakers" 
    },
    { 
        id: 19, 
        name: "Motion X600", 
        price: 18500, 
        image: speakersImages['spe4.jpg'], // A fájl neve alapján keres
        images: [speakersImages['spe4.jpg'], speakersImages['spe4a.jpg'], speakersImages['spe4b.jpg']],
        dimages: [speakersImages['spe4c.jpg'], speakersImages['spe4d.jpg'], speakersImages['spe4e.jpg']],
        descriptions: [
            { title: "Halgass meg minden részletet", text: "A csúcskategóriás DSP nyolcszor jobb hangzást biztosít mint az átlagos hangszórók." },
            { title: "Hang, ami körülvesz", text: "Több dimenziós hangszínt hoz létre, amely körbe-körbe mozog." },
            { title: "IPX7 Vízálló", text: "Ne hagyd, hogy egy kis víz álljon te és kedvenc dalaid közé." },
        ],
        category: "Speakers" 
    },
    { 
        id: 20, 
        name: " Bluetooth Speakers BS/5 ", 
        price: 22500, 
        image: speakersImages['spe5.jpg'], // A fájl neve alapján keres
        images: [speakersImages['spe5.jpg'], speakersImages['spe5a.jpg'], speakersImages['spe5b.jpg']],
        dimages: [speakersImages['spe5c.jpg'], speakersImages['spe5d.jpg'], speakersImages['spe5e.jpg']],
        descriptions: [
            { title: "30W Erőteljes hang", text: "A kettős teljes tartományú meghajtók 30 W-os sztereó hangminőséget biztosítanak tiszta magas hangokkal, pontos középhangokkal, mély basszussal." },
            { title: "Bluetooth V5.0", text: "Bluetooth 5.0 a legmodernebb A2DP technológiával gyorsabb, stabilabb." },
            { title: "Pair-360° Immersive Surround Sound", text: "A vezeték nélküli párosítás funkció révén 2 hangszóró párosítása egyetlen eszközön keresztül a 60 W-os sztereó térhatású hangzás eléréséhez (a BT és az AUX lejátszási módok egyaránt támogatják a vezeték nélküli párosítás sztereó funkciójának megvalósítását, és javítottuk a vezeték nélküli párosítás állapotának késleltetési jelenségét)." },
        ],
        category: "Speakers" 
    },
    { 
        id: 21, 
        name: "TREBLAB HD77", 
        price: 21200, 
        image: speakersImages['spe6.jpg'], // A fájl neve alapján keres
        images: [speakersImages['spe6.jpg'], speakersImages['spe6a.jpg'], speakersImages['spe6b.jpg']],
        dimages: [speakersImages['spe6c.jpg'], speakersImages['spe6d.jpg'], speakersImages['spe6e.jpg']],
        descriptions: [
            { title: "Tartósra építve, stressz nélkül!", text: "Fokozza kalandjait egy porálló Bluetooth hangszóróval, amely készen áll arra, hogy elkísérje bármilyen utazásra." },
            { title: "Emelje fel a golfélményt", text: "Fokozza a golfozást HD77 hangszórókkal. Élvezze a dallamokat a swing elsajátítása közben." },
            { title: "Sztereó párosítás", text: "Párosítson két HD77 hangszórót, hogy hangosabban bulizzon, és élvezze a valódi vezeték nélküli sztereó élményt." },
        ],
        category: "Speakers" 
    },

    // Microphones kategória
    { 
        id: 22, 
        name: "MAONO Dynamic Gaming Microphone", 
        price: 18500, 
        image: microphonesImages['mic1.jpg'], // A fájl neve alapján keres
        images: [microphonesImages['mic1.jpg'], microphonesImages['mic2.jpg'], microphonesImages['mic3.jpg']],
        dimages: [microphonesImages['mic1c.jpg'], microphonesImages['mic1d.jpg'], microphonesImages['mic1e.jpg']],
        descriptions: [
            { title: "Dupla zajszűrés", text: "A MAONO XLR dinamikus mikrofon egyedi dinamikus mikrofonmagot és a legújabb, saját fejlesztésű algoritmust használ a környezeti zajok hatásának minimalizálására, ezáltal elérve a zajcsökkentés célját. A MAONO Link szoftveres zajcsökkentés szabadon beállíthatja a zajcsökkentési szintet, hogy alkalmazkodjon a különböző használati környezetekhez, legyen szó játékról, streamről vagy podcastről." },
            { title: "Az RGB-fényerő pontos beállítása", text: "A pc gaming mikrofon a Maono link segítségével pontosan beállíthatja az RGB fényerőt a használati környezetnek megfelelően. Az USB streaming mikrofon egyedi RGB kialakítással rendelkezik, 3 üzemmóddal és 9 színválasztékkal, testreszabható statikus és dinamikus RGB fényhatásokkal, amelyek tökéletesen kiegészítik a PC-s játékfelszerelést." },
            { title: "Érintse meg a némításhoz", text: "Akár játék, podcast, csevegés vagy élő közvetítés közben, csak érintse meg a csendes, lágy érintésű némító gombot a némításhoz, ami segít elkerülni a kínos, streaming hanggal kapcsolatos baleseteket, és jobban védi a magánéletét." },
        ],
        category: "Microphones" 
    },
    { 
        id: 23, 
        name: "MAONO XLR/USB", 
        price: 25000, 
        image: microphonesImages['mic2.jpg'], // A fájl neve alapján keres
        images: [microphonesImages['mic2.jpg'], microphonesImages['mic2a.jpg'], microphonesImages['mic2b.jpg']],
        dimages: [microphonesImages['mic2c.jpg'], microphonesImages['mic2d.jpg'], microphonesImages['mic2e.jpg']],
        descriptions: [
            { title: "Tiszta játékélmény", text: "A 40Hz-16KHz ultra széles frekvenciaválasz éles és eredeti hangzást biztosít a magával ragadó játék és streaming élményhez. A precíziós kardioid hangszedő szerkezet csökkenti a nem kívánt háttérzajokat, így mindig tiszta énekhangot biztosít." },
            { title: "Áramvonalas vezérlés a könnyed felhasználói élményért", text: "A 2 az 1-ben intelligens gomb lehetővé teszi a dinamikus mikrofonerősítés és a fejhallgató hangerejének egyszerű beállítását, míg a LED-es kijelzővel ellátott egykattintásos némító gomb gyorsan elnémítja a mikrofont, zökkenőmentes átmenetet biztosítva a felvételek vagy az élő munkamenetek során." },
            { title: "Érintse meg a némításhoz", text: "Akár játék, podcasting, csevegés vagy élő közvetítés közben, csak érintse meg a csendes, lágy érintésű némító gombot a némításhoz, ami segít elkerülni a kínos, streaming hanggal kapcsolatos baleseteket, és jobban védi a magánéletét." },
        ],
        category: "Microphones" 
    },
    { 
        id: 24, 
        name: "TONOR Dynamic Microphone", 
        price: 14500, 
        image: microphonesImages['mic3.jpg'], // A fájl neve alapján keres
        images: [microphonesImages['mic3.jpg'], microphonesImages['mic3a.jpg'], microphonesImages['mic3b.jpg']],
        dimages: [microphonesImages['mic3c.jpg'], microphonesImages['mic3d.jpg'], microphonesImages['mic3e.jpg']],
        descriptions: [
            { title: "Meleg és kiegyensúlyozott ének", text: "A kiváló dinamikus mag gazdag, természetes hangzású éneket rögzít. Frissítse hangját a következő szintre." },
            { title: "Plug and Play", text: "Nincs szükség további meghajtóra az USB-csatlakozáshoz, rendkívül egyszerű a használata." },
            { title: "Nulla késleltetés", text: "Támogatja a 3,5 mm-es fejhallgató-csatlakozást, így valós időben továbbítja hangját." },
        ],
        category: "Microphones" 
    },
    { 
        id: 25, 
        name: "HyperX QuadCast S", 
        price: 21500, 
        image: microphonesImages['mic4.jpg'], // A fájl neve alapján keres
        images: [microphonesImages['mic4.jpg'], microphonesImages['mic4a.jpg'], microphonesImages['mic4b.jpg']],
        dimages: [microphonesImages['mic4c.jpg'], microphonesImages['mic4d.jpg'], microphonesImages['mic4e.jpg']],
        descriptions: [
            { title: "Tap-to-mute érzékelő LED állapotjelzővel", text: "Használja a kényelmes elnémítási funkciót, hogy a LED-es mikrofonállapot-jelző segítségével megelőzze a balesetveszélyes hangzást. Alapértelmezés szerint, ha a fény világít, a mikrofon aktív. Ha a fény nem világít, a mikrofon el van némítva." },
            { title: "Több eszközzel és programmal való kompatibilitás", text: "Nagyszerű hangzást élvezhetsz, akár PC-hez, PS4/PS5-hez vagy Mac számítógéphez csatlakoztatod. A QuadCast S a Discord és a TeamSpeak által tanúsított, és olyan főbb streaming platformokon működik, mint a Streamlabs OBS, OBS Studio és XSplit. Nem számít, hogyan közvetít, biztos lehet benne, hogy hangosan és tisztán hallják." },
            { title: "Erősítésszabályozó beállítása", text: "Könnyedén beállíthatja a mikrofon érzékenységét a QuadCast alján található tárcsa elforgatásával." },
        ],
        category: "Microphones" 
    },
    { 
        id: 26, 
        name: "TONOR USB Microphone", 
        price: 22500, 
        image: microphonesImages['mic5.jpg'], // A fájl neve alapján keres
        images: [microphonesImages['mic5.jpg'], microphonesImages['mic5a.jpg'], microphonesImages['mic5b.jpg']],
        dimages: [microphonesImages['mic5c.jpg'], microphonesImages['mic5d.jpg'], microphonesImages['mic5e.jpg']],
        descriptions: [
            { title: "Pop szűrő", text: "A popszűrő segít éles hangot felvenni légáramlási zaj nélkül. Így a hangja tiszta lesz." },
            { title: "Rezgéscsillapító rögzítés", text: "Kivételes rezgéscsillapítást biztosít, és csökkenti a rázkódás okozta zajt." },
            { title: "Fejhallgató-csatlakozó", text: "A 3,5 mm-es fejhallgató-csatlakozóval késedelem nélkül, valós időben rögzítheti a felvételt." },
        ],
        category: "Microphones" 
    },
    { 
        id: 27, 
        name: "HyperX QuadCast", 
        price: 23000, 
        image: microphonesImages['mic6.jpg'], // A fájl neve alapján keres
        images: [microphonesImages['mic6.jpg'], microphonesImages['mic6a.jpg'], microphonesImages['mic6b.jpg']],
        dimages: [microphonesImages['mic6c.jpg'], microphonesImages['mic6d.jpg'], microphonesImages['mic6e.jpg']],
        descriptions: [
            { title: "Mikrofon rögzítés", text: "Az adapter 3/8 hüvelykes és 5/8 hüvelykes menetes elrendezéshez illeszkedik a legtöbb mikrofonállványhoz vagy szórókeret-kar szerelvényekhez." },
            { title: "Érintéssel elnémít", text: "Ha a lámpa világít, a mikrofon aktív, ha a lámpa nem világít, a mikrofon némítva van." },
            { title: "Poláris minták", text: "Válasszon a négy poláris minta közül az adás beállításának optimalizálásához." },
            
        ],
        category: "Microphones" 
    },
    { 
        id: 28, 
        name: "Gaming Microphone V5-P", 
        price: 24000, 
        image: microphonesImages['mic7.jpg'], // A fájl neve alapján keres
        images: [microphonesImages['mic7.jpg'], microphonesImages['mic7a.jpg'], microphonesImages['mic7b.jpg']],
        dimages: [microphonesImages['mic7c.jpg'], microphonesImages['mic7d.jpg'], microphonesImages['mic7e.jpg']],
        descriptions: [
            { title: "Azonnali zajcsökkentés", text: "A külön zajcsökkentő gombbal a legtöbb zaj kiküszöbölhető."},
            { title: "Professzionális hangteljesítmény", text: "A professzionális hangzás professzionálisabb élményt nyújt." },
            { title: "Nem foglal helyet", text: "Mindössze 3,55 hüvelyk átmérőjű, így egyáltalán nem foglal helyet az asztalon." },
            
        ],
        category: "Microphones" 
    },
];

export default ProductsData;