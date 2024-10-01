import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import DemandasCliente from "@/components/DemandasCliente";
import { getAllDemandas } from "@/actions/demanda-actions";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const demandas = await getAllDemandas();

  return (
    <main className="flex-1 flex flex-col gap-6 px-4 demandas">
      <h2 className="font-medium text-xl mb-4">Demandas</h2>

      <div className="mb-4 flex items-center">
        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500 mr-2" />{" "}
        <label htmlFor="categoria" className="mr-2">
          Filtrar por categoría:
        </label>
        <select>
          <option>Todas</option>
          <option>Sistemas</option>
          <option>Mantenimiento</option>
          <option>Seguridad</option>
          <option>Marketing</option>
        </select>
      </div>

      <DemandasCliente demandas={demandas} />
    </main>
  );
}
