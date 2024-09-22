import { GalleryImages } from "./GalleryImages"

export const GallerySection = () => {
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
                    <p className="d-inline-block border rounded-pill py-1 px-4">Galería</p>
                    <h2>Galería de Imagenes</h2>
                </div>
                <div className="">
                    <GalleryImages />
                </div>
            </div>
        </div>
    )
}
