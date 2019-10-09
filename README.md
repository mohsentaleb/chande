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
.--------------------------------------------.
|   | Currency | Lowest  | Highest |  Live   |
|---|----------|---------|---------|---------|
| 1 | USD      | 113,890 | 114,090 | 113,950 |
| 2 | EUR      | 125,890 | 126,000 | 126,000 |
| 3 | TRY      | 19,840  | 20,000  | 19,900  |
| 4 | AED      | 31,630  | 31,730  | 31,730  |
| 5 | GBP      | 141,340 | 142,190 | 141,790 |
'--------------------------------------------'
* Prices are in IRR.
** Source: www.tgju.org
```

# License
MIT