import mongoose from "mongoose"

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//   throw new Error("MONGODB_URI is not defined in .env.local")
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// export async function dbConnect() {
//   if (cached.conn) return cached.conn

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI)
//   }

//   cached.conn = await cached.promise
//   return cached.conn
// }

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/getmeachai`, {
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export { connectDB as dbConnect };