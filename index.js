const browserObject = require('./browser');
const scraperController = require('./pageController');
const fs = require('fs');
const readline = require('readline');
const { stdout } = require('process');

let targeted_stock = [];

var rd = readline.createInterface({
    input: fs.createReadStream('targeted_stocks.txt'),
    //output: stdout,
    console: false
});

rd.on('line', function (line) {
    targeted_stock.push(line);
});

rd.on('close', function () {
    console.log(targeted_stock.length);
    targeted_stock = targeted_stock.reverse();


    async function processTasks() {
    for (let i = 0; i < targeted_stock.length; i++) {
        //Start the browser and create a browser instance

        let stock_name = targeted_stock[i].toString();

        let browserInstance = browserObject.startBrowser();

        await scraperController(browserInstance, stock_name);

        

    }}

    processTasks();

});


