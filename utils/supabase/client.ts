import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


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
