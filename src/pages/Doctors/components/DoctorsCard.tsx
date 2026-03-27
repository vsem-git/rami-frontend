import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../Doctors";
import type { Doctor } from "../../../shared/types/doctor";

interface DoctorCardProps {
    doctor: Doctor;
    index: number;
    isClicked: boolean;
    onCardClick: (index: number) => void;
    className?: string;
}

export const DoctorsCard: React.FC<DoctorCardProps> = ({
    doctor,
    index,
    isClicked,
    onCardClick,
    className = "",
}) => {
    const navigate = useNavigate();

    // const specialtiesText = doctor.specialties.join(', ')
    const isActive = isClicked;

    const handleNavigate = () => {
        navigate(`/doctor/${doctor.id}`);
        onCardClick(index);
    };

    return (
        <div
            className={`group relative max-w-[448px] aspect-[448/598.4] overflow-hidden bg-cover bg-center cursor-pointer  bg-[linear-gradient(90deg,rgba(116,117,112,1)0%,rgba(166,167,164,1)50%,rgba(116,117,112,1)100%)] ${className}`}
            onClick={handleNavigate}
        >
            <video
                className={`absolute inset-0 z-10 w-full h-full object-cover saturate-0 opacity-0 transition-all duration-1000 ${
                    isActive ? "opacity-100" : "lg:group-hover:opacity-100"
                }`}
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
                poster={doctor.image}
            >
                <source
                    src={doctor.video.replace(".gif", ".webm")}
                    type="video/webm"
                />
                <source
                    src={doctor.video.replace(".gif", ".mp4")}
                    type="video/mp4"
                />
            </video>

            {doctor.shadow && (
                <img
                    src={doctor.shadow}
                    alt="shadow"
                    className="scale-70 blur-2xl absolute"
                />
            )}
            <img
                src={doctor.image as string}
                alt="man"
                className={`${doctor.isSpecialites ? "w-full h-full object-cover object-top" : ""} ${
                    index === 0 ? "scale-90" : index === 1 ? "scale-90" : ""
                }`}
            />
            <div
                className={`absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-all duration-1000 ${
                    isActive ? "opacity-100" : "lg:group-hover:opacity-100"
                }`}
            />

            <div
                className={`absolute inset-0 transition-all duration-1000 ${
                    isActive
                        ? "opacity-100"
                        : "lg:opacity-0 lg:group-hover:opacity-100"
                }`}
            >
                <div className="relative h-full flex flex-col items-center justify-end text-center">
                    <button className="absolute top-2 right-2 p-2 md:p-4 bg-[#691C32]">
                        <PlusIcon className="text-white" />
                    </button>

                    {/* <p className="uppercase text-sm text-white mb-2">
                        {doctor.lastName}
                        <br />
                        {doctor.firstName}
                    </p>

                    <p className="text-white text-xs uppercase mb-6 px-4">
                        {specialtiesText}
                    </p> */}
                </div>
            </div>
        </div>
    );
};
