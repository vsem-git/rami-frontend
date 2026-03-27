export const GeniusLociSpeech = () => {
    return (
        <div className="w-full h-screen min-h-[800px] md:min-h-screen bg-[url('/residence6.webp')] [background-position:80%_100%] [background-size:_176%] [background-repeat:no-repeat] bg-[#F9F7F8] md::bg-cover md:[background-position-x:70%] md:bg-cover md:bg-center z-20 max-[600px]:bg-size-[60rem] max-[600px]:bg-[85%_100%]">
            <div className="relative w-full h-full flex justify-start pl-[16px] md:pl-4 xl:pl-[120px] 2xl:pl-[200px] items-start pt-20 md:pt-0 md:items-center  flex-col lg:flex-row">
                <div className="w-full lg:w-auto pt-0 sm:pt-10 lg:pt-0">
                    <div className="flex items-start gap-2">
                        <img src="tourism/Quote icon.svg" alt="" className='w-10 lg:w-auto' />
                        <p className="max-w-[264px] sm:max-w-[400px] 2xl:max-w-[550px] leading-[155%] mt-3 lg:mt-6 uppercase text-[11px] md:text-xs 2xl:text-base">
                            Мы уверены, что город белых ночей может открыть свою
                            эстетику и тайны для взыскательных пациентов
                            RAMICLINIC RESIDENCE благодаря продуманной системе
                            погружения в культурный контекст любимого города,
                            которую мы создали по разным причинам, однако основа
                            здесь — терапия красоты genius loci (гений места) и
                            любви, которые изначально заложены
                            в Санкт-Петербург.
                        </p>
                    </div>
                </div>
                <div className="uppercase absolute bottom-6 text-white right-6 md:right-[clamp(4.938rem,_-2.938rem_+_16.41vw,_16.75rem)]">
                    <p className="font-bold mb-1 text-sm 2xl:text-[21px]">
                        Галина Резник
                    </p>
                    <p className="text-xs 2xl:text-lg">Генеральный директор</p>
                </div>
                <div className="absolute bottom-6 lg:bottom-auto left-4 lg:left-auto top-auto lg:top-32 right-auto lg:right-8 max-[600px]:hidden">
                    <img
                        src="/ceo_logo.webp"
                        alt=""
                        width={228}
                        height={218}
                        className="w-[160px] h-[153px] 2xl:w-[228px] 2xl:h-[218px]"
                    />
                </div>
            </div>
        </div>
    );
};
