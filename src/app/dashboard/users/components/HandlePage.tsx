
import { useAppSelector } from "@/store";
import { QueryObject } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { QueryObject } from "../page";

interface Props {
    setPagesSearch: Dispatch<SetStateAction<QueryObject>>;
    limit: number;
    stop?: boolean;
    extraQuery?: string;
    elementsLength: number;
}

export const HandlePage = ({ setPagesSearch, limit, stop = false, extraQuery, elementsLength }: Props) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [countPage, setCountPage] = useState(`1-${limit}`)

    useEffect(() => {
        setCountPage(`${(pageNumber === 1) ? 1 : (limit * pageNumber + 1)}-${limit * pageNumber}`)
        setPagesSearch( (state) => {
            return {
                ...state,
                pageQuerys: extraQuery ? `search?page=${pageNumber}&limit=${limit}&${extraQuery}` : `search?page=${pageNumber}&limit=${limit}`
            }
        })
    }, [pageNumber])

    const handleNext = () => !stop && setPageNumber(pageNumber + 1)
    const handlePrev = () => (pageNumber !== 1) && setPageNumber(pageNumber - 1)

    return (
        <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
            <div className="flex items-center mb-4 sm:mb-0">
                <button
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                    onClick={handlePrev}
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </button>
                <button
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
                    onClick={handleNext}
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </button>
                <span className="text-sm font-normal text-gray-500">Página <span className="text-gray-900 font-semibold">{pageNumber}</span></span>
            </div>
            <div>
                <span className="text-sm font-normal text-gray-500">Se muestran <span className="text-gray-900 font-semibold">{ elementsLength }</span> elementos</span>
            </div>
        </div >
    );
};
