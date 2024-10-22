import { getDemandaById } from "@/actions/demanda-actions/index"; // Suponiendo que tienes una función para obtener la demanda por ID
import Link from "next/link";
import "./details.css";
import BotonOfertas from "@/components/ofertas-boton";
import { useEffect } from "react";
import axios from "axios";

export default async function DemandaDetails({ params, searchParams }: { params: { id: string }, searchParams: { status?: string } }) {
  if (!params.id) {
    return <p>ID de demanda no proporcionado.</p>;
  }

  const demanda = await getDemandaById(params.id);  // Usamos el ID para consultar los datos de la demanda

  if (!demanda) {
    return <p>Error al cargar la demanda. Por favor, intenta de nuevo más tarde.</p>;
  }

  useEffect(() => {
    const savePaymentDetails = async () => {
      // Verifica si el estado es 'success' en la URL
      if (searchParams.status === 'success') {
        try {
          const response = await axios.post('/api/save_payment', {
            demandaId: params.id,
            // Agrega otros detalles necesarios como `transactionId`, `amount`, etc.
            // transactionId: 'aquí va tu ID de transacción',
            // amount: 'aquí va el monto del pago',
          });

          // Manejar la respuesta si es necesario
          console.log('Detalles del pago guardados:', response.data);
        } catch (error) {
          console.error('Error al guardar los detalles del pago:', error);
        }
      }
    };

    savePaymentDetails();
  }, [searchParams.status, params.id]); // Dependencias para que se ejecute cuando cambie el estado o el ID

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
      <BotonOfertas
              id_demanda={demanda.id}
      />
      <Link className="bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 mt-2" href="/">
        Iniciar Conversacion
      </Link>
    </div>
  );
}
