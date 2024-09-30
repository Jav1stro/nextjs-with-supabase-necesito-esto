import { signOutAction } from "@/actions/auth-actions/actions";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { EnvVarWarning } from "@/components/env-var-warning";
import Image from "next/image";
import Search from "@/components/ui/search";
import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export const Header = () => {
  return (
    <header className="header w-full border-b border-gray-300 py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="header__left flex items-center">
          <Image
            src="/logo.png"
            alt="Logo de Nesecito Esto!"
            width={40}
            height={40}
          />
          <Link href="/">
            <h3 className="text-xl font-bold">
              Necesito <span className="text-blue-600">Esto!</span>
            </h3>
          </Link>
          <div className="header__search ml-4">
            <Search placeholder="Search..." />
          </div>
        </div>

        {/* Enlaces */}
        <div className="header__center flex gap-6 items-center">
          <nav>
            <ul className="flex gap-6">
              <li className="flex flex-col items-center cursor-pointer">
                <HomeIcon className="w-6 h-6  header-boton" />
                <Link className="ito" href="/">
                  Inicio
                </Link>
              </li>
              <li className="flex flex-col items-center cursor-pointer">
                <UserGroupIcon className="w-6 h-6 " />
                <Link className="ito" href="#">
                  Nosotros
                </Link>
              </li>
              <li className="flex flex-col items-center cursor-pointer">
                <BriefcaseIcon className="w-6 h-6 ito" />
                <Link className="ito" href={`/demandas`}>
                  Demandas
                </Link>
              </li>
              <li className="flex flex-col items-center cursor-pointer">
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6 ito" />
                <Link className="ito" href="#">
                  Mensajes
                </Link>
              </li>
              <li className="flex flex-col items-center cursor-pointer">
                <BellIcon className="w-6 h-6 ito" />
                <Link className="ito" href="#">
                  Notificaciones
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Enlace session */}
        <div className="header__right">
          <nav>
            <ul className="flex gap-6">
              <li className="flex flex-col items-center">
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
