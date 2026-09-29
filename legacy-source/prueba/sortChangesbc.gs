Logger.log("code 6")
// var changePercentArray        = [1.75, 1, 0.75, 0.5, 0.35, 0.25, 0.15, 0.1, 0.05, 0.015, -0.015, -0.05, -0.1, -0.15, -0.25, -0.35, -0.5 ];
// /// for funtion proof index
// const headersExl = 1;
// const headersArray = headersExl - 1;
// const changePercentArrayLength  = changePercentArray.length;
// const book                      = SpreadsheetApp.getActiveSpreadsheet();
// const sheetTracking             = book.getSheetByName("CopyvaluesChangeAPI");
// const sheetTrackingValues       = sheetTracking.getDataRange().getValues();// OBTENGO LOS VALORES 
// // var obtainRangeToSort         = sheetTracking.getRange("A2:AB101");

// // var range =  volatilitySpreadsheet.getRange("A2:W101");
//   // range.sort(1);

// // ALL THE COLUMNS OF EXCEL AND ARRAY
// const nameColExl                = 1; 
// const priceColExl               = nameColExl                   + 1; 
// const rankColExl                = priceColExl                  + 1;
// const volumeColExl              = rankColExl                   + 1;
// const sellOrBuyColExl           = volumeColExl                 + 1;

// const currPriceColExl           = sellOrBuyColExl              + 1;
// const currRankColExl            = currPriceColExl              + 1;
// const changeVolColExl           = currRankColExl               + 1;
// const changeSellOrBuyColExl     = changeVolColExl              + 1;

// const beginColChangePercentExl  = changeSellOrBuyColExl        + 1;
// const lastColChangePercentExl   = changeSellOrBuyColExl + changePercentArrayLength;
// const indexOfChangeColBefExl    = lastColChangePercentExl      + 1;
// const indexOfChangeColNextExl   = indexOfChangeColBefExl       + 1;
// const idColExl                  = indexOfChangeColNextExl      + 1;


// var nameColArray                = nameColExl                   - 1; 
// var priceColArray               = priceColExl                  - 1; 
// var rankColArray                = rankColExl                   - 1;
// var volumeColArray              = volumeColExl                 - 1;
// var sellOrBuyColArray           = sellOrBuyColExl              - 1;

// var currPriceColArray           = currPriceColExl              - 1;
// var currRankColArray            = currRankColExl               - 1;
// var changeVolColArray           = changeVolColExl              - 1;
// var changeSellOrBuyColArray     = changeSellOrBuyColExl        - 1;

// var beginColChangePercentArray  = beginColChangePercentExl     - 1;
// var lastColChangePercentArray   = lastColChangePercentExl      - 1;
// var indexOfChangeColBefArray    = indexOfChangeColBefExl       - 1;
// var indexOfChangeColNextArray   = indexOfChangeColNextExl      - 1;
// var idColArray                  = idColExl                     - 1;

// //////////////////////////////////////////////////////////////////////////
// // FIRST AND LAST ROW OF EXCEL AND ARRAY 
// const beginRowExcel               = 2;
// const lastRowExl                  = sheetTrackingValues.length;

// const beginRowArray               = beginRowExcel            - 1;
// const lastRowArray                = lastRowExl               - 1;
// //////////////////////////////////////////////////////////////////////////
// // ARRAY TO KEEP THE CURRENT VALUE
// var currPriceAPI    = 0;
// var currVolumeAPI   = 0;
// var currRankAPI     = 0;
// var changePrice     = 0;
// var changeVolumme   = 0;
// var changeSellOrBuy = 0;
// ///////////////////////////////////////////////////////////////////////////
// ////////////////////PARA OBTENER LOS VALORES DE LA API

// const idCAPSpreadsheet       = book.getSheetByName("dataBaseFiltered");
// const rangeidCAPSpreadsheet  = idCAPSpreadsheet.getDataRange();
// const valuesidCAPSpreadsheet = rangeidCAPSpreadsheet.getValues();

// const infoAPI                = book.getSheetByName("APIinfo");
// const valuesInfoAPI          = infoAPI.getDataRange().getValues();

// var errorAPI               = valuesInfoAPI[0][1];
// var cntCreditCount         = valuesInfoAPI[1][1];  
// var cntAPIChanges          = valuesInfoAPI[2][1];

