// var changePercentArray        = [1.75, 1, 0.75, 0.5, 0.35, 0.25, 0.15, 0.1, 0.05, 0.015, -0.015, -0.05, -0.1, -0.15, -0.25, -0.35, -0.5 ];
var changePercentArray        = [-0.5, -0.355, -0.255, -0.155, -0.075, -0.035, -0.015, 0.015, 0.035, 0.075, 0.155, 0.255, 0.355, 0.55, 0.755, 1, 1.75 ];
/// for funtion proof index
const headersExl = 1;
const headersArray = headersExl - 1;
const changePercentArrayLength  = changePercentArray.length;
const book                      = SpreadsheetApp.getActiveSpreadsheet();
const sheetTracking             = book.getSheetByName("CopyvaluesChangeAPI");
const sheetTrackingValues       = sheetTracking.getDataRange().getValues();// OBTENGO LOS VALORES 


// ALL THE COLUMNS OF EXCEL AND ARRAY
const nameColExl                = 1; 
const priceColExl               = nameColExl                   + 1; 
const rankColExl                = priceColExl                  + 1;
const volumeColExl              = rankColExl                   + 1;
const sellOrBuyColExl           = volumeColExl                 + 1;

const currPriceColExl           = sellOrBuyColExl              + 1;
const currRankColExl            = currPriceColExl              + 1;
const changeVolColExl           = currRankColExl               + 1;
const changeSellOrBuyColExl     = changeVolColExl              + 1;

const beginColChangePercentExl  = changeSellOrBuyColExl        + 1;
const lastColChangePercentExl   = changeSellOrBuyColExl + changePercentArrayLength + 1;
const indexOfChangeColNextExl   = lastColChangePercentExl      + 1;
const idColExl                  = indexOfChangeColNextExl      + 1;
const extLeftColExl             = idColExl                     + 1;
const extRightColExl            = extLeftColExl                + 1;


var nameColArray                = nameColExl                   - 1; 
var priceColArray               = priceColExl                  - 1; 
var rankColArray                = rankColExl                   - 1;
var volumeColArray              = volumeColExl                 - 1;
var sellOrBuyColArray           = sellOrBuyColExl              - 1;

var currPriceColArray           = currPriceColExl              - 1;
var currRankColArray            = currRankColExl               - 1;
var changeVolColArray           = changeVolColExl              - 1;
var changeSellOrBuyColArray     = changeSellOrBuyColExl        - 1;

var beginColChangePercentArray  = beginColChangePercentExl     - 1;
var lastColChangePercentArray   = lastColChangePercentExl      - 1;
var indexOfChangeColNextArray   = indexOfChangeColNextExl      - 1;
var idColArray                  = idColExl                     - 1;
var extLeftColArray             = extLeftColExl                - 1;
var extRightColArray            = extRightColExl                -1;

var lastColOfExl = sheetTrackingValues[0].length;// 30

//////////////////////////////////////////////////////////////////////////
// FIRST AND LAST ROW OF EXCEL AND ARRAY 
const beginRowExcel               = 2;
const lastRowExl                  = sheetTrackingValues.length;

const beginRowArray               = beginRowExcel            - 1;
const lastRowArray                = lastRowExl               - 1;

// Logger.log("filas: " + lastRowExl )
// Logger.log("cols: " + lastColOfExl)

var obtainRangeToSort         = sheetTracking.getRange(2, 1, lastRowExl, lastColOfExl);

//////////////////////////////////////////////////////////////////////////
// VARIABLES TO KEEP THE CURRENT VALUE
var currPriceAPI     = 0;
var currVolumeAPI    = 0;
var currRankAPI      = 0;
var currSellOrBuyAPI = 0;
// VARIABLES TO SAVE THE CHANGES
var changePrice      = 0;
var changeVolumme    = 0;
var changeSellOrBuy  = 0;
// INDEX THAT ARE CONSTANT INSIDE THE FOR TO COMAPARE AND CALCULATIONS
var beforeIndexOfChange = 0;
// INDEX THAT ARE CHANGED INSIDE THE FOR
var nextIndexOfChange   = 0;

