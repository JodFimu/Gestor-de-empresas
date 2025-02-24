import User from "../src/user/user.model.js"
import {hash} from "argon2"

export const createAdmin = async () => {
    try {
      const aEmail = "admin@gmail.com"
      const aPassword = "Adm123456*/"
 
      const existingAdmin = await User.findOne({ email: aEmail })

      if (!existingAdmin) {
        const encryptedPassword = await hash(aPassword);
 
        const aUser = new User({
            username: "admin",
            email: aEmail,
            password: encryptedPassword,
            role: "ADMIN_ROLE",
        });
 
        await aUser.save()
        console.log("El admin por defecto se ha creado exitosamente")
 
      } else {
        console.log("Admin ya creado")
      }
    } catch (err) {
      console.error("Error al crear el admin por defecto:", err)
    }
};