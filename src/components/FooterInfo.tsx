const FooterInfo = () => {
    return (
        <div className="px-6 py-6 2xl:px-10 2xl:py-10 bg-[#1D1D1D] text-white flex flex-col gap-6 md:gap-0">
            <div className="flex w-full md:flex-row flex-col gap-6">
                <div className="uppercase text-[#FFFFFF80] sm:py-[11px] whitespace-nowrap text-[11px] xl:text-[12px] 2xl:text-base md:pr-[215px] xl:pr-[195px] 2xl:pr-[160px]">
                    ©2025. Рамиклиник резиденс
                </div>
                <div className="flex flex-col sm:flex-row justify-between flex-1 gap-6 sm:gap-0">
                    <div className="flex justify-between flex-col gap-6 sm:gap-[16px] xl:gap-0 xl:flex-row flex-1 pr-[clamp(2.5rem,-46.25rem+60vw,10rem)]">
                        <div className="uppercase max-w-[360px] md:max-w-[440px] 2xl:max-w-[570px] mb-0 xl:py-[11px] text-[11px] xl:text-[12px] 2xl:text-base">
                            Крестовский пр., 4Б, Крестовский остров,
                            Санкт-Петербург, Российская Федерация
                        </div>
                        <div className="flex gap-10 sm:py-[16px] md:py-[11px] mb-[6px] sm:mb-0 text-[11px] xl:text-[12px] 2xl:text-base">
                            <div className="font-semibold border-b border-[#FFFFFF26] h-fit whitespace-nowrap">
                                +7 (921) 447-00-31
                            </div>
                            <div className="font-semibold border-b border-[#FFFFFF26] h-fit whitespace-nowrap">
                                +7 (812) 627-13-13
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end md:items-start gap-1 mb-6 sm:mb-0">
                        <a
                            href="https://t.me/+78126271313"
                            className="border-[#FFFFFF1A] border p-[14px] rounded-full h-fit aspect-square"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 6.8C14.49 8.38 13.84 12.22 13.51 13.99C13.37 14.74 13.09 14.99 12.83 15.02C12.25 15.07 11.81 14.64 11.25 14.27C10.37 13.69 9.87 13.33 9.02 12.77C8.03 12.12 8.67 11.76 9.24 11.18C9.39 11.03 11.95 8.7 12 8.49C12.0069 8.45819 12.006 8.42517 11.9973 8.3938C11.9886 8.36244 11.9724 8.33367 11.95 8.31C11.89 8.26 11.81 8.28 11.74 8.29C11.65 8.31 10.25 9.24 7.52 11.08C7.12 11.35 6.76 11.49 6.44 11.48C6.08 11.47 5.4 11.28 4.89 11.11C4.26 10.91 3.77 10.8 3.81 10.45C3.83 10.27 4.08 10.09 4.55 9.9C7.47 8.63 9.41 7.79 10.38 7.39C13.16 6.23 13.73 6.03 14.11 6.03C14.19 6.03 14.38 6.05 14.5 6.15C14.6 6.23 14.63 6.34 14.64 6.42C14.63 6.48 14.65 6.66 14.64 6.8Z" fill="white" />
                            </svg>
                        </a>
                        <a
                            href="https://rami.infoclinica.ru"
                            className="border-[#FFFFFF1A] relative after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:mt-2 after:whitespace-pre after:text-center after:text-[11px] after:font-semibold after:leading-tight after:uppercase after:content-['ЛИЧНЫЙ\AКАБИНЕТ'] border p-[14px] rounded-full h-fit aspect-square"
                        >
                            <svg width="20" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-3.93403e-07 9.53033L22 9.53033M22 9.53033L13 0.53033M22 9.53033L13 18.5303" stroke="white" strokeWidth="1.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-[11px] xl:text-[12px] 2xl:text-base uppercase flex flex-wrap gap-6 md:mt-5">
                <a href="/patient">Пациентам</a>
                <a href="/contacts">Контакты</a>
            </div>
        </div>
    );
};

export default FooterInfo;
