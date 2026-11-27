# Frugo backoffice frontend

## Účel

Jednostránková webová aplikace pro interní správu systému Frugo. Přes REST API backendu umožňuje zaměstnancům obsluhovat skladové a administrativní procesy: evidenci produktů a zásob, palet a pohybů, objednávek a expedic, nákupních objednávek a jejich příjem, zákazníků a dodavatelů, zaměstnanců, skladů, číselníků, rolí/oprávnění a provozních událostí.

## Technologie

- React 19, TypeScript 6, Vite 8.
- React Router 7 pro klientské směrování.
- Bootstrap 5 a Bootstrap Icons pro základní stylování; vlastní styly jsou v CSS souborech.
- `fetch` pro HTTP komunikaci a `html5-qrcode` pro skenování QR kódů.
- npm skripty: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.

## Struktura aplikace

- `src/App.tsx`: kořenový router; přihlašovací stránka a chráněná oblast `/dashboard`.
- `src/routes/routes.tsx`: seznam obrazovek dashboardu a jejich požadovaných oprávnění.
- `src/pages`: stránky přihlášení a jednotlivých částí dashboardu.
- `src/components`: opakovaně použitelné části UI, layout, tabulky, modály, formuláře a skener.
- `src/hooks`: načítání, filtrování, validace a ukládání dat pro konkrétní funkce.
- `src/api`: API funkce a společný klient (`ApiClient.ts`).
- `src/utils/permissions.ts`: pomocná kontrola oprávnění na straně UI.
- `src/main.tsx`: inicializace Reactu a globálních Bootstrap stylů.

## Hlavní obrazovky

Dashboard obsahuje sekce skladových položek (včetně přesunu a rozdělení), palet, produktů, objednávek, expedic, zaměstnanců a oddělení, zákazníků, dodavatelů, nákupních objednávek a příjmu, skladů a typů sektorů, číselníků, rolí a uživatelů a historie událostí/pohybů. Konkrétní cesty a oprávnění jsou centrálně uvedeny v `src/routes/routes.tsx`.

## Přihlášení, oprávnění a API

- Přihlášení obrazovky volá `POST /api/auth/login` a ukládá token, roli, uživatelské jméno a oprávnění do `localStorage`.
- Dashboard vyžaduje přítomnost tokenu; jednotlivé obrazovky jsou obalené `ProtectedRoute` s odpovídajícím permission kódem.
- API základní adresa pochází z `import.meta.env.VITE_API_URL` v `src/api/config.ts`. Nastavte ji ve Vite prostředí, například v `.env.local`, na adresu backendu včetně případného portu.
- `apiRequest` přidává Bearer token a JSON hlavičky, kontroluje HTTP chyby a podporuje také odpovědi typu blob pro soubory.
- Frontendová kontrola oprávnění řídí dostupnost obrazovek v UI. Skutečné zabezpečení musí vždy vynucovat backend.

## Lokální spuštění

Po instalaci závislostí:

```powershell
npm install
npm run dev
```

Vite standardně nabízí aplikaci na `http://localhost:5173`, což odpovídá CORS originu nastavenému v backendu. Před použitím nastavte `VITE_API_URL` a spusťte backend s dostupnou databází. Produkční sestavení vytvoří Vite ve `dist/` pomocí `npm run build`.

## Důležité poznámky

- Token i oprávnění jsou uchovávány v `localStorage`; při změně autentizačního řešení je potřeba upravit přihlášení, API klienta i route guard.
- Některé API moduly volají `fetch` samostatně, zatímco ostatní používají `apiRequest`; při úpravách chování autentizace a chybových stavů zkontrolujte oba způsoby.
- `README.md` stále obsahuje výchozí text šablony React/Vite; tento dokument popisuje vlastní aplikaci.
- Tento přehled vychází z aktuálního zdrojového kódu a konfigurace; build ani lint nebyly spuštěny.
