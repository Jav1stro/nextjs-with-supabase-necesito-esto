// Archivo: components/DemandasCliente.tsx
"use client"; // This indicates it's a Client Component

import { useState } from "react";
import ModalDetallesPago from "@/components/ModalDetallesPago";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function DemandasCliente({ demandas }: { demandas: any[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [demandaSeleccionada, setDemandaSeleccionada] = useState(null);
  const [filtro, setFiltro] = useState("Todas"); // State for filter

  const abrirModal = (demanda: any) => {
    setDemandaSeleccionada(demanda);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltro(e.target.value); 
  }

  const demandasFiltradas = demandas.filter((demanda) => {
    return filtro === "Todas" || demanda.rubro_demanda === filtro;
  });

  return (
    <>
      <div className="mb-4 flex items-center">
        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500 mr-2" />{" "}
        <label htmlFor="categoria" className="mr-2">
          Filtrar por categoría:
        </label>
        <select value={filtro} onChange={handleFiltroChange}>
          <option value="Todas">Todas</option>
          <option value="INFORMATICA">Varios</option>
          
          {/*
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Seguridad">Seguridad</option>
          <option value="Marketing">Marketing</option>*/}

        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demandasFiltradas.length > 0 ? (
          demandasFiltradas.map((demanda) => (
            <div
              key={demanda.empresa}
              className="shadow-md rounded-lg p-6 flex flex-col gap-4"
            >
              <h3 className="font-bold text-lg ito">{demanda.detalle}</h3>
              <p>
                <strong>Rubro:</strong> {demanda.rubro_demanda}
              </p>
              <p>
                <strong>Fecha de inicio:</strong>{" "}
                {new Date(demanda.fecha_inicio).toLocaleDateString()}
              </p>
              <p>
                <strong>Fecha de vencimiento:</strong>{" "}
                {new Date(demanda.fecha_vencimiento).toLocaleDateString()}
              </p>
              <button
                onClick={() => abrirModal(demanda)}
                className="bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"
              >
                Saber más
              </button>
<<<<<<< Updated upstream
              <BotonOfertas
              id_demanda={demanda.id}
              />
=======
>>>>>>> Stashed changes
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
