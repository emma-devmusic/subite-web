import { Spinner } from '../../../components/spinner/Spinner';
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className='h-100 w-100 flex justify-center items-center'>
            <Spinner />
        </div>
}