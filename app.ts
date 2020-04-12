#!/usr/bin/env node
import puppeteer, { Page } from "puppeteer";
// @ts-ignore
import AsciiTable from "ascii-table";
import { program } from "commander";
import { version } from "./package.json";

program
  .version(version)
  .option(
    "-p, --proxy <scheme://host:port>",
    "use a proxy for the request. e.g. socks5://127.0.0.1:1080"
  )
  .parse(process.argv);

type TableRow = [number, string, string, string, string];

interface CurrencyValue {
  label: string;
  sell: string;
  buy: string;
}

interface CurrencyValues {
  [key: string]: CurrencyValue;
}

interface TableJSON {
  title: string;
  heading: string[];
  rows: TableRow[];
}

const URL = "https://bonbast.com";

const getValueBySelector = async (page: Page, selector: string) => {
  const el = await page.$(selector);
  if (el) {
    return page.evaluate((el) => el.innerText, el);
  }
};

const thousandsSeparator = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: program.proxy
      ? ["--proxy-server=" + program.proxy]
      : ["--proxy-auto-detect"],
  });
  const page: Page = await browser.newPage();

  try {
    await page.goto(URL);
    let currencyValues: CurrencyValues = {
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

    const userCurrencyArgs: string[] = program.args;
    let supportedCurrencies: string[] = Object.keys(currencyValues);

    if (userCurrencyArgs.length > 0) {
      // user needs only specifc currencies
      supportedCurrencies = userCurrencyArgs.filter((currencyCode: string) =>
        supportedCurrencies.includes(currencyCode.toLocaleLowerCase())
      );
    }

    const supportedCurrenciesSet: string[] = Array.from(
      new Set(supportedCurrencies)
    );

    const lastUpdate = await getValueBySelector(page, "#last_modified");

    let tableJSON: TableJSON = {
      title: "",
      heading: ["", "Code", "Currency", "Sell", "Buy"],
      rows: [],
    };

    supportedCurrenciesSet.map((currency: string, index) => {
      let currencyCode = currency.toUpperCase();

      const row: TableRow = [
        ++index,
        currencyCode,
        currencyValues[currency]["label"],
        thousandsSeparator(currencyValues[currency]["sell"]),
        thousandsSeparator(currencyValues[currency]["buy"]),
      ];

      tableJSON.rows.push(row);
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
  }
})();
