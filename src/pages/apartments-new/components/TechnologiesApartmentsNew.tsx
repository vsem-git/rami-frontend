export const TechnologiesApartmentsNew = () => {
    return (
        <div
            id="technologies-apartments-new"
            className="relative w-full max-[450px]:min-h-[670px] max-[650px]:min-h-[800px] min-h-[900px] md:min-h-[1050px] lg:min-h-[1250px] xl:min-h-[1400px] 2xl:min-h-[1600px] bg-[#1D1D1D] max-[650px]:pt-11 pt-[112px] md:pt-[140px] lg:pt-[160px] 2xl:pt-52 overflow-hidden"
        >
            <div className="relative z-10 flex flex-col items-center">
                <h2 className="relative z-10 max-[650px]:text-[32px] text-[44px] md:text-[64px] lg:text-[88px] 2xl:text-[110px]  font-normal text-white uppercase leading-none text-center max-[500px]:mb-6 mb-8 md:mb-16 lg:mb-20" data-content-hint="apartments.technologies.title">Hi-tech <br /> технологии</h2>

                <div className="relative">
                    <div
                        className="max-[400px]:w-[216px] max-[500px]:w-[280px] w-[364px] md:w-[468px] lg:w-[560px] 2xl:w-[738px] max-[400px]:h-[251px] max-[500px]:h-[350px] h-[423px] md:h-[545px] lg:h-[653px] 2xl:h-[863px] bg-cover bg-center"
                        style={{
                            backgroundImage: `
      linear-gradient(160.27deg, rgba(0, 0, 0, 0) 13.2%, rgba(0, 0, 0, 0.4) 82.61%, rgba(0, 0, 0, 0.4) 99.66%),
      url('/apartmentsnew-screen/bg3.webp')
    `,
                        }}
                    />

                    <div className="max-[650px]:w-[104px] max-[650px]:h-[138px] w-[178px] md:w-[190px] lg:w-[225px] 2xl:w-[254px] h-[234px] md:h-[250px] lg:h-[296px] 2xl:h-[334px] rounded-full absolute top-1/2 md:top-[35%] lg:top-1/2 left-[-8rem] lg:left-[-10rem] -translate-y-1/2 overflow-hidden max-[650px]:left-[-3rem]">
                        <img
                            src="/apartmentsnew-screen/bg8.webp"
                            alt=""
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-[#00000033]" />
                    </div>
                </div>
                <p className="relative z-10 text-xs xl:text-base font-normal text-white uppercase leading-[140%] max-w-[350px] lg:max-w-[370px] xl:max-w-[360px] ml-[45%] md:ml-[61%] lg:ml-[63%] xl:ml-[52%] -mt-8  md:-mt-32 max-[650px]:mt-6 max-[650px]:ml-0 max-[450px]:px-4">
                    {" "}
                    Здесь создана максимально комфортная среда: функциональная
                    кровать, круглогодичный камин для релаксации и
                    климат-контроль с теплыми полами, которыми можно управлять с
                    планшета через систему «умный» дом. Организацию быта
                    обеспечивает умный гардероб, а для досуга есть SMART-TV с
                    персональным доступом
                </p>
            </div>
            {/* <img
				src='/apartmentsnew-screen/bg10.webp'
				alt=''
				className='absolute left-0 top-0'
			/> */}
        </div>
    );
};
