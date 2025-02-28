import Enterprise from "./enterprise.model.js"
import Category from "../category/category.model.js"
import Exceljs from "exceljs"
import path from 'path';
import fs from 'fs';


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

export const generateReport = async (req,res) => {
    try{
        const { minYears, maxYears, category, sort, minRate, maxRate } = req.body;
        const filter = {};

        if (minYears || maxYears) {
            filter.years = {};
            if (minYears) filter.years.$gte = Number(minYears);
            if (maxYears) filter.years.$lte = Number(maxYears);
        }

        if (minRate || maxRate) {
            filter.rate = {};
            if (minRate) filter.rate.$gte = Number(minRate);
            if (maxRate) filter.rate.$lte = Number(maxRate);
        }
 
        if (category) {
            filter.category = category;
        }
 
        const sortOption = {};

        if (sort === 'az') {
            sortOption.name = 1;
        } else if (sort === 'za') {
            sortOption.name = -1;
        }

        const enterprises = await Enterprise.find(filter)
            .sort(sortOption)
            .populate("category", "name");
        
        const workbook = new Exceljs.Workbook()
        const worksheet = workbook.addWorksheet("Empresas")
     
        worksheet.columns = [
            {header: "Nombre", key: "name", width: 35},
            {header: "Descripcion", key: "description", width: 35},
            {header: "Calificacion", key: "rate", width: 35},
            {header: "Categoria", key: "category", width: 35},
            {header: "Año de fundacion", key: "fundationYear", width: 35},
            {header: "Años de experiencia", key: "years", width: 35}
        ];
     
        enterprises.forEach(enterprise => {
            worksheet.addRow({
                name: enterprise.name,
                description: enterprise.description,
                rate: enterprise.rate,
                category: enterprise.category?.name || "No tiene categoria",
                fundationYear: enterprise.fundationYear,
                years: enterprise.years
            })
        });
     
        const directoryPath = path.join(path.resolve(), "../gestor-de-empresas/public/reports");
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const dateNow = new Date();
        
        const date = dateNow.toISOString()
            .replace(/T/, '-')
            .replace(/\..+/, '')
            .replace(/:/g, '-');
        const filePath = path.join(directoryPath, `Enterprises_${date}.xlsx`);

        await workbook.xlsx.writeFile(filePath);
     
        return res.status(200).json({
            success: true,
            message: "Companies successfully filtered",
            enterprises
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error filtering companies",
            error: err.message
        });
    }
}
        