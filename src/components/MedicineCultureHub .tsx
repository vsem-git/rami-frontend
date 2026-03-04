export const MedicineCultureHub = () => {
    return (
        <div className="relative w-full 2xl:min-h-[1178px] max-[600px]:pl-0 pl-6 xl:pl-15 overflow-hidden">
            <div className="relative z-10 max-[600px]:px-4">
                <h1 className="max-[600px]:text-lg text-2xl md:text-[32px] 2xl:text-[48px] text-[#1D1D1D] uppercase leading-[125%] max-w-[600px] 2xl:max-w-[930px] pt-15 xl:pt-[110px] 2xl:pt-[170px]">
                    Город, где медицина встречается с культурой
                </h1>

                <p className="max-[600px]:text-[11px] text-xs text-[#1D1D1D] leading-[155%] uppercase max-w-[450px] block lg:hidden mt-6">
                    Санкт-Петербург — уникальное место, второй по величине город
                    в России и один из самых красивых городов мира,
                    где соединились великолепие архитектурных ансамблей и водная
                    стихия многочисленных рек и каналов, музеев мирового
                    значения и театров, ставших культурным достоянием
                    цивилизации. Исторический центр города и связанные с ним
                    комплексы памятников входят в список объектов всемирного
                    наследия ЮНЕСКО.
                </p>
            </div>

            <div className="flex justify-end lg:justify-between items-end max-[600px]:mt-20 mt-[45px] lg:mt-[200px] xl:mt-16 2xl:mt-[104px]">
                <p className="text-xs xl:text-base text-[#1D1D1D] leading-[155%] uppercase max-w-[380px] xl:max-w-[435px] pb-[43px] xl:pb-[72px]  lg:block hidden">
                    Санкт-Петербург — уникальное место, второй по величине город
                    в России и один из самых красивых городов мира,
                    где соединились великолепие архитектурных ансамблей и водная
                    стихия многочисленных рек и каналов, музеев мирового
                    значения и театров, ставших культурным достоянием
                    цивилизации. Исторический центр города и связанные с ним
                    комплексы памятников входят в список объектов всемирного
                    наследия ЮНЕСКО.
                </p>

                <div className="relative z-10 w-full max-[600px]:max-w-full max-w-[75%] lg:max-w-[55%] xl:max-w-[55%] 2xl:max-w-[60%]">
                    <img
                        src="tourism/2.webp"
                        alt=""
                        className="w-full h-[312px] md:h-[440px] xl:h-[580px] 2xl:h-[780px] object-cover"
                    />
                    <img
                        src="tourism/1.webp"
                        alt=""
                        className="absolute max-[600px]:left-auto max-[600px]:right-4 max-[600px]:top-[-25%] top-[14%] left-[-5.5rem] lg:left-[-3rem] xl:left-[-6rem] 2xl:left-[-8rem] max-[600px]:w-[99px] max-[600px]:h-[130px] w-[178px] lg:w-[102px] xl:w-[180px] 2xl:w-[254px] h-[234px] lg:h-[134px] xl:h-[240px] 2xl:h-[334px] rounded-[120px] "
                    />
                </div>
            </div>

            <img
                src="tourism/Vector (11).webp"
                alt=""
                className="absolute top-0 right-0 w-[500px] xl:w-[600px] 2xl:w-auto xl:block hidden"
            />
            <img
                src="tourism/Vector (19).png"
                alt=""
                className="absolute top-0 right-0 block xl:hidden w-[160px] md:w-[250px] lg:w-[380px] max-[600px]:hidden"
            />
        </div>
    );
};
