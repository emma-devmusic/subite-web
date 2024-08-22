import { useAppSelector } from "@/store";

export const SubcategoryInfo = () => {

    const { categoriesSelected } = useAppSelector( state => state.category)

    return (
        <div className="p-4 sm:p-7">
            <p className=""><strong>Nombre:</strong> <span><i>{categoriesSelected.name}</i></span></p>
            <p className="mt-5"><strong>Descripción:</strong> <span><i>{categoriesSelected.description}</i></span></p>
        </div>
    );
};
