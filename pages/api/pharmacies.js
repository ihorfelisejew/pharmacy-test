import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute("SELECT * FROM pharmacies");
    connection.end();

    res.status(200).json({ pharmacies: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
