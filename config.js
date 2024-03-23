// file config dữ liệu

export default {
  // url chính để thu thập dữ liệu
  sourceDataUrl: "https://www.vietcombank.com.vn/api/exchangerates?date=",
  // ngày bắt đầu thu thập dữ liệu
  dayStart: "2023-03-01",
  // ngày kết thúc thu thập dữ liệu
  dayEnd: "2023-03-31",
  // thời gian đợi sau khi gọi 1 lần để tránh bị chặn ip
  // tính bằng miligiay
  timeWait: "5000",
  // đường dẫn kết quả
  outputPath: "./output/result.txt",
  // đường dẫn kết quả
  outputLogPath: "./output/resultLog.txt",
  // file merge
  outputJSONPath: "./output/",
  // từ khóa thêm vào đầu json để biến thành mẫu export default object javascript
  exportDefault: "export default ",
  logTime: "Thời gian chạy tổng cộng là: {0} phút",
  keyReplace: "{0}",
  logActionSuccess: "Đã dịch được: {0}%",
  startLog: "Bắt đầu thực hiện tác vụ",
  // có muốn ghi log không phải lỗi không
  isLogInfo: true,
  // định dạng ngày tháng khi ghi log
  logLocation: "vn-VN",
};
