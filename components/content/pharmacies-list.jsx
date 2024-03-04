import clsx from "clsx";
import { useEffect, useState } from "react";

export function PharmaciesList({ setPharmacyId, selectedPharmacy }) {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Викликати API маршрут для отримання списку аптек при завантаженні сторінки
    fetch("/api/pharmacies")
      .then((response) => response.json())
      .then((data) => {
        setPharmacies(data.pharmacies);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div
      className="
    h-full bg-white rounded-3xl 
    border-[3px] border-green-900/20 
    shadow-xl shadow-green-900/20
  "
    >
      <div className="w-full flex h-20 items-center justify-center">
        <h1 className="text-3xl text-green-900 font-semibold tracking-wider">
          Аптеки
        </h1>
      </div>
      <div className="max-h-full px-5 py-6">
        <div className="max-h-[620px] flex items-center justify-start gap-4 flex-col overflow-y-auto ::-webkit-scrollbar">
          {pharmacies.map((pharmacy, index) => (
            <button
              key={index}
              className={clsx(
                "w-11/12 rounded-xl border-[3px] border-green-900/20 px-4 py-2 align text-start",
                selectedPharmacy === pharmacy.pharmacy_id && "bg-green-200/15",
              )}
              onClick={() => setPharmacyId(pharmacy.pharmacy_id)}
            >
              <h2 className="text-2xl font-medium mb-2 text-green-900">
                {pharmacy.pharmacy_name}
              </h2>
              <p className="text-wrap text-green-900">{pharmacy.address}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