// // var arrayIDsAPI    = 
// // [
// habia 5 api keys, 9/25/2026
// // ] 

// // var numberIDPart = [];
// // var textPartID   = "id=";
// // var unifiedID    = textPartID + numberIDPart;
// // var url          = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?" + unifiedID;

// // var requestOptions = 
// // {
// //   method: 'GET',
// //   headers: {
// //     'X-CMC_PRO_API_KEY': arrayIDsAPI[cntAPIChanges]
// //   },
// //   json: true,
// //   gzip: true
// // };

// sheetTracking.clearFormats();
// sheetTracking.setFrozenRows(1);
// sheetTracking.getRange(1, 16).setBackground("#20B2AA");// da formato a la celda entre el rango -1.5 _  1.5 porciento
//   /////////////////////

//   // se lee el id del spreadsheet de seguimieto; se empieza de 1 porque hay un titulo
//   // for (var indexVolatilitySpreadSheet = 1;  indexVolatilitySpreadSheet < valuesidCAPSpreadsheet.length; indexVolatilitySpreadSheet++)
//   // {
//   //   numberIDPart[indexVolatilitySpreadSheet - 1] = valuesidCAPSpreadsheet[indexVolatilitySpreadSheet][0];// guardo los IDS
//   //   volatilitySpreadsheet.getRange(indexVolatilitySpreadSheet + 1,1).setValue(valuesidCAPSpreadsheet[indexVolatilitySpreadSheet ][1]);// escribo el nombre
//   // }
//   // // se unifica los ids con la url de la API
//   // var unifiedID = textPartID + numberIDPart;
//   // //Logger.log(unifiedID)
//   // var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?" + unifiedID; 

//   // var httpRequest= UrlFetchApp.fetch(url, requestOptions);
//   // var getContext= httpRequest.getContentText(); 
//   // var parseData=JSON.parse(getContext);


//   // ///// SIRVE PARA VALIDAR EN QUE API ID ESTA Y NO SOBREPASAR EL LIMITE DIARIO
//   // if (!parseData.status.error_message)// si no hay error
//   // {
//   //   //Logger.log("es nulo, entonces salio bien: " + valuesInfoAPI[0][1]  )
//   //   if ( cntCreditCount < 366 )
//   //   {
//   //     cntCreditCount++;
//   //   }else if( cntCreditCount == 366 )
//   //   {
//   //     cntAPIChanges++;
//   //     if ( cntAPIChanges == 5)
//   //     {
//   //       cntAPIChanges = 0;
//   //     }
//   //     infoAPI.getRange(3,2).setValue(cntAPIChanges);
//   //     cntCreditCount = 0;
//   //   }
//   //   infoAPI.getRange(2,2).setValue(cntCreditCount);    
//   // }else
//   // {
//   //   infoAPI.getRange(1,2).setValue(parseData.status.error_message);
//   // }
//    // fila 4 no se toca, es la fila del volume



// /////////////////////////////////////////////////////////
// ///////////////////////LOS COLORES DEPENDIENDO DEL CAMBIO
//  // colour of the cell
// var perviousCell     = "#C0C0C0";
// var profit           = "#ADFF2F";
// var loss             = "#F08080";
// var noChange         = "#00FFFF";
// ////////////////////////////////////////////////////////////////////////////////////////





// // DELETE THE CHANGES MADE IN THE RANK BEGING PERCENT AND LAST PERCENT
// // deleteChanges();
// // proofOfIndex();
// // updateConstantValues();


// /// FOR TO CALCULATE AND COMPARE THE RESUSLT WITH THE LAST VALUE SAVED IN THE EXEL 


// for(var rowExelToCompare = beginRowExcel; rowExelToCompare <= lastRowExl ; rowExelToCompare++)
// {
//   generationOfValuesRandom( rowExelToCompare )

//   var rowArray = rowExelToCompare -1;

