import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(_req: NextRequest) {
  const wb = XLSX.utils.book_new();

  // Info sheet: university fields in col A-B, departments table in col C-F (side by side)
  const infoRows = [
    ["Field",             "Value",                                     "Degree",    "Department",              "Language", "Tuition Fee"],
    ["Name",              "",                                          "Bachelor",  "e.g. Computer Engineering","English",  "$5,000 / year"],
    ["Short Name",        "",                                          "Bachelor",  "",                         "",         ""],
    ["City",              "Ankara",                                    "Master",    "e.g. Business Administration","English","$4,000 / year"],
    ["Established Year",  "",                                          "Master",    "",                         "",         ""],
    ["Local Rank",        "",                                          "PhD",       "e.g. Computer Science",    "English",  "$3,500 / year"],
    ["About",             "",                                          "PhD",       "",                         "",         ""],
    ["Website",           "",                                          "",          "",                         "",         ""],
    ["Teaching Languages","",                                          "",          "",                         "",         ""],
    ["Cover Color",       "linear-gradient(135deg,#0D2B55,#1A5FB4)", "",          "",                         "",         ""],
    ["Tags",              "",                                          "",          "",                         "",         ""],
    ["Featured",          "true",                                      "",          "",                         "",         ""],
    ["Order",             "0",                                         "",          "",                         "",         ""],
  ];

  const wsInfo = XLSX.utils.aoa_to_sheet(infoRows);
  wsInfo["!cols"] = [{ wch: 22 }, { wch: 45 }, { wch: 12 }, { wch: 30 }, { wch: 20 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsInfo, "Info");

  // Separate department sheets (with Description column)
  const deptHeaders = ["Department", "Language", "Tuition Fee", "Description"];
  function makeDeptSheet() {
    const ws = XLSX.utils.aoa_to_sheet([deptHeaders]);
    ws["!cols"] = [{ wch: 30 }, { wch: 20 }, { wch: 18 }, { wch: 40 }];
    return ws;
  }

  XLSX.utils.book_append_sheet(wb, makeDeptSheet(), "Bachelor Departments");
  XLSX.utils.book_append_sheet(wb, makeDeptSheet(), "Master Departments");
  XLSX.utils.book_append_sheet(wb, makeDeptSheet(), "PhD Departments");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="university_template.xlsx"',
    },
  });
}
