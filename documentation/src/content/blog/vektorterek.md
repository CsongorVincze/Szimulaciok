---
title: 'Bevezetés a vektorterekbe'
description: 'A vektorterek axiomatikus felépítése, lineáris kombináció, függetlenség és bázis.'
pubDate: 'Jan 02, 2026'
heroImage: '../../assets/blog-placeholder-about.jpg'
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

### Példák vektorterekre

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

## Feladatok

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