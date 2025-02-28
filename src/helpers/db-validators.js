import Category from "../category/category.model.js"
import Enterprise from "../enterprise/enterprise.model.js"

export const categoryExist = async (name= "") => {
    const existe = await Category.findOne({name})
    if(existe){
        throw new Error(`The category ${name} already exists`)
    }
}

export const enterpriseExist = async (name= "") => {
    const existe = await Enterprise.findOne({name})
    if(existe){
        throw new Error(`The enterprise ${name} already exists`)
    }
}