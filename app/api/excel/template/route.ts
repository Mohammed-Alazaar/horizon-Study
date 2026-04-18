import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

const TEMPLATES = {
  departments: {
    headers: ["Department", "Language", "Tuition Fee", "Description"],
    sample: [
      ["Computer Engineering", "English", "$5,000 / year", "Core engineering program covering software and hardware."],
      ["Business Administration", "Turkish / English", "$4,500 / year", "Covers management, finance, and marketing fundamentals."],
    ],
    filename: "departments_template.xlsx",
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = (searchParams.get("type") ?? "departments") as keyof typeof TEMPLATES;
  const level = searchParams.get("level") ?? "bachelor";

  const tpl = TEMPLATES[type] ?? TEMPLATES.departments;

  const wb = XLSX.utils.book_new();
  const rows = [tpl.headers, ...tpl.sample];
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws["!cols"] = tpl.headers.map((h) => ({ wch: Math.max(h.length + 4, 20) }));

  XLSX.utils.book_append_sheet(wb, ws, "Departments");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const filename = `${level}_${tpl.filename}`;
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
