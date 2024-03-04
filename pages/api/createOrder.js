import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { date_of_order, client_id, delivery_address } = req.body;

    const connection = await connectToDatabase();

    const [result] = await connection.execute(
      `INSERT INTO orders (date_of_order, client_id, delivery_address) VALUES (?, ?, ?)`,
      [date_of_order, client_id, delivery_address],
    );

    connection.end();

    res.status(200).json({ order_id: result.insertId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
