import { ImageUpdatingReducer } from "@/reducers/imageUpdatingReducer"
import { CategoryItem } from "@/types/category"
import { ItemProductSearchResponse } from "@/types/products"


export const findCategoriesByIds = (
    categories: CategoryItem[],
    catId: number,
    subCatId: number
): { category: string, subcategory: string } => {
    const cat = categories.filter(c => c.id === catId)
    const subcat = cat[0]?.subcategories && cat[0].subcategories.filter(subc => subc.id === subCatId)
    return {
        category: cat[0]?.name || '',
        subcategory: subcat ? (subcat[0]?.name || '') : ''
    }
}

export const getIdProductImageFolder = (url: string): string => {
    const urlParts = url.split('pd')
    return urlParts[0].split('ty')[3]
}

export const formProduct = (productSelected: ItemProductSearchResponse) => ({
    title: productSelected.name || "",
    category: productSelected.category_id || 0,
    sub_category: productSelected.sub_category_id || 0,
    description: productSelected.id && productSelected.product_variations[0].description || "",
    price: productSelected.id && productSelected.product_variations[0].price || 0,
    quantity: productSelected.id && productSelected.product_variations[0].stocks.quantity || 0,
    request_audit: true,
    images: []
})

export const createObjProductUpdating = (
    productSelected: ItemProductSearchResponse,
    values: any,
    imageUpdatingState: ImageUpdatingReducer,
    initialStateUpdtProduct: any,
    isAdmin: boolean
) => {
    let user_id = productSelected.supplier_products && productSelected.supplier_products[0].supplier.auth_user.id
    let product: any = {
        product_id: productSelected.id,
        product_variation_id: productSelected.product_variations[0].id,
        ...user_id && { user_id }
    }
    const test = imageUpdatingState.imagesToSend.find(image => !image.id || image.delete)
    {
        Object.keys(initialStateUpdtProduct).forEach((key: any) => {
            // console.log(initialStateUpdtProduct[key], values[key])
            if (initialStateUpdtProduct[key] === values[key]) return
            if (key === 'description' || key === 'title') {
                product = { ...product, [`product_${key}`]: values[key], [`variation_${key}`]: values[key] }
            } else {
                product = { ...product, [key]: values[key] }
            }
        })
    }
    // console.log(product)

    if (test) product = { ...product, images: imageUpdatingState.imagesToSend }
    if (isAdmin) {
        if (Object.keys(product).length === 3 && !test) return false
    } else {
        if (Object.keys(product).length === 2 && !test) return false
    }
    return product
}