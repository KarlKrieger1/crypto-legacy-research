# Review: deleteDuplicateRows.gs

- **What it does:** Reads all data from the active sheet tab, filters out duplicate rows, clears the sheet, and writes back only the unique rows.
- **The test:** 
  - Data used: Duplicate entries of Apple, Banana, and Orange across columns A and B.
  - Steps: Pasted code into Apps Script and ran `removeDuplicates()`.
  - Result: Successfully removed duplicates, but targeted the `percentChangeInversion` tab instead of the active tab (`sandbox_test`) due to `getActiveSheet()`.
- **Risks:** Uses `getActiveSheet()` and clears contents (`sheet.clearContents()`), which can affect the wrong tab or delete data if not targeted carefully.
- **Suggested Type:** SCRIPT (A standalone helper function to clean data in a specific sheet).