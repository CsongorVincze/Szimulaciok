---
title: 'Bevezetés a vektorterekbe'
description: 'A vektorterek axiomatikus felépítése, lineáris kombináció, függetlenség és bázis.'
pubDate: 'Jan 02, 2026'
heroImage: '../../assets/sponge.png'
tags: ['math', 'linear-algebra', 'vectors']
---

## Vektorterek

*   Mi az a vektor?
*   A vektor a vektortér egy eleme.
*   Na de akkor mi az a vektortér?
*   A vektortér egy olyan matematikai struktúra, amelyre igazak a következő állítások / axiómák.

Legyen egy $K$ test (általában $\mathbb{R}$ vagy $\mathbb{C}$). Azt mondhatjuk, hogy $V$ egy vektortér $K$ felett, ha: (az alábbiakban $u,v,w\in V$ és $\lambda,\mu\in K$)

**Összeadás**

Legyen
$$
+ : V\times V \to V,\qquad (u,v)\mapsto u+v.
$$
A következő tulajdonságok teljesülnek:
1. $u+(v+w)=(u+v)+w$ (asszociatív)
2. $u+v=v+u$ (kommutatív)
3. $\exists\,0\in V$ olyan, hogy $0+v=v$ minden $v\in V$ esetén (nullvektor)
4. Minden $v\in V$-hez létezik $-v\in V$ úgy, hogy $v+(-v)=0$ (ellenkező elem)

**Skalárral való szorzás**

Legyen
$$
\cdot : K\times V \to V,\qquad (\lambda,v)\mapsto \lambda v.
$$
A következő axiómák teljesülnek:
1. $\lambda(\mu v)=(\lambda\mu)v$ (asszociativitás a skalárokkal)
2. $\exists\,1\in K$ úgy, hogy $1\cdot v = v$ minden $v\in V$ esetén
3. $(\lambda+\mu)v=\lambda v + \mu v$ (disztributivitás a skalárok összeadására)
4. $\lambda(v+u)=\lambda v + \lambda u$ (disztributivitás a vektorok összeadására)

**Példák vektorterekre**

*   $\mathbb{R}^n$, $\mathbb{C}^n$
*   $C(\mathbb{R},\mathbb{R})$ (folytonos függvények tere)
*   Sorozatok tere (mindenütt definiált összeadás és skalárszorzás) <!-- ez itt miez -->
*   $\{0\}$ (triviális vektortér)

## Lineáris kombináció

Az axiómákból következik, hogy ha $I$ indexhalmazon
1. $\forall i\in I:\; u_i\in V$,
2. $\forall i\in I:\; \lambda_i\in K$,

akkor
$$
v=\sum_{i\in I}\lambda_i u_i \in V.
$$
Ekkor azt mondjuk, hogy $\sum_{i\in I}\lambda_i u_i$ az $(u_i)_{i\in I}$ vektorok valamely lineáris kombinációja.

## Lineáris függetlenség

Az $(u_i)_{i\in I}$ vektorrendszer elemei lineárisan függetlenek, ha
$$
\sum_{i\in I}\lambda_i u_i = 0 \quad\Longleftrightarrow\quad \forall i\in I:\; \lambda_i = 0.
$$
Szóban: az $(u_i)_{i\in I}$ vektorrendszer elemei akkor és csak akkor lineárisan függetlenek, ha a nullvektort előállító lineáris kombinációban szereplő összes együttható nulla.

<div id="linear-independence-container" style="display: flex; flex-direction: column; align-items: center; margin: 2rem 0;"></div>
<script is:inline src="/libraries/p5.min.js"></script>
<script is:inline src="/linear_independence_sim.js"></script>

**Feladatok**

1. Vizsgáljuk, hogy egyetlen vektor $v\in V$ lineárisan független-e.
2. Tegyük fel, hogy $V=\mathbb{R}^2$. Vizsgáljuk, hogy a következő két vektor lineárisan független-e:
   $$
   a=(0,1),\qquad b=(1,1).
   $$

## Bázis

Egy $V$ vektortérben az $(u_i)_{i\in I}$ vektorrendszer bázis, ha
1. $(u_i)_{i\in I}$ lineárisan független,
2. minden $x\in V$ előállítható az $(u_i)_{i\in I}$ lineáris kombinációjaként, azaz $\operatorname{span}\{u_i:i\in I\}=V$.
<!--todo na ezt en nem igy irtam -->

