import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const connection = await connectToDatabase();

    const pharmacyId = req.query.pharmacyId;
    const [rows, fields] = await connection.execute(
      `SELECT m.*, mip.medicine_in_pharmacies_id 
        FROM medicine m
        JOIN medicineinpharmacies mip ON m.medicine_id = mip.medicine_id
        JOIN pharmacies p ON mip.pharmacy_id = p.pharmacy_id
        WHERE p.pharmacy_id = ?`,
      [pharmacyId],
    );

    connection.end();

    // Перевірити, чи є доступні ліки для цієї аптеки
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Medicine not available in this pharmacy" });
    }

    res.status(200).json({ medicine: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
