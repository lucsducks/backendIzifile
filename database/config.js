const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGODB_CNN);

    console.log("✅ Base de datos online");
  } catch (error) {
    console.error("❌", error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
