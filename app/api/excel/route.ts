import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";
import { slugify } from "@/lib/slugify";

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const formData = await req.formData();
    const action = formData.get("action") as string;
    const file = formData.get("file") as File | null;

    if (action === "parse_departments") {
      if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
      const buffer = Buffer.from(await file.arrayBuffer());
      const wb = XLSX.read(buffer, { type: "buffer" });
      const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const parsed = rows
        .map((row) => ({
          department: String(row["Department"] ?? row["department"] ?? "").trim(),
          language: String(row["Language"] ?? row["language"] ?? "").trim(),
          tuitionFee: String(row["Tuition Fee"] ?? row["tuitionFee"] ?? row["Tuition"] ?? "").trim(),
          description: String(row["Description"] ?? row["description"] ?? "").trim(),
        }))
        .filter((r) => r.department);
      return NextResponse.json({ parsed });
    }

    if (action === "parse") {
      if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
      const buffer = Buffer.from(await file.arrayBuffer());
      const wb = XLSX.read(buffer, { type: "buffer" });

      // Read Info sheet — col A-B for university fields, col C-F for inline departments
      const infoSheet = wb.Sheets["Info"] ?? wb.Sheets[wb.SheetNames[0]];
      const infoRows: any[][] = XLSX.utils.sheet_to_json(infoSheet, { header: 1 });

      const info: Record<string, string> = {};
      const inlineDepts: { degree: string; department: string; language: string; tuitionFee: string }[] = [];

      for (const row of infoRows) {
        const field = String(row[0] ?? "").trim();
        if (field && field !== "Field") info[field] = String(row[1] ?? "").trim();

        const degree = String(row[2] ?? "").trim();
        const dept   = String(row[3] ?? "").trim();
        if (degree && dept && degree !== "Degree" && !dept.startsWith("e.g.")) {
          inlineDepts.push({
            degree,
            department: dept,
            language:   String(row[4] ?? "").trim(),
            tuitionFee: String(row[5] ?? "").trim(),
          });
        }
      }

      if (!info["Name"]) return NextResponse.json({ error: "Info sheet is missing the Name field" }, { status: 400 });

      // Also read separate department sheets (they may include Description)
      function parseDeptSheet(sheetName: string) {
        const sheet = wb.Sheets[sheetName];
        if (!sheet) return [];
        return (XLSX.utils.sheet_to_json(sheet) as any[])
          .map((r: any) => ({
            department: String(r["Department"] ?? "").trim(),
            language:   String(r["Language"] ?? "").trim(),
            tuitionFee: String(r["Tuition Fee"] ?? "").trim(),
            description: String(r["Description"] ?? "").trim(),
          }))
          .filter((r) => r.department && !r.department.startsWith("e.g."));
      }

      // Merge inline (col C-F) and separate sheet departments; separate sheets take precedence (have Description)
      function mergeDepts(sheetName: string, degreeLabel: string) {
        const fromSheet = parseDeptSheet(sheetName);
        if (fromSheet.length > 0) return fromSheet;
        // Fall back to inline entries for this degree
        return inlineDepts
          .filter((d) => d.degree.toLowerCase().startsWith(degreeLabel.toLowerCase()))
          .map((d) => ({ department: d.department, language: d.language, tuitionFee: d.tuitionFee, description: "" }));
      }

      const parsed = {
        name:              info["Name"],
        shortName:         info["Short Name"] || info["Name"],
        city:              info["City"] || "Ankara",
        establishedYear:   Number(info["Established Year"]) || null,
        localRank:         Number(info["Local Rank"]) || null,
        about:             info["About"] || "",
        website:           info["Website"] || "",
        teachingLanguages: (info["Teaching Languages"] || "").split(",").map((l) => l.trim()).filter(Boolean),
        coverColor:        info["Cover Color"] || "linear-gradient(135deg,#0D2B55,#1A5FB4)",
        tags:              (info["Tags"] || "").split(",").map((t) => t.trim()).filter(Boolean),
        featured:          info["Featured"]?.toLowerCase() !== "false",
        order:             Number(info["Order"]) || 0,
        bachelorDepartments: mergeDepts("Bachelor Departments", "bachelor"),
        masterDepartments:   mergeDepts("Master Departments",   "master"),
        phdDepartments:      mergeDepts("PhD Departments",      "phd"),
      };

      return NextResponse.json({ parsed });
    }

    if (action === "save") {
      const dataRaw = formData.get("data") as string;
      if (!dataRaw) return NextResponse.json({ error: "No data provided" }, { status: 400 });
      const university = JSON.parse(dataRaw);
      await connectDB();
      await University.findOneAndUpdate(
        { slug: slugify(university.name) },
        { ...university, slug: slugify(university.name) },
        { upsert: true, new: true, runValidators: true }
      );
      return NextResponse.json({ saved: 1 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    console.error("[POST /api/excel]", err);
    const message = err instanceof Error ? err.message : "Excel processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
