function eliminarRepetidos()
{
  // numero minimo de busquedas es n(n+1)/2
  // var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  // var array = [1,2,1,2,1,4,5,6,7,8,6,6,5,5,7,8,9,7,10,10,23,45,687,2];
  //  var array = [1,2,1,2,1,4,5,6,7,8,6,6,5,5,7,8,9,7,10,10,23,45,687,2,1,1,1,1,1];
 // var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//  var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,7,8,9,10,11,11]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2]
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,7]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,7,8]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,7,8,9]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,7,8,9,10]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,7,8,9,10,11]// es como si tuviera 10 elementos
    // var array = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,7,8,9,10,11,11,11,11,11,11,1,1,1,1,1,1]// es como si tuviera 10 elementos
    var array = [1,1,1,2,3,1,1,2,2,4,3,3,3,5];



  // caso base, es natural no necesita de demostracion: el primer elemnto no esta repetido
  var arrayUnique = [];
  arrayUnique[0] = array[0];


  /* ########################### WITH FOR  #########################3*/
  // var finded = false;
  // for (var i = 1; i < array.length; i++)
  // { 
  //   finded = false;
  //   for (var j = 0; j < arrayUnique.length; j++)
  //   {
  //     if(array[i] == arrayUnique[j])
  //     {
  //       finded = 1;
  //     }
  //   }
  //   if (!finded)
  //   {
  //     arrayUnique[arrayUnique.length] = array[i];
  //   }
  // }

  /* ########################### WITH WHILE: TO SAVE TIME IN BIG FILES #########################*/
  finded = false;
  var indexLimited = 0;
  var numeroDeRepeticiones = 0;
  for (var i = 1; i < array.length; i++)
  { 
    indexLimited = 0;
    finded = false;

    while (!finded && indexLimited < arrayUnique.length)
    {
      if(array[i] == arrayUnique[indexLimited])
      {
        Logger.log("encontre: " + arrayUnique[indexLimited] + " no lo agrgaré");
        finded = 1;
        //numeroDeRepeticiones++
      }
       numeroDeRepeticiones++
      indexLimited++;
      // Logger.log("sentencia de control while: " +( !finded && indexLimited < arrayUnique.length));
    }

    if (!finded)
    {
      arrayUnique[arrayUnique.length] = array[i];
    }
  
  }
      Logger.log("numero de busquedas en total: " + numeroDeRepeticiones);
      Logger.log(arrayUnique);

} 

