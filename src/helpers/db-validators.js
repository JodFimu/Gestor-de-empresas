import Category from "../category/category.model.js"

export const categoryExist = async (name= "") => {
    const existe = await Category.findOne({name})
    if(existe){
        throw new Error(`The category ${name} already exists`)
    }
}