import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DemandasCliente from "@/components/DemandasCliente";
import { getAllDemandas } from "@/actions/demanda-actions";
import { Suspense } from "react";
import MyLoader from "@/components/SkeletonLoader";

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

      
    <Suspense fallback={<MyLoader />}>
      <DemandasCliente demandas={demandas} />
    </Suspense>
    </main>
  );
}
