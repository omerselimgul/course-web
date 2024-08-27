import * as XLSX from "xlsx";
import { useLoadingSpinner } from "../../Context/LoadingSpinnerContext";

const ExcelReader = ({ getExcelData, ...props }) => {
  const { openSpinner, closeSpinner } = useLoadingSpinner();
  const readExcel = (file) => {
    if (file !== undefined) {
      openSpinner();

      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          // const data = e.target.result;
          // const workbook = XLSX.read(data, { type: "binary" });
          // const sheetName = workbook.SheetNames[0];
          // const sheet = workbook.Sheets[sheetName];
          // const parsedData = XLSX.utils.sheet_to_json(sheet);
          // console.log(parsedData);
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          let result = [];
          var sheetName = Object.keys(wb.Sheets);
          let mainheader = null;
          sheetName.map((field, numberOfIndex) => {
            const sheet = wb.Sheets[field];
            let contents = [];
            if (mainheader === null && sheet["A1"]?.h !== undefined) {
              mainheader = sheet["A1"]?.h;
            }
            const header = sheet["A2"]?.h;
            let contentHeaderIndex = 3;
            let rowindex = 3;
            let index = 1;
            while (true) {
              let item = {};
              let colindex = "A".charCodeAt(0);
              let checkIndex = (
                String.fromCharCode(colindex) +
                (rowindex + index)
              ).toString();
              if (sheet[checkIndex]?.v === undefined) {
                break;
              }
              while (true) {
                let fieldIndex = (
                  String.fromCharCode(colindex) + contentHeaderIndex
                ).toString();
                let valueIndex = (
                  String.fromCharCode(colindex) +
                  (rowindex + index)
                ).toString();
                if (sheet[fieldIndex]?.v === undefined) {
                  break;
                }
                item = {
                  ...item,
                  [sheet[fieldIndex]?.v]: sheet[valueIndex]?.v,
                };
                colindex = colindex + 1;
              }
              if (!item?.No) {
                item.id = Math.floor(Math.random() * 100);
              } else {
                item.id = item.No;
              }
              contents.push({
                ...item,
                WeekNo: numberOfIndex + 1,
                Issue: item?.Konu,
                Content: item?.İçerik,
                Duration: item?.Süre,
                Aim: item?.Amaç,
                Activity: item?.Etkinlik,
                Educators: item?.Eğitmen,
                Method: item?.Yöntem,
              });
              index++;
            }
            result.push({
              header: result.length + 1 + ". " + header,
              id: result.length + 1,
              no: result.length,
              data: contents,
            });
          });
          resolve({ data: result, header: mainheader });
        };
        fileReader.onerror = (error) => {
          closeSpinner();
          reject(error);
        };
      });
      promise.then(({ data, header }) => {
        closeSpinner();
        getExcelData(data, header);
      });
    }
  };
  return (
    <input
      id="upload"
      type="file"
      name="files[]"
      onChange={(event, data) => readExcel(event?.target?.files[0])}
    />
  );
};

export default ExcelReader;
