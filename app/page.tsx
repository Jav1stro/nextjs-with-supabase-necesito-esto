import Hero from "@/components/hero";
import Search from '@/components/ui/search';
import { Suspense } from 'react';
import  Table  from '../components/table-query'
export default function Index({

  searchParams,
}: {
  searchParams?: {
    query?: any;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;



  return (
    <>
    <Hero />
      <main className="w-full flex flex-row justify-between gap-6 md:gap-12">    
        <Suspense key={query + currentPage}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </main>
    </>
  );
}

