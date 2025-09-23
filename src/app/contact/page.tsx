
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function ContactPage() {
    return (
        <ClientLayout>
            <div>
                <h1>Contact Page</h1>
            </div>
        </ClientLayout>
    );
}