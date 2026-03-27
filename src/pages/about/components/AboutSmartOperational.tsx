import { EditableText } from "../../../components/EditableText";

export const AboutSmartOperational = () => {
    return (
        <div className="relative w-full h-[798px] lg:h-[917px] xl:h-[1260px] 2xl:h-[1660px] max-[500px]:pt-20 pt-[98px] xl:pt-[120px] px-6 xl:px-15 2xl:p-[112px] overflow-hidden">
            <EditableText
                id="about.operational.title"
                fallback="УМНЫЕ ОПЕРАЦИОННЫЕ"
                tag="h1"
                className="relative z-10 text-[44px] md:text-[56px] xl:text-[88px] 2xl:text-[110px] text-[#1D1D1D] uppercase leading-[110%] max-[500px]:text-center max-[500px]:text-[32px]"
            />

            <div className="relative w-full flex z-10 max-[600px]:mt-8 mt-[140px] xl:mt-[180px] 2xl:mt-[302px] justify-center 2xl:justify-start gap-2 md:gap-20 xl:gap-[122px] max-[600px]:flex-col max-[500px]:items-center">
                <div className="text-xs xl:text-base text-[#1D1D1D] uppercase font-suisse font-semibold max-w-[300px] 2xl:max-w-[370px] max-[500px]:text-center">
                    <EditableText
                        id="about.operational.description"
                        fallback="Пластические хирурги RAMICLINIC RESIDENCE имеют в своем распоряжении лучшие операционные новейшего времени Medical Visual Systems – золотой стандарт безопасной хирургии, экспертное хирургическое и наркозное оборудование, систему телемедицины"
                        tag="p"
                    />
                </div>

                <div className="max-[600px]:w-full w-auto 2xl:w-full flex items-start 2xl:justify-center max-[600px]:mt-[5rem] max-[600px]:justify-end">
                    <img
                        src="about/4.webp"
                        alt=""
                        className="max-[600px]:w-[270px] max-[600px]:h-[340px] w-[270px] md:w-[300px] lg:w-[386px] xl:w-[469px] 2xl:w-[662px] h-[340px] md:h-[370px] lg:h-[478px] xl:h-[582px] 2xl:h-[821px] object-cover object-[0_80%] xl:object-[0_-10rem]"
                    />
                    <img
                        src="about/5.webp"
                        alt=""
                        className="w-[100px] md:w-[128px] lg:w-[165px] xl:w-[201px] 2xl:w-[283px] h-[123px] md:h-[158px] lg:h-[203px] xl:h-[248px] 2xl:h-[350px] ml-[-6rem] 2xl:ml-[-8.5rem] mt-[-6rem] lg:mt-[-7rem] xl:mt-[-9rem] 2xl:mt-[-13rem] object-cover max-[768px]:ml-[-3rem] max-[768px]:mt-[-4rem]"
                    />
                </div>
            </div>
            <img
                src="about/Vector.webp"
                alt=""
                className="absolute left-0 top-[-10rem] md:top-[-18rem] lg:top-[-22rem] xl:top-[-2rem] 2xl:top-0 w-[32rem] md:w-[40rem] lg:w-[43rem] xl:w-[48rem] 2xl:w-auto max-[600px]:w-[28rem] max-[600px]:top-0 max-[500px]:w-[25rem] max-[500px]:top-[-26%] max-[500px]:left-[-29%]"
            />
        </div>
    );
};
