// lib/mongoose.js
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used to preserve the connection across hot reloads in development.
 * This prevents opening new connections on every file change.
 */
let cached = global.__mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  global.__mongoose = cached;
}

async function connectMongoose() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // other options can be added here
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectMongoose, mongoose };
