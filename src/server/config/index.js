// Connection URL
require('dotenv').config()

const config = {
  url: process.env.URL || "mongodb://localhost:27018",
  dbName: "oi-data-analysis",
  collectionNameBankNiftyOptionChainOI: "banknifty-option-chain-oi",
  collectionNameBankNiftyFuturesOI: "banknifty-futures-oi",
};

export { config };
