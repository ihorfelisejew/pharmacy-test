import mysql from "mysql2/promise";

// Функція для підключення до бази даних
export default async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "felisejew",
      password: "feliks1701",
      database: "pharmacies",
    });

    return connection;
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    throw error;
  }
}
