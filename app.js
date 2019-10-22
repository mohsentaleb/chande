#!/usr/bin/env node

const got = require('got');
const AsciiTable = require('ascii-table');

(async () => {
    const userCurrency = process.argv.slice(2);
    const pricesJSON = await got('http://call4.tgju.org/ajax.json', {
        json: true
    });
    const { current: prices } = pricesJSON.body;

    let currencyValues = {
        // [lastUpdate, change, fluctuation, %change, lowest, highest, live]
        usd: [prices.price_dollar_rl.ts, prices.price_dollar_rl.d, prices.price_dollar_rl.dt, prices.price_dollar_rl.dp, prices.price_dollar_rl.l, prices.price_dollar_rl.h, prices.price_dollar_rl.p],
        eur: [prices.price_eur.ts, prices.price_eur.d, prices.price_eur.dt, prices.price_eur.dp, prices.price_eur.l, prices.price_eur.h, prices.price_eur.p],
        try: [prices.price_try.ts, prices.price_try.d, prices.price_try.dt, prices.price_try.dp, prices.price_try.l, prices.price_try.h, prices.price_try.p],
        aed: [prices.price_aed.ts, prices.price_aed.d, prices.price_aed.dt, prices.price_aed.dp, prices.price_aed.l, prices.price_aed.h, prices.price_aed.p],
        gbp: [prices.price_gbp.ts, prices.price_gbp.d, prices.price_gbp.dt, prices.price_gbp.dp, prices.price_gbp.l, prices.price_gbp.h, prices.price_gbp.p],
        sek: [prices.price_sek.ts, prices.price_sek.d, prices.price_sek.dt, prices.price_sek.dp, prices.price_sek.l, prices.price_sek.h, prices.price_sek.p]
    };

    let supportedCurrencies = Object.keys(currencyValues);

    if (userCurrency.length > 0) {
        supportedCurrencies = userCurrency.filter(i => supportedCurrencies.includes(i.toLocaleLowerCase()));
    }

    supportedCurrencies = [...new Set(supportedCurrencies)];

    let tableJSON = {
        title: '',
        heading: ['', 'Currency', 'Last Update', 'Fluctuation', 'Lowest', 'Highest', 'Live'],
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
