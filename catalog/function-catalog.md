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
- Verdict: KEEP (decided by Karl, 2026-09-30 [TIME]). The idea is needed; the code is rewritten.
- What it does (FACT, tested): removes duplicate rows from a sheet, keeps the first copy, keeps the order and the header.
- Sheets / ranges / services used: SpreadsheetApp, the active tab, all the data range (getDataRange, getValues, clearContents, setValues).
- Calls / called by: not checked yet.
- Test done in new Google Sheet: yes
- Test result (FACT): original removed 3 of 8 rows correctly. It worked on the open tab, and it deleted a different row when cells had commas (`a,b | c` vs `a | b,c`). The refactored version `removeDuplicateRows(sheet)` removed the same 3 rows, kept the comma rows, and did not touch the open tab (`other_tab`).
- Notes / risks: the original deletes data if the wrong tab is open. Refactored version: `refactored/deleteDuplicateRows.gs`.