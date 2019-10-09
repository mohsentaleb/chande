#!/usr/bin/env node

const got = require('got');
const AsciiTable = require('ascii-table');

(async () => {
    const userCurrency = process.argv.slice(2);
    const pricesJSON = await got('http://call4.tgju.org/ajax.json', {
        json: true
    });
    const {
        current: prices
    } = pricesJSON.body;

    let currencyValues = {
        usd: [prices.price_dollar_rl.l, prices.price_dollar_rl.h, prices.price_dollar_rl.p],
        eur: [prices.price_eur.l, prices.price_eur.h, prices.price_eur.p],
        try: [prices.price_try.l, prices.price_try.h, prices.price_try.p],
        aed: [prices.price_aed.l, prices.price_aed.h, prices.price_aed.p],
        gbp: [prices.price_gbp.l, prices.price_gbp.h, prices.price_gbp.p],
    };

    let supportedCurrencies = Object.keys(currencyValues);

    if (userCurrency.length > 0) {
        supportedCurrencies = userCurrency.filter(i => supportedCurrencies.includes(i.toLocaleLowerCase()));
    }

    supportedCurrencies = [...new Set(supportedCurrencies)];

    let tableJSON = {
        title: '',
        heading: ['', 'Currency', 'Lowest', 'Highest', 'Live'],
        rows: []
    };

    supportedCurrencies.map((currency, index) => {
        let currencyId = currency.toUpperCase();
        tableJSON.rows.push([++index, currencyId, ...currencyValues[currency]]);
    });

    const table = new AsciiTable().fromJSON(tableJSON);
    console.log(table.render());
    console.log('* Prices are in IRR.');
    console.log('** Source: www.tgju.org');
})();