//   // SE COLOCA LOS VALORES DE LA API EN LAS HOJAS DE EXCEL
//   sheetTracking.getRange(rowExelToCompare, currPriceColExl).setValue( currPriceAPI );
//   sheetTracking.getRange(rowExelToCompare, currRankColExl).setValue( currRankAPI );
//   sheetTracking.getRange(rowExelToCompare, changeVolColExl).setValue
//   (
//     ( currVolumeAPI - sheetTrackingValues[ rowArray ][ volumeColArray ] ) * 100 / sheetTrackingValues[ rowArray ][ volumeColArray ] 
//   );   
//   sheetTracking.getRange(rowExelToCompare, changeSellOrBuyColExl).setValue
//   (
//     ( currSellOrBuy - sheetTrackingValues[ rowArray ][ sellOrBuyColArray ] ) * 100 / sheetTrackingValues[ rowArray ][ sellOrBuyColArray ]
//   ); 
//     Logger.log("Following calculations and request...")
//   Logger.log("price " + sheetTracking.getRange(rowExelToCompare, currPriceColExl).getValue() )
//   Logger.log("rank " + sheetTracking.getRange(rowExelToCompare, currRankColExl).getValue() )
//   Logger.log("change vol " + sheetTracking.getRange(rowExelToCompare, changeVolColExl).getValue() + " curr vol: " + currVolumeAPI )
//   Logger.log("change BorSell " + sheetTracking.getRange(rowExelToCompare, changeSellOrBuyColExl).getValue() + " curr buyOrSell: " + currSellOrBuy)
//   Logger.log("End of calculations and request.")
  

//   ///////////////////////////////////////HACER LOS CALCULOS, COMPARAR, GUARDAR Y ATUALIZAR LOS INDICES
//   changePrice = (currPriceAPI - sheetTrackingValues[ rowArray ][ priceColArray ]) / sheetTrackingValues[ rowArray ][ priceColArray ];

//   var comparationListo = false;
//   // var changePercentArrayLength = changePercentArray.length;
//   var ultimaFila = changePercentArrayLength + 1;
//   var indexComparation = 0;

//   var cntWhile = 0
//   while (!comparationListo && (indexComparation < ultimaFila))
//   {
//     if( indexComparation > 0 && indexComparation < changePercentArrayLength )
//     {
//       var before = indexComparation - 1;
//       var afeter = indexComparation ;

//       if ( changePrice < changePercentArray[before] && changePrice > changePercentArray[afeter]  )
//       {
//        sheetTracking.getRange(rowExelToCompare, indexOfChangeColBefExl).setValue( sheetTrackingValues[ rowArray ][ indexOfChangeColNextArray ] );
//        sheetTracking.getRange(rowExelToCompare, indexOfChangeColNextExl).setValue( beginColChangePercentArray + indexComparation + 1 );
//        comparationListo = 1;
//       }
//     }else if( indexComparation == 0 )
//     {
//       if(changePrice > changePercentArray[0] )
//       {
//         sheetTracking.getRange(rowExelToCompare, indexOfChangeColBefExl).setValue( sheetTrackingValues[ rowArray ][ indexOfChangeColNextArray ] );
//         sheetTracking.getRange(rowExelToCompare, indexOfChangeColNextExl).setValue( beginColChangePercentArray + indexComparation + 1 );
//         comparationListo = 1;
//       }
//     }else if( indexComparation == changePercentArrayLength )
//     {
//       if ( changePrice < changePercentArray[changePercentArrayLength - 1] )
//       {
//         sheetTracking.getRange(rowExelToCompare, indexOfChangeColBefExl).setValue( sheetTrackingValues[ rowArray ][ indexOfChangeColNextArray ] );
//         sheetTracking.getRange(rowExelToCompare, indexOfChangeColNextExl).setValue( beginColChangePercentArray + indexComparation + 1 );
//         comparationListo = 1;
//       }
//     }
//     indexComparation++;
//     // Logger.log("este es el indice: " + indexComparation);
//     cntWhile++;
//   }
//   // Logger.log(" contador: " + cntWhile)
// }
// /// SE ORDENA DE ACUERDO AL VOLUME
// // obtainRangeToSort.sort({column: 8, ascending: false});

// // DAR FORMATO

// function cryptoCarl() 
// {

// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////


// function proofOfIndex()
// {
//   Logger.log(" Headers: index number verification...")
//   Logger.log(sheetTracking.getRange(headersExl, nameColExl                 ).getValue() + " " + sheetTrackingValues[headersArray][ nameColExl                 - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, priceColExl                ).getValue() + " " + sheetTrackingValues[headersArray][ priceColExl                - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, rankColExl                 ).getValue() + " " + sheetTrackingValues[headersArray][ rankColExl                 - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, volumeColExl               ).getValue() + " " + sheetTrackingValues[headersArray][ volumeColExl               - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, sellOrBuyColExl            ).getValue() + " " + sheetTrackingValues[headersArray][ sellOrBuyColExl            - 1]);

