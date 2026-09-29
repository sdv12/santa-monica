import { requireAdmin } from "@/lib/auth";
import { getSettingsForEdit } from "@/lib/admin-data";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata = { title: "Precios y datos" };

export default async function PreciosPage() {
  await requireAdmin();
  const settings = await getSettingsForEdit();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="t-h2 mx-auto w-full max-w-3xl">
        Precios y <em>datos</em>
      </h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
