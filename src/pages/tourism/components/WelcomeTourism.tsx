import { usePopup } from "../../../components/PopupContext";

export const WelcomeTourism = () => {
    const { openPopup } = usePopup();

    return (
        <div className="relative max-[600px]:h-[700px] h-[780px] md:h-[980px] lg:h-[1200px] 2xl:h-[1600px] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-[url('/tourism/welcome.webp')] grayscale scale-140 md:scale-[2] max-[600px]:bg-[45%_6rem] bg-[18%_6rem] md:bg-[15%_15rem] lg:bg-[0%_0%] lg:scale-100"
                style={{ filter: "grayscale(100%)" }}
            ></div>

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center pt-[6rem] md:pt-[7rem] 2xl:pt-[180px] px-4 md:px-6">
                <h4 className="max-[600px]:text-xs text-base font-normal text-[#EAE6E0] uppercase leading-[20px] max-[600px]:mb-2 mb-[30px] md:mb-2" data-content-hint="tourism.welcome.label">медтуризм</h4>
                <h1 className="max-[600px]:text-xl text-2xl md:text-[32px] 2xl:text-[48px] uppercase text-[#EAE6E0] max-w-[944px] 2xl:max-w-[1212px]" data-content-hint="tourism.welcome.title">Санкт-Петербург идеально соединяет туризм международного уровня и медицину эталонного качества</h1>

                <img
                    src="tourism/3.2.webp"
                    alt=""
                    className="max-[600px]:w-[163px] w-[212px] md:w-[245px] lg:w-[370px] 2xl:w-[473px] max-[600px]:h-[200px] h-[260px] md:h-[300px] lg:h-[450px] 2xl:h-[580px] max-[600px]:mt-8 mt-10"
                />

                <p className="max-[600px]:text-sm text-lg md:text-2xl 2xl:text-[32px] text-[#EAE6E0] uppercase leading-[125%] max-w-[612px] lg:max-w-[900px] 2xl:max-w-[1042px] max-[600px]:mt-4 mt-8" data-content-hint="tourism.welcome.description">Персональный медицинский туризм: от первой консультации до полного восстановления с комфортом премиум-класса</p>

                <button
                    className="relative max-[400px]:text-[11px] max-[600px]:text-xs text-sm 2xl:text-base font-semibold text-[#EAE6E0] uppercase cursor-pointer px-1 flex items-center gap-2 group mt-4 lg:mt-6"
                    onClick={() => openPopup("contact")}
                >
                    <span className="relative">
                        Получить индивидуальный план лечения
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE6E0] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <img
                        src="/plus.svg"
                        alt=""
                        className="inline-block -mt-1 max-[600px]:hidden"
                        style={{
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                    <img
                        src="/plus-up.svg"
                        alt=""
                        className="-mt-1 max-[600px]:w-5 hidden max-[600px]:block"
                        style={{
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                </button>
            </div>

            <img
                src="tourism/Vector (12).webp"
                alt=""
                className="absolute  top-0 -right-5 h-[500px] 2xl:w-auto hidden 2xl:block"
            />
            <img
                src="tourism/Vector (13).webp"
                alt=""
                className="absolute -bottom-20 2xl:-bottom-10 -left-10 2xl:left-0 h-[700px] 2xl:w-auto hidden 2xl:block "
            />

            <img
                src="tourism/Vector (16).png"
                alt=""
                className="absolute right-0 max-[600px]:-top-0 -top-20 lg:-top-10 block 2xl:hidden max-[600px]:h-[235px] h-[400px] md:h-[500px] lg:h-[500px]"
            />
            <img
                src="tourism/Vector (17).png"
                alt=""
                className="absolute -left-20 lg:-left-10 -bottom-20 lg:bottom-0 block 2xl:hidden max-[600px]:h-[355px] h-[400px] md:h-[500px] lg:h-[550px]"
            />
        </div>
    );
};
