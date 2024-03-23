// import thư viện
import axios from "axios";
import fs from "fs/promises";

// import config
import config from "../config.js";
import { logFile } from "./logFile.js";
import getDates from "./dateUtil.js";
/**
 * Hàm tạo url tương ứng để gọi sang bên Vietcombank
 */
export async function crawData() {
  try {
    let url = "";
    let startDate = config.dayStart;
    let dayEnd = config.dayEnd;
    let exchangeRateCollection = [];
    if (startDate && dayEnd) {
      let dayCollection = await getDates(startDate, dayEnd);
      if (dayCollection && dayCollection.length > 0) {
        // đếm thứ tự thực hiện
        let count = 0;
        // duyệt qua từng ngày trong mảng và call sang bên Vietcombank lấy dữ liệu về
        for (const currentDay of dayCollection) {
          count++;
          url = config.sourceDataUrl + currentDay;

          // gọi sang ngân hàng lấy dữ liệu
          let result = await getData(url);
          if (result && result.Data && result.Data.length > 0) {
            let exchangeRate = {
              day: currentDay,
              data: result.Data,
            };
            exchangeRateCollection.push(exchangeRate);
          }
          // đợi 1 khoảng thời gian rồi mới thực hiện tiếp
          await sleep(config.timeWait);
          // lưu nhật ký xem chạy được bao nhiêu phần trăm rồi
          let messageLog = config.logActionSuccess.replace(
            config.keyReplace,
            Math.floor((count / dayCollection.length) * 100)
          );
          await logFile(messageLog);
        }
      }
    }
    if (
      exchangeRateCollection &&
      exchangeRateCollection.length > 0 &&
      config.outputJSONPath
    ) {
      let tempERs = JSON.stringify(exchangeRateCollection);
      let fileName = `${
        config.outputJSONPath
      }exchange_rate_${startDate.replaceAll("-", "_")}_${dayEnd.replaceAll(
        "-",
        "_"
      )}.json`;
      fs.writeFile(fileName, tempERs);
    }
  } catch (error) {
    await logFile(error, "crawlData.crawData");
  }
}
const sleep = (m) => new Promise((r) => setTimeout(r, m));
/**
 * Hàm thực hiện gọi sang bên VietCombank và cào dữ liệu
 * @param {*} url địa chỉ đã hoàn thiện để gọi
 */
async function getData(url) {
  let result = null;
  try {
    const response = await axios.get(url);
    if (response && response.data) {
      result = response.data;
    }
  } catch (error) {
    await logFile(error, "crawlData.getData");
  }
  return result;
}
