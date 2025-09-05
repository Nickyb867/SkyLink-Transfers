import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (process.env.ADMIN_KEY && req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB || "skylink");
  const col = db.collection("bookings");

  if (req.method === "GET") {
    const bookings = await col.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json({ bookings });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await col.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ message: "Method not allowed" });
}

