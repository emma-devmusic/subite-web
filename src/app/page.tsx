import { Spinner } from '@/components/spinner/Spinner';
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div className='h-screen w-full place-content-center'><Spinner /></div>
});

const ClientHome = dynamic(() => import('./page-client'), {
  ssr: false,
  loading: () => (
    <div className="container-auction !gap-24">
      <div className="h-[500px] bg-gray-100 animate-pulse rounded-lg"></div>
      <div className="grid grid-cols-2 max-w-[400px] mx-auto lg:max-w-[1200px] lg:grid-cols-4 justify-center gap-4">
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    </div>
  )
});

export default function HomePage() {
  return (
    <ClientLayout>
      <ClientHome />
    </ClientLayout>
  );
}