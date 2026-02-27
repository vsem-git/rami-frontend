export const MedicineCultureHub = () => {
    return (
        <div className="relative w-full min-h-[1178px] pl-15">
            <h1 className="text-[48px] text-[#1D1D1D] uppercase leading-[125%] max-w-[930px] pt-[170px]">
                Город, где медицина встречается с культурой
            </h1>

            <div className="flex justify-between items-end mt-[104px]">
                <p className="text-base text-[#1D1D1D] leading-[24px] uppercase max-w-[435px] pb-[72px]">
                    Санкт-Петербург — уникальное место, второй по величине город
                    в России и один из самых красивых городов мира,
                    где соединились великолепие архитектурных ансамблей и водная
                    стихия многочисленных рек и каналов, музеев мирового
                    значения и театров, ставших культурным достоянием
                    цивилизации. Исторический центр города и связанные с ним
                    комплексы памятников входят в список объектов всемирного
                    наследия ЮНЕСКО.
                </p>

                <div className="relative z-10 w-full max-w-[60%]">
                    <img
                        src="tourism/2.webp"
                        alt=""
                        className="w-full h-[780px]"
                    />
                    <img
                        src="tourism/1.webp"
                        alt=""
                        className=" absolute top-[14%] left-[-8rem] w-[254px] h-[334px] rounded-[120px]"
                    />
                </div>
            </div>

            <img
                src="tourism/Vector (11).webp"
                alt=""
                className="absolute top-0 right-0"
            />
        </div>
    );
};
