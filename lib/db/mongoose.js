import mongoose from "mongoose";

let isConnected = false;

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    //console.log("Conexión a MongoDB establecida correctamente");
    isConnected = true; // Establecer la bandera de conexión
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error; // Re-lanzar el error para que el código que llama pueda manejarlo
  }
};

export const disconnectMongo = async () => {
  try {
    await mongoose.disconnect();
    console.log("Conexión a MongoDB cerrada correctamente");
    isConnected = false; // Resetear la bandera de conexión
  } catch (error) {
    console.error("Error al desconectar de MongoDB:", error);
    throw error; // Re-lanzar el error para que el código que llama pueda manejarlo
  }
};

export const isMongoConnected = () => {
  return isConnected; // Devolver el valor actual de la bandera de conexión
};