**Állítás**: Minden vektortérben van bázis.
<!-- 
> 🙋‍♂️ **Hallgató**: Várjunk csak, tényleg *minden* vektortérnek van bázisa? Még a legbonyolultabb, végtelen dimenziós tereknek is?
>
> 👨‍🏫 **Oktató**: Igen, ez egy alapvető tétel a lineáris algebrában. Bár a végtelen dimenziós esetekben a bizonyításhoz szükség van a kiválasztási axiómára, elméletileg minden vektortér rendelkezik bázissal. -->

## Skalárszorzatos vektorterek

🙋‍♂️: Várjunk csak, a 3 dimenziós térben tudtunk vektorokat szorozni pl.: skalárisan vagy vektoriálisan. Ezt a tulajdonságot nem általánosítottuk?

👨‍🏫: Ez egy nagyon ügyes észrevétel! (jár érte egy csoki) A vektorterekre adott általános definíciónk valóban nem foglalja magába a vektorok szorzását. Azonban egyes vektorterekben létezik skaláris szorzás ezeket a vektortereket -- nagyon meglepő módon -- skalárszorzatos vektortereknek nevezzük. Például ahogy láttuk a sík ($\mathbb{R}^2$) vektorteret alkot (a valós számtest fölött), és a síkon 2 vektornak létezik skaláris szorzata.

🙋‍♂️: Hmm... Es mi a helyzet a folytonos függvényekkel azok is vektorteret alkotnak, nem? Ott nem tudom csak úgy összeszorozni a vektorok komponenseit mint egy ($\mathbb{R}^n$)-es vektortérben. Akkor itt nincs skaláris szorzás?

👨‍🏫: Igen igen, ez egy nehézség. Ha emlékszel a középiskolában tanult vektorról alkotott kép valami olyasmi volt, hogy egy síkon vagy egy térben lakó nyilacska vagy egymás alá pakolt számok. Amikor bevezettük a vektortereket valahogy megvizsgáltuk, hogy milyen belső tulajdonságokkal bírnak a ezek a vektorok. Ezeket a tulajdonságokat megtartottuk és ezekből megalkottuk a vektortér axiómáit. Most valami hasonlót fogunk csinálni a skalárszorzással is. Vajon milyen tulajdonságai vannak a síkon vett standard skalárszorzásnak?

🙋‍♂️: Gondolkozzunk... Vegyünk két vektort, mondjuk $a$-t és $b$-t. 1. Ha $a$ hosszát 2-szeresére növelem akkor a skalárszorzat is kétszer akkora lesz. Ezt geometriailag láthatjuk. 2. Ha veszünk egy harmadik vektort, mondjuk $c$-t, akkor ha $a + b$-t skalárisan szorozzuk $c$-vel az igazából ugyan olyan mintha először $a$-t szoroztuk volna $c$-vel és aztán ehhez hozzáadtuk volna $b$ és $c$ saklárszorzatát. Ezt pedig onnét tudhatjuk, hogy ha kibontjuk a skalárszorzatot komponensekre akkor ott már a szorzás disztributív a valós számokon és utána átrendezzük az összeget. 3. Hogyha $a$-t önmagával skalárszorozzuk akkor biztos, hogy egy pozitív számot kapunk, feltéve persze, hogy $a$ nem nullvektor. Hmmm... nem tudom mi van még. Ja igen talán még egy. 4. Felcserélhetjük a szorzás sorrendjét és ugyan azt az eredményt kapjuk. Tehát $a$ szor $b$ = $b$ szer $a$

👨‍🏫: Wooow, nagyon jo ügyesen megfigyelted ezeket a tulajdonságokat! Persze egy kis kiegészítésre azért szükség lesz, ha a vektorterünket esetleg komplex számtest felett akarjuk definiálni, de alapvetően elég hasonló marad a szitu ahhoz amit mondtál. (Használjuk a $ \langle \cdot, \cdot \rangle $ jelölést.)

<!-- todo ide johetne kérdés -->

Skalárszorzat feltétele egy vektortérben:

1. $ \langle a, b \rangle = \overline{\langle b, a \rangle} $
2. $ \langle \lambda a, b \rangle = \bar{\lambda} \langle a, b \rangle $
3. $ \langle a + b, c \rangle = \langle a, c \rangle + \langle b, c \rangle $
4. $ \langle a, a \rangle > 0 $ ha a nem a nullvektor
5. $ \langle a, a \rangle = 0 $ ha a a nullvektor

🙋‍♂️: Oké, nézhetnénk erre egy példát?


## Na

### haloooo

### sziaaaaa

## csaaa (from: Vektorterek; to: Na)



SPONGZABOBOS KEPEN MATRIXOK NEZEGETESE