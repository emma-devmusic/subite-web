'use client'

import { BannerThree } from "@/components/banners";
import { ProductsList } from "@/components/cards";
import { league_spartan } from "./fonts";
import Link from 'next/link';
import { CardCategory } from "@/components/cards/CardCategory";
import { StartNow } from "./about-us/sections/StartNow";
import { useEffect, useState } from "react";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { getProductsFromDB } from "@/services-actions/home/products";
import { Icon } from "@iconify/react";

// Cache global para evitar múltiples llamadas
let homeProductsCache: ItemHomeProductsSearchResponse[] | null = null;
let bannerProductsCache: ItemHomeProductsSearchResponse[] | null = null;
let isLoading = false;

export default function HomePage() {
  const [homeProd, setHomeProd] = useState<ItemHomeProductsSearchResponse[]>([]);
  const [bannerProd, setBannerProd] = useState<ItemHomeProductsSearchResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // console.log('🔍 HomePage component rendered');

  useEffect(() => {
    // Si hay cache disponible, usarlo inmediatamente
    if (homeProductsCache && bannerProductsCache) {
      // console.log('🔍 Using cached products');
      setHomeProd(homeProductsCache);
      setBannerProd(bannerProductsCache);
      setLoading(false);
      return;
    }

    // Si ya está cargando en otra instancia, esperar
    if (isLoading) {
      // console.log('🔍 Products already loading, skipping...');
      return;
    }

    // console.log('🔍 HomePage useEffect triggered - loading products...');
    isLoading = true;
    
    const loadProducts = async () => {
      try {
        const [homeProducts, bannerProducts, notStartedProducts] = await Promise.all([
          getProductsFromDB('search?page=1&limit=8'),
          getProductsFromDB('search?page=1&limit=8&with_auction=ACTIVE'),
          getProductsFromDB('search?page=1&limit=8&with_auction=NOT_STARTED')
        ]);

        // console.log('🔍 Products loaded successfully');
        
        // Guardar en cache
        homeProductsCache = homeProducts.items || [];
        bannerProductsCache = [...(bannerProducts.items || []), ...(notStartedProducts.items || [])];
        
        setHomeProd(homeProductsCache);
        setBannerProd(bannerProductsCache);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
        isLoading = false;
      }
    };

    loadProducts();
  }, []); // Solo ejecutar una vez al montar

  if (loading) {
    return (
      <div className="container-auction !gap-24">
        <div className="h-[500px] bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="grid w-full max-w-[920px] mx-auto grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 px-2">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="h-44 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-auction !gap-24">
      <BannerThree homeProd={bannerProd} />
      <div className="grid w-full max-w-[920px] mx-auto grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 px-2">
        <CardCategory
          name="Digital"
          category_id={5}
          icon={<Icon icon="solar:devices-bold-duotone" />}
        />
        <CardCategory
          name="Electricidad"
          category_id={13}
          icon={<Icon icon="solar:bolt-bold-duotone" />}
        />
        <CardCategory
          name="Música"
          category_id={14}
          icon={<Icon icon="solar:music-note-bold-duotone" />}
        />
        <CardCategory
          name="Indumentaria"
          category_id={6}
          icon={<Icon icon="solar:t-shirt-bold-duotone" />}
        />
      </div>
      <div className={`${league_spartan.className}`}>
        <h1 className="text-center text-6xl text-secondary">¡Subite a las <span className="text-primary">subastas!</span></h1>
      </div>
      <div className="flex justify-center">
        <ProductsList homeProd={homeProd} cols="lg:grid-cols-4" />
      </div>
      <div className='flex justify-center'>
        <Link href={'/auctions'} className='py-2 px-6 border-[1px] rounded-3xl transition-all border-primary bg-primary text-white  hover:border-primary hover:bg-primaryHover hover:text-white'>
          Ver más
        </Link>
      </div>
      <StartNow />
    </div>
  );
}
