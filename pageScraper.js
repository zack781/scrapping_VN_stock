const scraperObject = {
    async scraper(browser, name_) {
        let page = await browser.newPage();
        let url_ = 'https://www.stockbiz.vn/Stocks/' + name_ + '/HistoricalQuotes.aspx';
        console.log(url_);
        console.log(`Navigating to ${url_}...`);
        await page.goto(url_, { waitUntil: 'load', timeout: 0 });


        await page.setDefaultNavigationTimeout(0);

        const checkNull = await page.evaluate(() => {
            if (document.querySelector('div[id="content_com_main"] > div') != null) {
                console.log("Inside");
                return (document.querySelector('div[id="content_com_main"] > div').nextElementSibling.innerText);
            } else {
                return null;
            }
        });

        //const pageNumber = document.querySelectorAll('div[class="pageNavigation"] > a').length;

        let stockData = [[]];

        if (checkNull != "Không tìm thấy kết quả nào.") {

            let pageNumber;

            await page.evaluate(() => {
                callbackData.callback("2000-1-1", "2021-7-19", 250);
                //JS function above is the same as the one below
                //RefreshData(i);
            });
            await page.waitForTimeout(1500);

            const getPageNumber = await page.evaluate(() => {
                return (document.querySelector('div[class="pageNavigation"] > span').innerText);
            });

            pageNumber = getPageNumber;
            console.log("total page = ", pageNumber);

            for (let i = 1; i < pageNumber; i++) {

                await page.evaluate((i) => {
                    console.log(document.querySelectorAll('table[class="dataTable"] > tbody > tr > td')[0]);
                    callbackData.callback("2000-1-1", "2021-7-19", i);
                    //JS function above is the same as the one below
                    //RefreshData(i);
                }, i);
                await page.waitForTimeout(1500);


                const getPageData = await page.evaluate(() => {
                    let count = 0;
                    let pageData = [[]];
                    let index = 0;

                    for (let j = 0; j < document.querySelectorAll('table[class="dataTable"] > tbody > tr > td').length; j++) {
                        console.log("loading..!");
                        console.log(index);

                        pageData[index].push(document.querySelectorAll('table[class="dataTable"] > tbody > tr > td')[j].innerText);
                        count += 1;

                        if (count > 9) {
                            count = 0;
                            pageData.push([]);
                            index += 1;
                        }

                    }
                    return pageData;
                });

                stockData = stockData.concat(getPageData);

            }

        }

        //console.log(stockData);
        return (stockData);
    }
}
module.exports = scraperObject;