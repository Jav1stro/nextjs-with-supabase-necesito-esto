'use client'

import { createClient } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from 'react'
import { CreateOfferAction } from '@/actions/oferta-actions';
import { useRouter } from 'next/navigation';

// Acción para crear una oferta

export default function NewOferta({
    searchParams,
  }: {
    searchParams: Message;
  }) {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    const storedId = localStorage.getItem('id_demanda');
    
      useEffect(() => {
        if (storedId) {
          console.log('ID Demanda:', storedId);
        }
      }, [storedId]);

    
    useEffect(() => {
        const fetchUser = async () => {
          const supabase = createClient();
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser();
    
          if (error) {
            return (
              <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                {error.message}
              </div>
            );
          }
    
          if (user) {
            const { data: profileData, error: profileError } = await supabase
              .from("profile")
              .select("*")
              .eq("id", user.id)
              .single(); // single() se usa para obtener un solo registro
    
            if (profileError) {
              console.error("Error fetching profile:", profileError);
            } else {
              setProfile(profileData || {});
            }
            setUser(user);
            setOffer((prev: any) => ({
              ...prev,
              profile_id: user.id, // Asocia la offera al usuario actual
            }));
          }
    
          setLoading(false);
        };
    
        fetchUser();
      }, []);

    const [loading, setLoading] = useState(true);
    const [offer, setOffer] = useState<any>({
        responsable_solicitud: "",
        email_contacto: "",
        telefono: "",
        rubro_oferta: [],
        detalle: "",
        motivo_oferta: "",
        profile_id: "",
        demanda_id: storedId
    })

    if (loading) {
        return <p>Loading...</p>;
      }
    
      if ("message" in searchParams) {
        return (
          <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
            <FormMessage message={searchParams} />
          </div>
        );
      }
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setOffer({
          ...offer,
          [name]: value,
        });
      };
    
      const handleRubroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rubros = e.target.value.split(","); // Dividir rubros por comas
        setOffer({
          ...offer,
          rubro_oferta: rubros,
        });
      };
    
      return (
        <>
          <form
            className="flex flex-col max-w-3xl mx-auto"
            style={{ width: "700px" }}
            method="post"
          >
            <h1 className="text-2xl font-medium">Crear una Oferta</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="responsable_solicitud">
                Responsable de la solicitud
              </Label>
              <Input
                name="responsable_solicitud"
                placeholder="Nombre del responsable"
                required
                value={profile.nombre}
                onChange={handleChange}
              />
    
              <Label htmlFor="email_contacto">Email de contacto</Label>
              <Input
                name="email_contacto"
                placeholder="email@ejemplo.com"
                type="email"
                required
                value={profile.email}
                onChange={handleChange}
              />
    
              <Label htmlFor="telefono">Teléfono de contacto</Label>
              <Input
                name="telefono"
                placeholder="Número de teléfono"
                type="tel"
                required
                value={offer.telefono}
                onChange={handleChange}
              />
    
              <Label htmlFor="rubro_oferta">
                Rubro de la oferta (separado por comas)
              </Label>
              <Input
                name="rubro-oferta"
                placeholder="Rubro1, Rubro2, Rubro3"
                required
                value={offer.rubro_oferta.join(",")}
                onChange={handleRubroChange}
              />
    
              <Label htmlFor="detalle">Detalle</Label>
              <textarea
                name="detalle"
                placeholder="Describa el detalle de la offera"
                required
                value={offer.detalle}
                onChange={handleChange}
                className="border p-2 rounded"
                rows={4}
              />

              <Label htmlFor="motivo_oferta">
                Motivo de la oferta
              </Label>
              <Input
                name="motivo_oferta"
                placeholder="Motivo..."
                required
                value={offer.motivo_oferta}
                onChange={handleChange }
              />
              {/* input hidden del id_demanda */}
              <input
                        type="hidden"
                        name="demanda_id"
                        value={storedId || ""}
                    />
    
              <SubmitButton
                pendingText="Creando..."
                formAction={CreateOfferAction}
              >
                Crear oferta
              </SubmitButton>
    
              <FormMessage message={searchParams} />
            </div>
          </form>
        </>
      );
    }

