# Workbook & Script Timeline (from Google version history)

## FACT
| Project | Workbook created | Workbook edits | Script edits |
|---|---|---|---|
| baseDeDatosCoinmarketCap | 10-Dec-2021 | 18-Jul-2025, 24-Sep-2026 (last ver. 25-Sep-2026) | 15-Dec-2021 |
| copy 17-12-2025 | — | 19-Jul-2025, 25-Sep-2026 | 19-Jul-2025 |
| Copy of baseDeDatosCoinmarketCap | — | 20-Dec-2025, 25-Sep-2026 | 20-Dec-2025 |
| data follow | 04-Dec-2021 | none since | no script |
| ParesDeCryptosExchanges | 01-Oct-2021 | 15-Jan-2022, 24-Sep-2026 (last ver. 25-Sep-2026) | 24-Nov-2021 only |
| prueba | 14-Sep-2021 | 18-Nov-2021 (none since) | 25-Sep-2026 (script only, not workbook) |

## INTERPRETATION
- Karl returned to this project in two waves after the initial 2021
  build: Jul 2025, then Dec 2025 — coinciding with when he began using
  AI tools (stated: December 2025). The Sep 2026 activity is the
  current forensic-reconstruction effort (this repo).
- `prueba`'s workbook has been dormant since 2021; only its code has
  been touched recently, confirming current activity is code review,
  not live data collection.
- Karl never used git/version control on the original project — instead,
  whenever he wanted to test a change, he made a full manual copy of
  the workbook+script and edited the copy. This is the actual reason
  three near-identical copies of baseDeDatosCoinmarketCap exist
  (the book itself, "copy 17-12-2025", and "Copy of
  baseDeDatosCoinmarketCap") — they are his manual version history,
  not parallel production instances.
- The Sep 2026 edits to baseDeDatosCoinmarketCap.xlsx and
  ParesDeCryptosExchanges.xlsx were execution-only (running the script
  to check it still works), not data or logic changes. Confirmed: the
  script still runs successfully as of Sep 2026.
- "data follow" has no associated script and is hypothesized (not yet
  confirmed) to be the workbook where the ~10,000-coin CoinMarketCap
  database dump was stored — this was likely a one-time manual
  download/import, not a scripted process.
  - Only one copy of pruebaBeforeProduction.gs was uploaded to
  legacy-source/ (under baseDeDatosCoinmarketCap/). Karl recalls the
  copies in "copy 17-12-2025" and "Copy of baseDeDatosCoinmarketCap"
  contained identical code — the copies were made to test running the
  workbook/data, not to modify the script. This has not been verified
  by diff; treat as INTERPRETATION unless confirmed otherwise later.