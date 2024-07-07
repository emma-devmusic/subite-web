
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    setPagesSearch: Dispatch<SetStateAction<{
        pageQuerys: string;
        searchQuerys: string;
    }>>
}

export const HandlePage = ({ setPagesSearch }: Props) => {

    const limit = 30
    const [pageNumber, setPageNumber] = useState(1);
    const [countPage, setCountPage] = useState('1-30')

    useEffect(() => {
        setCountPage(`${(pageNumber === 1) ? 1 : (limit * pageNumber + 1)}-${limit * pageNumber}`)
        setPagesSearch( (state) => {
            return {
                ...state,
                page: `search?page=${pageNumber}&limit=30`
            }
        })
    }, [pageNumber])

    return (
        <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
            <div className="flex items-center mb-4 sm:mb-0">
                <button
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                    onClick={() => (pageNumber !== 1) && setPageNumber(pageNumber - 1)}
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </button>
                <button
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </button>
                <span className="text-sm font-normal text-gray-500">Página <span className="text-gray-900 font-semibold">{pageNumber}</span></span>
            </div>
            <div>
                <span className="text-sm font-normal text-gray-500">Se muestran <span className="text-gray-900 font-semibold">{countPage}</span> de <span className="text-gray-900 font-semibold">2290</span> elementos</span>

            </div>
        </div >
    );
};
