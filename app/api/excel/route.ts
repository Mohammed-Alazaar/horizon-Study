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
      const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const parsed = rows
        .map((row) => ({
          name: String(row["Name"] ?? row["name"] ?? "").trim(),
          shortName: String(row["Short Name"] ?? row["shortName"] ?? row["name"] ?? "").trim(),
          city: String(row["City"] ?? row["city"] ?? "Ankara").trim(),
          establishedYear: Number(row["Established Year"] ?? row["establishedYear"] ?? 0) || null,
          localRank: Number(row["Local Rank"] ?? row["localRank"] ?? 0) || null,
          about: String(row["About"] ?? row["about"] ?? row["Description"] ?? "").trim(),
          website: String(row["Website"] ?? row["website"] ?? "").trim(),
          teachingLanguages: String(row["Teaching Languages"] ?? row["teachingLanguages"] ?? "")
            .split(",").map((l: string) => l.trim()).filter(Boolean),
          tags: String(row["Tags"] ?? row["tags"] ?? "")
            .split(",").map((t: string) => t.trim()).filter(Boolean),
          coverColor: String(row["Cover Color"] ?? row["coverColor"] ?? "linear-gradient(135deg,#0D2B55,#1A5FB4)").trim(),
          featured: true,
          order: 0,
        }))
        .filter((r) => r.name);
      return NextResponse.json({ parsed });
    }

    if (action === "save") {
      const dataRaw = formData.get("data") as string;
      if (!dataRaw) return NextResponse.json({ error: "No data provided" }, { status: 400 });
      const rows: any[] = JSON.parse(dataRaw);
      await connectDB();
      const results = await Promise.allSettled(
        rows.map((row) =>
          University.findOneAndUpdate(
            { slug: slugify(row.name) },
            { ...row, slug: slugify(row.name) },
            { upsert: true, new: true, runValidators: true }
          )
        )
      );
      const saved = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;
      return NextResponse.json({ saved, failed });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    console.error("[POST /api/excel]", err);
    const message = err instanceof Error ? err.message : "Excel processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
