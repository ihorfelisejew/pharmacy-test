import { MedicineList } from "./medicine-list";
import { PharmaciesList } from "./pharmacies-list";
import { useState } from "react";

export function Pharmacies({ addToCart }) {
  const [pharmacyId, setPharmacyId] = useState(1);

  return (
    <div className="h-full bg-green-200/15 grid grid-cols-[1fr,_3fr] gap-[30px] px-10 py-10">
      <PharmaciesList
        setPharmacyId={setPharmacyId}
        selectedPharmacy={pharmacyId}
      />
      <MedicineList pharmacyId={pharmacyId} addToCart={addToCart} />
    </div>
  );
}
