import { logFile } from "./logFile.js";

/**
 * thêm thuộc tính thêm ngày vào trong prototype của object mặc định date
 * @param {*} days số ngày cần thêm
 * @returns
 */
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  // cộng thêm ngày cho object Date hiện tại
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * hàm trả về mảng ngày từ ngày đầu tới ngày cuối
 * @param {*} startDate ngày bắt đầu
 * @param {*} stopDate ngày kết thúc
 * @returns
 */
export default async function getDates(startDate, stopDate) {
  var dateArray = new Array();
  try {
    if (startDate && stopDate) {
      // convert từ text config dạng string vd '2023-01-01' về đúng
      // object Date 'Wed Mar 01 2023 07:00:00 GMT+0700 (Giờ Đông Dương)'
      startDate = new Date(startDate);
      stopDate = new Date(stopDate);

      if (startDate && stopDate) {
        var currentDate = startDate;

        // lấy ra danh sách ngày đến khi nào không lấy được nữa thì thôi
        while (currentDate <= stopDate) {
          let tempDate = new Date(currentDate);
          if (tempDate) {
            // formatDate về dạng mà bên Vietcombank chấp nhận
            let formatedDate = await formatDate(tempDate);
            dateArray.push(formatedDate);
          }
          // tăng ngày hiện tại lên thêm 1 ngày
          currentDate = currentDate.addDays(1);
        }
      }
    }
  } catch (error) {
    await logFile(error, "dateUtil.getDates");
  }
  return dateArray;
}

/**
 * format dữ liệu Date về dạng text
 * object Date 'Wed Mar 01 2023 07:00:00 GMT+0700 (Giờ Đông Dương)'
 * convert về text config dạng string vd '2023-01-01'
 * @param {Date} currentDate ngày hiện tại muốn format
 */
async function formatDate(currentDate) {
  let result = "";
  try {
    if (currentDate && currentDate instanceof Date) {
      // lấy ra ngày tháng năm
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1; // tháng bắt đầu từ con số 0
      let year = currentDate.getFullYear();

      // nếu ngày hoặc tháng nhỏ hơn 10 thì thêm số 0 ở đầu
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }

      // đưa về dạng text '2023-03-01'
      result = `${year}-${month}-${day}`;
    }
  } catch (error) {
    await logFile(error, "dateUtil.formatDate");
  }
  return result;
}
