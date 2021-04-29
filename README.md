# TransportFullstack

To run app locally:

1. Clone this repo.
2. Into file `/APP/proxy.conf.json` replace all for this: 
```json
{
  "*": {
    "target": "https://transports-quotations.herokuapp.com",
    "secure": false,
    "changeOrigin": true
  }
}
```
3. Run the command `npm i`
4. Run the command `ng serve`
