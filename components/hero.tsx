// Manera de manejar LOGOS
import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Desarrollo de <strong className="text-sky-500">¡Necesito Esto!</strong>{" "}
        con{" "}
        <a className="font-bold hover:underline" rel="noreferrer">
          Supabase
        </a>{" "}
        y{" "}
        <a className="font-bold hover:underline" rel="noreferrer">
          Next.js
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