//   Logger.log(sheetTracking.getRange(headersExl, currPriceColExl            ).getValue() + " " + sheetTrackingValues[headersArray][ currPriceColExl            - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, currRankColExl             ).getValue() + " " + sheetTrackingValues[headersArray][ currRankColExl             - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, changeVolColExl            ).getValue() + " " + sheetTrackingValues[headersArray][ changeVolColExl            - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, changeSellOrBuyColExl      ).getValue() + " " + sheetTrackingValues[headersArray][ changeSellOrBuyColExl      - 1]);

//   Logger.log(sheetTracking.getRange(headersExl, beginColChangePercentExl   ).getValue() + " " + sheetTrackingValues[headersArray][ beginColChangePercentExl   - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, lastColChangePercentExl    ).getValue() + " " + sheetTrackingValues[headersArray][ lastColChangePercentExl    - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, indexOfChangeColBefExl     ).getValue() + " " + sheetTrackingValues[headersArray][ indexOfChangeColBefExl     - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, indexOfChangeColNextExl    ).getValue() + " " + sheetTrackingValues[headersArray][ indexOfChangeColNextExl    - 1]);
//   Logger.log(sheetTracking.getRange(headersExl, idColExl                   ).getValue() + " " + sheetTrackingValues[headersArray][ idColExl                   - 1]);
//   Logger.log("End of index verification.")
// }

// function updateConstantValues()
// {
//   var rowExl  = 0;
//   var rowArray = 0;

//   for ( rowExl = beginRowExcel; rowExl <= lastRowExl; rowExl++ )
//   {
//     rowArray = rowExl - 1;

//     sheetTracking.getRange(rowExl, priceColExl).setValue( sheetTrackingValues[ rowArray ][ currPriceColArray ] );
//     sheetTracking.getRange(rowExl, rankColExl).setValue( sheetTrackingValues[ rowArray ][ currRankColArray ] );
//     currVolumeAPI   = Math.random() * 145;/// EQUIVALENTE A EXTRAER EL DATO DE PARSE DATA, YA QUE NO SE TENE EL DATO ACTUAL EN EL EXEL
//     currSellOrBuy   = currVolumeAPI / sheetTrackingValues[ rowArray ][ currPriceColArray ];
//     sheetTracking.getRange(rowExl, volumeColExl).setValue(currVolumeAPI);
//     sheetTracking.getRange(rowExl, sellOrBuyColExl).setValue(currSellOrBuy);    
//   }
// }

// function generationOfValuesRandom( row )
// {
//   currPriceAPI    = Math.random() * 5;
//   currRankAPI     = Math.round( (Math.random() * 34));
//   currVolumeAPI   = Math.random() * 145;
//   currSellOrBuy   = currVolumeAPI / currPriceAPI;
//   sheetTracking.getRange(row, currPriceColExl).setValue(currPriceAPI);
//   sheetTracking.getRange(row, currRankColExl).setValue(currRankAPI);

// }

// function deleteChanges()
// {
//   for ( var rowExl = beginRowExcel; rowExl <= lastRowExl; rowExl++ )
//   {
//     for (var colExcel = beginColChangePercentExl; colExcel <= lastColChangePercentExl; colExcel++)// first work, ater add the control variable
//     {
//       sheetTracking.getRange(rowExl, colExcel).setValue(0);
//       // Logger.log("fila: " + rowExl + " col: " + colExcel + " value of cell: " + sheetTracking.getRange(rowExl, colExcel).getValue());
//     }
//   }
// }
// function foolowingCalculatioAndRequest ()
// {
//   Logger.log("Following calculations and request...")
//   Logger.log("price " + sheetTracking.getRange(rowExelToCompare, currPriceColExl).getValue() )
//   Logger.log("rank " + sheetTracking.getRange(rowExelToCompare, currRankColExl).getValue() )
//   Logger.log("change vol " + sheetTracking.getRange(rowExelToCompare, changeVolColExl).getValue() + " curr vol: " + currVolumeAPI )
//   Logger.log("change BorSell " + sheetTracking.getRange(rowExelToCompare, changeSellOrBuyColExl).getValue() + " curr buyOrSell: " + currSellOrBuy)
//   Logger.log("End of calculations and request.")
// }

// function updateID ()
// {
  

// }
