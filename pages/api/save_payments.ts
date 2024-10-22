// pages/api/save_payment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { demandaId } = req.body;

    // Aquí debes agregar la lógica para guardar los detalles del pago en tu base de datos
    try {
      // Ejemplo de guardar en la base de datos
      const result = await createClient.pagos.create({
        data: {
          demandaId: demandaId,
          // Agrega otros campos necesarios para el pago
          // transactionId: req.body.transactionId,
          // amount: req.body.amount,
        },
      });

      return res.status(201).json({ message: 'Pago guardado con éxito', result });
    } catch (error) {
      console.error('Error al guardar el pago:', error);
      return res.status(500).json({ message: 'Error al guardar el pago' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
