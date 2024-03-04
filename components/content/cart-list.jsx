import { useEffect, useState } from "react";
import Image from "next/image";

export function CartList({
  cartItems,
  setTotalPrice,
  setCartItems,
  setMedicineInDb,
}) {
  const [medicineData, setMedicineData] = useState([]);

  useEffect(() => {
    const fetchMedicineData = async () => {
      if (cartItems.length === 0) {
        setMedicineData([]);
        setMedicineInDb([]);
      } else {
        try {
          const response = await fetch(
            `/api/medicineInCart?cartItems=${cartItems}`,
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
                id: med.medicine_id,
                src: medicineSrc,
                name: med.name,
                manufacturer: med.manufacturer,
                pharmacy: med.pharmacy_name,
                address: med.address,
                medInPhId: med.medicine_in_pharmacies_id,
                count: cartItems.filter(
                  (itemId) => itemId === med.medicine_in_pharmacies_id,
                ).length,
                price: med.price,
              };
            }),
          );

          setMedicineData(fetchedData);
          setMedicineInDb(fetchedData);
        } catch (error) {
          console.log("Error:", error);
        }
      }
    };

    fetchMedicineData();
  }, [cartItems]);

  const handleCountChange = (event, id) => {
    const newValue = event.target.value;

    let updatedData = [];
    if (newValue === "0") {
      updatedData = medicineData.filter((med) => med.id !== id);
      const updatedCartItems = updatedData.map((med) => med.medInPhId);
      setCartItems(updatedCartItems);
    } else {
      updatedData = medicineData.map((med) => {
        if (med.id === id) {
          return { ...med, count: newValue };
        }
        return med;
      });
    }
    setMedicineInDb(updatedData);
    setMedicineData(updatedData);
  };

  useEffect(() => {
    const totalPrice = medicineData.reduce(
      (accumulator, currentMed) =>
        accumulator + currentMed.price * currentMed.count,
      0,
    );
    setTotalPrice(totalPrice);
  }, [medicineData]);

  return (
    <div
      className="
        h-full bg-white rounded-3xl 
        border-[3px] border-green-900/20 
        shadow-xl shadow-green-900/20 w-full
        px-10 py-12
        "
    >
      <div className="flex flex-col gap-5 w-full max-h-full overflow-auto pr-5">
        {medicineData.map((med) => (
          <div
            key={med.id}
            className="border-[3px] border-green-900/20 rounded-xl flex items-start justify-between px-4 py-6"
          >
            <div className="flex-[0_0_45%]">
              <Image
                src={med.src}
                alt={med.name}
                className="h-[250px] w-auto mx-auto"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold mb-1">{med.name}</h3>
              <p className="text-lg text-slate-500/80 font-medium mb-6">
                {med.manufacturer}
              </p>
              <p className="text-wrap text-xl">{med.pharmacy}</p>
              <p className="text-md text-slate-500/80 mb-10">{med.address}</p>
              <div className="flex justify-between pr-5 items-end">
                <input
                  type="number"
                  name="count"
                  id="count"
                  value={med.count}
                  onChange={(e) => handleCountChange(e, med.id)}
                  className="border-[1px] border-green-900/20 text-2xl px-2 py-1 w-[120px]"
                  min="0"
                />
                <p className="text-xl font-semibold">
                  {med.price * med.count} грн.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
