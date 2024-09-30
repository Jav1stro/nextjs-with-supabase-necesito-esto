"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const supabase = createClient();

export const createDemandAction = async (formData: FormData) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return encodedRedirect("error", "/update-profile", userError.message);
  }

//   const empresa = formData.get("empresa")?.toString();
  const responsable_solicitud = formData
    .get("responsable_solicitud")
    ?.toString();
  const email_contacto = formData.get("email_contacto")?.toString();
  const telefono = formData.get("telefono");
  const fecha_inicio = formData.get("fecha_inicio")?.toString();
  const fecha_vencimiento = formData.get("fecha_vencimiento")?.toString();
  const rubro_demanda = formData.get("rubro_demanda")?.toString();
  const detalle = formData.get("detalle")?.toString();
  const user_id = user?.id;

  const { data, error: demandaError } = await supabase.from("demandas").insert({
    // empresa,
    responsable_solicitud,
    email_contacto,
    telefono,
    fecha_inicio,
    fecha_vencimiento,
    rubro_demanda,
    detalle,
    profile_id: user_id, // Referencia al usuario (perfil) mediante su id
  });

  if (demandaError) {
    console.error(demandaError.code + " " + demandaError.message);
    return encodedRedirect("error", "/demandas/new", demandaError.message);
  } else {
    return encodedRedirect(
      "success",
      "/demandas/new",
      `Demanda creada correctamente.`
    );
  }
};

export const getUserDemandas = async () => {
  // Obtener el usuario autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  if (user) {
    // Obtener las demandas del usuario filtrando por el profile_id
    const { data: demandsData, error: demandsError } = await supabase
      .from("demandas")
      .select("*")
      .eq("profile_id", user.id); // Filtrar por el user ID (profile_id)

    if (demandsError) {
      throw new Error("Error al obtener las demandas: " + demandsError.message);
    }

    console.log('demandas por usuario',demandsData)

    return demandsData || [];
  }

  return [];
};

export async function getDemandaById(id: string) {
  const { data, error } = await supabase
    .from('demandas')  
    .select('*')
    .eq('id', id)      
    .single();         

  if (error) {
    console.error('Error fetching demanda:', error);
    return null; 
  }

  return data;
}