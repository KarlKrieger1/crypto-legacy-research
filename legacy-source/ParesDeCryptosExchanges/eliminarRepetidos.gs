function binanceList()
{
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sourceFollowingList = book.getSheetByName("ListaDeSeguimientoCoinbase");
  // var sourceFollowingList = book.getSheetByName("ListaDeSeguimientoBinance");


  var followingListRange = sourceFollowingList.getDataRange();
  var followingListValues = followingListRange.getValues();

  /* ########################### WITH WHILE: delete repeating cells of following list  #########################*/
  // caso base, es natural no necesita de demostracion: el primer elemento no esta repetido
  var columnUniqueAssets = 7;
  var nameColumn = 'G:G';

  var arrayUnique = [];
  arrayUnique[0] = sourceFollowingList.getRange('A1').getValue();// we adde the first value
  sourceFollowingList.getRange(1,columnUniqueAssets).setValue(sourceFollowingList.getRange('A1').getValue());// es el caso base
  var finded = false;
  var indexLimited = 0;

  var cnt = 0;
  //Logger.log(followingListValues.length);
 
  for (var indexFollow = 2; indexFollow <= followingListValues.length; indexFollow++)
  { 
    indexLimited = 1;
    finded = false;
    var limitFollowingList = sourceFollowingList.getRange(nameColumn).getValues().filter(String).length;
    while (!finded && indexLimited <= limitFollowingList )
    {
     // Logger.log("length of a column: " + sourceFollowingList.getRange(nameColumn).getValues().filter(String).length);
      if(sourceFollowingList.getRange(indexFollow,1).getValue() == sourceFollowingList.getRange(indexLimited,columnUniqueAssets).getValue())
      {
       // Logger.log("encontre: " + sourceFollowingList.getRange(indexLimited,columnUniqueAssets).getValue() + " no lo agregaré");
        finded = true;
      }
      //Logger.log("nmero de vecs = " + cnt);
      indexLimited++; cnt++;
    }
    if (!finded)
    {
      // arrayUnique[arrayUnique.length] = followingListValues[i];
      sourceFollowingList.getRange(limitFollowingList + 1,columnUniqueAssets).setValue(sourceFollowingList.getRange(indexFollow,1).getValue());// es el caso base
    }
    
  }
  /* ################################################################################################# */
Logger.log(cnt)

} 
