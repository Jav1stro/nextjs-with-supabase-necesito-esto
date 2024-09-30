import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Search from '@/components/ui/search';
import Image from "next/image";
import { HomeIcon, UserGroupIcon, BriefcaseIcon, ChatBubbleBottomCenterTextIcon, BellIcon} from '@heroicons/react/24/solid';
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <header className="header border-b border-gray-300 py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
              
              <div className="header__left flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Logo de Nesecito Esto!" 
                  width={40} 
                  height={40} 
                />
                <Link href="/">
                  <h3 className="text-xl font-bold">Nesecito <span className="text-blue-600">Esto!</span></h3>
                </Link>
                <div className="header__search ml-4">
                  <Search placeholder="Search..." />
                </div>
              </div>
                  
              {/* Enlaces */}
              <div className="header__center flex gap-6 items-center">
                <nav>
                  <ul className="flex gap-6">
                    <li className="flex flex-col items-center">
                      <HomeIcon className="w-6 h-6  header-boton" />
                      <Link className="ito" href="/">Inicio</Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <UserGroupIcon className="w-6 h-6 " />
                      <Link className="ito" href="#">Nosotros</Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <BriefcaseIcon className="w-6 h-6 ito" />
                      <Link className="ito" href={`/demandas`}>Demandas</Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <ChatBubbleBottomCenterTextIcon className="w-6 h-6 ito" />
                      <Link className="ito" href="#">Mensajes</Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <BellIcon className="w-6 h-6 ito" />
                      <Link className="ito" href="#">Notificaciones</Link>
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
              <div className="flex flex-col gap-20 max-w-5xl p-5 justify-center items-center mx-auto text-center">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                  Necesito Esto  ACTUALIZADO!{" "}
                </p>
                <ThemeSwitcher />
              </footer>
           
        </ThemeProvider>
      </body>
    </html>
  );
}
