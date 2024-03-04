import Image from "next/image";
import { useEffect, useState } from "react";

export function MedicineList({ pharmacyId, addToCart }) {
  const [medicineData, setMedicineData] = useState([]);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const response = await fetch(
          `/api/medicineInPharmacy?pharmacyId=${pharmacyId}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const fetchedData = await Promise.all(
          data.medicine.map(async (med) => {
            const medicineImageSrc = await import(
              `./medicine/medicine_${med.medicine_id}.jpg`
            );
            const medicineSrc = medicineImageSrc.default;
            return {
              id: med.medicine_in_pharmacies_id,
              src: medicineSrc,
              name: med.name,
              manufacturer: med.manufacturer,
            };
          }),
        );

        setMedicineData(fetchedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMedicineData();
  }, [pharmacyId]);

  return (
    <div
      className="h-full bg-white rounded-3xl py-6 px-8
    border-[3px] border-green-900/20 
    shadow-xl shadow-green-900/20"
    >
      <h1 className="text-3xl text-green-900 font-semibold mb-4 tracking-wide">
        Список ліків доступних у вашій аптеці
      </h1>
      <div className="grid grid-cols-3 items-center gap-6 justify-between w-full max-h-[660px] overflow-auto pr-5">
        {medicineData.map((med, index) => (
          <div
            key={index}
            className="border-[3px] border-green-900/20 rounded-md"
          >
            <Image
              src={med.src}
              alt={med.name}
              className="h-[250px] w-auto mx-auto"
            />
            <div className="flex justify-between items-end px-3 py-2 gap-2 pb-3">
              <div className="flex gap flex-col">
                <h3 className="font-medium text-lg text-green-950/95">
                  {med.name}
                </h3>
                <p className="text-md text-slate-500/80 font-medium">
                  {med.manufacturer}
                </p>
              </div>
              <button
                className="
                    px-3 py-[6px] text-green-950/95
                    border-[3px] border-green-900/10 rounded-md transition-colors 
                    hover:border-green-900/30 hover:bg-green-900/10
                "
                onClick={() => addToCart(med.id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
