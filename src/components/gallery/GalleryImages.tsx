import { useCallback, useEffect, useState } from "react";
import { Gallery, Image } from "react-grid-gallery";
import { ProductImage } from "@/types/products";
import ImageViewer from 'react-simple-image-viewer';
import './gallery.css'
import { Spinner } from "../spinner/Spinner";

export interface ImagesGalleryAuctions {
    src: string,
    width: number,
    height?: number,
    customOverlay: JSX.Element
}


export const GalleryImages = ({ images }: { images: ProductImage[] }) => {

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [imagesGallery, setImagesGallery] = useState<Image[]>([]);
    
    useEffect(() => {
        images.forEach(img => {
            if(!imagesGallery.find(images => images.src === img.url_image))
            setImagesGallery(state => ([...state, {
                src: img.url_image,
                width: 320,
                height: 0,
                customOverlay: <div className="custom-overlay__caption"></div>
            }]))})
    }, [])

    const openImageViewer = useCallback((index: any) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const handleSelect = (index: number) => {
        openImageViewer(index)
    };
    
    if(imagesGallery.length === 0) return <Spinner />
    if(imagesGallery.length > 0) return (
        <div>
            <Gallery images={imagesGallery} onClick={handleSelect} />

            {isViewerOpen && (
                <ImageViewer
                    src={imagesGallery.map(e => e.src)}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}
        </div>
    )
}