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
.-----------------------------------------------------------.
|   | Currency | Fluctuation  | Lowest  | Highest |  Live   |
|---|----------|--------------|---------|---------|---------|
| 1 | USD      | ▼ 40 (%0.04) | 113,890 | 114,090 | 113,910 |
| 2 | EUR      | -            | 125,890 | 126,000 | 126,000 |
| 3 | TRY      | -            | 19,880  | 19,910  | 19,900  |
| 4 | AED      | ▼ 10 (%0.03) | 31,690  | 31,730  | 31,720  |
| 5 | GBP      | ▼ 40 (%0.03) | 141,610 | 141,790 | 141,750 |
'-----------------------------------------------------------'
* Prices are in IRR.
** Source: www.tgju.org
```

# License
MIT