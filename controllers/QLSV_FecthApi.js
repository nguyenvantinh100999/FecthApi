import { SinhVien } from "../models/sinhVien.js";
//Lấy sinh Viên
async function getAllSinhVienAsync() {
  const response = await fetch(
    "https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien"
  );
  const data = await response.json();
  console.log(data);
  renderTableSinhVien(data);
}
getAllSinhVienAsync();

//Thêm sinh Viên
document.querySelector("#frmSinhVien").onsubmit = async function (e) {
  e.preventDefault();
  //input: dữ liệu người dùng nhập từ form
  let sv = new SinhVien();
  let arrInput = document.querySelectorAll("#frmSinhVien .form-control");
  for (let input of arrInput) {
    sv[input.id] = input.value;
  }
  console.log(sv);
  //
  const res = await fetch(
    "https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
    {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(sv),
    }
  );
  getAllSinhVienAsync();
};

//UPDATE SINH VIÊN
window.chinhSua = async function (maSinhVien) {
  //tạo đường link url cho lấy thông tin 1 sinh viên
  //   let urlUpdate = `https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`;
  const response = await fetch(
    `https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  console.log(data);
  let svEdit = data;
  let arrInput = document.querySelectorAll("#frmSinhVien .form-control");
  for (let input of arrInput) {
    input.value = svEdit[input.id];
  }
};

document.querySelector("#btnLuuThongTin").onclick = async function (e) {
  //Lấy dữ liệu người dùng nhập từ giao diện bỏ vào object api qui định
  let sv = new SinhVien();
  let arrInput = document.querySelectorAll("#frmSinhVien .form-control");
  for (let input of arrInput) {
    sv[input.id] = input.value;
  }
  const response = await fetch(
    `https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sv.maSinhVien}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(sv),
    }
  );
  console.log(response.data);
  getAllSinhVienAsync();
};

//Xóa sinh viên
window.xoaSinhVien = async function (maSinhVien) {
  //tạo link api xóa
  let urlXoa = `https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`;
  const response = await fetch(urlXoa, {
    method: "DELETE",
  });
  console.log(response.data);
  getAllSinhVienAsync();
};
window.renderTableSinhVien = function (arrSV) {
  //input là mảng
  let htmlString = "";
  for (let sv of arrSV) {
    htmlString += `
              <tr>
                  <td>${sv.maSinhVien}</td>
                  <td>${sv.tenSinhVien}</td>
                  <td>${sv.soDienThoai}</td>
                  <td>${sv.email}</td>
                  <td>${sv.diemToan}</td>
                  <td>${sv.diemLy}</td>
                  <td>${sv.diemHoa}</td>
                  <td>${sv.diemRenLuyen}</td>
                  <td>${sv.loaiSinhVien}</td>
                  <td>
                      <button class="btn btn-primary" onclick="chinhSua('${sv.maSinhVien}')">Chỉnh sửa</button>
                      <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')" >Xoá</button>
                  </td>
              </tr>
          `;
  }
  //output: in ra giao diện html
  document.querySelector("tbody").innerHTML = htmlString;
  return htmlString;
};

// //Hàm setInterval là hàm sẽ chạy liên tục sau mỗi thời gian qui định
// setInterval(function () {
//   getAllSinhVienAsync();
// }, 5000); //5000 là 5000 mili giây hàm function sẽ chạy 1 lần
