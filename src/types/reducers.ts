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

