export const AboutInfo = () => {
    return (
        <div className="relative w-full max-[600px]:h-[800px] h-[920px] md:h-[950px] xl:h-[1400px] 2xl:h-[1660px] bg-[#1D1D1D] overflow-hidden">
            <img
                src="about/Group 630.webp"
                alt=""
                className="absolute w-full"
            />

            <div className="w-full relative z-20 max-[600px]:pt-22  pt-[130px] md:pt-[150px] xl:pt-[15rem] px-4 md:pl-[100px] xl:pl-[112px] 2xl:pl-[17rem]">
                <p className="text-xs xl:text-base text-[#EAE6E0] uppercase max-w-[310px] xl:max-w-[491px] 2xl:max-w-[372px] max-[500px]:max-w-[350px]">
                    RAMICLINIC RESIDENCE — новая Клиника-резиденция с
                    традициями, где в центре внимания — пациент. Здесь воплощён
                    уникальный пациентоцентричный подход: врачи, диагностическое
                    оборудование, всё, что необходимо для оценки здоровья,
                    обеспечения безопасной хирургии и эффективной реабилитации —
                    устремляется к пациенту, окружает заботой, работает на его
                    мечту
                </p>
            </div>

            <div className="w-full relative z-20 flex justify-end pr-4 md:pr-6 xl:pr-[160px] 2xl:pr-[288px] mt-[5rem] 2xl:-mt-[4rem] max-[500px]:pr-0 max-[500px]:mt-[11.7rem] max-[500px]:absolute max-[500px]:bottom-0">
                <div className="max-[500px]:w-full">
                    <img
                        src="about/image 110.webp"
                        alt=""
                        className="absolute top-1/2 -translate-y-1/2 ml-[-4rem] xl:ml-[-5rem] 2xl:ml-[-10rem] w-[126px] xl:w-[134px] xl:w-[171px] 2xl:w-[254px] max-[500px]:w-[97px] max-[500px]:top-[-0.3rem] max-[500px]:right-4"
                    />
                    <img
                        src="about/image 108.webp"
                        alt=""
                        className="max-[500px]:w-full w-[364px] md:w-[387px] xl:w-[497px] 2xl:w-[738px] max-[500px]:h-[350px] object-cover"
                    />
                </div>
            </div>

            <img
                src="about/in.webp"
                alt=""
                className="absolute z-10 left-[-1rem] top-[65%] md:top-[66%] xl:top-[59%] 2xl:top-[55%] -translate-y-1/2 max-[500px]:hidden"
            />
            <img
                src="about/Group 630 (1).png"
                alt=""
                className="absolute top-0 left-0 w-full"
            />
            <img
                src="about/филосовия (1).png"
                alt=""
                className="absolute z-10 w-full left-0 max-[500px]:top-[37%] hidden max-[500px]:block"
            />
        </div>
    );
};
