// Una tableED es una tabla con elementos que pueden ser editados y borrados

import Image from 'next/image'
import React from 'react'

export const TableEDusers = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Nombre
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Teléfono
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Ubicación
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Cantidad de Productos
                                        </th>
                                        <th scope="col" className="p-4">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-194556" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-194556" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                                <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">3731455614</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Charata, Chaco</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">5</td>
                                        <td className="p-4 whitespace-nowrap space-x-2">
                                            <button type="button" data-modal-toggle="product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                Edit item
                                            </button>
                                            <button type="button" data-modal-toggle="delete-product-modal" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Delete item
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-623232" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-623232" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                                <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">3731455614</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Charata, Chaco</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">5</td>
                                        <td className="p-4 whitespace-nowrap space-x-2">
                                            <button type="button" data-modal-toggle="product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                Edit item
                                            </button>
                                            <button type="button" data-modal-toggle="delete-product-modal" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Delete item
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-194356" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-194356" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                                <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">3731455614</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Charata, Chaco</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">5</td>
                                        <td className="p-4 whitespace-nowrap space-x-2">
                                            <button type="button" data-modal-toggle="product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                Edit item
                                            </button>
                                            <button type="button" data-modal-toggle="delete-product-modal" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Delete item
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-194356" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-194356" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                                <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">3731455614</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Charata, Chaco</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">5</td>
                                        <td className="p-4 whitespace-nowrap space-x-2">
                                            <button type="button" data-modal-toggle="product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                Edit item
                                            </button>
                                            <button type="button" data-modal-toggle="delete-product-modal" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Delete item
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-194356" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-194356" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                                <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">3731455614</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Charata, Chaco</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">5</td>
                                        <td className="p-4 whitespace-nowrap space-x-2">
                                            <button type="button" data-modal-toggle="product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                Edit item
                                            </button>
                                            <button type="button" data-modal-toggle="delete-product-modal" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Delete item
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-194356" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-194356" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                                <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">3731455614</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Charata, Chaco</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">5</td>
                                        <td className="p-4 whitespace-nowrap space-x-2">
                                            <button type="button" data-modal-toggle="product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                Edit item
                                            </button>
                                            <button type="button" data-modal-toggle="delete-product-modal" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Delete item
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-194356" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                <label htmlFor="checkbox-194356" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                            <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                                            <div className="text-sm font-normal text-gray-500">
                                                <div className="text-base font-semibold text-gray-900">Neil Sims</div>
                                                <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">3731455614</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Charata, Chaco</td>
                                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">5</td>
                                        <td className="p-4 whitespace-nowrap space-x-2">
                                            <button type="button" data-modal-toggle="product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                Edit item
                                            </button>
                                            <button type="button" data-modal-toggle="delete-product-modal" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Delete item
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
                <div className="flex items-center mb-4 sm:mb-0">
                    <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                    <span className="text-sm font-normal text-gray-500">Showing <span className="text-gray-900 font-semibold">1-20</span> of <span className="text-gray-900 font-semibold">2290</span></span>
                </div>
                <div className="flex items-center space-x-3">
                    <a href="#" className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                        <svg className="-ml-1 mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Previous
                    </a>
                    <a href="#" className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                        Next
                        <svg className="-mr-1 ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                </div>
            </div >
        </>
    )
}

