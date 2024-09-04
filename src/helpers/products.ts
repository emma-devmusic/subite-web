import { CategoryItem } from "@/types/category"

export const findCategoriesByIds = (
    categories: CategoryItem[],
    catId: number,
    subCatId: number
): { category: string, subcategory: string } => {
    const cat = categories.filter(c => c.id === catId)
    const subcat = cat[0].subcategories && cat[0].subcategories.filter(subc => subc.id === subCatId)
    return {
        category: cat[0].name,
        subcategory: subcat ? subcat[0].name : ''
    }
}