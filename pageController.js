const pageScraper = require('./pageScraper');

const stringify = require('csv-stringify');
const fs = require('fs');

async function scrapeAll(browserInstance, stock_name){
    console.log("controller = ", stock_name);
    let browser;

    try{
        browser = await browserInstance;
        scrapedData = await pageScraper.scraper(browser, stock_name);

        await browser.close();

        console.log(scrapedData);

        
        for (let i=0; i<scrapedData.length; i++){
            for (let j=0; j<scrapedData[i].length; j++){
                scrapedData[i][j] = scrapedData[i][j].trim();
            }
        }

        //console.log(stockData);
        stringify(scrapedData, function(err, output) {
            fs.writeFile(stock_name + '_price.csv', output, 'utf8', function(err) {
              if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
              } else {
                console.log('It\'s saved!');
              }
            });
          }); 

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, stock_name) => scrapeAll(browserInstance, stock_name)