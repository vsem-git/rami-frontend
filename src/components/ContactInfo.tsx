import { PhoneList } from "./PhoneList";

export const ContactInfo = () => {
    return (
        <>
            <h2 className="text-[28px] 2xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase">
                КОНТАКТЫ
            </h2>

            <div className="grid sm:grid-cols-3 md:block flex-wrap sm:gap-10 mt-[32px] md:mt-[48px] 2xl:mt-[56px]">
                <div className="flex md:flex-row flex-col gap-3 nd:gap-10">
                    <div>
                        <p className="text-[11px] md:text-sm 2xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase max-w-[248px] 2xl:max-w-[340px]">
                            Москва, Яузская улица, 5, офис 222
                        </p>
                    </div>

                    <div>
                        <p className="text-[11px] md:text-sm 2xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase whitespace-nowrap">
                            Выходные: с 12 до 19 <br />
                            Будни: с 12 до 21
                        </p>
                    </div>
                </div>
                <div>
                    <div className="text-[11px] md:text-sm 2xl:text-[21px] text-[#1D1D1D99] leading-[155%] uppercase md:max-w-[248px] 2xl:max-w-[420px] mt-8 sm:mt-0 md:mt-10">
                        вход вверх по лестнице в Бизнес-центр «Яузская, 5».
                    </div>
                    <div className="sm:mt-1 mb-8 sm:mb-0 md:mb-14">
                        <button className="h-[48px] md:h-[56px] flex items-center gap-4 text-[11px] md:text-xs 2xl:text-lg leading-[155%] text-[#1D1D1D] uppercase bg-transparent border-none cursor-pointer font-semibold">
                            <span className="w-full border-b border-[#1D1D1D26]">
                                ОТКРЫТЬ В КАРТАХ
                            </span>
                            <img
                                src="/icon-r.svg"
                                alt="icon"
                                className="min-w-6 2xl:min-w-8 min-h-6 2xl:min-h-8"
                                style={{
                                    filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
                                }}
                            />
                        </button>
                    </div>
                </div>

                <PhoneList />
            </div>
        </>
    );
};
