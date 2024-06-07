import { ImageProfile } from "./user";

export interface Image {
    path: string;
    lastModified: number;
    lastModifiedDate: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
    default?: boolean;
}

export interface StateImagesProfile {
    imageSelected: Image | null,
    images: Image[]
}

export interface ImageProfileState {
    imageProfileSelected: null | ImageProfile,
    images: ImageProfile[],
    imagesToDelete: number[];
}