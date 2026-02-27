export const TourismSafety = () => {
    const safetyItems = [
        { title: "Безопасность пациентов", number: "01" },
        { title: "Безопасность медицинского персонала", number: "02" },
        { title: "Безопасность среды", number: "03" },
    ];

    return (
        <div className="relative w-full h-screen min-h-screen flex items-center gap-5 bg-[#691C32]">
            <div className='relative w-1/2 h-full bg-[url("tourism/5.webp")] bg-cover bg-center bg-no-repeat px-15'>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent" />

                <h1 className="relative z-10 text-5xl text-white uppercase leading-[125%] pt-[160px]">
                    Безопасность — наш главный приоритет
                </h1>
            </div>

            <div className="w-1/2 px-15">
                {safetyItems.map((item, index) => (
                    <div
                        key={item.number}
                        className={`safety-item w-full flex justify-between items-center py-16 ${
                            index === safetyItems.length - 1
                                ? "border-y border-[#FFFFFF33]"
                                : "border-t border-[#FFFFFF33]"
                        }`}
                    >
                        <h2 className="text-2xl text-white uppercase text-[130%]">
                            {item.title}
                        </h2>
                        <span className="text-[88px] text-[#FFFFFF4D] uppercase leading-none">
                            {item.number}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};