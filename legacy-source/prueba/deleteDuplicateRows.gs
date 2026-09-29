/**
 * Removes duplicate rows from the current sheet.
 */
function removeDuplicates() {
  var sheet = SpreadsheetApp.getActiveSheet();
  //Logger.log(sheet.getRange(2, 1).getValue());
  var data = sheet.getDataRange().getValues();

  var newData = [];
  var cnt = 1;
  for (var i in data) {
    var row = data[i];
    //Logger.log(i);
    //Logger.log(sheet.getRange(cnt, 1).getValue());
    var duplicate = false;
    for (var j in newData) {
      if (row.join() == newData[j].join()) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      newData.push(row);
    }
    cnt++;
  }
  var cont = 1;
  //var texto = sheet.getRange(cont, 1, 2, 2).getValue();
  
  sheet.clearContents();
  //Logger.log(newData.length);// give the number of rows
  //Logger.log(newData[0].length);// give the number of colums

  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}
