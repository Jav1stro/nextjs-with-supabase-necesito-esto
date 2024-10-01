// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"; // Para Next.js 13+


export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [nombre, setNombre] = useState(""); // Estado para el nombre
  const [apellido, setApellido] = useState(""); // Estado para el apellido
  const [email, setEmail] = useState(""); // Estado para el apellido
  const [provincia, setProvincia] = useState(""); 
  const [municipio, setMunicipio] = useState(""); 
  const [localidad, setLocalidad] = useState(""); 
  const [direccion, setDireccion] = useState(""); 
  const [codigo_postal, setCodigo] = useState(""); 
  const [formattedDate, setFormattedDate] = useState(""); 
  const [activeTab, setActiveTab] = useState("datosGenerales"); // Estado para controlar la pestaña activa

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      // Manejo de errores de autenticación
      if (userError || !user) {
        console.error("Error al obtener el usuario o el usuario no está autenticado:", userError);
        router.push("/sign-in"); // Usar router.push para redirigir al cliente
        return;
      }

     

      setUser(user);

      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.id)
        .single();

      // Manejo de errores al obtener el perfil
      if (profileError) {
        setProfileError(profileError);
        console.error("Error obteniendo el perfil:", profileError);
      } else {
        setProfile(profile);
        setNombre(profile?.nombre || ""); // Asigna el nombre si está disponible
        setApellido(profile?.apellido || ""); // Asigna el apellido si está disponible
        setEmail(profile?.email || ""); // Asigna el apellido si está disponible
        setProvincia(profile?.provincia || ""); 
        setMunicipio(profile?.municipio || ""); 
        setLocalidad(profile?.localidad || ""); 
        setDireccion(profile?.direccion || ""); 
        setCodigo(profile?.codigo_postal || ""); 
        const formattedDate = profile?.created_at
          ? new Date(profile.created_at).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : ""; 

        setFormattedDate(formattedDate);
      }
    };

    fetchUserProfile();
  }, [supabase]);

  const handleSave = async () => {
    const { error } = await supabase
      .from("profile")
      .update({ nombre, apellido, email, provincia, municipio, localidad, direccion, codigo_postal })
      .eq("id", user.id);

    if (error) {
      console.error("Error al actualizar el perfil:", error);
    } else {
      alert("Perfil actualizado con éxito");
    }
  };

  return (
    <div className="flex w-full min-h-screen ">
      <aside className="w-1/3 p-4 shadow-md">
        <h2 className="font-bold text-xl mb-4">Configuracion de Perfil</h2>
        <ul className="flex flex-col">
          <li className="py-2 hover:bg-gray-200 hover:text-black cursor-pointer" onClick={() => setActiveTab("datosGenerales")}>Datos Generales</li>
          <li className="py-2 hover:bg-gray-200 hover:text-black cursor-pointer" onClick={() => setActiveTab("seguridad")}>Seguridad</li>
          <li className="py-2 hover:bg-gray-200 hover:text-black cursor-pointer" onClick={() => setActiveTab("demandas")}>Demandas</li>
        </ul>
      </aside>

      <main className="flex-1 p-8">
        <h4 className="font-bold text-3xl mb-6">Detalles de tu perfil</h4>
        {profileError && <div className="text-red-500 mb-4">Error obteniendo tu perfil: {profileError.message}</div>}
        {/* Sección de Datos Generales */}

        {activeTab === "datosGenerales" && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Provincia</label>
              <input
                type="text"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Municipio</label>
              <input
                type="text"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Localidad</label>
              <input
                type="text"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Direccion</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Codigo Postal</label>
              <input
                type="text"
                value={codigo_postal}
                onChange={(e) => setCodigo(e.target.value)}
                className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label className="block mb-2 font-semibold">Fecha de Creación</label>
              <p className="rounded-md p-3 shadow-sm">
                {formattedDate || "No disponible"}
              </p>
            </div>
          </div>
        )}

        {/* Sección de Seguridad */}
        {activeTab === "seguridad" && (
          <div className="p-4 rounded-md mb-6">
            <h2 className="font-bold text-xl mb-4">Seguridad</h2>
            <div className="flex flex-col mb-6">
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
                className="border border-gray-300 rounded-md p-3 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="block mb-2 font-semibold">Contraseña</label>
              <input
                type="password"
                placeholder="********"
                readOnly
                className="border border-gray-300 rounded-md p-3 cursor-not-allowed"
              />
              <button>

              </button>
            </div>
          </div>
        )}

        {/* Sección de Demandas */}
        {activeTab === "demandas" && (
          <div>
            <h2 className="font-bold text-xl mb-4">Demandas</h2>
            <p>Aquí iría el contenido relacionado a las demandas.</p>
          </div>
        )}

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
        >
          Guardar Cambios
        </button>
      </main>
    </div>
  );
}