/////////////////////////////////////////////////////////
///////////////////////LOS COLORES DEPENDIENDO DEL CAMBIO
 // colour of the cell
var perviousCell     = "#C0C0C0";
var profit           = "#ADFF2F";
var loss             = "#F08080";
var noChange         = "#00FFFF";
var maxAndMinimun    = "#E6A5FA";
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////BEGIN API REQUEST 
// SHEET TO REALIZE THE REQUEST OF THE API

const infoAPI                = book.getSheetByName("APIinfo");
const valuesInfoAPI          = infoAPI.getDataRange().getValues();

var errorAPI               = valuesInfoAPI[0][1];
var cntCreditCount         = valuesInfoAPI[1][1];  
var cntAPIChanges          = valuesInfoAPI[2][1];
var creditCountAPI         = 0;

// Logger.log(" error API: " + errorAPI + " contador de creditos: " + " en que API esta: " + cntAPIChanges)

// var arrayIDsAPIKEYS    = 
// [

// ] 
var arrayIDsAPIKEYS    = 
[

] 

var numberIDPart = [];
var textPartID   = "id=";
var unifiedID    = textPartID + numberIDPart;

var url          = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?" + unifiedID;

// Logger.log(" longitud: " + arrayIDsAPIKEYS.length)

var requestOptions = 
{
  method: 'GET',
  headers: {
    'X-CMC_PRO_API_KEY': arrayIDsAPIKEYS[cntAPIChanges]
    // 'X-CMC_PRO_API_KEY': ""

  },
  json: true,
  gzip: true
};


for (var rowAPIRequest = beginRowArray;  rowAPIRequest <= lastRowExl; rowAPIRequest++)
{
  numberIDPart[rowAPIRequest - 2] = sheetTrackingValues[rowAPIRequest - 1][ idColArray ]// guardo los IDS
}

// se unifica los ids con la url de la API
var unifiedID = textPartID + numberIDPart;
// Logger.log(unifiedID)

var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?" + unifiedID ; 

var httpRequest= UrlFetchApp.fetch(url, requestOptions);
var getContext= httpRequest.getContentText(); 
var parseData=JSON.parse(getContext);
creditCountAPI = parseData.status.credit_count;
// Logger.log("este es el numero de creditos,   utilizados: " + creditCountAPI)


///// SIRVE PARA VALIDAR EN QUE API ID ESTA Y NO SOBREPASAR EL LIMITE DIARIO


if (!parseData.status.error_message)// si no hay error
{

  // Logger.log("es nulo, entonces salio bien: " + valuesInfoAPI[0][1]  )
  if ( cntCreditCount < 366 )
  {
    cntCreditCount += creditCountAPI;
  }else if( cntCreditCount >= 366 )
  {
    cntAPIChanges++;
    if ( cntAPIChanges == 4)
    {
      cntAPIChanges = 0;
    }
    Logger.log("esta es la aPI: " + cntAPIChanges )
    infoAPI.getRange(3,2).setValue(cntAPIChanges);
    cntCreditCount = 0;
  }
  infoAPI.getRange(2,2).setValue(cntCreditCount); 

}else
{
  infoAPI.getRange(1,2).setValue(parseData.status.error_message);
  cntAPIChanges++;
  cntCreditCount = 0;


}



///////////////////////////////////////////////////////END OF CONFIGURATION FOR THE API REQUEST 
//////////////////////////////////////////////////



/**  ********************************************************************************************************** */

// DELETE THE CHANGES MADE IN THE RANK BEGING PERCENT AND LAST PERCENT
// clearPercentCahanges()
// proofOfIndex();
// updateID ();
// updateConstantValues();

/**  ********************************************************************************************************** */



/// FOR TO CALCULATE AND COMPARE THE RESUSLT WITH THE LAST VALUE SAVED IN THE EXEL 
sheetTracking.clearFormats();
sheetTracking.setFrozenRows(1);
sheetTracking.getRange(1, 17).setBackground("#20B2AA");// da formato a la celda entre el rango -1.5 _  1.5 porciento

