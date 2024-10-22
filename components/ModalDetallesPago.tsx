import React, { useState, useEffect } from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

interface Demanda {
  id: string;
  detalle: string;
  rubro_demanda: string;
  fecha_inicio: string;
  fecha_vencimiento: string;
  precio: number;  // Asegúrate de que este tipo sea correcto
}

interface ModalDetallesPagoProps {
  isOpen: boolean;
  onClose: () => void;
  demanda: Demanda;  // Cambia 'any' por el tipo correcto de demanda
}

const ModalDetallesPago: React.FC<ModalDetallesPagoProps> = ({ isOpen, onClose, demanda }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isCreatingPreference, setIsCreatingPreference] = useState(false);
  const [error, setError] = useState<string | null>(null); // Para manejar errores
  const [nombrePagador, setNombrePagador] = useState<string>('');
  const [correoPagador, setCorreoPagador] = useState<string>('');

  const supabase = createClient();

  // Inicializa Mercado Pago al montar el componente
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string;
    if (publicKey) {
      initMercadoPago(publicKey, {
        locale: 'es-AR',
      });
    }

    // Obtiene el perfil del usuario desde Supabase
    const fetchUserProfile = async () => {
      const { data, error } = await supabase
        .from('profile')
        .select('nombre, email') // Cambia 'profiles' según el nombre de tu tabla
        .single();

      if (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        return;
      }

      if (data) {
        setNombrePagador(data.nombre || '');
        setCorreoPagador(data.email || '');
      }
    };

    fetchUserProfile();
  }, []);

  // Función para crear la preferencia en el servidor
  const createPreference = async () => {
    try {
      console.log('Demanda para crear preferencia:', {
        id: demanda.id,
        detalle: demanda.detalle,
        precio: 5000,
        nombre_pagador: nombrePagador,
        correo_pagador: correoPagador,
      });

      // Verifica que los datos requeridos no sean nulos
      if (!demanda.id || !demanda.detalle || !nombrePagador || !correoPagador) {
        setError('Faltan datos necesarios para crear la preferencia.');
        return null;
      }

      setIsCreatingPreference(true);
      const response = await axios.post('api/create_preference', {
        id: demanda.id,
        title: demanda.detalle,
        quantity: 1,  // Ajusta la cantidad según tus necesidades
        price: 5,  // Usa el precio de la demanda
        nombre_pagador: nombrePagador,
        correo_pagador: correoPagador,
      });

      return response.data.id;
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      setError('Error al crear la preferencia :('); // Manejo de errores
      return null;
    } finally {
      setIsCreatingPreference(false);
    }
  };

  // Llamada al crear la preferencia cuando el usuario hace clic en "Pagar"
  const handlePagarClick = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);  // Guarda el ID de la preferencia para usarlo en el componente Wallet
    }
  };

  if (!isOpen) return null;  // Si el modal no está abierto, no mostrar nada

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {/* Contenido del modal */}
        <h2 className="text-xl font-bold mb-4">Detalles de la Demanda</h2>

        <h3 className="font-bold text-lg">{demanda.detalle}</h3>
        <p><strong>Rubro:</strong> {demanda.rubro_demanda}</p>
        <p><strong>Fecha de inicio:</strong> {new Date(demanda.fecha_inicio).toLocaleDateString()}</p>
        <p><strong>Fecha de vencimiento:</strong> {new Date(demanda.fecha_vencimiento).toLocaleDateString()}</p>

        {/* Mensaje de error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Botón para proceder con el pago */}
        <div className="mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            onClick={handlePagarClick}
            disabled={isCreatingPreference}
          >
            {isCreatingPreference ? 'Creando preferencia...' : 'Pagar para obtener más detalles'}
          </button>
        </div>


        {/* Renderiza el botón de Mercado Pago si ya existe la preferencia */}
        {preferenceId && <Wallet initialization={{ preferenceId }} />}

        {/* Botón para cerrar el modal */}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalDetallesPago;
