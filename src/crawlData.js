// import thư viện
import axios from "axios";

// import config
import config from "../config.js";

/**
 * Hàm tạo url tương ứng để gọi sang bên Vietcombank
 */
export async function crawData() {
  let url = config.sourceDataUrl;
  // tạm thời fix tạm ngày này
  url += "2023-02-21";
  await getData(url);
}

/**
 * Hàm thực hiện gọi sang bên VietCombank và cào dữ liệu
 * @param {*} url địa chỉ đã hoàn thiện để gọi
 */
async function getData(url) {
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
