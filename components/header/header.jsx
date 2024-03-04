import clsx from "clsx";
import { useState } from "react";

export function Header({ setSelectedMenu }) {
  const [underlinedMenu, setUnderlinedMenu] = useState(1);

  const MENU_LINKS = ["Аптеки", "Корзина"];

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setUnderlinedMenu(menu);
  };

  return (
    <header className="flex min-h-20 items-center px-8 bg-white shadow-md justify-start">
      <nav className="text-2xl ml-10">
        <ul className="flex items-center gap-10">
          {MENU_LINKS.map((menuLink, index) => {
            return (
              <li key={index}>
                <a
                  href="#"
                  className={clsx(
                    "transition-colors hover:underline hover:text-green-900 ",
                    underlinedMenu - 1 === index && "underline text-green-900",
                  )}
                  onClick={() => handleMenuClick(index + 1)}
                >
                  {menuLink}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
