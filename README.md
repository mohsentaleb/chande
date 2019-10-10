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
|   | Currency |     Last Update     |  Fluctuation  | Lowest  | Highest |  Live   |
|---|----------|---------------------|---------------|---------|---------|---------|
| 1 | USD      | 2019-10-10 15:59:54 | ▲ 70 (%0.06)  | 113,890 | 114,090 | 114,020 |
| 2 | EUR      | 2019-10-10 15:59:54 | ▼ 60 (%0.05)  | 125,890 | 126,000 | 125,940 |
| 3 | TRY      | 2019-10-10 15:59:54 | ▼ 20 (%0.1)   | 19,870  | 19,910  | 19,880  |
| 4 | AED      | 2019-10-10 15:59:54 | ▼ 50 (%0.16)  | 31,660  | 31,730  | 31,680  |
| 5 | GBP      | 2019-10-10 15:59:54 | ▼ 230 (%0.16) | 141,480 | 141,790 | 141,560 |
'----------------------------------------------------------------------------------'
* Prices are in IRR.
** Source: www.tgju.org
```

# License
MIT