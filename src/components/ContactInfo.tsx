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
                            РОССИЙСКАЯ ФЕДЕРАЦИЯ, САНКТ-ПЕТЕРБУРГ, КРЕСТОВСКИЙ
                            ОСТРОВ, КРЕСТОВСКИЙ ПР., 4 Б
                        </p>
                    </div>

                    <div>
                        <p className="text-[11px] md:text-sm 2xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase whitespace-nowrap">
                            ВИЗИТ – ПО <br /> ПРЕДВАРИТЕЛЬНОЙ ЗАПИСИ
                        </p>
                    </div>
                </div>
                <div>
                    {/* <div className="text-[11px] md:text-sm 2xl:text-[21px] text-[#1D1D1D99] leading-[155%] uppercase md:max-w-[248px] 2xl:max-w-[420px] mt-8 sm:mt-0 md:mt-10">
                        вход вверх по лестнице в Бизнес-центр «Яузская, 5».
                    </div> */}
                    <div className="sm:mt-1 mb-8 sm:mb-0 md:mb-14">
                        <button className="h-[48px] md:h-[56px] flex items-center gap-2 2xl:gap-4 text-[11px] md:text-xs 2xl:text-lg leading-[155%] text-[#1D1D1D] uppercase bg-transparent border-none cursor-pointer font-semibold">
                            <span className="w-full border-b border-[#1D1D1D26]">
                                ОТКРЫТЬ В КАРТАХ
                            </span>
                            <svg
                                width="24"
                                height="20"
                                viewBox="0 0 24 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-[13.5px] w-[16.5px] 2xl:h-[22px] 2xl:w-[18px]"
                            >
                                <path
                                    d="M0 9.53033H22M22 9.53033L13 0.530334M22 9.53033L13 18.5303"
                                    stroke="#1D1D1D"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <PhoneList />
            </div>
        </>
    );
};
