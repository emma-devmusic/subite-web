'use client'

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import dayjs from "dayjs";
import { useAppDispatch } from "@/store";
import { uiModal } from "@/store/slices/uiSlice";
import { selectAuction } from "@/store/slices/auctionSlice";
import { getOffers } from "@/store/slices/offersSlice";
import { selectProduct } from "@/store/slices/productSlice";
import { ItemProductSearchResponse } from "@/types/products";
import { AuctionCounter } from "./AuctionCounter";


export const TableRowHomeAuctions = (product: ItemHomeProductsSearchResponse) => {

    const [urlImg, setUrlImg] = useState('')
    const [auction] = useState(product.products_acutions.find(s => !s.data_deleted))
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState<'waiting' | 'running' | 'finished'>('waiting')

    useEffect(() => {
        if (product.product_variations.length > 0) {
            product.product_variations[0].productImages.forEach((img, i) => {
                const last = product.product_variations[0].productImages.length - 1
                if (img.main_image) {
                    setUrlImg(img.url_image)
                } else if (urlImg === '' && i === last) {
                    setUrlImg(img.url_image)
                }
            })
        }
    }, [product])


    useEffect(() => {
        if (auction) {
            const convertToDate = (dateString: string): Date => {
                const [day, month, year] = dateString.split('/').map(Number);
                return new Date(year, month - 1, day); // Crear fecha en formato válido
            };
            const now = new Date();
            const startDate = convertToDate(dayjs(auction?.init_date).format('DD/MM/YYYY'));
            const endDate = convertToDate(dayjs(auction?.end_date).format('DD/MM/YYYY'));
            if (now < startDate) {
                setStatus('waiting')
            } else if (now > endDate) {
                setStatus('finished')
            } else {
                setStatus('running')
            }
        }
    }, [product])


    const handleSeeOffers = () => {
        dispatch(uiModal({
            modalFor: 'offers',
            modalOpen: true,
            modalTitle: `Ofertas del producto: ${product.name}`
        }))
        dispatch(selectAuction(product))
        dispatch(selectProduct(product as any))
        dispatch(getOffers(`${product.products_acutions.find(auction => !auction.data_deleted)?.id}`))
    }

    return (
        <tr className="hover:bg-gray-100">
            <td className="p-4 whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                {
                    urlImg &&
                    <img className="w-10 h-10 rounded-full inline-block" src={urlImg} alt="Neil Sims avatar" />
                }
                <p className="text-sm inline-block font-semibold text-gray-900">
                    {product.name}
                </p>
            </td>
            <td className="p-4 text-sm whitespace-nowrap  font-medium text-gray-900">
                {dayjs(auction?.init_date).format('DD/MM/YYYY')}
                {
                    status === 'waiting' &&
                    <div>
                        <AuctionCounter
                            auctionStartDate={dayjs(auction?.init_date).format('DD/MM/YYYY')}
                            auctionEndDate={dayjs(auction?.end_date).format('DD/MM/YYYY')}
                        />
                    </div>
                }
            </td>
            <td className="p-4 text-sm whitespace-nowrap  font-medium text-gray-900">
                <div>
                    {dayjs(auction?.end_date).format('DD/MM/YYYY')}
                    {
                        status === 'running' || status === 'finished' &&
                        <div>
                            <AuctionCounter
                                auctionStartDate={dayjs(auction?.init_date).format('DD/MM/YYYY')}
                                auctionEndDate={dayjs(auction?.end_date).format('DD/MM/YYYY')}
                            />
                        </div>
                    }
                </div>
            </td>
            <td className="p-4 text-sm whitespace-nowrap  font-medium text-gray-900">{product.product_variations[0].price}</td>
            <td className="p-4 whitespace-nowrap space-x-2 text-center">

                <button
                    className=" text-cyan-600 hover:text-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-1 py-1 text-center"
                    onClick={handleSeeOffers}
                >
                    <Icon icon={'fluent:eye-20-filled'} className="text-2xl" />
                    {/* <svg className=" h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg> */}
                </button>
            </td>
        </tr>

    );
};
