Logger.log("nueva \n linea")
Logger.log("nueva es otro codigo "   + '\n' + "linea")

function changeFormatCell() 
{
  var book = SpreadsheetApp.getActiveSpreadsheet();
  // Para la lectura de los IDs y el simbolo
  var proofChangeSheet = book.getSheetByName("proofSheet");
  var valuesProof = proofChangeSheet.getDataRange().getValues();
  var numColums = valuesProof[0].length;// aqui es donde se guarda el indice ue corresponde al cambio
  //Logger.log(numColums);

  // var anyValue = Math.random()*100;

  var indexArray = [];
  var columnPrecioFIjo = 1;

  var changePercent = 0;

  /* FIRST DATA OK */
  var columnOfDataRandom = 2;
  var indexOfChangePercentSheet = 0;// es el indice al ue pertenece el cambio, no es para recorrer el arreglo, es un dato, se guarda en la ultima columna del excel
  var indexOfRowArray = 0;// es para leer el dato ue hay en el arreglo, corresponde a la fila
  var indexColumnArray = 0;// para leer el dato ue hay en el arreglo, pertenece a la columna que se lee del excel, pero del arreglo
  var valueFijoOfDAtaIndex = numColums - 1; // donde esta el indice leido, pero que esta guardado en el arreglo
  
  // colour of the cell
  var profit = "#ADFF2F";
  var loss = "#F08080";
  var noChange = "#00FFFF";
  var perviousCell = "#C0C0C0";

  proofChangeSheet.clearFormats();

  for (var row = 1; row <= 100; row++)
  {
    indexOfRowArray = row - 1;

    anyValue = Math.random()*100;
    proofChangeSheet.getRange(row,  columnOfDataRandom).setValue( anyValue );

    // siempre el anterior es de un solo color
    proofChangeSheet.getRange(row,  valuesProof[indexOfRowArray][valueFijoOfDAtaIndex] ).setBackground(perviousCell);// #C0C0C0: more light; #708090: mor dark
 
    if (anyValue > 75 && anyValue <= 100)
    {
      // se guarda el indice 
      indexOfChangePercentSheet = columnOfDataRandom + 1;
      proofChangeSheet.getRange(row,  numColums).setValue( indexOfChangePercentSheet );
      // se suma el cambio en los diferentes rangos
      indexColumnArray = indexOfChangePercentSheet - 1;
      // proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1);
      // el condicional para cambiar el color del anterior y el actual
      if( indexOfChangePercentSheet > valuesProof[indexOfRowArray][valueFijoOfDAtaIndex] )// profit
      {
        proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(profit);
      } else if(indexOfChangePercentSheet < valuesProof[indexOfRowArray][valueFijoOfDAtaIndex])// loss
      {
       proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(loss);
      } else if (indexOfChangePercentSheet == valuesProof[indexOfRowArray][valueFijoOfDAtaIndex] )// no cambio
      {
        proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(noChange);
      }
    }else if(anyValue > 25 && anyValue <= 75)
    {
      indexOfChangePercentSheet = columnOfDataRandom + 2; // indice para el excel, guarda el indice al que corresponde el cambio
      proofChangeSheet.getRange(row, numColums).setValue( indexOfChangePercentSheet );

      indexColumnArray = indexOfChangePercentSheet - 1;
      proofChangeSheet.getRange(row, indexOfChangePercentSheet).setValue( valuesProof[indexOfRowArray][indexColumnArray] += 1);

      if( indexOfChangePercentSheet > valuesProof[indexOfRowArray][valueFijoOfDAtaIndex] )// profit
      {
        proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(profit);
      } else if(indexOfChangePercentSheet < valuesProof[indexOfRowArray][valueFijoOfDAtaIndex])// loss
      {
       proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(loss);
      } else if (indexOfChangePercentSheet == valuesProof[indexOfRowArray][valueFijoOfDAtaIndex] )// no cambio
      {
        proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(noChange);
      }     
    }else if(anyValue > 0  && anyValue <= 25)
    {
      indexOfChangePercentSheet = columnOfDataRandom + 3;
      proofChangeSheet.getRange(row, numColums).setValue( indexOfChangePercentSheet ); 
      indexColumnArray = indexOfChangePercentSheet - 1;
      proofChangeSheet.getRange(row, indexOfChangePercentSheet).setValue( valuesProof[indexOfRowArray][indexColumnArray] += 1);

      if( indexOfChangePercentSheet > valuesProof[indexOfRowArray][valueFijoOfDAtaIndex] )// profit
      {
        proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(profit);
      } else if(indexOfChangePercentSheet < valuesProof[indexOfRowArray][valueFijoOfDAtaIndex])// loss
      {
       proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(loss);
      } else if (indexOfChangePercentSheet == valuesProof[indexOfRowArray][valueFijoOfDAtaIndex] )// no cambio
      {
        proofChangeSheet.getRange(row, indexOfChangePercentSheet ).setValue( valuesProof[indexOfRowArray][ indexColumnArray] += 1).setBackground(noChange);
      }       
    } 
  }
}