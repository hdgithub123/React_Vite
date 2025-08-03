/**
 * Lọc lại selection từ table dựa trên fieldUnique giữa dataDef và data mới.
 * @param dataDef Dữ liệu cũ (trước khi thay đổi)
 * @param data Dữ liệu mới
 * @param table Bảng TanStack Table
 * @param fieldUnique Tên trường dùng để so sánh (ví dụ: 'id', 'uuid')
 * @returns Object dạng { index: true } chứa các dòng hợp lệ
 */
export function getOldFilteredSelectionByField(
  dataDef: Row[],
  data: Row[],
  table: any,
  fieldUnique: string
): Record<number, true> {
  if (!table || !Array.isArray(dataDef) || !Array.isArray(data)) return {};

  const currentSelection = table.getState().rowSelection;

  // Bước 1: lấy ra các giá trị fieldUnique từ các dòng đã được chọn trong dataDef
  const selectedFieldValues = dataDef
    .map((row, index) => {
      return currentSelection[index] ? row?.[fieldUnique] : null;
    })
    .filter(value => value !== null && value !== undefined);

  // Bước 2: tạo Set để tra nhanh
  const selectedSet = new Set(selectedFieldValues);

  // Bước 3: lọc lại selection từ data mới
  const filteredSelection = Object.fromEntries(
    data
      .map((row, index) => {
        const value = row?.[fieldUnique];
        return selectedSet.has(value) ? [index, true] : null;
      })
      .filter(Boolean)
  );

  return filteredSelection;
}

export default getOldFilteredSelectionByField