import ReactExport from "react-export-excel";
import ExcelIcon from "../../Complaints/ExcelIcon";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ReportExport = ({ responseData, surveyDetails }) => {
  const dataSet = [
    { columns: ["District", "Gender", "Age Category"], data: [] },
  ];

  surveyDetails?.questions.forEach((question) => {
    dataSet[0].columns.push(question.question);
  });

  responseData?.forEach((response) => {
    let row = [response.district, response.gender, response.ageCategory];
    response.responses?.forEach((res) => {
      row.push(res.response);
    });
    dataSet[0].data.push(row);
  });

  return (
    <ExcelFile
      element={
        <button className="excel-btn">
          <ExcelIcon />
        </button>
      }
    >
      <ExcelSheet dataSet={dataSet} name="Response-Data" />
    </ExcelFile>
  );
};

export default ReportExport;
