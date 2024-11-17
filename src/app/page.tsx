
import { BannerThree } from "@/components/banners";
import { CardListProducts } from "@/components/cards";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 justify-center">
      <BannerThree />
      <CardListProducts />
    </div>
  );
}