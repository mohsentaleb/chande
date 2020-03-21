# Chande
A minimal command-line tool for getting the rate of popular currencies in Iran's **free market** from [bonbast.com](https://bonbast.com).

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
|   | Code |   Currency    |  Sell  |  Buy   |
|---|------|---------------|--------|--------|
| 1 | USD  | US Dollar     | 16,100 | 16,000 |
| 2 | EUR  | Euro          | 17,330 | 17,180 |
| 3 | TRY  | Turkish Lira  | 2,455  | 2,435  |
| 4 | AED  | UAE Dirham    | 4,385  | 4,365  |
| 5 | GBP  | British Pound | 18,755 | 18,555 |
'--------------------------------------------'
- Last update: Sat, 21 Mar 2020 09:26:02
- Prices are in Iranian Toman (1 Toman = 10 Rials)
- Source: bonbast.com
```

# Proxy support
Since bonbast.com is banned in Iran, you may use a proxy:

```shell
chande --proxy socks5://127.0.0.1:1080
```
With currency args:
```shell
chande usd try --proxy socks5://127.0.0.1:1080
```

# License
MIT
