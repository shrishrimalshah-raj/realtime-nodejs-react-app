import { config } from "../config";
import {
  InsertOneDocument,
  FineOneDocument,
  FindLastNDocument,
} from "./Repository";
import AxiosService from "./AxiosService";
import { strikePricesArray } from "./helper";
import { cookie } from "../cronjob/updateCookie";
import axios from "axios";
import {
  bnfOptionChainPuppeteer,
  BNF_OPTION_CHAIN_DATA,
} from "./bnfOptionChainPupeteer";

const { collectionNameBankNiftyOptionChainOI } = config;

const getBankNiftyOptionChainData = async (req, res) => {
  try {
    console.log(
      "************ getBankNiftyOptionChainData API Called ***************"
    );

    // const { data } = await AxiosService.get(
    //   "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY"
    // );

    const headers = {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie: cookie,
        mode: "cors",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64)",
        "content-encoding": "gzip",
        "content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY",
      headers
    );

    console.log("getBankNiftyOptionChainData =====> data =====>", typeof data);

    // let data = await bnfOptionChainPuppeteer();
    // console.log("bnfOptionChainPuppeteer =====> data =====>", typeof data);

    // if (typeof data === string) {
    //   console.log("data ***", data);
    //   data = await bnfOptionChainPuppeteer();
    // }

    //previous record
    const dataRecord = await FindLastNDocument(
      collectionNameBankNiftyOptionChainOI,
      {},
      { createdAt: -1 },
      1
    );

    let timestamp = data.records.timestamp;

    const underlyingValue = Math.ceil(data.records.underlyingValue / 100) * 100;

    const strikeArray = strikePricesArray(underlyingValue).sort();

    const filterData = data.filtered.data.filter((item) =>
      strikeArray.includes(item.strikePrice)
    );
    let dataCallPutOI = filterData.reduce((acc, curr) => {
      if (Object.keys(acc).length === 0) {
        acc = {
          callOpenInterest: curr["CE"].openInterest,
          putOpenInterest: curr["PE"].openInterest,
          callChangeInOpenInterest: curr["CE"].changeinOpenInterest,
          putChangeInOpenInterest: curr["PE"].changeinOpenInterest,
        };

        return acc;
      } else {
        acc = {
          callOpenInterest: acc.callOpenInterest + curr["CE"].openInterest,
          putOpenInterest: acc.putOpenInterest + curr["PE"].openInterest,
          callChangeInOpenInterest:
            acc.callChangeInOpenInterest + curr["CE"].changeinOpenInterest,
          putChangeInOpenInterest:
            acc.putChangeInOpenInterest + curr["PE"].changeinOpenInterest,
        };

        return acc;
      }
    }, {});

    dataCallPutOI = {
      ...dataCallPutOI,
      openInterestSignal:
        dataCallPutOI.putOpenInterest > dataCallPutOI.callOpenInterest
          ? "BUY"
          : "SELL",
      changeInOpenInterestSignal:
        dataCallPutOI.putChangeInOpenInterest >
        dataCallPutOI.callChangeInOpenInterest
          ? "BUY"
          : "SELL",
      diffOpenInterest:
        dataCallPutOI.putOpenInterest - dataCallPutOI.callOpenInterest,
      diffChangeInOpenInterest:
        dataCallPutOI.putChangeInOpenInterest -
        dataCallPutOI.callChangeInOpenInterest,
      pcr: Number(
        (
          dataCallPutOI.putOpenInterest / dataCallPutOI.callOpenInterest
        ).toFixed(2)
      ),
      timestamp: new Date(timestamp),
      underlyingValue: data.records.underlyingValue,
      createdAt: new Date(),
      priceChange: data.records.underlyingValue - dataRecord[0].underlyingValue,
    };

    const isDupicate = await FineOneDocument(
      collectionNameBankNiftyOptionChainOI,
      {
        timestamp: new Date(timestamp),
      }
    );

    if (!isDupicate) {
      console.log("!! Data Inserted OPTIONS Data !!");

      await InsertOneDocument(
        collectionNameBankNiftyOptionChainOI,
        dataCallPutOI
      );
    }
    return true;
  } catch (error) {
    console.log(
      `************ getBankNiftyOptionChainData API Error ${error} ***************`
    );
  }
};

export { getBankNiftyOptionChainData };
