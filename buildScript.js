// file thực hiện build ra script insert vào bảng từ các file tỷ giá dạng json trong thư mục output

// file thư viện
import { v4 as uuidv4 } from "uuid";

// danh sách các tỷ giá
import t3n23 from "./output/exchange_rate_2023_03_01_2023_03_31.json" assert { type: "json" };
import t4n23 from "./output/exchange_rate_2023_04_01_2023_04_30.json" assert { type: "json" };
import t5n23 from "./output/exchange_rate_2023_05_01_2023_05_31.json" assert { type: "json" };
import t6n23 from "./output/exchange_rate_2023_06_01_2023_06_30.json" assert { type: "json" };
import t7n23 from "./output/exchange_rate_2023_07_01_2023_07_31.json" assert { type: "json" };
import t8n23 from "./output/exchange_rate_2023_08_01_2023_08_31.json" assert { type: "json" };
import t9n23 from "./output/exchange_rate_2023_09_01_2023_09_30.json" assert { type: "json" };
import t10n23 from "./output/exchange_rate_2023_10_01_2023_10_31.json" assert { type: "json" };
import t11n23 from "./output/exchange_rate_2023_11_01_2023_11_30.json" assert { type: "json" };
import t12n23 from "./output/exchange_rate_2023_12_01_2023_12_31.json" assert { type: "json" };
import t1n24 from "./output/exchange_rate_2024_01_01_2024_01_31.json" assert { type: "json" };
import t2n24 from "./output/exchange_rate_2024_02_01_2024_02_29.json" assert { type: "json" };
import t3n24 from "./output/exchange_rate_2024_03_01_2024_03_23.json" assert { type: "json" };

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
    let exchangeRateCollection = [
      ...t3n23,
      ...t4n23,
      ...t5n23,
      ...t6n23,
      ...t7n23,
      ...t8n23,
      ...t9n23,
      ...t10n23,
      ...t11n23,
      ...t12n23,
      ...t1n24,
      ...t2n24,
      ...t3n24,
    ];
    // tạo lệnh xóa trước tiên
    let script = `delete from ${tableName} where ${createdDateColumn} between '${config.dayStart}' and '${config.dayEnd}';\r\n`;
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
            let tempScript = `insert into ${tableName} (${keyPrimaryColumn}, ${createdDateColumn}, ${currencyCodeColumn}, ${currencyNameColumn}, ${buyColumn}, ${sellColumn}, ${transferColumn}) values ('${uuidv4()}' , '${currentDate} 23:59:00', '${
              item.currencyCode
            }', '${item.currencyName}', ${item.cash}, ${item.sell}, ${
              item.transfer
            });\r\n`;
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
