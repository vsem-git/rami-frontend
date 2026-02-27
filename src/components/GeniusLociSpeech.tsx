export const GeniusLociSpeech = () => {
    return (
        <div className='relative w-full h-screen min-h-screen bg-no-repeat bg-cover bg-[url("tourism/3.webp")] [background-position:80%_100%] [background-size:_176%] [background-repeat:no-repeat] bg-[#F9F7F8] md::bg-cover md:[background-position-x:70%] md:bg-cover md:bg-center z-20'>
            <div className="h-full flex items-center ml-[200px]">
                <div className="flex items-start gap-4">
                    <img src="tourism/Quote icon.svg" alt="" />
                    <p className="text-lg text-[#1D1D1D] uppercase leading-[155%] max-w-[620px]">
                        Мы уверены, что город белых ночей может открыть свою
                        эстетику и тайны для взыскательных пациентов RAMICLINIC
                        RESIDENCE благодаря продуманной системе погружения
                        в культурный контекст любимого города, которую мы
                        создали по разным причинам, однако основа здесь —
                        терапия красоты genius loci (гений места) и любви,
                        которые изначально заложены в Санкт-Петербург.
                    </p>
                </div>
            </div>

            <img
                src="tourism/4.webp"
                alt=""
                className="absolute top-[100px] right-10 w-[228px]"
            />

            <div className="absolute bottom-10 right-[12%] flex mt-10">
                <p className="text-[21px] text-white uppercase font-bold">
                    гАлина резник <br />
                    <span className=" font-medium">генеральный директор</span>
                </p>
            </div>
        </div>
    );
};
