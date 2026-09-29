function findIDS()
{
  //SeguimientoCompletaC, SeguimientoCompletaB
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var databaseSheet = book.getSheetByName("BaseDeDatos");
  var sourceFollowingList = book.getSheetByName("ListaDeSeguimiento");
  // var targetFollowingList = book.getSheetByName("SeguimientoCompletaC");
  // var targetFollowingList = book.getSheetByName("SeguimientoCompletaB");// SeguimientoCompletaCode
  var targetFollowingList = book.getSheetByName("SeguimientoCompletaCode");//

  // rangos of the database
  var databaseSheetRange = databaseSheet.getDataRange();
  var databaseSheetValues = databaseSheetRange.getValues();
  var rowDataBase = databaseSheetValues.length;
  var columnsDataBase = databaseSheetValues[0].length;
  // Logger.log(rowDataBase)
  // Logger.log(columnsDataBase) 

  // rangos of the following list
  var followingListRange = sourceFollowingList.getDataRange();
  var followingListValues = followingListRange.getValues();
  var rowFollowingList = followingListValues.length;
  var colunsFollowingList = followingListValues[0].length;
  // Logger.log(rowFollowingList)
  // Logger.log(colunsFollowingList)

  var folloColumn = 0;// names of crypto that i follow in the following list 
  var columnToFind = 2;// names of the all crypto until 1 de october 2021, i need to scrap the follow list

  var indicadorDeEncontrado = 0;
  var indiceCompleteListFollow = 1;

  //Logger.log(databaseSheetValues[0][1])

  for (var indexFollow = 0; indexFollow < rowFollowingList; indexFollow++)
  {
    // Logger.log(databaseSheetValues[indexFollow][3]); //print the coulmn
    // Logger.log(followingListValues[indexFollow][0]);
    // Logger.log(databaseSheetValues[indexFollow]);// print all row
    // Logger.log(followingListValues[indexFollow]);
    //Logger.log(databaseSheetValues[indexFollow][1])
    var finded = 0;
    var indexDataBase = 0;
    var indiceLimiteDatabase = 0;
    //Logger.log(!finded && indiceLimiteDatabase < 3000)
    // while (!finded && indiceLimiteDatabase < 200 )
    // while (indexDataBase < rowDataBase )

    while (!finded && indexDataBase < databaseSheetValues.length)
    {     
      if (followingListValues[indexFollow][0] == databaseSheetValues[indexDataBase][0])
      {
        targetFollowingList.getRange(indiceCompleteListFollow,1).setValue(databaseSheetValues[indexDataBase][0]);
        targetFollowingList.getRange(indiceCompleteListFollow,2).setValue(databaseSheetValues[indexDataBase][4]);
        targetFollowingList.getRange(indiceCompleteListFollow,3).setValue(databaseSheetValues[indexDataBase][2]);
        targetFollowingList.getRange(indiceCompleteListFollow,4).setValue(databaseSheetValues[indexDataBase][3]);
        targetFollowingList.getRange(indiceCompleteListFollow,5).setValue(databaseSheetValues[indexDataBase][5]);

       

        indiceCompleteListFollow++;
        //Logger.log("encontrado")
        indexDataBase++;
        indicadorDeEncontrado++;
        finded = 1;
        indiceLimiteDatabase++;
      } else
      {
      // Logger.log("indice de la lista de seguimiento " + indexFollow)
        // Logger.log("indice de dataBase" + indexDataBase)
        indexDataBase++;
        indiceLimiteDatabase++;
      }
    }
  }
} 
