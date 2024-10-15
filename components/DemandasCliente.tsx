// Archivo: components/DemandasCliente.tsx
"use client";  // Esto indica que es un Client Component

import { useState } from "react";
import Link from "next/link";
import ModalDetallesPago from "@/components/ModalDetallesPago";
import BotonOfertas from "./ofertas-boton";

export default function DemandasCliente({ demandas }: { demandas: any[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [demandaSeleccionada, setDemandaSeleccionada] = useState(null);

  const abrirModal = (demanda: any) => {
    setDemandaSeleccionada(demanda);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demandas.length > 0 ? (
          demandas.map((demanda) => (
            <div
              key={demanda.empresa}
              className="shadow-md rounded-lg p-6 flex flex-col gap-4"
            >
              <h3 className="font-bold text-lg ito">{demanda.detalle}</h3>
              <p className="ito"><strong>Rubro:</strong> {demanda.rubro_demanda}</p>
              <p className="ito"><strong>Fecha de inicio:</strong> {new Date(demanda.fecha_inicio).toLocaleDateString()}</p>
              <p className="ito"><strong>Fecha de vencimiento:</strong> {new Date(demanda.fecha_vencimiento).toLocaleDateString()}</p>
              <button
                onClick={() => abrirModal(demanda)}
                className="bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"
              >
                Saber más
              </button>

              {/*<BotonOfertas
              id_demanda={demanda.id}
              />*/}
              
            </div>
          ))
        ) : (
          <p>No hay demandas disponibles.</p>
        )}
      </div>

      {/* Renderizar el modal cuando sea necesario */}
      <ModalDetallesPago
        isOpen={modalOpen}
        onClose={cerrarModal}
        demanda={demandaSeleccionada}
      />
    </>
  );
}
