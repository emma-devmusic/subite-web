export const revalidate = 60 * 60

import { BannerThree } from "@/components/banners";
import { ProductsList } from "@/components/cards";
import { league_spartan } from "./layout";
import Link from 'next/link';
import { getProductsFromDB } from "@/services-actions/home/products";

export default async function HomePage() {

  const homeProd = (await getProductsFromDB('search?page=1&limit=8')).items

  return (
    <div className="container-auction !gap-24">
      <BannerThree homeProd={homeProd}/>
      <div className={`${league_spartan.className}`}>
        <h1 className="text-center text-6xl text-secondary">¡Subite a las <span className="text-primary">subastas!</span></h1>
      </div>
      <div className="flex justify-center">
        <ProductsList homeProd={homeProd} cols="lg:grid-cols-4"/>
      </div>
      <div className='flex justify-center'>
        <Link href={'/auctions'} className='py-2 px-6 border-[1px] rounded-3xl transition-all border-primary bg-primary text-white  hover:border-primary hover:bg-primaryHover hover:text-white'>
          Ver más
        </Link>
      </div>
    </div>
  );
}