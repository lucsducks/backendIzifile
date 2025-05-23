const mongoose = require("mongoose");
const Role = require("../models/role");

const MONGODB_CNN =
  process.env.MONGODB_CNN || "mongodb://localhost:27017/izifile";

const initRoles = async () => {
  try {
    await mongoose.connect(MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const roles = ["ADMIN_ROLE", "USER_ROLE", "DEV_ROLE"];

    for (const rol of roles) {
      const exists = await Role.findOne({ rol });
      if (!exists) {
        await new Role({ rol }).save();
        console.log(`✅ Rol '${rol}' creado.`);
      }
    }

    console.log("✅ Inicialización de roles completa.");
    process.exit();
  } catch (err) {
    console.error("❌ Error al inicializar roles:", err);
    process.exit(1);
  }
};

initRoles();
