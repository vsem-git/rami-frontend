export const AboutSmartOperational = () => {
    return (
        <div className="relative w-full h-[1660px] p-[112px]">
            <h1 className="relative z-10 text-[110px] text-[#1D1D1D] uppercase leading-[120px]">
                УМНЫЕ <br />
                ОПЕРАЦИОННЫЕ
            </h1>

            <div className="relative z-10 flex mt-[302px]">
                <div className="text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[370px]">
                    <p>
                        Пластические хирурги RAMICLINIC RESIDENCE имеют в своем
                        распоряжении лучшие операционные новейшего времени
                        Medical Visual Systems – золотой стандарт безопасной
                        хирургии, экспертное хирургическое и наркозное
                        оборудование, систему телемедицины
                    </p>
                </div>

                <div className="w-full flex items-start justify-center ml-[-15rem]">
                    <img
                        src="about/4.jpg"
                        alt=""
                        className="w-[662px] h-[821px] object-cover object-[0_-10rem]"
                    />
                    <img
                        src="about/5.jpg"
                        alt=""
                        className="w-[283px] h-[350px] ml-[-8.5rem] mt-[-13rem] object-cover"
                    />
                </div>
            </div>
            <img
                src="about/Vector.png"
                alt=""
                className="absolute left-0 top-0"
            />
        </div>
    );
};
