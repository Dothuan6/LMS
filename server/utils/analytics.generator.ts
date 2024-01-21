import { Document, Model } from "mongoose";
//cấu trúc đối tượng dữ liệu mỗi tháng
interface MonthData {
  month: string; // tên tháng
  count: number; // số lượng trong tháng
}
export async function generateLast12Mothsdata<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  // dữ liệu trả về là 1 promise chưa đối tượng last12Months là
  // mảng chưa dữ liệu analytic 12 tháng
  const last12Months: MonthData[] = []; // mảng rổng chưa thông tin thống kế từng tháng
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1); //lấy ngày hiện tại và tăng ngày lên 1
  //tránh lấy dữ liệu từ ngày hiện tại
  for (let i = 11; i >= 0; i--) {
    // vòng lặp xử lý dữ liệu trong 12 tháng
    //tạo 2 đối tượng start date và enđate để xác định từ đầu đến cuối tháng
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );
    //tolocalétring định dạng ngày tháng năm
    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    //sử dụng countDocument đếm số lượng tài liệu từ startDate- endDate
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    //thêm đối tượng monthYear, count vào lastMonths : là kiểu dữ liệu trả về của promise
    last12Months.push({ month: monthYear, count });
  }
  return { last12Months }; // trả về last12Months
}
