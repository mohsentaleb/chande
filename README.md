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
chande usd eur
```

Sample output:
```
.--------------------------------------------.
|   | Currency | Lowest  | Highest |  Live   |
|---|----------|---------|---------|---------|
| 1 | USD      | 113,890 | 114,000 | 113,930 |
| 2 | EUR      | 125,890 | 126,000 | 126,000 |
| 3 | TRY      | 19,930  | 20,210  | 19,940  |
| 4 | AED      | 31,550  | 31,650  | 31,610  |
'--------------------------------------------'
* Prices are in IRR.
** Source: www.tgju.org
```

# License
MIT