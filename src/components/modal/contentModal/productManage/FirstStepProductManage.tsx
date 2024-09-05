
interface Props {
    title: string;
    description: string;
    handleInputChange: () => void;
}

export const FirstStepProductManage = ({title, description, handleInputChange}: Props) => {
    
    return (
        <>
            <div className='bg-slate-100 p-4 border-l-2 border-gray-400'>
                <p className='text-gray-600 text-xs'>Sigue los pasos para la creación o edición de un producto completando todos los campos.</p>
            </div>
            <form action="" >
                <div className='w-100 my-4'>
                    <label htmlFor="nameProduct" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Nombre del producto</label>
                    <input 
                        required
                        placeholder='Apple Imac 27"' 
                        name='title'
                        value={title} 
                        onChange={handleInputChange}
                        type="text" 
                        className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' 
                    />
                </div>
                <div className='w-100 my-4'>
                    <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Descripción</label>
                    <textarea 
                        required
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        rows={4} 
                        placeholder='e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz' className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 text-sm sm:leading-6 bg-gray-50 ' 
                    />
                </div>
            </form>
        </>
    );
};
