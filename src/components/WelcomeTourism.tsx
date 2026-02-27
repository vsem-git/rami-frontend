import { usePopup } from "./PopupContext";

export const WelcomeTourism = () => {
    const { openPopup } = usePopup();

    return (
        <div className="relative h-[1600px] w-full">
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-[url('tourism/welcome.webp')] grayscale"></div>

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center pt-[180px]">
                <h4 className="text-base font-normal text-[#EAE6E0] uppercase leading-[20px]">
                    медтуризм
                </h4>
                <h1 className="text-[48px] uppercase text-[#EAE6E0] max-w-[1212px]">
                    Санкт-Петербург идеально соединяет туризм международного
                    уровня и медицину эталонного качества
                </h1>

                <img
                    src="tourism/3.2.webp"
                    alt=""
                    className="w-[473px] h-[580px] mt-10"
                />

                <p className="text-[32px] text-[#EAE6E0] uppercase leading-[125%] max-w-[1042px] mt-8">
                    Персональный медицинский туризм: от первой консультации до
                    полного восстановления с комфортом премиум-класса
                </p>

                <button
                    className="relative text-base font-semibold text-[#EAE6E0] uppercase cursor-pointer px-1 flex items-center gap-2 group mt-6"
                    onClick={() => openPopup("contact")}
                >
                    <span className="relative">
                        Получить индивидуальный план лечения
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE6E0] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <img
                        src="/plus.svg"
                        alt=""
                        className="inline-block -mt-1"
                        style={{
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                </button>
            </div>

            <img
                src="tourism/Vector (12).webp"
                alt=""
                className="absolute top-0 right-0"
            />
            <img
                src="tourism/Vector (13).webp"
                alt=""
                className="absolute bottom-0 left-0"
            />
        </div>
    );
};