// Logger.log(sheetTrackingValues)

for(var rowExelToCompare = beginRowExcel; rowExelToCompare <= lastRowExl ; rowExelToCompare++)
{

  // generationOfValuesRandom( rowExelToCompare )
 

  var rowArray = rowExelToCompare -1;
   generationOfValuesAPI( rowExelToCompare )


  // SE COLOCA LOS VALORES DE LA API EN LAS HOJAS DE EXCEL
  
  sheetTracking.getRange(rowExelToCompare, currPriceColExl).setValue( currPriceAPI );

  
  if (currRankAPI > sheetTrackingValues[ rowArray ][ rankColArray ] )
  {
    //  Logger.log(sheetTrackingValues[ rowArray ][ nameColArray ] +  " row: " + rowExelToCompare +  " current: " + currRankAPI +  " before: " +  sheetTrackingValues[ rowArray ][ rankColArray ])
    sheetTracking.getRange(rowExelToCompare, currRankColExl).setValue( currRankAPI ).setBackground(loss);

  }else if(currRankAPI < sheetTrackingValues[ rowArray ][ rankColArray ])
  {
    //  Logger.log(sheetTrackingValues[ rowArray ][ nameColArray ] + " row: " + rowExelToCompare +  " current: " + currRankAPI +  " before: " +  sheetTrackingValues[ rowArray ][ rankColArray ])
    sheetTracking.getRange(rowExelToCompare, currRankColExl).setValue( currRankAPI ).setBackground(profit);
  }else{
    sheetTracking.getRange(rowExelToCompare, currRankColExl).setValue( currRankAPI );

    // Logger.log(sheetTrackingValues[ rowArray ][ nameColArray ] + " row: " + rowExelToCompare +  " current: " + currRankAPI +  " before: " +  sheetTrackingValues[ rowArray ][ rankColArray ] + " no hay cambio")
  }

  
  updateAndFormatVolume ()// SE CALCULA EL CAMBIO DE VOLUME Y SE DA FORMATO

  changeSellOrBuy = ( currSellOrBuyAPI - sheetTrackingValues[ rowArray ][ sellOrBuyColArray ] ) * 100 / sheetTrackingValues[ rowArray ][ sellOrBuyColArray ];
  sheetTracking.getRange(rowExelToCompare, changeSellOrBuyColExl).setValue( changeSellOrBuy );

  beforeIndexOfChange = sheetTrackingValues[ rowArray ][indexOfChangeColNextArray];
  //dar el formato a la columna anterior
  // Logger.log("the previous cell: " + beforeIndexOfChange )
  sheetTracking.getRange(rowExelToCompare, beforeIndexOfChange ).setBackground(perviousCell);
  
  ///////////////////////////////////////HACER LOS CALCULOS, COMPARAR, GUARDAR Y ATUALIZAR LOS INDICES
  changePrice = (currPriceAPI - sheetTrackingValues[ rowArray ][ priceColArray ]) / sheetTrackingValues[ rowArray ][ priceColArray ];
  // foolowingCalculatioAndRequest () //// TO SEE THE CALCULATES AND THE VALUES OF THE REQUEST


  var comparationListo = false;
  // var changePercentArrayLength = changePercentArray.length;
  var ultimaFila = changePercentArrayLength + 1;
  var indexComparation = 0;
  var changeAdded = 0;
  while (!comparationListo && (indexComparation < ultimaFila))// for work t the array
  {
    if( indexComparation > 0 && indexComparation < changePercentArrayLength )
    {
      var afterCompare = indexComparation ;
      var beforeCompare = afterCompare - 1;
      if ( changePrice < changePercentArray[afterCompare] && changePrice >= changePercentArray[beforeCompare]  )
      { 
        nextIndexOfChange = beginColChangePercentExl + indexComparation;
        // showGeneratedIndex ()
        updateAndConfigureCellChanged(); 
      }
    }else if( indexComparation == 0 )
    {
      if(changePrice < changePercentArray[0] )
      {
        nextIndexOfChange = beginColChangePercentExl;
        // showGeneratedIndex ()
        updateAndConfigureCellChanged();    
      }
    }else if( indexComparation == changePercentArrayLength )
    {
      if ( changePrice >= changePercentArray[changePercentArrayLength - 1] )
      {  
        nextIndexOfChange = lastColChangePercentExl; 
        // showGeneratedIndex ()
        updateAndConfigureCellChanged();     
      }
    }
    indexComparation++;  
  }
}
/// SE ORDENA DE ACUERDO AL VOLUME

