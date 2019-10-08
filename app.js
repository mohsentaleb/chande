#!/usr/bin/env node
const got = require('got');
const AsciiTable = require('ascii-table');
const chalk = require('chalk');

(async () => {
    let prices = await got('http://call4.tgju.org/ajax.json', { json: true });
    
    var table = new AsciiTable()
    table
        .setHeading('', 'Currency', 'Lowest', 'Highest', 'Live')
        .addRow(1, 'USD', prices.body.current.price_dollar_rl.l, prices.body.current.price_dollar_rl.h, prices.body.current.price_dollar_rl.p)
        .addRow(2, 'EUR', prices.body.current.price_eur.l, prices.body.current.price_eur.h, prices.body.current.price_eur.p)
        .addRow(3, 'TRY', prices.body.current.price_try.l, prices.body.current.price_try.h, prices.body.current.price_try.p)
        .addRow(4, 'AED', prices.body.current.price_aed.l, prices.body.current.price_aed.h, prices.body.current.price_aed.p)

    console.log(table.render());
    console.log('* Prices are in IRR.');
    console.log('** Source: www.tgju.org');
    

})();
