interface Props {
    slidePrev: () => void;
    slideNext: () => void;
    action: () => void;
    finishDisable: boolean; // Bandera para desabilitar el botón de finalizar
    step: number;
}

export const HandleStep = ({ slideNext, slidePrev, action, step, finishDisable }:Props) => {

    return (
        <div className="bg-gray-50 px-4 py-4 pb-6 flex sm:px-6 justify-between gap-2">
            <button
                type="button"
                className={`w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryHover sm:mr-3 sm:w-auto ${step === 1 && 'invisible'}`}
                onClick={slidePrev}
            >Anterior</button>
            <button
                type="button"
                className={`w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryHover sm:mr-3 sm:w-auto ${step === 3 && 'invisible'}`}
                onClick={slideNext}
            >Siguiente</button>
            <button
                disabled={finishDisable}
                type="button"
                className={`w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary sm:mr-3 sm:w-auto  ${step === 3 ? 'block' : 'hidden'} disabled:bg-slate-400`}
                onClick={action}
            >Guardar</button>
        </div>
    );
};
