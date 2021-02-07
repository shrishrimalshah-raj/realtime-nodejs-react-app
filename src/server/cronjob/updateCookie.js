import cron from "node-cron";
import axios from "axios";
const puppeteer = require("puppeteer");
import { getBankNiftyOptionChainData } from "../database/bankNiftyOptionChain";
import { getBankNiftyFutureData } from "../database/bankNiftyFuture";
let cookie = "";

// const getCookie = async () => {
//   console.log(
//     "************ CRON JOB START FOR UPDATING COOKIE ***************"
//   );
//   try {
//     const response = await axios.get(
//       "https://www.nseindia.com/market-data/equity-derivatives-watch"
//     );
//     console.log("response cookie *********", response);

//     const headers = response.headers;
//     console.log("response cookie *******", headers);
//     cookie = headers["set-cookie"];
//     cookie = `${cookie[0]};${cookie[1]};`;
//   } catch (error) {
//     console.log('error getCookie() ====>', error)
//   }

//   console.log("************ CRON JOB END FOR UPDATING COOKIE ***************");
// };

const getCookie = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const websiteUrl =
    "https://www.nseindia.com/market-data/most-active-contracts";

  const response = await page.goto(websiteUrl, {
    waitUntil: "networkidle2",
  });

  const headers = response.headers();
  //   console.log(headers);
  let tempCookie = headers["set-cookie"];
  const spltArray = tempCookie.split(";");
  const newCookie = `${spltArray[0]};${spltArray[5]};`;
  cookie = newCookie.replace(/ SameSite=Lax\n/g, "");
  // console.log('cookie******', cookie);
  await browser.close();
};

const seedDataIntoDB = async () => {
  if (cookie === "") {
    console.log(
      `************ CRON FUNCTION CALLED for 1st time cookie === "" ***************`
    );

    await getCookie();
  }
  await getBankNiftyOptionChainData();
  await getBankNiftyFutureData();
};

// cron.schedule("*/1 * * * *", getCookie);

export { cookie, getCookie, seedDataIntoDB };
