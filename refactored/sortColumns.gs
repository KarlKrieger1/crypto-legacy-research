/**
 * REFACTORED from: legacy-source/ParesDeCryptosExchanges/sortColumns.gs (function sortSheet)
 *
 * What was wrong in the old function (FACT, tested 2026-09-30):
 * 1. The tab name ("sortColumn"), the row count (7) and the column (5) were fixed in the code.
 * 2. It sorted only the first 7 rows. Rows below were ignored (N7 and N8 did not move).
 * 3. The range started at row 1, so the header row was part of the sort.
 *
 * What changed:
 * - The sheet, the column, the direction and the header rows are parameters.
 * - It sorts ALL data rows. The header rows stay on top.
 *
 * Sorts the data rows of ONE sheet by ONE column.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The tab to sort.
 * @param {number} column Column number to sort by (1 = A, 5 = E).
 * @param {boolean} ascending true = small to big, false = big to small.
 * @param {number} headerRows How many top rows are headers (they do not move).
 * @return {number} How many data rows were sorted.
 */
function sortSheetByColumn(sheet, column, ascending, headerRows) {
  const dataRows = sheet.getLastRow() - headerRows;
  if (dataRows < 2) return 0; // nothing to sort

  sheet
    .getRange(headerRows + 1, 1, dataRows, sheet.getLastColumn())
    .sort({ column: column, ascending: ascending });
  return dataRows;
}