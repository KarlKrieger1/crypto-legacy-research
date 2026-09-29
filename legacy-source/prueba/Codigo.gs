//https://spreadsheet.dev/google-apps-script-editor-keyboard-shortcuts

// This is to  copy and paste
function copiarCelda() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaActiva = libro.getActiveSheet(); // selecciona la oja aactiva, es decir 
  //la hoja en donde se encuentra el cursor al momneto de ejecutar el programa
  //const hojaSelecionada = libro.getSheetByName("prueba");// es para selecionar una hoja 
  //especifica
  const rangoFijo = hojaActiva.getRange('B3'); //aqui obtengo la celda del dato que voy a copiar
  rangoFijo.copyTo(hojaActiva.getRange('C3'));
}

// This is to cut 
function recortar() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaActiva = libro.getActiveSheet();
  const rangoFijo = hojaActiva.getRange('B4'); 
  rangoFijo.moveTo(hojaActiva.getRange('C4'));
}

// This special paste with format, values or formulas
function specialPasteFormat() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaActiva = libro.getActiveSheet();
  const rangoFijo = hojaActiva.getRange('B5');

  //this is the part that make the special paste, is needly add the false word to indicate that i dont want the transposition, withouth this word don't will work 
  rangoFijo.copyTo(hojaActiva.getRange('C5'),SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
}

// This special paste with format, values or formulas
function specialPasteFormula() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaActiva = libro.getActiveSheet();
  const rangoFijo = hojaActiva.getRange('B8'); 
  rangoFijo.copyTo(hojaActiva.getRange('C8'),SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);
}
 // proofs with get  and set 
 function getAndSet() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaActiva = libro.getActiveSheet();
  const originValue = hojaActiva.getRange('B6').getValue(); 
  const targetValue = hojaActiva.getRange('C6');
  targetValue.setValue(originValue);
}

// proofs with get  and set 
 function copyACellToOtherSheet() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const originSheet = libro.getActiveSheet();
  const targetSheet = libro.getSheetByName("Porcentajes");
  const originValue = originSheet.getRange('B8'); 
  const targetValue = targetSheet.getRange('C8');
  originValue.copyTo(targetValue)
 // const texto = "hola hombre";
  //targetValue.setValue(texto);
}