import { motion } from "framer-motion";
import React, { useState } from "react";

export const Header = () => {
    return (
        
        <header className="fixed top-0 left-0 w-full flex justify-between items-center px-[40px] py-[16px] z-50">
        {/* Left menu */}
        {/* <div className="relative group cursor-pointer">
          <div className="flex items-center gap-[16px]">
            <img src="src/assets/icon-menu.png" alt="Menu" className="h-[32px]" />
            <div>
                <span className="uppercase tracking-wide text-sm py-[12px]">Меню</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="h-[1px] bg-black absolute left-0 -bottom-1"
                  style={{ height: "1px", backgroundColor: "black" }}
                />
            </div>
          </div>
          
        </div> */}
        <HoverUnderline label="Меню" icon="src/assets/icon-menu.png" />

        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src="src/assets/logo.png" alt="Logo" className="h-[120px]" />
        </div>

        {/* Right button */}
        {/* <div className="relative group cursor-pointer">
          <span className="uppercase tracking-wide text-sm py-[12px]">
            Запланировать визит
          </span>
          <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            className="h-[1px] bg-black absolute left-0 -bottom-1"
          />
        </div> */}

        <HoverUnderline label="Запланировать визит" />
      </header>
      );
}

interface HoverUnderlineProps {
  label: string;
  icon?: string;
}

// const HoverUnderline: React.FC<HoverUnderlineProps> = ({ label, icon }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative flex items-center cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {icon && <img src={icon} alt={label} className="h-[32px] mr-2" />}
//       <span className="uppercase tracking-wide text-sm py-[12px]">{label}</span>

//       {/* Полоса */}
//       <motion.div
//         className="h-[1px] bg-black absolute left-0 -bottom-1"
//         initial={{ width: 0 }}
//         animate={{ width: hovered ? "100%" : 0 }}
//         transition={{ duration: 0.4 }}
//         style={{ backgroundColor: "black" }}
//       />
//     </div>
//   );
// };


interface HoverUnderlineProps {
  label: string;
  icon?: string;
}

const HoverUnderline: React.FC<HoverUnderlineProps> = ({ label, icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center cursor-pointer min-w-[188px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && <img src={icon} alt={label} className="h-[32px] mr-[16px]" />}

      {/* Контейнер только для текста */}
      <div className="relative">
        <span className="uppercase tracking-wide text-sm py-[12px]">{label}</span>
        <motion.div
          className="h-[1px] bg-black absolute left-0 -bottom-[5px]"
          initial={{ width: 0 }}
          animate={{ width: hovered ? "100%" : 0 }}
          transition={{ duration: 0.4 }}
          style={{ backgroundColor: "black" }}
        />
      </div>
    </div>
  );
};
