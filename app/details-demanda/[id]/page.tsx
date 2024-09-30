import { getDemandaById } from "@/utils/supabase/client"; // Suponiendo que tienes una función para obtener la demanda por ID
import Link from "next/link";
import "./details.css";

export default async function DemandaDetails({ params }: { params: { id: string } }) {
  // Verifica que el ID no sea indefinido
  if (!params.id) {
    return <p>ID de demanda no proporcionado.</p>;
  }

  console.log('ID de la demanda:', params.id); // Depuración para verificar el ID

  const demanda = await getDemandaById(params.id);  // Usamos el ID para consultar los datos de la demanda

  // Manejo de error si no se encuentra la demanda o si ocurre un error en la consulta
  if (!demanda) {
    return <p>Error al cargar la demanda. Por favor, intenta de nuevo más tarde.</p>;
  }

  return (
    <div className="details-container">
      <h1>Detalles de la Demanda</h1>
      <div className="details-detalles">
        <p><strong>Empresa:</strong> {demanda.empresa}</p>
        <p><strong>Responsable:</strong> {demanda.responsable_solicitud}</p>
        <p><strong>Email:</strong> {demanda.email}</p>
        <p><strong>Teléfono:</strong> {demanda.telefono}</p>
        <p><strong>Fecha Inicio:</strong> {demanda.fecha_inicio}</p>
        <p><strong>Fecha Vencimiento:</strong> {demanda.fecha_vencimiento}</p>
        <p><strong>Rubro Demanda:</strong> {demanda.rubro_demanda}</p>
        <p><strong>Detalle:</strong> {demanda.detalle}</p>
      </div>
      <Link className="bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 mt-2" href="/">
        Iniciar Conversacion
      </Link>
    </div>
  );
}
