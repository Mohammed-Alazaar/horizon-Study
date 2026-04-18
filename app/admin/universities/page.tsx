import UniversitiesManager from "@/components/admin/UniversitiesManager";

export default function AdminUniversitiesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-dark mb-1">Universities</h1>
          <p className="text-gray-horizon-500 text-sm">Manage partner universities. Use Excel import for bulk upload.</p>
        </div>
      </div>
      <UniversitiesManager />
    </div>
  );
}
