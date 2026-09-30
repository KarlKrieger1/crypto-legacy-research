/**
 * REFACTORED from: legacy-source/prueba/deleteDuplicateRows.gs (function removeDuplicates)
 *
 * What was wrong in the old function (both FACT, tested 2026-09-30):
 * 1. It used getActiveSheet(), so it cleaned whichever tab was open.
 * 2. It compared rows with join(), so "a,b | c" and "a | b,c" looked equal
 *    and a different row was deleted.
 *
 * What changed:
 * - The sheet is a parameter, so we always know where it works.
 * - JSON.stringify keeps the cell borders, so the comma problem is gone.
 * - It does not touch the sheet when there is nothing to remove.
 *
 * Removes duplicate rows from ONE sheet. Keeps the first copy of each row.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The sheet to clean.
 * @return {number} How many rows were removed.
 */
function removeDuplicateRows(sheet) {
  const range = sheet.getDataRange();
  const rows = range.getValues();

  const seen = new Set();
  const uniqueRows = [];
  for (const row of rows) {
    const key = JSON.stringify(row);
    if (!seen.has(key)) {
      seen.add(key);
      uniqueRows.push(row);
    }
  }

  const removed = rows.length - uniqueRows.length;
  if (removed === 0) return 0;

  range.clearContent();
  sheet.getRange(1, 1, uniqueRows.length, uniqueRows[0].length).setValues(uniqueRows);
  return removed;
}