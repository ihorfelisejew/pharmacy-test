import { useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";

export default function HomePage() {
  const [selectedMenu, setSelectedMenu] = useState(1);

  return (
    <div className="flex flex-col justify-between h-screen font-arial">
      <Header setSelectedMenu={setSelectedMenu} />
      <Content selectedMenu={selectedMenu} />
    </div>
  );
}
