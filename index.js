// file script chính của tool thu thập dữ liệu
// import thư viện

// import file
import config from "./config.js";
import { logFile, logResultText, clearResultText } from "./src/logFile.js";
import checkFlag from "./src/checkFlag.js";

/**
 * hàm chạy chính của chương trình
 */
async function runTool() {
  try {
    // bắt đầu đo hiệu năng
    let startTime = performance.now();

    // kết thúc đo hiệu năng
    let endTime = performance.now();
    let messageLog = config.logTime.replace(
      config.keyReplace,
      Math.floor((endTime - startTime) / 1000 / 60)
    );
    await logFile(messageLog);
  } catch (error) {
    await logFile(error, "runTool");
  }
}

// điểm bắt đầu chạy của chương trình
runTool();
