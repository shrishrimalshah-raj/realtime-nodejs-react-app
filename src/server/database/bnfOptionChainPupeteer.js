import puppeteer from "puppeteer";

let BNF_OPTION_CHAIN_DATA = null;

const bnfOptionChainPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: false }); //browser initiate
  const page = await browser.newPage(); // opening a new blank page

  await page.goto(
    "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY",
    { waitUntil: "domcontentloaded" }
  );

  let data = await page.evaluate(
    () => document.querySelector("body").innerText
  );

  BNF_OPTION_CHAIN_DATA = JSON.parse(data);

  await browser.close();
  return BNF_OPTION_CHAIN_DATA;
};

export { bnfOptionChainPuppeteer, BNF_OPTION_CHAIN_DATA };
