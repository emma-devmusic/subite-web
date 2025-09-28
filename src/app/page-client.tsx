'use client'

import { BannerThree } from "@/components/banners";
import { ProductsList } from "@/components/cards";
import { league_spartan } from "./fonts";
import Link from 'next/link';
import { CardCategory } from "@/components/cards/CardCategory";
import { StartNow } from "./about-us/sections/StartNow";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useState } from "react";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { getProductsFromDB } from "@/services-actions/home/products";

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
        <div className="grid grid-cols-2 max-w-[400px] mx-auto lg:max-w-[1200px] lg:grid-cols-4 justify-center gap-4">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
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
      <div className="grid grid-cols-2 max-w-[400px] mx-auto lg:max-w-[1200px] lg:grid-cols-4 justify-center gap-4">
        <CardCategory 
          name="Digital"
          category_id={5}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 24 24"><path fill="currentColor" d="M10.325 11.4h.7V7.1h-.5l-1.25.9l.35.55l.7-.5zm1.625 0h2.8l-.025-.625H12.85v-.025l1.1-1.1q.4-.4.563-.725t.162-.7q0-.5-.4-.862T13.3 7q-.5 0-.875.275t-.5.7l.625.25q.075-.275.275-.425t.45-.15q.3 0 .5.163t.2.412q0 .275-.125.525t-.35.475l-1.55 1.525zM10.2 17q.65 0 1.075-.363t.425-.937q0-.35-.2-.638t-.525-.412v-.05q.275-.125.425-.387t.15-.563q0-.5-.387-.825t-.988-.325q-.425 0-.812.25t-.513.65l.625.25q.1-.275.263-.4t.412-.125q.3 0 .487.15t.188.425t-.213.45t-.512.175h-.325v.625h.375q.35 0 .588.2t.237.5q0 .275-.225.475t-.55.2q-.275 0-.512-.2t-.313-.5l-.625.275q.15.5.55.8t.9.3m3.55 0q.6 0 1.05-.437t.45-1.013t-.387-.987t-.913-.413q-.125 0-.45.1h-.025l.975-1.375l-.55-.375l-1.075 1.6q-.35.5-.462.8t-.113.625q0 .625.425 1.05T13.75 17m0-.65q-.35 0-.575-.225t-.225-.575q0-.2.1-.387t.3-.313q.075-.05.4-.1q.325 0 .563.238t.237.587q0 .325-.225.55t-.575.225M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>}
        />
        <CardCategory
          name="Electricidad"
          category_id={13}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="-1 -1 16 16"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4.122 5.698h5.756v1.55a2.878 2.878 0 1 1-5.756 0zm1.316 0V3.354m3.125 2.344V3.354"></path><path d="M7 10.125v2.125c0 .552.45 1.008.996.921A6.252 6.252 0 0 0 7 .75a6.25 6.25 0 0 0-3.125 11.664"></path></g></svg>}
        />
        <CardCategory 
          name="Música"
          category_id={14}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="-1 -1 50 50"><g fill="none" stroke="currentColor" strokeWidth={4}><path d="M24 44c11.046 0 20-8954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M26 14v14"></path><path fill="currentColor" strokeLinejoin="round" d="M14 28.666C14 26.64 15.934 25 18.32 25H26v4.334C26 31.36 24.066 33 21.68 33h-3.36C15.934 33 14 31.359 14 29.334z"></path><path strokeLinecap="round" strokeLinejoin="round" d="m32 15l-6-1"></path></g></svg>}
        />
        <CardCategory 
          name="Indumentaria"
          category_id={6}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 50 50"><path fill="currentColor" d="M47.36 14.75c.08.29-.021.61-.19.86l-5.39 8.02c-.2.31-.62.48-.971.48c-.1 0-.38-.02-.489-.05L36 23v19c0 .58-.41 1-1 1H14c-.59 0-1-.42-1-1V23l-3.88 1.07c-.45.14-.84-.04-1.09-.43l-5.35-8c-.17-.26-.22-.55-.14-.84c.07-.3.28-.5.55-.64L14 9h5c.59 0 1 .41 1 1c0 2.06 2.89 3.52 4.95 3.52S30 12.07 30 10c0-.58.41-1 1-1h5l10.8 5.06c.28.14.48.39.56.69"></path></svg>}
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
