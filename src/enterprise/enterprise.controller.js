import Enterprise from "./enterprise.model.js"
import Category from "../category/category.model.js"

export const createEnterprise = async (req, res) =>{
    try {
        const data = req.body

        const category = await Category.findById(data.category)

        if(!category){
            return res.status(400).json({
                succes: false,
                message: "Categoria no encontrada"
            })
        }

        const enterprise = await Enterprise.create(data);

        return res.status(200).json({
            succes: true,
            message: "Empresa agregada",
            enterprise
        })
        
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al agregar la empresa"
        })
    }
}

export const updateEnterprise = async (req, res) =>{
    try {
        const {eid} = req.params
        const data = req.body

        if(data.category!=null){
            const category = await Category.findById(data.category)
    
            if(!category){
                return res.status(400).json({
                    succes: false,
                    message: "Categoria no encontrada"
                })
            }
        }

        const enterprise = await Enterprise.findByIdAndUpdate(eid, data, {new: true})
    
        return res.status(200).json({
            succes: true,
            message: "Empresa actualizada",
            enterprise
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al actualizar la empresa"
        })
    }
}
        