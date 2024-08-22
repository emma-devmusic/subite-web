'use client'

import { useAppDispatch } from "@/store";
import { deleteCategory, deleteSubcategory, selectEditCategory } from "@/store/categorySlice";
import { uiModal } from "@/store/uiSlice";
import { CategoryItem } from "@/types/category";
import Swal from "sweetalert2";

interface Props {
    category: CategoryItem;
    isSubcategory?: boolean;
}

export const ActionButtons = ({ category, isSubcategory = false }: Props) => {

    const dispatch = useAppDispatch()

    const handleEdit = () => {
        dispatch(uiModal({
            modalFor: 'category',
            modalOpen: true,
            modalTitle: 'Editar Categoría'
        }))
        dispatch(selectEditCategory({ ...category, isSubcategory }))
    }

    const handleDelete = () => {
        Swal.fire({
            title: "¿Deseas eliminar el registro?",
            text: "No podrás deshacer esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar el registro",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                if (isSubcategory) {
                    dispatch(deleteSubcategory(category.id))
                    return
                }
                dispatch(deleteCategory(category.id))
            }
        });
    }

    const handleInfo = () => {
        dispatch(selectEditCategory({ ...category, isSubcategory }))
        dispatch(uiModal({
            modalFor: 'categoryInfo',
            modalOpen: true,
            modalTitle: 'Información de Subcategoría'
        }))
    }

    return (
        <>
            {
                isSubcategory &&
                <div className="text-blue-500 hover:text-blue-400 category-action-btn" onClick={handleInfo}>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"></path></svg>
                </div>
            }
            <div className="text-cyan-600 hover:text-cyan-500 category-action-btn" onClick={handleEdit}>
                <svg className=" h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
            </div>
            <div className="text-red-500 hover:text-red-400 category-action-btn" onClick={handleDelete}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            </div>
        </>
    );
};
