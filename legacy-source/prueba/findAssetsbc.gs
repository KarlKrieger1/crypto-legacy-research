Logger.log("code 2")
function findToCompare() 
{
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var pricesSheet = book.getSheetByName("cryptoVolatility");
  var supestaCompraList = book.getSheetByName("supuestaCompra");

  // lista de precios
  var pricesSheetRange = pricesSheet.getDataRange();
  var pricesSheetValues = pricesSheetRange.getValues();// ya es un arreglo, empieza desde cero
  // supesta compra
  var supuestaCompraListRange = supestaCompraList.getDataRange();
  var supuestaCompraValues = supuestaCompraListRange.getValues();

  var changePercentaje = 0;
  var idexCount = 0;
  for (var indexCompra = 0; indexCompra < supuestaCompraValues.length; indexCompra++)
  {
    // Logger.log("lista de precios: " + pricesFollowingSheetValues[indexFollow][0]); //print the coulmn// lista de precios consultados de la API
    // Logger.log("nobre de assets: " + followingListValues[indexFollow][2]);// lista de precios que hiba a comprar
    var finded = 0;
    var indexLimitePrices = 0;
    while ( !finded && indexLimitePrices < pricesSheetValues.length ) 
    {  
      if ( supuestaCompraValues[indexCompra][2] == pricesSheetValues[indexLimitePrices][0] )
      {
        // put the price
        supestaCompraList.getRange(indexCompra + 1, 4).setValue(pricesSheetValues[indexLimitePrices][1]);
        // calculate the porcentaje 
        changePercentaje = (pricesSheetValues[indexLimitePrices][1] - supuestaCompraValues[indexCompra][1]) / supuestaCompraValues[indexCompra][1];
        //Logger.log(changePercentaje);
        if(changePercentaje > 0)
        {
         // Logger.log("ha subido");
          supestaCompraList.getRange(indexCompra + 1, 5).setValue(changePercentaje).setBackground("#b6d7a8");// green very low #d9ead3

        } else
        {
          Logger.log("ha perdido");
          supestaCompraList.getRange(indexCompra + 1, 5).setValue(changePercentaje).setBackground("#da7777");// red very high f4cccc
        }
        finded = 1;
        idexCount++;
      }
      indexLimitePrices++;
    }
  }
} 


