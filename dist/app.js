#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
// @ts-ignore
const ascii_table_1 = __importDefault(require("ascii-table"));
const commander_1 = require("commander");
const package_json_1 = require("./package.json");
commander_1.program
    .version(package_json_1.version)
    .option("-p, --proxy <scheme://host:port>", "use a proxy for the request. e.g. socks5://127.0.0.1:1080")
    .parse(process.argv);
const URL = "https://bonbast.com";
const getValueBySelector = async (page, selector) => {
    const el = await page.$(selector);
    if (el) {
        return page.evaluate((el) => el.innerText, el);
    }
};
(async () => {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: commander_1.program.proxy
            ? ["--proxy-server=" + commander_1.program.proxy]
            : ["--proxy-auto-detect"],
    });
    const page = await browser.newPage();
    try {
        await page.goto(URL);
        let currencyValues = {
            usd: {
                label: "US Dollar",
                sell: parseInt(await getValueBySelector(page, "#usd1")),
                buy: await getValueBySelector(page, "#usd2"),
            },
            eur: {
                label: "Euro",
                sell: parseInt(await getValueBySelector(page, "#eur1")),
                buy: parseInt(await getValueBySelector(page, "#eur2")),
            },
            try: {
                label: "Turkish Lira",
                sell: parseInt(await getValueBySelector(page, "#try1")),
                buy: parseInt(await getValueBySelector(page, "#try2")),
            },
            aed: {
                label: "UAE Dirham",
                sell: parseInt(await getValueBySelector(page, "#aed1")),
                buy: parseInt(await getValueBySelector(page, "#aed2")),
            },
            gbp: {
                label: "British Pound",
                sell: parseInt(await getValueBySelector(page, "#gbp1")),
                buy: parseInt(await getValueBySelector(page, "#gbp2")),
            },
        };
        const userCurrencyArgs = commander_1.program.args;
        let supportedCurrencies = Object.keys(currencyValues);
        if (userCurrencyArgs.length > 0) {
            // user needs only specifc currencies
            supportedCurrencies = userCurrencyArgs.filter((currencyCode) => supportedCurrencies.includes(currencyCode.toLocaleLowerCase()));
        }
        const supportedCurrenciesSet = Array.from(new Set(supportedCurrencies));
        const lastUpdate = await getValueBySelector(page, "#last_modified");
        let tableJSON = {
            title: "",
            heading: ["", "Code", "Currency", "Sell", "Buy"],
            rows: [],
        };
        supportedCurrenciesSet.map((currency, index) => {
            let currencyCode = currency.toUpperCase();
            const row = [
                ++index,
                currencyCode,
                currencyValues[currency]["label"],
                new Intl.NumberFormat("en-US").format(currencyValues[currency]["sell"]),
                new Intl.NumberFormat("en-US").format(currencyValues[currency]["buy"]),
            ];
            tableJSON.rows.push(row);
        });
        const table = new ascii_table_1.default().fromJSON(tableJSON);
        console.log(table.render());
        console.log(`- Last update: ${lastUpdate}`);
        console.log("- Prices are in Iranian Toman (1 Toman = 10 Rials)");
        console.log("- Source: bonbast.com");
        await browser.close();
    }
    catch (e) {
        console.log("Can not connect to bonbast.com. If you are in Iran, you may use a proxy. Example:\nchande --proxy socks5://127.0.0.1:1080 ");
        await browser.close();
    }
})();
