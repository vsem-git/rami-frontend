// import { motion, useAnimation, type Variants } from "framer-motion";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useState } from "react";

const menuItems = ["Titli", "О нас", "Услуги", "Резиденция", "Контакты"];

// Анимация для букв
const letterVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 5,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export const SlideBar = () => {
  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-[10px] z-40 px-[40px]">
      {menuItems.map((item, idx) => (
        <MenuItem key={idx} label={item} />
      ))}
    </nav>
  );
};

function MenuItem({ label }: { label: string }) {
  const controls = useAnimation(); // для полосы
  const [hovered, setHovered] = useState(false); // состояние наведения

  const handleHoverStart = async () => {
    setHovered(true);
    await controls.start({ width: 64, transition: { duration: 0.4 } }); // расширение полосы
    controls.start({ width: 32, transition: { duration: 0.4 } }); // возврат
  };

  const handleHoverEnd = () => {
    setHovered(false);
  };

  return (
    <div
      className="flex items-center cursor-pointer h-12 gap-[10px]"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Полоса */}
      <div className="py-[5px] h-[25px] flex items-center">
        <motion.div
          animate={controls}
          initial={{ width: 32 }}
          className="bg-black rounded"
          style={{ height: "1px", backgroundColor: "black" }}
        />
      </div>

      {/* Текст */}
      <div className="ml-3 overflow-hidden flex h-[25px]">
        {label.split("").map((char, idx, arr) => (
          <motion.span
            key={idx}
            custom={hovered ? idx : arr.length - 1 - idx} // обратная анимация при уходе
            initial="hidden"
            animate={hovered ? "visible" : "hidden"}
            variants={letterVariants}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
