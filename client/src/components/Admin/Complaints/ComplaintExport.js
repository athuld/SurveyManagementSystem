import React from "react";
import ReactExport from "react-export-excel";
import ExcelIcon from "./ExcelIcon";
import { format, parseISO } from "date-fns";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ComplaintExport = ({ complaints }) => {
  return (
    <ExcelFile
      element={
        <button className="complaint-report-btn excel-btn">
          <ExcelIcon />
        </button>
      }
    >
      <ExcelSheet data={complaints} name="Complaints">
        <ExcelColumn
          label="Date"
          value={(col) => format(parseISO(col.date), "dd/MM/yyyy")}
        />
        <ExcelColumn
          label="Subject"
          value={(col) => col.complaintBody.subject}
        />
        <ExcelColumn
          label="Urgency"
          value={(col) => col.complaintBody.urgency}
        />
        <ExcelColumn label="Area" value={(col) => col.complaintBody.area} />
        <ExcelColumn label="Issue" value={(col) => col.complaintBody.issue} />
        <ExcelColumn label="Status" value={(col) => col.complaintRes.status} />
        <ExcelColumn
          label="Resolution"
          value={(col) =>
            col.complaintRes.status === "Resolved"
              ? col.complaintRes.resolution
              : "N/A"
          }
        />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ComplaintExport;
