Logger.log("code 4")
function changesColours() 
{
  var book                   = SpreadsheetApp.getActiveSpreadsheet();
  // Para la lectura de los IDs y el simbolo
  var idCAPSpreadsheet       = book.getSheetByName("dataBaseFiltered");
  var rangeidCAPSpreadsheet  = idCAPSpreadsheet.getDataRange();
  var valuesidCAPSpreadsheet = rangeidCAPSpreadsheet.getValues();

  var volatilitySpreadsheet  = book.getSheetByName("proofColoursAPI");//se coloca los valores anteriores y los de la API para calcular
  var aleatoriesValues       = volatilitySpreadsheet.getDataRange().getValues();
  var rowsNumberAleatory     = aleatoriesValues.length;// filas
  var numColumns             = aleatoriesValues[0].length;//columnas

 // Para la escritura del precio y del simbolo
  var currentPriceAPIArray = [];
  var arraySymbol          = [];

  //////////////////////////////////
  var addTheChange = 0; //creado  para agregar el cambio al respectivo porcentaje, pero solo en el arreglo, despues sera agregado al excel

  /////////////////////////
 
  var percentCalulate      = 0;

 //////////////////////
  // Para hacer la peticion con API
  var apiKey       = "";// Karl
  var numberIDPart = [];
  var textPartID   = "id=";
  var unifiedID    = textPartID + numberIDPart;
  var url          = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?" + unifiedID;

  var requestOptions = 
  {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    },
    json: true,
    gzip: true
  };
   
  /////////////////////////////
  /** PARA EL CAMBIO DE COLOR */
  var columnOfDataRandom        = 3;
  var indexOfChangePercentSheet = 0;// es el indice al ue pertenece el cambio, no es para recorrer el arreglo, es un dato, se guarda en la ultima
  var indexOfRowArray           = 0;// es para leer el dato que hay en el arreglo, corresponde a la fila
  var indexColumnArray          = 0;// para leer el dato ue hay en el arreglo, pertenece a la columna que se lee del excel, pero del arreglo
  var valueFijoOfDAtaIndex      = numColumns - 1; // donde esta el indice leido, pero que esta guardado en el arreglo

  // colour of the cell
  var perviousCell = "#C0C0C0";


  var profit       = "#ADFF2F";
  var loss         = "#F08080";
  var noChange     = "#00FFFF";

   /** borro el formato de cada celda */
  volatilitySpreadsheet.clearFormats();
  volatilitySpreadsheet.setFrozenRows(1);
  /////////////////////

  // se lee el id del spreadsheet de seguimieto; se empieza de 1 porque hay un titulo
  for (var indexVolatilitySpreadSheet = 1;  indexVolatilitySpreadSheet < valuesidCAPSpreadsheet.length; indexVolatilitySpreadSheet++)
  {
    numberIDPart[indexVolatilitySpreadSheet - 1] = valuesidCAPSpreadsheet[indexVolatilitySpreadSheet][0];// guardo los IDS
    volatilitySpreadsheet.getRange(indexVolatilitySpreadSheet + 1,1).setValue(valuesidCAPSpreadsheet[indexVolatilitySpreadSheet ][1]);// escribo el nombre
  }
  // se unifica los ids con la url de la API
  var unifiedID = textPartID + numberIDPart;
  //Logger.log(unifiedID)
  var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?" + unifiedID; 

  // var httpRequest= UrlFetchApp.fetch(url, requestOptions);
  // var getContext= httpRequest.getContentText(); 
  // var parseData=JSON.parse(getContext);

  var columnForThePriceAPI = 3;
  var coulmnForFixedPrice = 2;
  // for (var i = 0; i < numberIDPart.length; i++)// se coloca el precio consultado
  // {
  //   // textParNumberID[i] = numberIDPart[i];
  //  // volatilitySpreadsheet.getRange(i+2, columnForThePriceAPI).setValue(parseData.data[numberIDPart[i]].quote.USD.price)// 2 porque empieza en 0 el arreglo
  //   currentPriceAPIArray[i] = parseData.data[numberIDPart[i]].quote.USD.price;

  //   //Logger.log(parseData.data[numberIDPart[i]].quote.USD.price)

  // }

  for(var row = 2; row <= rowsNumberAleatory; row++)
  {
    // reemplaza al valor de la api
    var anyValue = Math.random()*100;
    volatilitySpreadsheet.getRange(row, columnForThePriceAPI).setValue(anyValue)
    ////////

    indexOfRowArray = row - 1;
    // Logger.log(uniqueIndexValue);
    //  para cada fila hay un único indice, entonces lo consultare una sola vez
    var uniqueIndexValue = aleatoriesValues[indexOfRowArray][valueFijoOfDAtaIndex];
    /** Configuro el color del valor anteior:  aleatoriesValues[indexOfRowArray][valueFijoOfDAtaIndex] */
    volatilitySpreadsheet.getRange(row, uniqueIndexValue ).setBackground(perviousCell);

    // currentPriceAPIArray[]


    percentCalulate = 0;
    percentCalulate = (anyValue - aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1]) / aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1]; 
    //Logger.log("fijo: " + aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1] + " currente price: " + anyValue + " cambio: " + percentCalulate + " fila: " + row);

    

    if(percentCalulate > 1.75)
    {
      indexOfChangePercentSheet = numColumns - 1;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);

      indexColumnArray = indexOfChangePercentSheet - 1;
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate)  
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= 1     && percentCalulate < 1.75)
    {
      indexOfChangePercentSheet = numColumns - 2;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;     
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= 0.75  && percentCalulate < 1)
    { 
      indexOfChangePercentSheet = numColumns - 3; 
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;        
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 

      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= 0.5   && percentCalulate < 0.75)
    {  
      indexOfChangePercentSheet = numColumns - 4;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);      
      indexColumnArray = indexOfChangePercentSheet - 1;
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }volatilitySpreadsheet.getRange(row, indexOfChangePercentSheet).setValue(aleatoriesValues[indexOfRowArray][indexColumnArray] += 1);
    }
    else if(percentCalulate >= 0.35  && percentCalulate < 0.5)
    {   
      indexOfChangePercentSheet = numColumns - 5;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);
      indexColumnArray = indexOfChangePercentSheet - 1;       
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }    
    }
    else if(percentCalulate >= 0.25  && percentCalulate < 0.35)
    {  
      indexOfChangePercentSheet = numColumns - 6;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);    
      indexColumnArray = indexOfChangePercentSheet - 1;   
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= 0.15  && percentCalulate < 0.25)
    {  
      indexOfChangePercentSheet = numColumns - 7;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;      
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }    
    else if(percentCalulate >= 0.1   && percentCalulate < 0.15)
    { 
      indexOfChangePercentSheet = numColumns - 8;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;      
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= 0.05  && percentCalulate < 0.1)
    {
      indexOfChangePercentSheet = numColumns - 9;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);  
      indexColumnArray = indexOfChangePercentSheet - 1;     
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= 0.015  && percentCalulate < 0.05)
    { 
      indexOfChangePercentSheet = numColumns - 10;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);  
      indexColumnArray = indexOfChangePercentSheet - 1;     
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= -0.015 && percentCalulate < 0.015)
    {
      indexOfChangePercentSheet = numColumns - 11;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);  
      indexColumnArray = indexOfChangePercentSheet - 1;     
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= -0.05 && percentCalulate < -0.015)
    { 
      indexOfChangePercentSheet = numColumns - 12;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);
      indexColumnArray = indexOfChangePercentSheet - 1;       
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      if (indexOfChangePercentSheet > uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      } else if (indexOfChangePercentSheet < uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }else if (indexOfChangePercentSheet == uniqueIndexValue)
      {
        volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
        printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      }
    }
    else if(percentCalulate >= -0.1  && percentCalulate < -0.05)
    {
      indexOfChangePercentSheet = numColumns - 13;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);
      indexColumnArray = indexOfChangePercentSheet - 1;       
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);
      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }
    else if(percentCalulate >= -0.15 && percentCalulate < -0.1)
    {
      indexOfChangePercentSheet = numColumns - 14;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;      
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);
      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }
    else if(percentCalulate >= -0.25 && percentCalulate < -0.15)
    { 
      indexOfChangePercentSheet = numColumns - 15;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);  
      indexColumnArray = indexOfChangePercentSheet - 1;     
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);
      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //    printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }
    else if(percentCalulate >= -0.35 && percentCalulate < -0.25)
    { 
      indexOfChangePercentSheet = numColumns - 16;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;      
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);
      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }
    else if(percentCalulate >= -0.5  && percentCalulate < -0.35)
    { 
      indexOfChangePercentSheet = numColumns - 17;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;      
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);
      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }
    else if(percentCalulate >= -0.75 && percentCalulate < -0.5)
    {  
      indexOfChangePercentSheet = numColumns - 18;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet); 
      indexColumnArray = indexOfChangePercentSheet - 1;      
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);
      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }
    else if(percentCalulate >= -1    && percentCalulate < 0.75)
    {  
      indexOfChangePercentSheet = numColumns - 19;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);  
      indexColumnArray = indexOfChangePercentSheet - 1;     
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1;
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);
      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }
    else if(percentCalulate < -1)
    {
      indexOfChangePercentSheet = numColumns - 20;
      volatilitySpreadsheet.getRange(row, numColumns).setValue(indexOfChangePercentSheet);  
      indexColumnArray = indexOfChangePercentSheet - 1; 
      addTheChange = aleatoriesValues[indexOfRowArray][indexColumnArray] += 1; 

        //                     (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate)
      selectAndConfigureColor(indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate, addTheChange, volatilitySpreadsheet);

      // if (indexOfChangePercentSheet > uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(profit);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // } else if (indexOfChangePercentSheet < uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(loss);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }else if (indexOfChangePercentSheet == uniqueIndexValue)
      // {
      //   volatilitySpreadsheet.getRange(row,indexOfChangePercentSheet).setValue(addTheChange).setBackground(noChange);
      //   printIndexRowChange (indexOfChangePercentSheet, uniqueIndexValue, row, aleatoriesValues[indexOfRowArray][coulmnForFixedPrice - 1], anyValue, percentCalulate) 
      // }
    }       
  }
}
//                             //  (indexOfChange, previousIndex, currentRow, basePrice, priceID, changeInPercent)
// function selectAndConfigureColor(indexOfChange, previousIndex, currentRow, basePrice, priceID, changeInPercent, cellAdded, hojaDeCambio)
// {
//   Logger.log("hey me llamaron? hombre! ");
//   // colour of the cell
//   var profit       = "#ADFF2F";
//   var loss         = "#F08080";
//   var noChange     = "#00FFFF";
  
