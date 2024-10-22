import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN!,
});

// Configuración de Supabase
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// El middleware de CORS solo se puede usar dentro de una función handler de Next.js.
const corsMiddleware = cors();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Aplica CORS
    await new Promise((resolve, reject) => {
        corsMiddleware(req, res, (result) => {
            if (result instanceof Error) return reject(result);
            resolve(result);
        });
    });

    if (req.method === 'POST') {
        try {

          
            const { title, quantity, price, id, nombre_pagador, correo_pagador } = req.body;

            if (!id) {
                return res.status(400).json({ error: "ID is required." });
            }

            

            const body = {
                items: [
                    {
                        id: id,
                        title: title,
                        quantity: Number(quantity) || 1,
                        unit_price: price || 5,
                        currency_id: "USD",
                    },
                ],
                back_urls: {
                    success: `http://localhost:3000/app/demandas/${id}?status=success`,
                    failure: `http://localhost:3000?status=failure`,
                    pending: `http://localhost:3000?status=pending`,
                },
                auto_return: "approved",
            };

            console.log('Cuerpo de la solicitud:', body); // Agrega este log

            const preference = new Preference(client);
            const result = await preference.create({ body });

            // Insertar el pago en la base de datos de Supabase
            const { data, error: supabaseError } = await supabase
                .from('pagos')
                .insert({
                    demanda_id: id,
                    detalle_demanda: title,
                    nombre_pagador: nombre_pagador,
                    correo_pagador: correo_pagador,
                    numero_pago: result.id,
                    monto: price,
                });

            if (supabaseError) {
                throw new Error('Error al guardar el pago en la base de datos');
            }

            res.json({
                id: result.id,
            });
        } catch (error) {
            console.error('Error al crear la preferencia:', error);
            const errorDetails = "Error desconocido";
            res.status(500).json({
                error: "Error al crear la preferencia :(",
                details: errorDetails,
            });
        }
    } else {
        // Manejar métodos HTTP no permitidos
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