obtainRangeToSort.sort({column: 8, ascending: false});

function cryptoCarl() 
{
  // Logger.log("no hay nada")

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////




/** FUNTION FOR THE CONSTANTLY EXECUTION PROGRAM */
///***************************************************************************************************************** */
// ESTO SE HACE AL INNICIO DEL FOR, DESPUES DE HEBER REALIZADO EL REQUEST, ES PARA DAR CALCULAR Y DAR FORMATO AL CAMBIO DEL VOLUME
function updateAndFormatVolume ()
{

  changeVolumme =  ( currVolumeAPI - sheetTrackingValues[ rowArray ][ volumeColArray ] ) * 100 / sheetTrackingValues[ rowArray ][ volumeColArray ];
  if( changeVolumme > 0 )
  {
    // Logger.log("row: " + rowExelToCompare + " el cambio es mayor. change volume: " + changeVolumme + " valor anterior: " +  sheetTrackingValues[ rowArray ][ volumeColArray ] )
    sheetTracking.getRange(rowExelToCompare, changeVolColExl).setValue(changeVolumme).setBackground("#ADFF2F");
  }else if (changeVolumme < 0)
  {
    // Logger.log("row: " + rowExelToCompare + " el cambio es menor. change volume: " + changeVolumme + " valor anterior: " +  sheetTrackingValues[ rowArray ][ volumeColArray ] )
    sheetTracking.getRange(rowExelToCompare, changeVolColExl).setValue(changeVolumme).setBackground("#F08080");
  }else if (changeVolumme == 0)
  {
    // Logger.log("row: " + rowExelToCompare + " el cambio es igual. change volume: " + changeVolumme + " valor anterior: " +  sheetTrackingValues[ rowArray ][ volumeColArray ] )
    sheetTracking.getRange(rowExelToCompare, changeVolColExl).setValue(changeVolumme).setBackground("#00FFFF");
  }  
}
// ES PARA REGISTRAR EL CAMBIO Y DAR FORMATO, ESTO SE HACE DESPUES QUE SE HA VERIFICADO QUE EL CAMBIO CORRESPONDE A LA CELDA CORRESPONDIENTE, SE DECIR DENTRO DEL WHILE DE COMPARACION
function updateAndConfigureCellChanged()
{
    putTheMaxAndMinColour ();

  // showCellAdded ()
  changeAdded = sheetTrackingValues[ rowArray ][ nextIndexOfChange - 1 ] + 1;
  sheetTracking.getRange(rowExelToCompare, indexOfChangeColNextExl).setValue( nextIndexOfChange );
  if( nextIndexOfChange > beforeIndexOfChange)
  {
    sheetTracking.getRange(rowExelToCompare, nextIndexOfChange).setValue( changeAdded ).setBackground(profit);
    sheetTracking.getRange(rowExelToCompare, nameColExl).setBackground(profit);
  } else if ( nextIndexOfChange < beforeIndexOfChange )
  {
    sheetTracking.getRange(rowExelToCompare, nextIndexOfChange).setValue( changeAdded ).setBackground(loss);   
    sheetTracking.getRange(rowExelToCompare, nameColExl).setBackground(loss);
  } else if ( nextIndexOfChange == beforeIndexOfChange )
  {
    sheetTracking.getRange(rowExelToCompare, nextIndexOfChange).setValue( changeAdded ).setBackground(noChange); 
  }
  // showCellAdded ()

  comparationListo = 1;
}
function putTheMaxAndMinColour ()
{
  if (nextIndexOfChange < sheetTrackingValues[ rowArray ][ extLeftColArray ] )
  {
    sheetTracking.getRange(rowExelToCompare, extLeftColExl).setValue( nextIndexOfChange );
    sheetTracking.getRange(rowExelToCompare, nextIndexOfChange).setBackground( maxAndMinimun );

    sheetTracking.getRange(rowExelToCompare, sheetTrackingValues[ rowArray ][ extRightColArray ] ).setBackground( maxAndMinimun );

    // Logger.log(" row " + rowExelToCompare  +
              //  " currIndex: " +  nextIndexOfChange + 
              //  " update cell left: " + sheetTrackingValues[ rowArray ][ extLeftColArray ]+ 
              //  " na chnage: " +  sheetTrackingValues[ rowArray ][ extRightColArray ])

  }else if( nextIndexOfChange > sheetTrackingValues[ rowArray ][ extRightColArray ] )
  {
    sheetTracking.getRange(rowExelToCompare, extRightColExl).setValue( nextIndexOfChange );
    sheetTracking.getRange(rowExelToCompare, nextIndexOfChange).setBackground( maxAndMinimun );

    sheetTracking.getRange(rowExelToCompare, sheetTrackingValues[ rowArray ][ extLeftColArray ] ).setBackground( maxAndMinimun );

    // Logger.log(" row " + rowExelToCompare  + 
              //  " currIndex: " +  nextIndexOfChange + 
              //  " update cell right:  " + sheetTrackingValues[ rowArray ][ extRightColArray ]  + 
              //  " no change " + sheetTrackingValues[ rowArray ][ extLeftColArray ] )

  }else 
  {
    sheetTracking.getRange(rowExelToCompare, sheetTrackingValues[ rowArray ][ extLeftColArray ] ).setBackground( maxAndMinimun );
    sheetTracking.getRange(rowExelToCompare, sheetTrackingValues[ rowArray ][ extRightColArray ] ).setBackground( maxAndMinimun );
    // Logger.log(" row " + rowExelToCompare  + " currIndex: " +  nextIndexOfChange + " right " + sheetTrackingValues[ rowArray ][ extRightColArray ]  + " and " + " left " + sheetTrackingValues[ rowArray ][ extLeftColArray ] )

  }

}







/** FUNTION FOR UPDATES */
///***************************************************************************************************************** */
// ACTUALIZA TODAS LAS CELDAS DE LOS CAMBIOS 

function clearPercentCahanges()
{
 sheetTracking.clearFormats();

  for ( var rowDeleteChanges = beginRowExcel; rowDeleteChanges <= lastRowExl; rowDeleteChanges++ )
  {
    for (var colDeleteChanges = beginColChangePercentExl; colDeleteChanges <= lastColChangePercentExl; colDeleteChanges++ )
    {
      sheetTracking.getRange(rowDeleteChanges, colDeleteChanges).setValue( 0 );
    }    
  } 
}

// ES PARA ACTUALIZAR LOS DATOS 
function updateConstantValues()
{
  var rowExl  = 0;
  var rowArray = 0;
  for ( rowExl = beginRowExcel; rowExl <= lastRowExl; rowExl++ )
  {
    generationOfValuesAPI( rowExl )
    rowArray = rowExl - 1;
    sheetTracking.getRange(rowExl, priceColExl).setValue( currPriceAPI );
    sheetTracking.getRange(rowExl, rankColExl).setValue( currRankAPI );
    // currVolumeAPI   = Math.random() * 145;/// EQUIVALENTE A EXTRAER EL DATO DE PARSE DATA, YA QUE NO SE TENE EL DATO ACTUAL EN EL EXEL   parseData.data[numberIDPart[row - 2]].quote.USD.volume_24h;
    sheetTracking.getRange(rowExl, volumeColExl).setValue( currVolumeAPI );
    sheetTracking.getRange(rowExl, sellOrBuyColExl).setValue(currSellOrBuyAPI);    
  }
}
// COPIA LOS ID DE LA HOJA DE LA BASE DE DATOS FILTRADA Y LOS PEGA EN LA HOJA DE CAMBIOS
function updateID ()
{
  var iDCoinMarketCapSheet       = book.getSheetByName("dataBaseFiltered");
  var iDCoinMarketCapValues      = iDCoinMarketCapSheet.getDataRange().getValues();
  var rowsCoinMarketCApSheet     = iDCoinMarketCapValues.length;
  var colsCoinMarketCApSheet     = iDCoinMarketCapValues[0].length;  
  var colIDArray                 = 0;
  var nameArray                  = 1;

  for ( var rowExlUpdate = beginRowExcel;  rowExlUpdate <= rowsCoinMarketCApSheet; rowExlUpdate++ )
  {
    var rowUpdateArray = rowExlUpdate - 1;
    sheetTracking.getRange(rowExlUpdate, idColExl).setValue( iDCoinMarketCapValues[ rowUpdateArray ][ colIDArray ] )
    sheetTracking.getRange(rowExlUpdate, nameColExl).setValue( iDCoinMarketCapValues[ rowUpdateArray ][ nameArray ] )
  }  
}

/** FUNTION FOR TESTS */
///***************************************************************************************************************** */
function proofOfIndex()
{
  Logger.log(" Headers: index number verification...")
  Logger.log(sheetTracking.getRange(headersExl, nameColExl                 ).getValue() + " " + sheetTrackingValues[headersArray][ nameColExl                 - 1]);
  Logger.log(sheetTracking.getRange(headersExl, priceColExl                ).getValue() + " " + sheetTrackingValues[headersArray][ priceColExl                - 1]);
  Logger.log(sheetTracking.getRange(headersExl, rankColExl                 ).getValue() + " " + sheetTrackingValues[headersArray][ rankColExl                 - 1]);
  Logger.log(sheetTracking.getRange(headersExl, volumeColExl               ).getValue() + " " + sheetTrackingValues[headersArray][ volumeColExl               - 1]);
  Logger.log(sheetTracking.getRange(headersExl, sellOrBuyColExl            ).getValue() + " " + sheetTrackingValues[headersArray][ sellOrBuyColExl            - 1]);

  Logger.log(sheetTracking.getRange(headersExl, currPriceColExl            ).getValue() + " " + sheetTrackingValues[headersArray][ currPriceColExl            - 1]);
  Logger.log(sheetTracking.getRange(headersExl, currRankColExl             ).getValue() + " " + sheetTrackingValues[headersArray][ currRankColExl             - 1]);
  Logger.log(sheetTracking.getRange(headersExl, changeVolColExl            ).getValue() + " " + sheetTrackingValues[headersArray][ changeVolColExl            - 1]);
  Logger.log(sheetTracking.getRange(headersExl, changeSellOrBuyColExl      ).getValue() + " " + sheetTrackingValues[headersArray][ changeSellOrBuyColExl      - 1]);

  Logger.log(sheetTracking.getRange(headersExl, beginColChangePercentExl   ).getValue() + " " + sheetTrackingValues[headersArray][ beginColChangePercentExl   - 1]);
  Logger.log(sheetTracking.getRange(headersExl, lastColChangePercentExl    ).getValue() + " " + sheetTrackingValues[headersArray][ lastColChangePercentExl    - 1]);
  Logger.log(sheetTracking.getRange(headersExl, indexOfChangeColNextExl    ).getValue() + " " + sheetTrackingValues[headersArray][ indexOfChangeColNextExl    - 1]);
  Logger.log(sheetTracking.getRange(headersExl, idColExl                   ).getValue() + " " + sheetTrackingValues[headersArray][ idColExl                   - 1]);
  Logger.log(sheetTracking.getRange(headersExl, extLeftColExl              ).getValue() + " " + sheetTrackingValues[headersArray][ extLeftColExl              - 1]);
  Logger.log(sheetTracking.getRange(headersExl, extRightColExl             ).getValue() + " " + sheetTrackingValues[headersArray][ extRightColExl             - 1]);
  Logger.log("End of index verification.")
}
// AFTERR THE REQUEST WE CAN FOLLOW THE VALUES AND THE CALCULS
function foolowingCalculatioAndRequest ()
{
  Logger.log("Following calculations and request... row: " + rowExelToCompare );
  Logger.log("fixed Price: " + sheetTrackingValues[ rowArray ][ priceColArray] + " current : " + currPriceAPI + " change" + changePrice )
  Logger.log("fixed Rank: " + sheetTrackingValues[ rowArray ][ rankColArray ] + " current : " + currRankAPI )
  Logger.log("fixed Vol: " + sheetTrackingValues[ rowArray ][ volumeColArray] + " current : " + currVolumeAPI + " change" + changeVolumme )
  Logger.log("fixed SellOrBuy: " + sheetTrackingValues[ rowArray ][ sellOrBuyColArray] + " current : " + currSellOrBuyAPI + " change" + changeSellOrBuy )
  Logger.log("End of calculations and request.")
}
// ESTO ES JUSTO DESPUES DE HABER INGRESADO AL CONDICIONAL DEL PORCENTAJE DEL WHILE, ES PARA SABER SI ESTA BIEN HECHO EL CALCULO. VA ANTES DE LA SHOW CELL ADDED
function showGeneratedIndex ()
{
  Logger.log("row: " + rowExelToCompare + 
            " fixed price: " + sheetTrackingValues[ rowArray ][ priceColArray ] + 
            " curr Prce: " + currPriceAPI +
            " change: " + changePrice + 
            " indexWhile: " + indexComparation + 
            " indexArray: " + sheetTrackingValues[ 0 ][ nextIndexOfChange - 1 ] +
            " indexExl: " + sheetTracking.getRange(1, nextIndexOfChange).getValue()    );

}
// DESPUES QUE SE HA REGISTRADO EL INDICE SE MUESTRA, EN QUE PORCENTAJE ESTA, TAMBIEN EL VALOR ANTES Y DESPUES DE SER SUMADO
function showCellAdded ()
{
  Logger.log("row: " + rowExelToCompare + 
            " percent: " + sheetTrackingValues[ 0 ][ nextIndexOfChange - 1 ] + 
            " content array: " + sheetTrackingValues[ rowArray ][ nextIndexOfChange - 1 ] +   
            " variable: " + changeAdded +
            " content exl: " + sheetTracking.getRange(rowExelToCompare, nextIndexOfChange).getValue() 
            );

}
//PARA NO GASTAR LAS API REQUEST, SE GENERA VALORES RANDOM. ESTA FUNCION DEBE SER COMENTADA CUANDO SE GENEREN LA API REQUEST 
function generationOfValuesRandom( row )
{
  currPriceAPI    = Math.random() * 5;
  currRankAPI     = Math.round( (Math.random() * 34));
  currVolumeAPI   = Math.random() * 145;
  currSellOrBuyAPI   = currVolumeAPI / currPriceAPI;
}

function generationOfValuesAPI( row )
{
  // Logger.log( "\n\n\n\n\"" + "Primero genero")
  currPriceAPI       = parseData.data[numberIDPart[row - 2]].quote.USD.price;
  currRankAPI        = parseData.data[numberIDPart[row - 2]].cmc_rank;
  // Logger.log(sheetTrackingValues[ rowArray ][ nameColArray ] +  " row: " + row +  " current: " + currRankAPI +  " before: " +  sheetTrackingValues[ rowArray ][ rankColArray ] + " en la funcion")
  currVolumeAPI      = parseData.data[numberIDPart[row - 2]].quote.USD.volume_24h;
  currSellOrBuyAPI   = currVolumeAPI / currPriceAPI;
}