//   if (indexOfChange > previousIndex)
//   {
//     hojaDeCambio.getRange(currentRow,indexOfChange).setValue(cellAdded).setBackground(profit);
//     printIndexRowChange (indexOfChange, previousIndex, currentRow, basePrice, priceID, changeInPercent);
//   } else if (indexOfChange < previousIndex)
//   {
//     hojaDeCambio.getRange(currentRow,indexOfChange).setValue(cellAdded).setBackground(loss);
//     printIndexRowChange (indexOfChange, previousIndex, currentRow, basePrice, priceID, changeInPercent);
//   }else if (indexOfChange == previousIndex)
//   {
//     hojaDeCambio.getRange(currentRow,indexOfChange).setValue(cellAdded).setBackground(noChange);
//     printIndexRowChange (indexOfChange, previousIndex, currentRow, basePrice, priceID, changeInPercent); 
//   }  
// }

// function printIndexRowChange (indexOfChange, previousIndex, currentRow, basePrice, priceID, changeInPercent)
// {
//   Logger.log("indexNow: " + indexOfChange + " prevoius: " + previousIndex  + " fila: " + currentRow ); 
//   Logger.log("fijo: " + basePrice + " currente price: " + priceID + " cambio: " + changeInPercent + " fila: " + currentRow);
// }
