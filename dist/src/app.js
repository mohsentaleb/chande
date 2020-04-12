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
const package_json_1 = require("../package.json");
commander_1.program.version(package_json_1.version);
//const argv = minimist(process.argv.slice(2));
const URL = "https://bonbast.com";
const getValueBySelector = async (page, selector) => {
    const el = await page.$(selector);
    if (el) {
        return page.evaluate((el) => el.innerText, el);
    }
};
const thousandsSeparator = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
commander_1.program.parse(process.argv);
if (!commander_1.program.args.length)
    commander_1.program.help();
async () => {
    const browser = await puppeteer_1.default.launch({
        headless: true,
    });
    const page = await browser.newPage();
    try {
        await page.goto(URL);
        let currencyValues = {
            usd: {
                label: "US Dollar",
                sell: await getValueBySelector(page, "#usd1"),
                buy: await getValueBySelector(page, "#usd2"),
            },
            eur: {
                label: "Euro",
                sell: await getValueBySelector(page, "#eur1"),
                buy: await getValueBySelector(page, "#eur2"),
            },
            try: {
                label: "Turkish Lira",
                sell: await getValueBySelector(page, "#try1"),
                buy: await getValueBySelector(page, "#try2"),
            },
            aed: {
                label: "UAE Dirham",
                sell: await getValueBySelector(page, "#aed1"),
                buy: await getValueBySelector(page, "#aed2"),
            },
            gbp: {
                label: "British Pound",
                sell: await getValueBySelector(page, "#gbp1"),
                buy: await getValueBySelector(page, "#gbp2"),
            },
        };
        const userCurrencyArgs = [];
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
                thousandsSeparator(currencyValues[currency]["sell"]),
                thousandsSeparator(currencyValues[currency]["buy"]),
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
    finally {
        process.exit(1);
    }
};
