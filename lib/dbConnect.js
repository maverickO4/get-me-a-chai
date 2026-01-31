//Production database connection
// import mongoose from "mongoose"
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb://localhost:27017/getmeachai`, {
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//     return conn;
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// }
// export { connectDB as dbConnect };


//Deployment database connection
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}


export {dbConnect };