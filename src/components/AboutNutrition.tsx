export const AboutNutrition = () => {
    return (
        <div className="relative w-full min-h-[2390px] bg-[#1D1D1D]">
            <h1 className="relative z-10 text-[110px] text-white uppercase leading-[120px] text-right pr-[54px] pt-[120px]">
                Питание
            </h1>
            <div>
                <img
                    src="about/Vector (7).webp"
                    alt=""
                    className="absolute z-10 top-[-58rem] left-0"
                />
                <img
                    src="about/15.webp"
                    alt=""
                    className="absolute z-20 left-[-13rem] w-[1402px] h-[1146px] mt-[83px]"
                />
                <div className="w-full absolute top-[53rem]">
                    <img src="about/Group 656.webp" alt="w-full" />
                </div>
            </div>

            <div className="relative z-20 w-full flex justify-end  mt-[45rem] ml-[-18rem]">
                <p className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-w-[478px]">
                    Меню для пациентов RAMICLINIC RESIDENCE составляется
                    согласно индивидуальным рекомендациям лечащего врача и
                    диетолога и с учетом вкусовых предпочтений пациента
                </p>
            </div>

            <div className="mt-[44%] ml-[54px]">
                <h1 className="relative z-10 text-[110px] text-[#89685C] uppercase leading-[120px]">
                    ИЗЫСКАННАЯ
                </h1>
                <h1 className="relative z-10 text-[110px] text-white uppercase leading-[120px]">
                    СРЕДА <br /> ОБИТАНИЯ
                </h1>
            </div>

            <div className="relative w-full flex justify-end mt-[200px]">
                <div className="absolute z-10 top-1/2 left-[49.5%] -translate-1/2 w-[496px] h-[496px] flex items-center justify-center border-[1.3px] border-[#EAE6E033] rounded-full">
                    <div className="absolute -inset-0.5 rounded-full before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-[3px] before:border-[#EAE6E0] before:[clip-path:polygon(0_0,_30%_0,_30%_100%,_0_100%)]"></div>

                    <h1 className="relative z-10 text-[110px] text-[#EAE6E0] uppercase leading-[120px]">
                        2
                    </h1>
                </div>
                <div className="h-full flex items-center justify-between">
                    <div className="h-[1082px] flex flex-col justify-between pl-15">
                        <div className="flex-1 flex items-center pt-[12rem]">
                            <h4 className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold">
                                Интерьеры
                            </h4>
                        </div>
                        <div className="relative z-20 w-full flex justify-end">
                            <p className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-w-[355px]">
                                В интерьерах резиденции использованы предметы
                                мебели, являющиеся самостоятельными
                                арт-объектами, экзотические породы дерева,
                                сложные декоративные элементы лепнины, латунь,
                                ценные виды натурального камня, витражи и люстры
                                в стиле ар деко
                            </p>
                        </div>
                    </div>

                    <div className="w-[51%] space-y-15">
                        <div className="relative z-20 w-full flex justify-end pr-[58px]">
                            <p className="text-base text-[#EAE6E0] uppercase font-suisse font-semibold">
                                Наша абсолютная ценность – подлинность всего,
                                что мы предлагаем пациенту: от экспертности и
                                профессионализма хирургов до изысканной среды
                                обитания
                            </p>
                        </div>

                        <div className="relative w-full h-[1082px] overflow-hidden">
                            <img
                                src="about/16.webp"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ backgroundColor: "#00000033" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
