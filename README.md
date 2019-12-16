# Chande

A minimal command line tool to get the rate of popular currencies in Iran from [tgju.org](http://www.tgju.org/).

# Installation

```shell
npm install -g chande
```

# Usage

For getting all the available currencies:

```shell
chande
```

For getting an specific currency:

```
chande usd
```

Or multiple currencies at once:

```
chande usd eur try
```

Sample output:

```
.----------------------------------------------------------------------------------.
|   | Currency |  Live   |  Fluctuation  |     Last Update     | Lowest  | Highest |
|---|----------|---------|---------------|---------------------|---------|---------|
| 1 | USD      | 113,540 | ▲ 160 (%0.14) | 2019-11-09 11:41:31 | 113,380 | 113,550 |
| 2 | EUR      | 126,420 | ▼ 60 (%0.05)  | 2019-11-09 11:41:31 | 126,390 | 126,540 |
| 3 | TRY      | 19,890  | ▼ 90 (%0.45)  | 2019-11-09 11:41:31 | 19,880  | 19,920  |
| 4 | AED      | 31,460  | ▼ 30 (%0.1)   | 2019-11-09 11:41:31 | 31,440  | 31,510  |
| 5 | GBP      | 146,630 | ▼ 680 (%0.46) | 2019-11-09 11:41:31 | 146,520 | 146,840 |
'----------------------------------------------------------------------------------'
* Prices are in IRR.
** Source: www.tgju.org
```

# Testing

```
npm test
```

# License

MIT
