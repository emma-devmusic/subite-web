
import { BannerThree } from "@/components/banners";
import { CardListProducts } from "@/components/cards";
import * as apiProducts from '@/services/products';
import { league_spartan } from "./layout";

export default async function HomePage() {

  const homeProd = (await apiProducts.getProductsFromDB('search?page=1&limit=8')).items

  return (
    <div className="container-auction m-auto flex flex-col gap-24 justify-center my-16">
      <BannerThree homeProd={homeProd}/>
      <div className={`${league_spartan.className}`}>
        <h1 className="text-center text-6xl text-secondary">¡Subite a las <span className="text-primary">subastas!</span></h1>
      </div>
      <div className="">
        <CardListProducts homeProd={homeProd}/>
      </div>
    </div>
  );
}