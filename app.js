#!/usr/bin/env node

const got = require('got');
const AsciiTable = require('ascii-table');

(async () => {
    const userCurrency = process.argv.slice(2);
    let pricesJSON;
    
    try {
        pricesJSON = await got('http://call2.tgju.org/ajax.json', { json: true });
    }
    // Handling all connection errors here.
    // - Not connected to the Internet
    // - tgju.org is not responding or URL has changed
    catch (err) {
        if (err.code === 'ECONNREFUSED') {
            console.log('\nSeems like you are not connected to the Internet. Please check your connection and try again.');
            return;            
        }

        if (err.statusCode === 522) {
            console.log('\nAn error occured while fetching data from tgju.org. Please try updating your app: npm update chande -g \nIf the problem presists, please open an issue: https://github.com/mohsentaleb/chande/issues');
            return;
        }
    }
    const { current: prices } = pricesJSON.body;

    let currencyValues = {
        // [live, change, fluctuation, %change, lastUpdate, lowest, highest]
        usd: [prices.price_dollar_rl.p, prices.price_dollar_rl.d, prices.price_dollar_rl.dt, prices.price_dollar_rl.dp, prices.price_dollar_rl.ts, prices.price_dollar_rl.l, prices.price_dollar_rl.h],
        eur: [prices.price_eur.p, prices.price_eur.d, prices.price_eur.dt, prices.price_eur.dp, prices.price_eur.ts, prices.price_eur.l, prices.price_eur.h],
        try: [prices.price_try.p, prices.price_try.d, prices.price_try.dt, prices.price_try.dp, prices.price_try.ts, prices.price_try.l, prices.price_try.h],
        aed: [prices.price_aed.p, prices.price_aed.d, prices.price_aed.dt, prices.price_aed.dp, prices.price_aed.ts, prices.price_aed.l, prices.price_aed.h],
        gbp: [prices.price_gbp.p, prices.price_gbp.d, prices.price_gbp.dt, prices.price_gbp.dp, prices.price_gbp.ts, prices.price_gbp.l, prices.price_gbp.h]
    };

    let supportedCurrencies = Object.keys(currencyValues);

    if (userCurrency.length > 0) {
        supportedCurrencies = userCurrency.filter(i => supportedCurrencies.includes(i.toLocaleLowerCase()));
    }

    supportedCurrencies = [...new Set(supportedCurrencies)];

    let tableJSON = {
        title: '',
        heading: ['', 'Currency', 'Live', 'Fluctuation', 'Last Update', 'Lowest', 'Highest'],
        rows: []
    };

    supportedCurrencies.map((currency, index) => {
        let currencyId = currency.toUpperCase();
        var fluctuation, livePrice, difference;
        switch (currencyValues[currency][2]) {
            case 'low':
                fluctuation = '▼ ' + currencyValues[currency][1] + ' (%' + currencyValues[currency][3] + ')';
                break;
            case 'high':
                fluctuation = '▲ ' + currencyValues[currency][1] + ' (%' + currencyValues[currency][3] + ')';
                break;
            default:
                fluctuation = '-'
        }
        tableJSON.rows.push([++index, currencyId, currencyValues[currency][0], fluctuation, ...currencyValues[currency].splice(4)]);
    });

    const table = new AsciiTable().fromJSON(tableJSON);
    console.log(table.render());
    console.log('* Prices are in IRR.');
    console.log('** Source: www.tgju.org');
})();
