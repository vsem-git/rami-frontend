import type { Doctor } from "../../../shared/types/doctor";

const DoctorsCardInfo = ({
    doctor,
    className = "",
}: {
    doctor: Doctor;
    className?: string;
}) => (
    // Убрали h-full, добавили py-0 (или минимальный), чтобы контролировать отступ через родителя
    <div className={`flex flex-col justify-center ${className}`}>
        <h3 className="uppercase text-[14px] 2xl:text-[22px] font-bold text-[#1D1D1D] leading-[1.1]">
            {doctor.lastName} <br /> {doctor.firstName}
        </h3>
        {doctor.specialties.map((el: string) => (
            <p className="text-[10px] 2xl:text-sm uppercase text-[#1D1D1D80] mt-1">
                {el}
            </p>
        ))}
    </div>
);

export default DoctorsCardInfo;
