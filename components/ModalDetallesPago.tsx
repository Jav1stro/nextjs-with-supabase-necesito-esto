import React from 'react';
import Link from "next/link";


interface ModalDetallesPagoProps {
  isOpen: boolean;
  onClose: () => void;
  demanda: any;  // Cambia 'any' por el tipo correcto de demanda si lo tienes
}

const ModalDetallesPago: React.FC<ModalDetallesPagoProps> = ({ isOpen, onClose, demanda }) => {
  if (!isOpen) return null;  // Si el modal no está abierto, no mostrar nada

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full negro">
        {/* Contenido del modal */}
        <h2 className="text-xl font-bold mb-4">Detalles de la Demanda</h2>

        <h3 className="font-bold text-lg ito">{demanda.detalle}</h3>
        <p className="ito"><strong>Rubro:</strong> {demanda.rubro_demanda}</p>
        <p className="ito"><strong>Fecha de inicio:</strong> {new Date(demanda.fecha_inicio).toLocaleDateString()}</p>
        <p className="ito"><strong>Fecha de vencimiento:</strong> {new Date(demanda.fecha_vencimiento).toLocaleDateString()}</p>
        {/* Puedes agregar más información aquí */}
        
        {/* Botón para proceder con el pago */}
        <div className="mt-4">
          <Link className="bg-green-500 text-white py-2 px-4 rounded-lg" href={`/demandas/${demanda.id}`}>
            Pagar para obtener más detalles
          </Link>
        </div>
        
        {/* Botón para cerrar el modal */}
        
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cerrar 
        </button>
      
        
      </div>
    </div>
  );
};

export default ModalDetallesPago;
