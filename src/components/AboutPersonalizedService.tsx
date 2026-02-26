export const AboutPersonalizedService = () => {
    return (
        <div className="relative w-full h-[1728px] p-[95px] pt-[221px] bg-[#EAE6E0]">
            <div className="flex flex-col items-center text-center">
                <span className="text-base text-[#1D1D1D] uppercase text-center font-suisse ">
                    24/7
                </span>
                <h1 className="relative z-10 text-[110px] text-[#1D1D1D] uppercase leading-[120px]">
                    ПЕРСОНАЛИЗИРОВАННЫЙ сервис
                </h1>
            </div>

            <div className=" relative z-10 w-full mt-[70px]">
                <div className=" w-full flex items-start justify-center ">
                    <img
                        src="about/6.webp"
                        alt=""
                        className="w-[680px] h-[820px] object-cover"
                    />
                    <img
                        src="about/image 111.webp"
                        alt=""
                        className="absolute top-1/2 -translate-y-1/2 w-[254ox] h-[334px] object-cover ml-[43rem]"
                    />
                </div>
                <div className="w-full flex justify-center  mt-15">
                    <p className="text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[525px] text-center">
                        RAMICLINIC RESIDENCE представляет пациентоцентричную
                        медицину как новую реальность, ориентированную на
                        потребности самых взыскательных пациентов
                    </p>
                </div>
            </div>

            <img
                src="about/Vector (5).webp"
                alt=""
                className="absolute left-0 top-0"
            />

            <img
                src="about/Vector (4).webp"
                alt=""
                className="absolute right-0 top-0"
            />
        </div>
    );
};
