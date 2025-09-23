import { Spinner } from "@/components/spinner/Spinner";
import { Subastar } from "./components/Subastar";
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div className='h-screen w-full place-content-center'><Spinner /></div>
});

export default function ComoSubastarPage() {
    return (
        <ClientLayout>
            <div className="container-auction max-w-[95%] sm:!max-w-[92%] lg:!max-w-screen-lg mx-auto my-10">
                <Subastar />
            </div>
        </ClientLayout>
    );
}