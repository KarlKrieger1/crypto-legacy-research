Logger.log("code 1")
function samplePath() {
  Logger.log("entre a sampler tamp")
  var found, html, content = '';
  var response = UrlFetchApp.fetch("https://coinmarketcap.com/currencies/bitcoin/");

  if (response) {
    html = response.getContentText();
    if (html) content1 = html.match(/(<strong>Bitcoin Price<\/strong><\/th><td>\$[\d+,.]*)/);
  }
 response = UrlFetchApp.fetch("https://coinmarketcap.com/currencies/ethereum/");
 if (response)
 {
    html = response.getContentText();
     if (html) content2 = html.match(/(<strong>Ethereum Price<\/strong><\/th><td>\$)([\d+,.]*)/);
 }
  
   Logger.log(content1);
   Logger.log(content2);
}
  Logger.log("sali a sampler tamp")
// (<strong>Bitcoin Price<\/strong><\/th><td>\$)

// //*[@id="content"]/table[3]/tbody/tr/td[3]/span[1]

// //if (html) content = html.match(/<span class="surligneorange">([\d.]*).*?<\/span>/)[1];
// //if (html) content = html.match(/<span class="surligneorange">([\d.]*).*<\/span>/)[1];


// //if (html) content = html.match(/<span class="surligneorange">([\d.]*).*?<\/span>/)[1];

// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[1]/td[4]/div/a
// /html/body/div/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[1]/td[4]/div/a

// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[100]/td[4]/div/a
// /html/body/div/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[100]/td[4]/div/a

// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[1]/td[4]/div/a
// /html/body/div/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[1]/td[4]/div/a

// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[3]/td[4]/div/a
// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[21]/td[4]/div/a


// dentro de la moneda
// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/div
// /html/body/div/div/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/div
// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/div
// /html/body/div/div/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/
// //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/div
// /html/body/div/div/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/div
// //*[@id="__next"]/div/div[1]/div[2]/div/div[3]/div/div[1]/div[2]/div[2]/div/div[1]/table/tbody/tr[1]/td