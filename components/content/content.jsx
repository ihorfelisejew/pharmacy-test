import { useState } from "react";
import { Cart } from "./cart";
import { Pharmacies } from "./pharmacies";

export function Content({ selectedMenu }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <>
      {selectedMenu === 1 && <Pharmacies addToCart={addToCart} />}
      {selectedMenu === 2 && (
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      )}
    </>
  );
}
