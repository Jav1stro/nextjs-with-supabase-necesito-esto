import React from 'react';
import { createClient } from "@/utils/supabase/server";

export default async function Table({ query, currentPage }: { query: string; currentPage: number }) {
  const supabase = createClient();
  const itemsPerPage = 50; // Adjust as needed

  // Fetch filtered demandas
  const { data: demandas, error: demandasError } = await supabase
    .from("demandas")
    .select()
    .ilike('rubro_demanda', `%${query}%`)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  // Fetch filtered empresas
  const { data: empresas, error: empresasError } = await supabase
    .from("empresas")
    .select()
    .ilike('rubro_empresa', `%${query}%`)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  if (demandasError || empresasError) {
    return <div>No hay resultados</div>;
  }

  return (
    <div className="w-full flex flex-row justify-between gap-6 md:gap-12">
      {/* Empresas Section */}
      <div className="w-1/2">
        <h2 className="font-medium text-lg md:text-xl mb-4">Empresas</h2>
        <div className="flex grid text-lg md:text-xl grid-cols-1 gap-4">
          {empresas?.map((empresa, index) => (
            <div key={index} className="p-2 sm:p-4 border rounded-md shadow-sm">
              <h3 className="font-bold">{empresa.rubro_empresa}</h3>
              <p>{empresa.contacto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demandas Section */}
      <div className="w-1/2">
        <h2 className="font-medium text-lg md:text-xl mb-4">Demandas</h2>
        <div className="flex grid text-lg md:text-xl grid-cols-1 gap-4">
          {demandas?.map((demanda, index) => (
            <div key={index} className="p-2 sm:p-4 border rounded-md shadow-sm">
              <h3 className="font-bold">{demanda.rubro_demanda}</h3>
              <p>{demanda.detalle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
