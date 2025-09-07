import { motion, MotionValue } from "framer-motion";
import React, { useState } from "react";
import MenuSVG from '@/assets/icon-menu.svg?react';
import LogoSVG from "@/assets/logo.svg?react";

interface HeaderProps {
  textColor: MotionValue<string>;
}

export const Header = ({ textColor }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-[40px] py-[16px] z-50">
      <HoverUnderline label="Меню" Icon={MenuSVG} textColor={textColor} />

      <LogoSVG style={{ fill: textColor }} className="h-[120px] w-[149px]" />

      <HoverUnderline label="Запланировать визит" textColor={textColor} />
    </header>
  );
}

interface HoverUnderlineProps {
  label: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  textColor: MotionValue<string>;
}

const HoverUnderline: React.FC<HoverUnderlineProps> = ({ label, Icon, textColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center cursor-pointer min-w-[188px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Иконка SVG */}
      {Icon && <Icon style={{ fill: textColor }} className="h-[32px] mr-[16px]" />}

      {/* Контейнер только для текста */}
      <div className="relative">
        <motion.span className="uppercase tracking-wide text-sm py-[12px]" style={{ color: textColor }}>{label}</motion.span>
        <motion.div
          className="h-[1px] bg-black absolute left-0 -bottom-[5px]"
          initial={{ width: 0 }}
          animate={{ width: hovered ? "100%" : 0 }}
          transition={{ duration: 0.4 }}
          style={{ backgroundColor: textColor }}
        />
      </div>
    </div>
  );
};
