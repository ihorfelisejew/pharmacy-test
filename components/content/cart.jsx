import { CartForm } from "./cart-form";
import { CartList } from "./cart-list";
import { useState, useEffect } from "react";

export function Cart({ cartItems, setCartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [medicineInDb, setMedicineInDb] = useState([]);
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo
      ? JSON.parse(storedUserInfo)
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const handleBuyClick = async (event) => {
    event.preventDefault();

    try {
      // Отримання або створення користувача
      const userResponse = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
        }),
      });
      if (!userResponse.ok) {
        throw new Error("Failed to create or update user");
      }
      const userData = await userResponse.json();
      const clientId = userData.client_id;

      // Створення замовлення
      const orderResponse = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date_of_order: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          client_id: clientId,
          delivery_address: userInfo.address,
        }),
      });
      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }
      const orderData = await orderResponse.json();
      const orderId = orderData.order_id;

      // Створення записів про продукти
      const productsResponse = await fetch("/api/addOrderProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          medicines: medicineInDb.map((product) => ({
            medicine_id: product.medInPhId,
            count_product: product.count,
          })),
        }),
      });
      if (!productsResponse.ok) {
        throw new Error("Failed to create order products");
      }

      // Очищення стану корзини та інформації про користувача після успішного замовлення
      setCartItems([]);
      setMedicineInDb([]);
      setUserInfo({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      console.log("Order created successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="h-full bg-green-200/15 px-10 pt-10">
      <div className="flex items-center justify-between gap-[30px] h-[650px]">
        <CartForm setUserInfo={setUserInfo} userInfo={userInfo} />
        <CartList
          cartItems={cartItems}
          setTotalPrice={setTotalPrice}
          setCartItems={setCartItems}
          setMedicineInDb={setMedicineInDb}
        />
      </div>
      <div className=" py-10 flex justify-end gap-16 items-center pr-14">
        <h3 className="text-3xl font-semibold">
          Total Price: {totalPrice.toFixed(2)} &#8372;
        </h3>
        <button
          onClick={(e) => handleBuyClick(e)}
          type="submit"
          className="text-2xl font-semibold rounded-xl bg-white border-[3px] border-green-900/20 px-10 py-3 transition-colors hover:bg-green-900/10"
        >
          Купити
        </button>
      </div>
    </form>
  );
}
