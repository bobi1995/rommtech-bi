import React, { useState } from "react";

// MenuItem Component
interface MenuItemProps {
  label: string;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="px-4 py-2 text-gray-300 hover:bg-main-menu_dark hover:text-white ">
      <div className="flex items-center" onClick={toggleSubMenu}>
        <span className="mr-2 cursor-pointer">{label}</span>
        {children && (
          <button className="focus:outline-none cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-auto ${
                isOpen ? "transform rotate-90" : ""
              }`}
              viewBox="0 0 20 20"
            >
              <path fill="currentColor" d="M10 12l-4-4h8z" />
            </svg>
          </button>
        )}
      </div>
      {isOpen && <ul className="pl-8">{children}</ul>}
    </li>
  );
};

// MenuBar Component
const MenuBar: React.FC = () => {
  return (
    <div className="h-full min-h-screen bg-main-menu min-w-48 mt-3 last:ml-3 mr-3 rounded-xl">
      {/* Sidebar */}
      <div>
        <div className="flex items-center justify-between p-4">
          <span className="text-white text-lg font-semibold">Меню</span>
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M5 6h14M5 12h14M5 18h14" />
            </svg>
          </button>
        </div>

        {/* Main Menu Items */}
        <ul className="mt-2">
          <MenuItem label="Поръчки">
            <MenuItem label="Норма" />
            <MenuItem label="Завършени" />
          </MenuItem>

          <MenuItem label="Брак">
            <MenuItem label="Sub Item 1" />
            <MenuItem label="Sub Item 2" />
          </MenuItem>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
