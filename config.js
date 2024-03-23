// file config dữ liệu

export default {
  // url chính để thu thập dữ liệu
  sourceDataUrl: "https://www.vietcombank.com.vn/api/exchangerates?date=",
  // ngày bắt đầu thu thập dữ liệu
  dayStart: "2024-03-23",
  // ngày kết thúc thu thập dữ liệu
  dayEnd: "2023-03-23",
  outputPath: "./output/result.txt", // đường dẫn kết quả
  outputLogPath: "./output/resultLog.txt", // đường dẫn kết quả
  outputJSONPath: "./output/result.json", // file merge
  formatText: "utf-8",
  exportDefault: "export default ", // từ khóa thêm vào đầu json để biến thành mẫu export default object javascript
  logTime: "Thời gian chạy tổng cộng là: {0} phút",
  keyReplace: "{0}",
  logActionSuccess: "Đã dịch được: {0}%",
  startLog: "Bắt đầu thực hiện tác vụ",
  isLogInfo: true, // có muốn ghi log không phải lỗi không
  logLocation: "vn-VN", // định dạng ngày tháng khi ghi log
};
