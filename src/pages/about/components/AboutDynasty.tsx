export const AboutDynasty = () => {
    return (
        <div className="relative w-full min-h-[1000px] lg:min-h-[1400px] 2xl:min-h-[1728px] pt-20 md:pt-[90px] lg:pt-[120px] 2xl:pt-[221px] bg-[#EAE6E0] overflow-hidden ">
            <h1 className="relative z-10 text-[44px] md:text-[56px] xl:text-[88px] 2xl:text-[110px] text-[#1D1D1D] uppercase leading-[110%] text-center max-[600px]:text-[32px]" data-content-hint="about.dynasty.title">династия</h1>
            <div className="relative z-10 w-full flex justify-center mt-10 md:mt-[50px] 2xl:mt-[127px]">
                <p className="text-xs xl:text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[270px] xl:max-w-[310px] text-center" data-content-hint="about.dynasty.description">Клиника РАМИ и RAMICLINIC RESIDENCE находятся под управлением и в собственности Галины Резник и Мазена Хамуд. Доктор Рами Хамуд продолжил династию врачей и стал практикующим пластическим хирургом</p>
            </div>

            <div className="relative z-30 flex justify-center items-center gap-2  md:gap-10 lg:gap-[140px] 2xl:gap-[269px] max-[600px]:gap-6 max-[600px]:mt-10  mt-20 md:mt-[95px] lg:mt-[135px] 2xl:mt-[140px] overflow-hidden px-4 md:px-6 max-[600px]:flex-col max-[600px]:items-start ">
                <div className="max-[600px]:w-full max-[600px]:flex justify-end max-[450px]:justify-center">
                    <img
                        src="about/10.webp"
                        alt=""
                        className="max-[700px]:w-[328px] w-[389px] lg:w-[470px] xl:w-[662px] h-[483px] lg:h-[583px] xl:h-[820px] object-cover max-[700px]:h-[405px] "
                    />
                </div>

                <div className="flex gap-2 lg:ap-8 2xl:gap-[66px]">
                    <img
                        src="Frame 300.svg"
                        alt=""
                        className=" w-[40px] lg:w-[64px] h-[40px] lg:h-[64px]"
                    />
                    <div className="w-full max-w-[314px] xl:max-w-[425px]">
                        <div className="w-full flex justify-center mt-8 lg:mt-15">
                            <p className="text-xs xl:text-base text-[#1D1D1D] uppercase font-suisse font-semibold" data-content-hint="about.dynasty.quote">В нашей семье все — врачи. Ценности, которые заложили в мое воспитание родители, определили мою профессиональную судьбу: милосердие, сочувствие, честность и принципиальность, умение собираться в трудный момент и принимать ответственные решения, веру, что всё задуманное мной осуществимо. Благодаря этому в самое непростое для моей страны время я сумела открыть одну из первых в Петербурге частных медицинских практик, которая за четверть века трансформировалась до клиники с персонализированным подходом к каждому пациенту</p>
                        </div>
                        <div className="w-full flex mt-3 md:mt-10">
                            <div className="text-xs md:text-[13px] text-[#1D1D1D] uppercase font-suisse font-semibold">
                                <span className="block" data-content-hint="about.dynasty.author-name">гАлина резник</span>
                                <span className="text-[#45454580]" data-content-hint="about.dynasty.author-role">генеральный директор</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-end">
                            <img
                                src="about/11.webp"
                                alt=""
                                className="w-[137px] md:w-[162px] lg:w-[198px] xl:w-[286px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className=" flex-col items-center gap-8 mt-[100px] px-4 hidden max-[600px]:flex">
                <h2 className="text-[32px] text-[#1D1D1D] font-normal uppercase text-center leading-[110%]" data-content-hint="about.dynasty.location-title">локация</h2>
                <p className="text-xs text-[#1D1D1D] uppercase font-suisse font-semibold text-center max-w-[333px]" data-content-hint="about.dynasty.location-text">Расположена в живописной и престижной локации Санкт-Петербурга – в дельте Невы, на Крестовском острове, в историческом особняке, окруженном старинным парком</p>
            </div>

            <img
                src="about/12.webp"
                alt=""
                className="relative z-30 w-full mt-[10rem] xl:mt-[240px] 2xl:mt-[330px] shrink-0 max-[991px]:hidden"
            />

            <img
                src="about/локация (3).png"
                alt=""
                className="relative z-30 w-full shrink-0 max-[600px]:hidden mt-[10rem] block lg:hidden"
            />
            <img
                src="about/локация (4).png"
                alt=""
                className="relative z-30 w-full shrink-0 max-[600px]:mt-12 mt-[10rem] hidden max-[600px]:block"
            />

            <div className="absolute z-30 top-[54%] md:top-[49.5%] xl:top-[46.5%] 2xl:top-[43%] right-4 md:right-6 lg:right-12 max-[700px]:top-[52.5%] max-[600px]:hidden">
                <h1 className="text-[44px] md:text-[56px] xl:text-[88px] 2xl:text-[110px] text-[#1D1D1D] uppercase leading-[110%] text-right max-[600px]:text-[32px]" data-content-hint="about.dynasty.location-title">локация</h1>
            </div>

            <div className="relative w-full h-full  flex-col items-center gap-9 mt-10 px-4 hidden max-[600px]:flex">
                <img
                    src="about/14.webp"
                    alt=""
                    className="w-[217px] h-[218px] object-cover"
                />

                <p className="text-xs 2xl:text-base text-[#1D1D1D] uppercase font-suisse font-semibold text-center max-w-[420px]" data-content-hint="about.dynasty.mansion-text">Особняк Дмитрия Львовича Бенкендорфа – отставного штабс-капитана лейб-гвардии Измайловского полка – в 1910 году построил архитектор Э.А. Густавсон. В ходе реконструкции в историческое здание интегрирована медицина высоких технологий</p>
            </div>

        <img src="/about/Rectangle 2821 (1).png" alt="" className='absolute left-0 w-full max-[600px]:block hidden' />
            <div className='w-full h-[468px]  bg-[url("/about/13.webp")] bg-cover bg-no-repeat hidden max-[600px]:block'></div>

            <div className='relative w-full h-full min-h-[1000px] xl:min-h-[1398px] 2xl:min-h-[2312px] bg-[url("/about/13.webp")] bg-cover bg-no-repeat bg-[0px_6rem]  md:bg-[0px_10rem] xl:bg-center mt-[-25rem] 2xl:mt-0 max-[600px]:flex item-center justify-center flex-col max-[600px]:hidden'>
                <img
                    src="about/shadow.webp"
                    alt=""
                    className="absolute z-20 w-full h-[736px] max-[600px]:hidden"
                />
                <div className="relative z-20 w-full pt-[400px] 2xl:pt-[200px] ml-6 lg:ml-[100px] xl:ml-[162px] 2xl:ml-[287px]">
                    <p className="text-xs xl:text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[400px] lg:max-w-[590px] 2xl:max-w-[490px] max-[600px]:text-center" data-content-hint="about.dynasty.location-text">Расположена в живописной и престижной локации Санкт-Петербурга – в дельте Невы, на Крестовском острове, в историческом особняке, окруженном старинным парком</p>
                </div>

                <div className="w-full h-[700px] md:h-[900px] lg:h-[1100px] xl:h-[1700px] 2xl:h-[2112px] flex items-end justify-end">
                    <div
                        className="w-[439px] md:w-[570px] xl:w-1/2 2xl:w-[65%] h-[500px] xl:h-[620px] 2xl:h-[980px] pl-6 lg:pl-10 pt-8 lg:pt-10 2xl:pt-[50px]  lg:pr-0"
                        style={{
                            background:
                                "linear-gradient(180deg, #EAE6E0 0%, #F2EFEB 43.7%, #FFFFFF 68.76%, #FFFFFF 100%)",
                        }}
                    >
                        <p className="text-xs 2xl:text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[751px] pr-6" data-content-hint="about.dynasty.mansion-text">Особняк Дмитрия Львовича Бенкендорфа – отставного штабс-капитана лейб-гвардии Измайловского полка – в 1910 году построил архитектор Э.А. Густавсон. В ходе реконструкции в историческое здание интегрирована медицина высоких технологий</p>

                        <div className="w-full h-full flex items-end justify-end -mt-[3rem] 2xl:-mt-[6rem]">
                            <img
                                src="about/14.webp"
                                alt=""
                                className="w-[300px] md:w-[332px] xl:w-[429px] 2xl:w-[676px] h-[318px] md:h-[333px] xl:h-[431px] 2xl:h-[679px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <img
                src="about/Vector (6).webp"
                alt=""
                className="absolute top-0 md:top-[-2rem] 2xl:top-0 right-[-4rem] md:right-[-10rem] lg:right-0 w-[300px] md:w-[500px] lg:w-[550px] xl:w-[700px] 2xl:w-full"
            />
        </div>
    );
};
