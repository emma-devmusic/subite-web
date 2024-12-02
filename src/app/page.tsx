
import { BannerThree } from "@/components/banners";
import { CardListProducts } from "@/components/cards";
import * as apiProducts from '@/services/products';

export default async function HomePage() {

  const homeProd = (await apiProducts.getProductsFromDB('search?page=1&limit=8')).items

  return (
    <div className="container-auction m-auto flex flex-col gap-10 justify-center">
      <BannerThree homeProd={homeProd}/>
      <CardListProducts homeProd={homeProd}/>
    </div>
  );
}