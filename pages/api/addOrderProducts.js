import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { order_id, medicines } = req.body;

    const connection = await connectToDatabase();

    for (const medicine of medicines) {
      await connection.execute(
        `INSERT INTO medicineinorders (order_id, medicine_id, count_product) VALUES (?, ?, ?)`,
        [order_id, medicine.medicine_id, medicine.count_product],
      );
    }

    connection.end();

    res.status(200).json({ message: "Order products added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
