export const AboutPersonalizedService = () => {
    return (
        <div className="relative w-full max-[600px]:h-[900px] h-[1000px] md:h-[1100px] lg:h-[1500px] xl:h-[1728px] px-4 md:px-[95px] pt-20 md:pt-[90px] lg:pt-[120px] 2xl:pt-[221px] bg-[#EAE6E0] overflow-hidden">
            <div className=" relative z-10 flex flex-col items-center text-center">
                <span className="text-base text-[#1D1D1D] uppercase text-center font-suisse" data-content-hint="about.service.label">24/7</span>
                <h1 className="text-[110px] text-[#1D1D1D] uppercase leading-[120px] hidden 2xl:block" data-content-hint="about.service.title">ПЕРСОНАЛИЗИРОВАННЫЙ сервис</h1>
                <h1 className="relative z-10 text-[44px] md:text-[56px] xl:text-[88px] text-[#1D1D1D] uppercase leading-[110%] block 2xl:hidden max-[600px]:text-[32px]" data-content-hint="about.service.title">ПЕРСОНАЛИЗИРОВАННЫЙ сервис</h1>
            </div>

            <div className="relative z-10 w-full mt-12 lg:mt-14 xl:mt-[70px]">
                <div className=" w-full flex items-start justify-center ">
                    <img
                        src="about/6.webp"
                        alt=""
                        className="w-[364px] lg:w-[568px] xl:w-[680px] h-[439px] lg:h-[685px] xl:h-[820px] object-cover max-[540px]:max-w-[327px]  max-[540px]:w-full max-[540px]:h-[393px]"
                    />
                    <img
                        src="about/image 111.webp"
                        alt=""
                        className="absolute top-[40%] xl:top-1/2 -translate-y-1/2 w-[144px] lg:w-[198px] xl:w-[254px] h-[190px] lg:h-[261px] xl:h-[334px] object-cover ml-[22rem] lg:ml-[36rem] xl:ml-[43rem] max-[540px]:w-[100px] max-[540px]:h-[130px] max-[540px]:ml-[20rem] max-[430px]:hidden"
                    />
                </div>
                <div className="w-full flex justify-center mt-6 xl:mt-15">
                    <p className="text-xs xl:text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[308px] xl:max-w-[525px] text-center" data-content-hint="about.service.description">RAMICLINIC RESIDENCE представляет пациентоцентричную медицину как новую реальность, ориентированную на потребности самых взыскательных пациентов</p>
                </div>
            </div>

            <img
                src="about/Vector (5).webp"
                alt=""
                className="absolute left-[-10rem] md:left-[-8rem] lg:left-0 bottom-[-10rem] md:bottom-[-8rem] lg:bottom-0 w-[450px] md:w-[500px] xl:w-[600px] 2xl:w-auto max-[600px]:hidden"
            />

            <img
                src="about/Vector (4).webp"
                alt=""
                className="absolute right-[-20rem] md:right-[-25rem] xl:right-[-30rem] 2xl:right-0 top-0 w-[600px] md:w-[700px] xl:w-[900px] 2xl:w-auto max-[600px]:w-[400px] max-[600px]:right-[-10rem]  "
            />

            <img src="about/Vector (21).png" alt=""  className='absolute bottom-0 left-0 max-[600px]:block hidden'/>
        </div>
    );
};
