import React from "react";

export function CartForm({ setUserInfo, userInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div
      className="
          h-full bg-white rounded-3xl 
          border-[3px] border-green-900/20 
          shadow-xl shadow-green-900/20 w-full
          px-4 py-6
          "
    >
      <div className="h-full flex px-4 py-8 flex-col items-center justify-between">
        <label
          htmlFor="name"
          className="text-3xl text-green-900 w-11/12 text-left"
        >
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={userInfo.name}
          onChange={handleChange}
          className="w-11/12 border-[2px] border-green-900/20 rounded-lg text-2xl px-4 py-3 text-green-950"
        />
        <label
          htmlFor="email"
          className="text-3xl text-green-900 w-11/12 text-left"
        >
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={userInfo.email}
          onChange={handleChange}
          className="w-11/12 border-[2px] border-green-900/20 rounded-lg text-2xl px-4 py-3 text-green-950"
        />
        <label
          htmlFor="phone"
          className="text-3xl text-green-900 w-11/12 text-left"
        >
          Phone:
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={userInfo.phone}
          onChange={handleChange}
          className="w-11/12 border-[2px] border-green-900/20 rounded-lg text-2xl px-4 py-3 text-green-950"
        />
        <label
          htmlFor="address"
          className="text-3xl text-green-900 w-11/12 text-left"
        >
          Address:
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={userInfo.address}
          onChange={handleChange}
          className="w-11/12 border-[2px] border-green-900/20 rounded-lg text-2xl px-4 py-3 text-green-950"
        />
      </div>
    </div>
  );
}
