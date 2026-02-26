export const AboutDynasty = () => {
    return (
        <div className="relative w-full min-h-[1728px] pt-[224px] bg-[#EAE6E0]">
            <h1 className="relative z-10 text-[110px] text-[#1D1D1D] uppercase leading-[120px] text-center">
                династия
            </h1>
            <div className="w-full flex justify-center  mt-[127px]">
                <p className="text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[310px] text-center">
                    Клиника РАМИ и RAMICLINIC RESIDENCE находятся под
                    управлением и в собственности Галины Резник и Мазена Хамуд.
                    Доктор Рами Хамуд продолжил династию врачей и стал
                    практикующим пластическим хирургом
                </p>
            </div>

            <div className="flex justify-center items-center gap-[269px] mt-[140px]">
                <img
                    src="about/10.jpg"
                    alt=""
                    className="w-[662px] h-[820px] object-cover"
                />

                <div className="flex gap-[66px]">
                    <img
                        src="Frame 300.svg"
                        alt=""
                        className="w-[64px] h-[64px]"
                    />
                    <div className="w-full max-w-[425px]">
                        <div className="w-full flex justify-center  mt-15">
                            <p className="text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[425px]">
                                В нашей семье все — врачи. Ценности, которые
                                заложили в мое воспитание родители, определили
                                мою профессиональную судьбу: милосердие,
                                сочувствие, честность и принципиальность, умение
                                собираться в трудный момент и принимать
                                ответственные решения, веру, что всё задуманное
                                мной осуществимо. Благодаря этому в самое
                                непростое для моей страны время я сумела открыть
                                одну из первых в Петербурге частных медицинских
                                практик, которая за четверть века
                                трансформировалась до клиники с
                                персонализированным подходом к каждому пациенту
                            </p>
                        </div>
                        <div className="w-full flex mt-10">
                            <p className="text-[13px] text-[#1D1D1D] uppercase font-suisse font-semibold">
                                гАлина резник <br />
                                <span className="text-[#45454580]">
                                    генеральный директор
                                </span>
                            </p>
                        </div>

                        <div className="w-full flex justify-end">
                            <img
                                src="about/11.png"
                                alt=""
                                className="w-[286px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <img
                src="about/12.png"
                alt=""
                className="w-full h-[287px] mt-[330px]"
            />

            <div className='relative w-full h-full min-h-[2312px] bg-[url("/about/13.png")] bg-cover bg-no-repeat bg-center'>
                <img
                    src="about/shadow.png"
                    alt=""
                    className="absolute w-full h-[736px]"
                />
                <div className="relative z-10 w-full pt-[200px] ml-[287px]">
                    <p className="text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[490px]">
                        Расположена в живописной и престижной локации
                        Санкт-Петербурга – в дельте Невы, на Крестовском
                        острове, в историческом особняке, окруженном старинным
                        парком
                    </p>
                </div>

                <div className="w-full h-[2112px] flex items-end justify-end">
                    <div
                        className="w-[65%] h-[980px] pl-10 pt-[50px]"
                        style={{
                            background:
                                "linear-gradient(180deg, #EAE6E0 0%, #F2EFEB 43.7%, #FFFFFF 68.76%, #FFFFFF 100%)",
                        }}
                    >
                        <p className="text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[751px]">
                            Особняк Дмитрия Львовича Бенкендорфа – отставного
                            штабс-капитана лейб-гвардии Измайловского полка – в
                            1910 году построил архитектор Э.А. Густавсон. В ходе
                            реконструкции в историческое здание интегрирована
                            медицина высоких технологий
                        </p>

                        <div className="w-full h-full flex items-end justify-end -mt-[6rem]">
                            <img
                                src="about/14.jpg"
                                alt=""
                                className="w-[676px] h-[679px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

						<img src="about/Vector (6).png" alt="" className='absolute top-0 right-0' />
        </div>
    );
};
