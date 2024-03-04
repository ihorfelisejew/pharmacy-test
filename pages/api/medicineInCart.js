import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const connection = await connectToDatabase();

    const cartItems = req.query.cartItems; // Припускаю, що це буде рядок, розділений комами, наприклад: "1,2,3"
    const cartItemsArray = cartItems.split(",").map((item) => parseInt(item)); // Перетворення рядка у масив чисел

    if (!Array.isArray(cartItemsArray) || cartItemsArray.some(isNaN)) {
      return res.status(400).json({ message: "Invalid cart items data" });
    }

    const placeholders = cartItemsArray.map(() => "?").join(",");
    const [rows, fields] = await connection.execute(
      `SELECT m.*, p.*, mip.medicine_in_pharmacies_id
        FROM medicine m
        JOIN medicineinpharmacies mip ON m.medicine_id = mip.medicine_id
        JOIN pharmacies p ON mip.pharmacy_id = p.pharmacy_id
        WHERE mip.medicine_in_pharmacies_id IN (${placeholders})`,
      cartItemsArray,
    );

    connection.end();

    // Перевірити, чи є доступні ліки для цих ідентифікаторів
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No medicine found for the provided cart items" });
    }

    res.status(200).json({ medicine: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
