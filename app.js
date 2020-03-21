#!/usr/bin/env node

const puppeteer = require("puppeteer");
const AsciiTable = require("ascii-table");
const argv = require("minimist")(process.argv.slice(2));

const URL = "https://bonbast.com";

const getValueBySelector = (page, selector) => {
  return page.$eval(selector, el => el.innerText);
};

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: argv.proxy
      ? ["--proxy-server=" + argv.proxy]
      : ["--proxy-auto-detect"]
  });
  const page = await browser.newPage();

  try {
    await page.goto(URL);
    let currencyValues = {
      usd: {
        label: "US Dollar",
        sell: await getValueBySelector(page, "#usd1"),
        buy: await getValueBySelector(page, "#usd2")
      },
      eur: {
        label: "Euro",
        sell: await getValueBySelector(page, "#eur1"),
        buy: await getValueBySelector(page, "#eur2")
      },
      try: {
        label: "Turkish Lira",
        sell: await getValueBySelector(page, "#try1"),
        buy: await getValueBySelector(page, "#try2")
      },
      aed: {
        label: "UAE Dirham",
        sell: await getValueBySelector(page, "#aed1"),
        buy: await getValueBySelector(page, "#aed2")
      },
      gbp: {
        label: "British Pound",
        sell: await getValueBySelector(page, "#gbp1"),
        buy: await getValueBySelector(page, "#gbp2")
      }
    };

    const userCurrencyArgs = argv._;
    let supportedCurrencies = Object.keys(currencyValues);

    if (userCurrencyArgs.length > 0) {
      // user needs only specifc currencies
      supportedCurrencies = userCurrencyArgs.filter(i =>
        supportedCurrencies.includes(i.toLocaleLowerCase())
      );
    }

    supportedCurrencies = [...new Set(supportedCurrencies)];

    const lastUpdate = await page.$eval("#last_modified", el => el.innerText);

    let tableJSON = {
      title: "",
      heading: ["", "Code", "Currency", "Sell", "Buy"],
      rows: []
    };

    supportedCurrencies.map((currency, index) => {
      let currencyCode = currency.toUpperCase();

      tableJSON.rows.push([
        ++index,
        currencyCode,
        currencyValues[currency]["label"],
        numberWithCommas(currencyValues[currency]["sell"]),
        numberWithCommas(currencyValues[currency]["buy"])
      ]);
    });

    const table = new AsciiTable().fromJSON(tableJSON);
    console.log(table.render());
    console.log(`- Last update: ${lastUpdate}`);
    console.log("- Prices are in Iranian Toman (1 Toman = 10 Rials)");
    console.log("- Source: bonbast.com");

    await browser.close();
  } catch (e) {
    console.log(
      "Can not connect to bonbast.com. If you are in Iran, you may use a proxy. Example:\nchande --proxy socks5://127.0.0.1:1080 "
    );

    await browser.close();
  } finally {
    process.exit(1);
  }
})();
