# START HERE (read this first, in any new chat)

## Goal
- **Phase 1 (now):** understand what the 2021 Google Apps Script system did, function by function.
- **Phase 2 (later):** build a new crypto trading bot.
- Not the goal: more documents, more rules, more detail than needed.

## Rules (only 5)
1. Never edit the original files in `legacy-source/`.
2. Test each function in a NEW Google Sheet. Copy the function unchanged.
3. Write results in `catalog/function-catalog.md`. Label each finding FACT / INTERPRETATION / HYPOTHESIS.
4. Every function gets a verdict: **KEEP / DUPLICATE / SKIP**. Decide quickly.
5. Claude never writes a finding or verdict as confirmed unless Karl reviewed it together with Claude.

## Earlier notes (NOT confirmed by Karl yet)
These come from earlier analysis with scripts only. Nobody has run the functions yet. Treat all of it as INTERPRETATION until reviewed together.
- **Main working script:** `legacy-source/baseDeDatosCoinmarketCap/pruebaBeforeProduction.gs` (489 lines). Script last edited Dec 2021. It still runs (checked Sep 2026).
- `prueba` project = sandbox. Files with `Math.random()` are test versions of the API code.
- Big files: `ChangesAPIColourbc.gs` (random test) and `ValuesChangebc.gs` (real API) share most of their code.
- `sortChangesbc.gs`: every function is commented out. It does nothing when run (earlier note, to confirm).
- `proofOfCrypto.gs`: random-value version, API part commented out.
- Three different API-key rotation setups exist: 4 keys/366 credits (`backupCode.gs`), 14 keys/333 credits (`pruebaBeforeProduction.gs`), 5 keys/366 credits (`ValuesChangebc.gs`).
- Only `findInABounches.gs` (`onEdit`) uses prueba's own sheets.
- Several scripts point to sheets that do not exist in `prueba.xlsx`.
- The 3 copies of baseDeDatosCoinmarketCap are manual version copies (INTERPRETATION, not checked by diff).
- Sheets in `prueba.xlsx`: percentChangeInversion, Aleatorios, coinbase, BaseDeDatos, SeguimientoCompleta, ChangeAPI, sandbox_test.
- `changesOnAPI()` (ValuesChangebc.gs) vs `changesColours()` (ChangesAPIColourbc.gs): the API version adds the live price, 24h volume change and credit/error handling. The other uses `Math.random()*100`. Both use the same two helper functions.
- `changesOnAPI()` has a condition `percentCalulate >= -1 && percentCalulate < 0.75`. Keep it as-is, unknown if it is a typo.
- Dates and history of the workbooks: see `analysis/workbook-timeline.md`.

## Open questions that matter for the bot
- Which API keys still work? (Test with one small request.)
- Is CoinMarketCap free tier enough, or do we need another data source?
- Was the bucket/percentage strategy ever useful? (HYPOTHESIS: not validated.)

## Plan
| # | Task | Status |
|---|------|--------|
| 1 | Inventory: size and type of every `.gs` file (17 files) (LIBRARY / SCRIPT / INACTIVE) | DONE 2026-09-29 HH:MM. Result: `analysis/file-inventory-claude.md` (17 files, smallest first, Type column still TBD) |
| 2 | Decide the Type (LIBRARY / SCRIPT / INACTIVE) of each file with Karl, one at a time, in inventory order (file 1 = `deleteDuplicateRows.gs`). Then LIBRARY files: test their functions in a new Google Sheet, smallest first. Log in `catalog/function-catalog.md` | IN PROGRESS (Types decided: 0 of 17) |
| 3 | Big SCRIPT files: run a line-by-line comparison A vs B, review the line map, decide COPY / EVOLUTION / DIFFERENT | TODO |
| 4 | Read `pruebaBeforeProduction.gs` function by function (it is the version known to work) | TODO |
| 5 | Check which API keys work | TODO |
| 6 | Decide: keep CoinMarketCap or look for another source | TODO |
| 7 | Trading research (what to analyze) | LATER |

**Order = file size (smallest first), decided by the inventory table `analysis/file-inventory-claude.md`, not by hand.**

**Tools:** the Python tools are kept on Karl's PC only (not in GitHub). Their reports are saved in `analysis/`. Roles: any AI can be the orchestrator (preferred: Claude). The orchestrator reads the repo and gives instructions, and writes no code. A second AI (preferred: Claude) is the worker and writes and runs the scripts. If Claude runs out of tokens, Karl continues with another AI (Gemini or ChatGPT) in the same roles.

**Karl's tip (HYPOTHESIS, not verified):** files with `Math.random()` are the base of the files that have API-key fields. Compare each random version with its API version first.

## Raw links (for AI chats that cannot open GitHub pages)
Base: `https://raw.githubusercontent.com/KarlKrieger1/crypto-legacy-research/main/`
Add the path, for example `START-HERE.md` or `catalog/function-catalog.md`.
Paste the full links in your message. Some AIs can only open links that appear in the message.

## Log (add one line per session)
- 2026-09-29 21:00: Task 1 done (commit 4aa2c54). Next: Type of file 1.

## Review order (one file at a time, Type decided by Karl + orchestrator)
Same order as analysis/file-inventory-claude.md (smallest first):
1 deleteDuplicateRows, 2 sortColumns, 3 findAssetsbc, 4 eliminarRepetidos, 5 codebc, 6 Codigo, 7 buscarRepetidos, 8 findIDS, 9 combinationFiltered, 10 findInABounches, 11 changeFormatOfAcellbc, 12 sortChangesbc, 13 ValuesChangebc, 14 proofOfCrypto, 15 backupCode, 16 pruebaBeforeProduction, 17 ChangesAPIColourbc
Progress: 0 of 17 have a Type.

## Roles
- Orchestrator Claude: reads repo by raw link, gives instructions, writes no code (saves tokens).
- Worker Claude: writes/runs scripts (on Karl's PC only), saves results in analysis/.
- Karl: runs the git commits, pastes raw links in his own message.

## Open items from inventory
- pruebaBeforeProduction.gs = 540 lines (FACT), earlier note said 489.
- ChangesAPIColourbc.gs: only 1 function found, unexplained.
- 2026-09-29: Task 1 done (commit 4aa2c54). Next: Type of file 1.