export const WelcomeAbout = () => {
    return (
        <div className="relative max-[600px]:h-[740px] h-[1110px] md:h-[1110px] 2xl:h-[2300px] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-position-[0_120%] md:bg-position-[0_80%] lg:bg-position-[0_60%] xl:bg-position-[40%] 2xl:bg-position-[0_90%] bg-[url('/about/1.webp')] scale-130 md:scale-110 lg:scale-100 max-[600px]:bg-position-[0_80%] max-[500px]:bg-position-[0_-5rem] max-[500px]:scale-170"
                style={{ filter: "grayscale(100%)" }}
            ></div>

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
                }}
            />
            <img
                src="about/Vector (10).webp"
                alt=""
                className="absolute z-10 max-[700px]:bottom-[-7%] bottom-[-14%] md:bottom-[-10%] 2xl:bottom-0 right-0 w-[750px] 2xl:w-auto max-[600px]:w-[500px] max-[600px]:right-[-10%] max-[600px]:bottom-[-10%]"
            />
            <div className="relative z-10 max-[600px]:flex items-center justify-center flex-col">
                <img
                    src="about/Vector (8).webp"
                    alt=""
                    className="absolute z-10 top-[-15%] 2xl:top-0 right-[-28%] 2xl:right-0 w-[500px] lg:w-auto hidden md:block"
                />
                <img
                    src="about/Vector (9).webp"
                    alt=""
                    className="absolute z-10 top-[4%] left-[-6%] md:left-0 w-[300px] md:w-[280px] lg:w-[344px] 2xl:w-auto max-[600px]:left-[-5%] max-[600px]:top-[-5rem] max-[600px]:w-[190px]  max-[500px]:left-[-10%]  max-[500px]:top-[-15%] "
                />

                <div className="relative z-20 flex items-end justify-between max-[600px]:pt-32 pt-[15rem] lg:pt-[20rem] 2xl:pt-[40rem] pl-4 md:pl-12 pr-4 md:pr-6 xl:pr-15 max-[600px]:items-center max-[600px]:justify-center max-[600px]:pl-0  max-[600px]:pl-0  max-[600px]:px-4">
                    <div className="max-[600px]:flex items-center flex-col">
                        <span className="text-xs md:text-base text-[#EAE6E0] uppercase font-suisse font-semibold pl-1 2xl:pl-3 max-[600px]:text-center">
                            О клинике
                        </span>
                        <h1 className="text-[44px] md:text-[56px] 2xl:text-[110px] text-[#EAE6E0] uppercase leading-[110%] mt-3 2xl:mt-6 max-[600px]:text-center max-[600px]:text-[32px]">
                            RAMICLINIC <br />
                            RESIDENCE
                        </h1>
                    </div>

                    <button className="w-10 h-10 flex items-center justify-center border border-[#EAE6E0] rounded-full cursor-pointer transition-all duration-200 hover:scale-105 max-[600px]:hidden">
                        <img
                            src="arrow-sm.svg"
                            alt=""
                            className="transition-all duration-200 group-hover:scale-105"
                        />
                    </button>
                </div>

                <div className="relative z-20 w-full flex justify-end max-[600px]:mt-11 mt-[20rem] md:mt-[200px] lg:mt-[174px] 2xl:mt-[30rem] -ml-4 md:ml-[-60px] lg:ml-[-123px] 2xl:ml-[-22rem] max-[600px]:flex-col max-[600px]:justify-center max-[600px]:items-center max-[600px]:px-4 max-[600px]:pr-0">
                    <img
                        src="about/17.webp"
                        alt=""
                        className="max-[600px]:w-[161px] w-[209px] md:w-[241px] 2xl:w-[530px] max-[600px]:h-[200px] h-[260px] xl:h-[300px] 2xl:h-[660px] rounded-full object-cover "
                        style={{ filter: "grayscale(100%)" }}
                    />
                    <div className="relative z-10 -ml-32 max-[600px]:ml-0  -mt-[5rem] 2xl:-mt-[7rem] max-[600px]:mt-6">
                        <p className="text-xs 2xl:text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-w-[363px] max-[600px]:text-center leading-[19px] ">
                            Клиника-резиденция высокотехнологичной пластической
                            хирургии и косметологии для искушенных пациентов,
                            настроенных на поддержание индивидуальной красоты и
                            внешней привлекательности с гарантией эталонных
                            стандартов безопасности в медицине, полной
                            анонимностью, сервисом и приватностью, достойными
                            первых лиц государств
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
