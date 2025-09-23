
import { Spinner } from '@/components/spinner/Spinner';
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div className='h-screen w-full place-content-center'><Spinner /></div>
});

export default function CategoriesPage() {
    return (
        <ClientLayout>
            <div>
                <h1>Categories Page</h1>
            </div>
        </ClientLayout>
    );
}