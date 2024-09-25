import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  // Fetch demandas y empresas
  let { data: demandas, error } = await supabase.from("demandas").select();
  let { data: empresas } = await supabase.from("empresas").select();

  return (
    <>
      <Hero />
      <main className="w-full flex flex-row justify-between gap-8">
        {/* Bloque Empresas */}
        <div className="w-1/2">
          <h2 className="font-medium text-xl mb-4">Empresas</h2>
          <div className="grid grid-cols-1 gap-4">
            {empresas?.map((empresa, index) => (
              <div key={index} className="p-4 border rounded-md shadow-sm">
                <h3 className="font-bold">{empresa.empresa}</h3>
                <p>{empresa.contacto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bloque Demandas */}
        <div className="w-1/2">
          <h2 className="font-medium text-xl mb-4">Demandas</h2>
          <div className="grid grid-cols-1 gap-4">
            {demandas?.map((demanda, index) => (
              <div key={index} className="p-4 border rounded-md shadow-sm">
                <h3 className="font-bold">{demanda.rubro_demanda}</h3>
                <p>{demanda.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

