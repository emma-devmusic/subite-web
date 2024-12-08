
import * as apiProducts from '@/services/products';
import { BannerThree } from "@/components/banners";
import { ProductsList } from "@/components/cards";
import { league_spartan } from "./layout";

export default async function HomePage() {

  const homeProd = (await apiProducts.getProductsFromDB('search?page=1&limit=8')).items

  return (
    <div className="container-auction !gap-24">
      <BannerThree homeProd={homeProd}/>
      <div className={`${league_spartan.className}`}>
        <h1 className="text-center text-6xl text-secondary">¡Subite a las <span className="text-primary">subastas!</span></h1>
      </div>
      <div className="">
        <ProductsList homeProd={homeProd}/>
      </div>
    </div>
  );
}