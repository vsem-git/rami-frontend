"use client";

export const SafetyOperationRoomsMobile = () => {
    const items = [
        {
            id: "01",
            text: "Герметичные операционные с ИИ, управляемые голосом",
        },
        {
            id: "02",
            text: "Централизованное стерилизационное отделение",
        },
        {
            id: "03",
            text: "Ламинарные потоки как гарантия абсолютной стерильности",
        },
        {
            id: "04",
            text: "Мобильные операционные столы экстра-класса",
        },
        {
            id: "05",
            text: "Безопасное интраоперационное ведение пациента",
        },
        {
            id: "06",
            text: "Бесконтактная система доступа в операционный блок",
        },
    ];

    return (
        <div className="w-full h-auto flex flex-col md:hidden">
            <img
                src="/operation-rooms/card5.webp"
                alt=""
                className="w-full h-auto min-h-[360px] object-cover"
            />

            <div className="relative px-4 mt-24 mb-16">
                <img
                    src="/operation-rooms/acr.webp"
                    alt=""
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[420px] h-[175px] opacity-30"
                />

                <h2 className="text-[20px] leading-[125%] text-[#1D1D1D] uppercase mb-10">
                    Абсолютная безопасность
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6  bg-white">
                    {items.map((item) => (
                        <div key={item.id} className="space-y-2 max-w-[360px]">
                            <h4 className="text-[11px] text-[#B59158] uppercase tracking-wide">
                                {item.id}
                            </h4>
                            <p className="text-[13px] text-[#1D1D1D] leading-[150%] uppercase">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <img
                src="/operation-rooms/card2.webp"
                alt=""
                className="w-full h-auto min-h-[480px] object-cover"
            />
        </div>
    );
};
