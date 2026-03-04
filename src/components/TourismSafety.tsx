export const TourismSafety = () => {
    const safetyItems = [
        { title: "Безопасность пациентов", number: "01" },
        { title: "Безопасность медицинского персонала", number: "02" },
        { title: "Безопасность среды", number: "03" },
    ];

    return (
        <div className="relative w-full h-[85vh] sm:h-[90vh] md:h-screen min-h-full md:min-h-screen flex items-start xl:items-center gap-5 bg-[#691C32] flex-col md:flex-row">
            <div className='relative w-full md:w-1/2 md:h-full bg-[url("tourism/5.webp")] bg-cover md:bg-center bg-no-repeat px-4 lg:px-6 xl:px-15 h-[300px] sm:h-[450px] max-[620px]:bg-[50%_-10rem] max-[620px]:bg-[50%_-14rem] bg-[50%_-27rem]'>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent" />

                <h1 className="relative z-10 text-sm sm:text-[24px] lg:text-[32px] xl:text-5xl text-white uppercase leading-[125%] pt-10 xl:pt-15 2xl:pt-[160px] max-w-[250px] sm:max-w-[400px] md:max-w-full">
                    Безопасность — наш главный приоритет
                </h1>
            </div>

            <div className="w-full md:w-1/2 px-4 md:px-8 xl:px-15 pt-8 md:pt-10 lg:pt-14 xl:pt-0">
                {safetyItems.map((item, index) => (
                    <div
                        key={item.number}
                        className={`safety-item w-full flex justify-between items-center py-4 sm:py-6 md:py-8 xl:py-16 gap-5 ${
                            index === safetyItems.length - 1
                                ? "border-y border-[#FFFFFF33]"
                                : "border-t border-[#FFFFFF33]"
                        }`}
                    >
                        <h2 className="text-[14px] xl:text-[18px] 2xl:text-2xl text-white uppercase leading-[130%] max-w-[241px] xl:max-w-full">
                            {item.title}
                        </h2>
                        <span className="text-[40px] md:text-[60px] xl:text-[88px] text-[#FFFFFF4D] uppercase leading-none">
                            {item.number}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};


