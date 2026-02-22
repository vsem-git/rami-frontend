export const WelcomeAbout = () => {
    return (
        <div className="relative h-[2300px] w-full">
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-[0px_-65rem] bg-[url('about/1.jpg')] grayscale"></div>

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
                }}
            />
            <img
                src="about/Vector (10).png"
                alt=""
                className="absolute z-10 bottom-0 right-0"
            />
            <div className="relative z-10">
                <img
                    src="about/Vector (8).png"
                    alt=""
                    className="absolute z-10 top-0 right-0"
                />
                <img
                    src="about/Vector (9).png"
                    alt=""
                    className="absolute z-10 top-[6%] left-0"
                />

                <div className="relative z-20 flex items-end justify-between pt-[40rem] pl-12 pr-15">
                    <div>
                        <span className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold pl-3 ">
                            О клинике
                        </span>
                        <h1 className="text-[110px] text-[#EAE6E0] uppercase leading-[120px] mt-6 ">
                            RAMICLINIC <br />
                            RESIDENCE
                        </h1>
                    </div>

                    <button className="w-10 h-10 flex items-center justify-center border border-[#EAE6E0] rounded-full cursor-pointer transition-all duration-200 hover:scale-105">
                        <img
                            src="arrow-sm.svg"
                            alt=""
                            className="transition-all duration-200 group-hover:scale-105"
                        />
                    </button>
                </div>

                <div className="relative z-20 w-full flex justify-end mt-[30rem] ml-[-22rem]">
                    <img
                        src="about/17.jpg"
                        alt=""
                        className="w-[530px] h-[660px] rounded-full object-cover grayscale"
                    />
                    <div className="relative z-10 -ml-32 -mt-[7rem]">
                        <p className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-w-[363px]">
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
