// file thực hiện build ra script insert vào bảng từ các file tỷ giá dạng json trong thư mục output

// file thư viện
import { v4 as uuidv4 } from "uuid";

// danh sách các tỷ giá
import t3n23 from "./output/exchange_rate_2023_03_01_2023_03_31.json" assert { type: "json" };

// file tự viết
import { logFile, logFileWithOuputPath } from "./src/logFile.js";
import config from "./config.js";

// các hằng số
const tableName = "sme.exchange_rate_history";
const keyPrimaryColumn = "exchange_rate_id";
const createdDateColumn = "created_date";
const currencyCodeColumn = "currency_code";
const currencyNameColumn = "currency_name";
const buyColumn = "buy";
const sellColumn = "sell";
const transferColumn = "transfer";

async function runTool() {
  try {
    // có bao nhiêu lần import thì có bấy nhiêu lần thêm vào mảng dưới đây
    let exchangeRateCollection = [...t3n23];
    // tạo lệnh xóa trước tiên
    let script = `delete from ${tableName} where ${createdDateColumn} between ${config.dayStart} and ${config.dayEnd};\r\n`;
    exchangeRateCollection.forEach((exchangeRate) => {
      if (
        exchangeRate &&
        exchangeRate.day &&
        exchangeRate.data &&
        exchangeRate.data.length > 0
      ) {
        let currentDate = exchangeRate.day;
        exchangeRate.data.forEach((item) => {
          if (item && item.currencyCode && item.currencyName) {
            let tempScript = `insert into ${tableName} (${keyPrimaryColumn}, ${createdDateColumn}, ${currencyCodeColumn}, ${currencyNameColumn}, ${buyColumn}, ${sellColumn}, ${transferColumn}) values (${uuidv4()} , ${currentDate}), ${
              item.currencyCode
            }, ${item.currencyName}, ${item.cash}, ${item.sell}, ${
              item.transfer
            };\r\n`;
            script += tempScript;
          }
        });
      }
    });
    if (script) {
      await logFileWithOuputPath(script, config.outputGenScript);
    }
  } catch (error) {
    await logFile(error, "buildScript.runTool");
  }
}

runTool();
