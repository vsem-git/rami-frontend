export const AboutSafety = () => {
    return (
        <div className="relative w-full min-h-[2390px] bg-[#1D1D1D] pt-[184px]">
            <h1 className="relative z-10 text-[110px] text-[#EAE6E0] uppercase leading-[120px] text-right pr-[112px]">
                безопасность
            </h1>

            <div className="flex items-end gap-[95px] mt-[250px]">
                <img
                    src="about/7.webp"
                    alt=""
                    className="w-[59%] h-[735px] object-cover object-[0_-55rem]"
                />
                <p className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-w-[421px]">
                    RAMICLINIC RESIDENCE проектировалась, строилась и
                    функционирует как сложная организационная структура, где
                    процедуры и операции, модели поведения, технологии и факторы
                    среды обеспечивают максимальную медицинскую, физическую и
                    информационную безопасность
                </p>
            </div>

            <img
                src="about/9.webp"
                alt=""
                className="absolute left-[-1rem] top-[65%] -translate-y-1/2"
            />

            <div className="flex items-center gap-[95px] pt-[18rem]">
                <div className="pl-[216px]">
                    <p className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold w-[361px] ">
                        В RAMICLINIC RESIDENCE представлено все передовое
                        мировое оборудование, необходимое для выполнения самых
                        сложных пластических операций, косметологической
                        коррекции, высокоточной диагностики, подготовки к
                        операции и быстрого восстановления. Особая привилегия
                        пациентов Клиники – восстановление и омоложение в
                        гипербарической барокамере нового поколения
                    </p>
                </div>
                <img
                    src="about/8.webp"
                    alt=""
                    className="w-[110%] object-cover scale-[1.2]"
                />
            </div>
        </div>
    );
};
