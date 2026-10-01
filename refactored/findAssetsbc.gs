/**
 * REFACTORED from: legacy-source/prueba/findAssetsbc.gs (function findToCompare)
 *
 * WHAT IT DOES (FACT, tested 2026-10-01):
 * For each coin in the purchase sheet, it finds the coin in the prices sheet,
 * writes the new price in column D and the change in column E.
 * Change = (NewPrice - OldPrice) / OldPrice.
 * Green if the change is above 0, red otherwise (a change of exactly 0 is red).
 * Coins that are not found in the prices sheet are not changed.
 *
 * WHAT WAS WRONG IN THE OLD CODE:
 * - Tab names were fixed inside the function. (FACT)
 * - A loop inside a loop, and one write to the sheet for each coin. (HYPOTHESIS: this is slow)
 * - Variable `idexCount` and the line Logger.log("code 2") did nothing useful.
 *
 * WHAT CHANGED:
 * - The two sheets are parameters.
 * - A Map replaces the inner loop (see the comment at the Map).
 * - All results are written to the sheet ONCE at the end.
 * - The header row is skipped. The old code processed row 1 as data.
 * - Rows with an old price that is not a number above 0 are skipped.
 *   Reason: the formula divides by the old price, and dividing by 0 gives Infinity or NaN.
 */

// Settings in ONE place. Why: to change a color or the header size, we edit one line only.
const HEADER_ROWS = 1;
const COLOR_UP = "#b6d7a8";   // green: price went up
const COLOR_DOWN = "#da7777"; // red: price went down or did not change

/**
 * Compares old prices with new prices and colors the change.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} purchaseSheet Columns: B = OldPrice, C = Coin. Writes D and E.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} pricesSheet Columns: A = Coin, B = NewPrice.
 * @return {{updated: number, notFound: number, skipped: number}} Counters for the log.
 */
function compareToPrices(purchaseSheet, pricesSheet) {
  const purchaseRows = purchaseSheet.getLastRow() - HEADER_ROWS;
  const priceRows = pricesSheet.getLastRow() - HEADER_ROWS;

  // Guard: if a sheet has only the header (or nothing), there is no work. Stop early.
  if (purchaseRows < 1 || priceRows < 1) return { updated: 0, notFound: 0, skipped: 0 };

  // Why a Map: the old code searched the whole price list again for every coin.
  // A Map is a "dictionary": we build it ONCE, then each search is instant.
  // It does the job of `break` in your question, because there is no search loop anymore.
  const priceByCoin = new Map();
  pricesSheet
    .getRange(HEADER_ROWS + 1, 1, priceRows, 2) // columns A and B
    .getValues()
    .forEach(function (row) {
      const coin = String(row[0]);
      // Keep the FIRST match only, because the old code stopped at the first match.
      if (!priceByCoin.has(coin)) priceByCoin.set(coin, row[1]);
    });

  // Read the input columns B and C in ONE call (not cell by cell).
  const oldPriceAndCoin = purchaseSheet.getRange(HEADER_ROWS + 1, 2, purchaseRows, 2).getValues();

  // Output columns D and E. We read their current content and colors first.
  // Why: the old code did not touch rows without a match, so we must keep them as they are.
  const outRange = purchaseSheet.getRange(HEADER_ROWS + 1, 4, purchaseRows, 2);
  const outValues = outRange.getValues();
  const outColors = outRange.getBackgrounds();

  let updated = 0;
  let notFound = 0;
  let skipped = 0;

  oldPriceAndCoin.forEach(function (row, i) {
    const oldPrice = row[0];
    const coin = String(row[1]);

    if (!priceByCoin.has(coin)) { notFound++; return; } // not in the price list: leave the row alone
    if (!(oldPrice > 0)) { skipped++; return; }          // cannot divide by 0 or by text

    const newPrice = priceByCoin.get(coin);
    const change = (newPrice - oldPrice) / oldPrice;     // (New - Old) / Old

    outValues[i][0] = newPrice;                          // column D
    outValues[i][1] = change;                            // column E
    outColors[i][1] = change > 0 ? COLOR_UP : COLOR_DOWN; // color only column E, same as the old code
    updated++;
  });

  // ONE write for values and ONE for colors. Each call to the sheet is slow, so we make as few as possible.
  outRange.setValues(outValues);
  outRange.setBackgrounds(outColors);

  return { updated: updated, notFound: notFound, skipped: skipped };
}
