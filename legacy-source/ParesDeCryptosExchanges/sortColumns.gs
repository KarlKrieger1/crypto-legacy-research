function sortSheet() 
{
    //SeguimientoCompletaC, SeguimientoCompletaB
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var exampleSheet = book.getSheetByName("sortColumn");
  var exampleSheetvalues = exampleSheet.getDataRange().getValues();
  var rowsExampleSheetvalues =  exampleSheetvalues.length;
  var colsExampleSheetvalues = exampleSheetvalues[0].length;

  Logger.log(rowsExampleSheetvalues);
  Logger.log(colsExampleSheetvalues);

  var range =  exampleSheet.getRange(1,1,7, colsExampleSheetvalues);

  range.sort({column: 5, ascending: false});
}


// var ss = SpreadsheetApp.getActiveSpreadsheet();
// var sheet = ss.getSheets()[0];
// var range = sheet.getRange("A1:C7");

// // Sorts by the values in the first column (A)
// range.sort(1);

// // Sorts by the values in the second column (B)
// range.sort(2);

// // Sorts descending by column B
// range.sort({column: 2, ascending: false});

// // Sorts descending by column B, then ascending by column A
// // Note the use of an array
// range.sort([{column: 2, ascending: false}, {column: 1, ascending: true}]);

// // For rows that are sorted in ascending order, the "ascending" parameter is
// // optional, and just an integer with the column can be used instead. Note that
// // in general, keeping the sort specification consistent results in more readable
// // code. You can express the earlier sort as:
// range.sort([{column: 2, ascending: false}, 1]);

// // Alternatively, if you want all columns to be in ascending order, you can use
// // the following (this makes column 2 ascending)
// range.sort([2, 1]);
// // ... which is equivalent to
// range.sort([{column: 2, ascending: true}, {column: 1, ascending: true}]);