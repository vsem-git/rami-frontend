export const AboutSafety = () => {
    return (
        <div className="relative w-full max-[450px]:min-h-[1350px] max-[600px]:min-h-[1200px] min-h-[1000px] md:min-h-[1200px] lg:min-h-[1320px] xl:min-h-[1820px] 2xl:min-h-[2390px] bg-[#1D1D1D] pt-15 md:pt-[100px] xl:pt-[184px]">
            <h1 className="relative z-10 text-[44px] md:text-[56px] xl:text-[88px] 2xl:text-[110px] text-[#EAE6E0] uppercase leading-[120px] text-right pr-6 xl:pr-15 2xl:pr-[112px] max-[500px]:text-[32px] max-[600px]:text-center max-[600px]:pr-0">
                безопасность
            </h1>

            <div className="relative z-10 flex items-end gap-10 md:gap-15 xl:gap-[95px] mt-14 md:mt-[70px] lg:mt-[100px] xl:mt-[180px] 2xl:mt-[250px] pr-4 max-[600px]:flex-col-reverse max-[600px]:px-4 max-[600px]:items-center max-[600px]:mt-0">
                <img
                    src="about/7.webp"
                    alt=""
                    className="max-[680px]:w-full w-1/2 xl:w-[55%] 2xl:w-[59%] h-[270px] md:h-[328px] lg:h-[420px] xl:h-[628px] 2xl:h-[735px] object-cover object-[0_80%] max-[680px]:h-[219px] max-[600px]:h-[320px]"
                    style={{ transform: "scaleX(-1)" }}
                />
                <p className="text-xs xl:text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-[680px]:max-w-[270px] max-w-[302px] lg:max-w-[392px] xl:max-w-[421px] max-[600px]:text-center max-[600px]:max-w-[420px]">
                    RAMICLINIC RESIDENCE проектировалась, строилась и
                    функционирует как сложная организационная структура, где
                    процедуры и операции, модели поведения, технологии и факторы
                    среды обеспечивают максимальную медицинскую, физическую и
                    информационную безопасность
                </p>
            </div>

            <img
                src="about/Vector (20).png"
                alt=""
                className="absolute top-0 right-0 w-[200px] md:w-[290px] lg:w-[300px] 2xl:w-auto "
            />
            <img
                src="about/9.webp"
                alt=""
                className="absolute left-0 top-[39rem] md:top-[47rem] lg:top-[55rem] xl:top-[71%] 2xl:top-[63%] -translate-y-1/2 max-[680px]:hidden"
            />
            <img
                src="about/оборудование (1).png"
                alt=""
                className="absolute left-0 -translate-y-1/2 max-[680px]:top-[35rem] max-[600px]:top-[45rem] max-[600px]:block hidden"
            />

            <div className="w-full flex items-center max-[600px]:gap-0 gap-[95px] max-[500px]:pt-[40%] pt-[14rem] lg:pt-[14rem] xl:pt-[18rem] max-[600px]:flex-col max-[600px]:px-4 max-[600px]:pt-[12rem] max-[600px]:items-start">
                <div className="pl-[4%] 2xl:pl-[216px] max-[600px]:pl-0">
                    <p className="text-xs xl:text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-[680px]:w-[300px] w-[389px] xl:w-[471px] xl:w-[361px] max-[600px]:max-w-[420px] ">
                        В RAMICLINIC RESIDENCE представлено все передовое
                        мировое оборудование, необходимое для выполнения самых
                        сложных пластических операций, косметологической
                        коррекции, высокоточной диагностики, подготовки к
                        операции и быстрого восстановления. Особая привилегия
                        пациентов Клиники – восстановление и омоложение в
                        гипербарической барокамере нового поколения
                    </p>
                </div>

                <div className="max-[600px]:w-full w-[65%] md:w-[90%] lg:w-[80%] 2xl:w-[110%]  max-[600px]:w-full max-[600px]:flex justify-end max-[600px]:ml-[20%] max-[600px]:-mt-[5%] max-[450px]:mt-5 max-[450px]:ml-0">
                    <img
                        src="about/8.webp"
                        alt=""
                        className="w-full object-cover max-[450px]:scale-[1.6] max-[600px]:scale-[1.2] scale-[1.9] md:scale-[1.5] lg:scale-[1.2] xl:scale-[1] 2xl:scale-[1.2] ml-[-10%] lg:ml-[-10%] xl:ml-0 max-[600px]:ml-0 "
                    />
                </div>
            </div>
        </div>
    );
};
