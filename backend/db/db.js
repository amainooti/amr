import mongoose from "mongoose"

export const connectDb = async (mongoDBURI) => {
    try {
        const conn = await mongoose.connect(mongoDBURI);
        console.log("Connect to MongoDB "+ conn.connections[0].host)

    } catch (error) {
        console.error("Error connecting to MongoDB "+ conn.connections[0].host)
    }
}

