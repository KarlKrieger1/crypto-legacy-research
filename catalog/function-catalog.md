# Function Catalog

**Rule:** a function is written here ONLY after Karl and AIs reviewed it together
and it was tested in a new Google Sheet. Nothing is added by AIs alone.

## Template (copy for each reviewed function)

```
### functionName()  (file.gs)
- Verdict: KEEP / DUPLICATE / SKIP
- What it does (FACT, from reading the code together):
- Sheets / ranges / services used:
- Calls / called by:
- Test done in new Google Sheet: yes/no
- Test result (what we saw):
- Notes / risks:
```

## Reviewed functions

### removeDuplicates()  (prueba/deleteDuplicateRows.gs)
- Verdict: KEEP (decided by Karl, 2026-09-30 [13:46]). The idea is needed; the code is rewritten.
- What it does (FACT, tested): removes duplicate rows from a sheet, keeps the first copy, keeps the order and the header.
- Sheets / ranges / services used: SpreadsheetApp, the active tab, all the data range (getDataRange, getValues, clearContents, setValues).
- Calls / called by: not checked yet.
- Test done in new Google Sheet: yes
- Test result (FACT): original removed 3 of 8 rows correctly. It worked on the open tab, and it deleted a different row when cells had commas (`a,b | c` vs `a | b,c`). The refactored version `removeDuplicateRows(sheet)` removed the same 3 rows, kept the comma rows, and did not touch the open tab (`other_tab`).
- Notes / risks: the original deletes data if the wrong tab is open. Refactored version: `refactored/deleteDuplicateRows.gs`.

### sortSheet()  (ParesDeCryptosExchanges/sortColumns.gs)
- Verdict: KEEP (decided by Karl, 2026-09-30 [17:21]). The idea is needed; the code is rewritten.
- What it does (FACT, tested): sorts the first 7 rows of the tab `sortColumn` by column 5, big to small.
- Sheets / ranges / services used: SpreadsheetApp, tab `sortColumn` (fixed name), getDataRange, getRange, sort.
- Calls / called by: not found. The tab `sortColumn` was empty in the original Sheet (reported by Karl), so the real use is unknown.
- Test done in new Google Sheet: yes
- Test result (FACT): original sorted rows 1-7 as expected and left rows 8-9 alone. Refactored `sortSheetByColumn(sheet, 5, false, 1)` gave the same order on the same data, with the header in row 1.
- Notes / risks: the original ignores data below row 7. Can go after duplicate removal (Karl, INTERPRETATION). Refactored version: `refactored/sortColumns.gs`.