// Connection URL
require('dotenv').config()
const envVars = process.env;

const config = {
  url: envVars.NODE_ENV === "dev" ? "mongodb://localhost:27018" : "mongodb://localhost:27017",
  dbName: "oi-data-analysis",
  collectionNameBankNiftyOptionChainOI: "banknifty-option-chain-oi",
  collectionNameBankNiftyFuturesOI: "banknifty-futures-oi",
};

export { config };
