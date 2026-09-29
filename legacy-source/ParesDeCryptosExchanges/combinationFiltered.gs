function comcbinationCB()
{
  //SeguimientoCompletaC, SeguimientoCompletaB
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var targetFilteredSheet = book.getSheetByName("allCryptos");
  var oneCompareSheetC = book.getSheetByName("SeguimientoCompletaC");
  var secCompateSheetB = book.getSheetByName("SeguimientoCompletaB");

  //HEADS COINBASE BINANCE, COINBASE, BINANCE  
  targetFilteredSheet.getRange(1,1).setValue("C-B");
  targetFilteredSheet.getRange(1,6).setValue("C");
  targetFilteredSheet.getRange(1,11).setValue("B");

  var valuesOfOneCompareSheetC = oneCompareSheetC.getDataRange().getValues();
  var valuesOfSecCompareSheetB = secCompateSheetB.getDataRange().getValues();

  var numberOfData = 5;

  var indexColumnCB   = 1;
  var indexColumnC    = indexColumnCB + 1 * numberOfData;
  var indexColumnB    = indexColumnCB + 2 * numberOfData;
  
  // valores que hay que sumar para acertar en las columnas que correspondan
  var rank            = 1;
  var symbolSheet     = 2;
  var slug            = 3;
  var historical      = 4;


  var indexRowCB      = 2;
  var indexRowC       = 2;
  var indexRowB       = 2;

  var cnt = 0;
 
  

  for ( var cFirst = 1; cFirst <= valuesOfOneCompareSheetC.length; cFirst++)
  {
    var finded = 0;
    var indexBinance = 0;
    while (!finded && indexBinance < valuesOfSecCompareSheetB.length)
    {   
      if (valuesOfOneCompareSheetC[cFirst - 1][0] == valuesOfSecCompareSheetB[indexBinance][0])
      {
        targetFilteredSheet.getRange(indexRowCB, indexColumnCB).setValue(valuesOfOneCompareSheetC[cFirst - 1][0]);
        targetFilteredSheet.getRange(indexRowCB, indexColumnCB + rank).setValue(valuesOfOneCompareSheetC[cFirst - 1][rank]);
        targetFilteredSheet.getRange(indexRowCB, indexColumnCB + symbolSheet).setValue(valuesOfOneCompareSheetC[cFirst - 1][symbolSheet]);
        targetFilteredSheet.getRange(indexRowCB, indexColumnCB + slug).setValue(valuesOfOneCompareSheetC[cFirst - 1][slug]);
        targetFilteredSheet.getRange(indexRowCB, indexColumnCB + historical).setValue(valuesOfOneCompareSheetC[cFirst - 1][historical]);
        indexRowCB++;
        finded = 1;
      }
      indexBinance++; 
    }         
    if (!finded)
    {
      targetFilteredSheet.getRange(indexRowC, indexColumnC).setValue(valuesOfOneCompareSheetC[cFirst - 1][0]);
      targetFilteredSheet.getRange(indexRowC, indexColumnC + rank).setValue(valuesOfOneCompareSheetC[cFirst - 1][rank]);
      targetFilteredSheet.getRange(indexRowC, indexColumnC + symbolSheet).setValue(valuesOfOneCompareSheetC[cFirst - 1][symbolSheet]);
      targetFilteredSheet.getRange(indexRowC, indexColumnC + slug).setValue(valuesOfOneCompareSheetC[cFirst - 1][slug]);
      targetFilteredSheet.getRange(indexRowC, indexColumnC + historical).setValue(valuesOfOneCompareSheetC[cFirst - 1][historical]);
      indexRowC++;
    }
  }
  
  for ( cFirst = 1; cFirst <= valuesOfSecCompareSheetB.length; cFirst++)
  {
    var finded = 0;
    var indexCoinbase = 0;
    while (!finded && indexCoinbase < valuesOfOneCompareSheetC.length)
    { 
      if ( valuesOfSecCompareSheetB[cFirst - 1][0] == valuesOfOneCompareSheetC[indexCoinbase][0] )
      {
        finded = 1;
      }
      indexCoinbase++; 
    }         
    if (!finded)
    {
      targetFilteredSheet.getRange(indexRowB, indexColumnB).setValue(valuesOfSecCompareSheetB[cFirst - 1][0]);
      targetFilteredSheet.getRange(indexRowB, indexColumnB + rank).setValue(valuesOfSecCompareSheetB[cFirst - 1][rank]);
      targetFilteredSheet.getRange(indexRowB, indexColumnB + symbolSheet).setValue(valuesOfSecCompareSheetB[cFirst - 1][symbolSheet]);
      targetFilteredSheet.getRange(indexRowB, indexColumnB + slug).setValue(valuesOfSecCompareSheetB[cFirst - 1][slug]);
      targetFilteredSheet.getRange(indexRowB, indexColumnB + historical).setValue(valuesOfSecCompareSheetB[cFirst - 1][historical]);

      indexRowB++;
    }
  }  
} 
