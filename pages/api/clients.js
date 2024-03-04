import connectToDatabase from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, phone } = req.body;

    // Підключення до бази даних
    const connection = await connectToDatabase();

    const [existingClientsByNameAndEmail] = await connection.execute(
      `SELECT * FROM clients WHERE name = ? OR email = ?`,
      [name, email],
    );
    console.log(existingClientsByNameAndEmail);

    const [existingClientsByNameAndPhone] = await connection.execute(
      `SELECT * FROM clients WHERE name = ? OR phone = ?`,
      [name, phone],
    );

    console.log(existingClientsByNameAndPhone);

    let clientId;
    if (existingClientsByNameAndEmail.length > 0) {
      const existingClient = existingClientsByNameAndEmail[0];
      clientId = existingClient.client_id;
      await connection.execute(
        `UPDATE clients SET name = ?, email = ?, phone = ? WHERE client_id = ?`,
        [name, email, phone, clientId],
      );
    } else if (existingClientsByNameAndPhone.length > 0) {
      const existingClient = existingClientsByNameAndPhone[0];
      clientId = existingClient.client_id;
      await connection.execute(
        `UPDATE clients SET name = ?, email = ?, phone = ? WHERE client_id = ?`,
        [name, email, phone, clientId],
      );
    } else {
      // Якщо клієнт не існує, додати нового
      const [result] = await connection.execute(
        `INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)`,
        [name, email, phone],
      );
      clientId = result.insertId;
    }

    connection.end();

    res.status(200).json({ client_id: clientId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
