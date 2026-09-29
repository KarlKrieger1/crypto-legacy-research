function onEdit()
{
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheetPercent = book.getSheetByName("percentChangeInversion");
  var dataCryptoFollowList = book.getSheetByName("SeguimientoCompleta");
  var datarange = sheetPercent.getDataRange();
  var values = datarange.getValues();
  var stopLoss = sheetPercent.getRange('B1').getValue();
  var profit = sheetPercent.getRange('B2').getValue();
  var spacePercent = sheetPercent.getRange('B3').getValue();
  var dataRangeFollowList = dataCryptoFollowList.getDataRange();
  var valuesFollowList = dataRangeFollowList.getValues();
  var finded = 0;
  var indeceDataCryptoFollow = 0;

  var saveName = [];
  var saveSlugName = [];
  var saveValueName = [];

  var inicioCrypto = 4;

  //Logger.log("la dimension de values es: " + values.length)
  var flagName = 0;
  var cntActivos = -1; // se debe restar 1 al numero de activos, ya que se empezo a sumar desde 1 antes
  var currentValuesCrypto = [];
  var cntIndiceNombreActivo = 0;
  var cryptoActivos = [];

  for( var i = 0; i < values.length; i++)
  {
 
    if (values[i][0] != "")
    {
      if ( values[i][0] == "NAME" )
      {
        flagName = 1;
      }
      if (flagName)
      {
        if ( values[i][0] != "NAME" )// para evitar que se guarde el indice de "NAME"
        {
          indeceDataCryptoFollow = 0;
          finded = 0;
          var cntFollowList = 0;
          while(!finded & cntFollowList < valuesFollowList.length)
          {
            if (values[i][0] == valuesFollowList[indeceDataCryptoFollow][1])//values.length
            {
              cryptoActivos[cntIndiceNombreActivo] = values[i][0]// 0 for the name
              currentValuesCrypto[cntIndiceNombreActivo] = valuesFollowList[indeceDataCryptoFollow][2]// 1 for the value
              values[i][1] = valuesFollowList[indeceDataCryptoFollow][2];
              cntIndiceNombreActivo++;
              finded = 1;
            }
            cntFollowList++;
            indeceDataCryptoFollow++;
          }
          //indicesNombreActivo[cntIndiceNombreActivo] = i;
          cntActivos++
        } 
        
      }
    }
    saveName[i] = values[i][0]; 
    saveSlugName[i] = values[i][1];

  }
 // Logger.log(currentValuesCrypto)
  //****************************** HEADERS Y PERCENT
  cntIndiceNombreActivo = 0;
  var indicePorcentajeExcel = Math.floor((inicioCrypto + cntActivos)/2) + 2;// +2 uno para aumentar el indice y otro porque no se puede empezar en cero getRange
    var indicePorcentajeCurrentPrice = Math.ceil(cntActivos/2);// para pares no cambia, para impares, si; no es necesario sumar 1 ya que los array empiezan en cero
  //Logger.log(indicePorcentaje)
  var indiceHeaders = 1;
  var indiceRowsPrices = indiceHeaders + 1;

  ///********************** SE BORRA LOS DATOS ANTERIORES */
  sheetPercent.clearContents().clearFormats()
  //****************** SE RECUPERA LOS VALORES DE LAS saveNameS A & B ***************************** */
  //Logger.log(columnB)
  //Logger.log(saveName)
  for (var index = 0; index < saveName.length; index++)
  {
    sheetPercent.getRange(index + 1,1).setValue(saveName[index]);
    sheetPercent.getRange(index + 1,2).setValue(saveSlugName[index]);
  }
  //***************** SE COLOCA EL HEADER ***************************** */
  for(var h = inicioCrypto; h < inicioCrypto + cntActivos + 1; h++)
  {
    if(h != indicePorcentajeExcel)
    {
      sheetPercent.getRange(indiceHeaders,h).setValue(cryptoActivos[cntIndiceNombreActivo]);
      cntIndiceNombreActivo++;
    }else if(h == indicePorcentajeExcel)
    {
      sheetPercent.getRange(indiceHeaders,h).setValue("Percent"); 
    }
  }
  //****************** SE COLOCA LOS PRECIOS Y PORCENTAJES ******************************/
  //****************** BEFORE THE PERCENT ******************************* */
  indiceRowsPrices = indiceHeaders + 1;//para escribir en el excel, las filas del calculo
  for (var indice = stopLoss; indice <= profit; indice  += spacePercent)//multiplicador
  {
    cntIndiceNombreActivo = 0;// es para recorrec el arreglo activos y copiarlos en el excel
    for(var h = inicioCrypto; h < indicePorcentajeExcel; h++)
    {
      sheetPercent.getRange(indiceRowsPrices,h).setValue((indice/100)*currentValuesCrypto[cntIndiceNombreActivo] + currentValuesCrypto[cntIndiceNombreActivo]);
      cntIndiceNombreActivo++
    }
    indiceRowsPrices++;
  } 

  //****************** IN THE PERCENT ******************************* */
  indiceRowsPrices = indiceHeaders + 1;
  for (var indice = stopLoss; indice <= profit; indice  += spacePercent)
  {
    sheetPercent.getRange(indiceRowsPrices,indicePorcentajeExcel).setValue(indice/100);
    if(indice > -0.009 && indice < 0.009)// se pinta todo de un color en el nivel de 0 porciento
    {
      sheetPercent.getRange(indiceRowsPrices, inicioCrypto, 1, cntActivos + 1).setBackground("#00ffff")
    }
    indiceRowsPrices++;
  }
  //****************** AFTER THE PERCENT ******************************* */

  indiceRowsPrices = indiceHeaders + 1;
  for (var indice = stopLoss; indice <= profit; indice  += spacePercent)
  {
    cntIndiceNombreActivo = indicePorcentajeCurrentPrice;
    for(var h = indicePorcentajeExcel + 1; h <= inicioCrypto + cntActivos; h++)
    {
      sheetPercent.getRange(indiceRowsPrices,h).setValue((indice/100)*currentValuesCrypto[cntIndiceNombreActivo] + currentValuesCrypto[cntIndiceNombreActivo]);
      cntIndiceNombreActivo++
    }
    indiceRowsPrices++;
  }
} 
