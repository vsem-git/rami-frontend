import { PhoneList } from "../../../components/PhoneList";

export const ContactInfo = () => {
    return (
        <>
            <h2 className="text-[28px] 2xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase" data-content-hint="contact.title">КОНТАКТЫ</h2>

            <div className="grid sm:grid-cols-3 md:block flex-wrap sm:gap-10 mt-[32px] md:mt-[48px] 2xl:mt-[56px]">
                <div className="flex md:flex-row flex-col gap-3 nd:gap-10">
                    <div className="flex-1">
                        <p className="text-[11px] md:text-sm 2xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase" data-content-hint="contact.address1">РОССИЙСКАЯ ФЕДЕРАЦИЯ, САНКТ-ПЕТЕРБУРГ</p>
                        <p className="text-[11px] md:text-sm 2xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase" data-content-hint="contact.address2">КРЕСТОВСКИЙ ОСТРОВ, КРЕСТОВСКИЙ ПР. 4Б</p>
                    </div>
                </div>
                <div>
                    <div className="sm:mt-1 mb-8 sm:mb-0 md:mb-14">
                        <a
                            href="https://yandex.ru/maps/-/CLX1zQjw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-[48px] md:h-[56px] w-fit flex items-center gap-2 2xl:gap-4 text-[11px] md:text-xs 2xl:text-lg leading-[155%] text-[#1D1D1D] uppercase bg-transparent border-none cursor-pointer font-semibold"
                            data-content-hint="contact.routeLink"
                        >
                            <span className="w-full border-b border-[#1D1D1D26]" data-content-hint="contact.routeLink.text">
                                ПОСТРОИТЬ МАРШРУТ
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
                        </a>
                    </div>
                </div>

                <PhoneList />
                <div className="text-[11px] md:text-sm 2xl:text-[21px] leading-[155%] text-[#691c32] uppercase" data-content-hint="contact.note">ВИЗИТ ПО ПРЕДВАРИТЕЛЬНОЙ ЗАПИСИ</div>
            </div>
        </>
    );
};
